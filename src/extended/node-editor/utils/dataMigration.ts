import type { NodeEditorData, Node, NodeId } from "../types/core";
import type { NodeDefinitionRegistry } from "../types/NodeDefinition";
import type { NodeWithPortOverrides, PortOverride } from "./portResolver";

/**
 * Migration result with statistics and any warnings
 */
export interface MigrationResult {
  data: NodeEditorData;
  statistics: {
    nodesProcessed: number;
    portsRemoved: number;
    portOverridesCreated: number;
  };
  warnings: string[];
}

/**
 * Version info for data format
 */
export interface DataFormatVersion {
  version: number;
  portsStorageMethod: "embedded" | "inferred";
}

/**
 * Extended NodeEditorData with version info
 */
export interface VersionedNodeEditorData extends NodeEditorData {
  formatVersion?: DataFormatVersion;
}

/**
 * Current data format version
 */
export const CURRENT_FORMAT_VERSION: DataFormatVersion = {
  version: 2,
  portsStorageMethod: "inferred",
};

/**
 * Legacy format version (default for old data)
 */
export const LEGACY_FORMAT_VERSION: DataFormatVersion = {
  version: 1,
  portsStorageMethod: "embedded",
};

/**
 * Check if node data needs migration
 */
export function needsMigration(data: VersionedNodeEditorData): boolean {
  // If no version info, it's legacy data
  if (!data.formatVersion) {
    return true;
  }

  // Check if it's using the old embedded ports method
  return data.formatVersion.portsStorageMethod === "embedded";
}

/**
 * Migrate node data from old format (embedded ports) to new format (inferred ports)
 * This removes ports from nodes, preserving only customizations as port overrides
 */
export function migrateNodeData(
  data: NodeEditorData,
  registry?: NodeDefinitionRegistry
): MigrationResult {
  const warnings: string[] = [];
  let nodesProcessed = 0;
  let portsRemoved = 0;
  let portOverridesCreated = 0;

  const migratedNodes: Record<NodeId, Node> = {};

  // Process each node
  for (const [nodeId, node] of Object.entries(data.nodes)) {
    nodesProcessed++;

    if (!node.ports || node.ports.length === 0) {
      // No ports to migrate
      migratedNodes[nodeId] = node;
      continue;
    }

    // Get the node definition if available
    const nodeDefinition = registry?.get(node.type);

    if (!nodeDefinition) {
      warnings.push(
        `Node ${nodeId} (type: ${node.type}) has no definition in registry. Ports will be removed without creating overrides.`
      );
    }

    // Create port overrides for any customizations
    const portOverrides: PortOverride[] = [];

    if (nodeDefinition && nodeDefinition.ports) {
      // Compare node ports with definition ports to find customizations
      for (const nodePort of node.ports) {
        const defPort = nodeDefinition.ports.find(p => p.id === nodePort.id);
        
        if (!defPort) {
          warnings.push(
            `Port ${nodePort.id} on node ${nodeId} not found in definition. It will be lost during migration.`
          );
          continue;
        }

        // Check for customizations
        const override: PortOverride = { portId: nodePort.id };
        let hasOverride = false;

        // Check max connections
        if (nodePort.maxConnections !== undefined && 
            nodePort.maxConnections !== defPort.maxConnections) {
          override.maxConnections = nodePort.maxConnections;
          hasOverride = true;
        }

        // Check allowed node types
        if (nodePort.allowedNodeTypes) {
          // PortDefinition doesn't have allowedNodeTypes, so any value is an override
          override.allowedNodeTypes = nodePort.allowedNodeTypes;
          hasOverride = true;
        }

        // Check allowed port types
        if (nodePort.allowedPortTypes) {
          // PortDefinition doesn't have allowedPortTypes, so any value is an override
          override.allowedPortTypes = nodePort.allowedPortTypes;
          hasOverride = true;
        }

        if (hasOverride) {
          portOverrides.push(override);
          portOverridesCreated++;
        }
      }
    }

    // Create migrated node without ports
    const { ports, ...nodeWithoutPorts } = node;
    portsRemoved += ports.length;

    const migratedNode: Node | NodeWithPortOverrides = {
      ...nodeWithoutPorts,
      ...(portOverrides.length > 0 ? { portOverrides } : {}),
    };

    migratedNodes[nodeId] = migratedNode as Node;
  }

  const migratedData: VersionedNodeEditorData = {
    nodes: migratedNodes,
    connections: data.connections,
    formatVersion: CURRENT_FORMAT_VERSION,
  };

  return {
    data: migratedData,
    statistics: {
      nodesProcessed,
      portsRemoved,
      portOverridesCreated,
    },
    warnings,
  };
}

/**
 * Prepare data for saving (removes ports if using new format)
 */
export function prepareDataForSave(
  data: NodeEditorData,
  useNewFormat: boolean = true
): VersionedNodeEditorData {
  if (!useNewFormat) {
    // Keep old format for compatibility
    return {
      ...data,
      formatVersion: LEGACY_FORMAT_VERSION,
    };
  }

  // Remove ports from all nodes for new format
  const cleanedNodes: Record<NodeId, Node> = {};
  
  for (const [nodeId, node] of Object.entries(data.nodes)) {
    const { ports, ...nodeWithoutPorts } = node as any;
    cleanedNodes[nodeId] = nodeWithoutPorts;
  }

  return {
    nodes: cleanedNodes,
    connections: data.connections,
    formatVersion: CURRENT_FORMAT_VERSION,
  };
}

/**
 * Load data with automatic migration if needed
 */
export function loadDataWithMigration(
  data: VersionedNodeEditorData,
  registry?: NodeDefinitionRegistry,
  autoMigrate: boolean = true
): { data: NodeEditorData; migrated: boolean; migrationResult?: MigrationResult } {
  // Check if migration is needed
  if (!needsMigration(data) || !autoMigrate) {
    return { data, migrated: false };
  }

  // Perform migration
  const migrationResult = migrateNodeData(data, registry);
  
  return {
    data: migrationResult.data,
    migrated: true,
    migrationResult,
  };
}

/**
 * Validate migrated data to ensure it's compatible
 */
export function validateMigratedData(
  originalData: NodeEditorData,
  migratedData: NodeEditorData,
  registry?: NodeDefinitionRegistry
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check that all nodes still exist
  const originalNodeIds = new Set(Object.keys(originalData.nodes));
  const migratedNodeIds = new Set(Object.keys(migratedData.nodes));

  if (originalNodeIds.size !== migratedNodeIds.size) {
    errors.push("Node count mismatch after migration");
  }

  // Check that connections are still valid
  for (const connection of Object.values(migratedData.connections)) {
    const fromNode = migratedData.nodes[connection.fromNodeId];
    const toNode = migratedData.nodes[connection.toNodeId];

    if (!fromNode || !toNode) {
      errors.push(`Connection ${connection.id} references non-existent nodes`);
      continue;
    }

    // If we have a registry, verify ports will exist
    if (registry) {
      const fromDef = registry.get(fromNode.type);
      const toDef = registry.get(toNode.type);

      if (fromDef && !fromDef.ports?.some(p => p.id === connection.fromPortId)) {
        errors.push(`Connection ${connection.id} references non-existent port ${connection.fromPortId}`);
      }

      if (toDef && !toDef.ports?.some(p => p.id === connection.toPortId)) {
        errors.push(`Connection ${connection.id} references non-existent port ${connection.toPortId}`);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Bulk migration utility for multiple data files
 */
export async function bulkMigrateData(
  dataList: VersionedNodeEditorData[],
  registry?: NodeDefinitionRegistry,
  onProgress?: (current: number, total: number) => void
): Promise<MigrationResult[]> {
  const results: MigrationResult[] = [];
  const total = dataList.length;

  for (let i = 0; i < total; i++) {
    const data = dataList[i];
    
    if (needsMigration(data)) {
      const result = migrateNodeData(data, registry);
      results.push(result);
    } else {
      // Already migrated
      results.push({
        data,
        statistics: {
          nodesProcessed: 0,
          portsRemoved: 0,
          portOverridesCreated: 0,
        },
        warnings: ["Data already in new format, skipping migration"],
      });
    }

    if (onProgress) {
      onProgress(i + 1, total);
    }
  }

  return results;
}

/**
 * Create a rollback function to restore original data
 */
export function createRollback(originalData: NodeEditorData): () => NodeEditorData {
  // Deep clone the original data
  const backup = JSON.parse(JSON.stringify(originalData));
  
  return () => backup;
}