import { NodeEditorData } from '../types/core';
import { NodeDefinitionRegistry } from '../types/NodeDefinition';
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
export declare const CURRENT_FORMAT_VERSION: DataFormatVersion;
/**
 * Legacy format version (default for old data)
 */
export declare const LEGACY_FORMAT_VERSION: DataFormatVersion;
/**
 * Check if node data needs migration
 */
export declare function needsMigration(data: VersionedNodeEditorData): boolean;
/**
 * Migrate node data from old format (embedded ports) to new format (inferred ports)
 * This removes ports from nodes, preserving only customizations as port overrides
 */
export declare function migrateNodeData(data: NodeEditorData, registry?: NodeDefinitionRegistry): MigrationResult;
/**
 * Prepare data for saving (removes ports if using new format)
 */
export declare function prepareDataForSave(data: NodeEditorData, useNewFormat?: boolean): VersionedNodeEditorData;
/**
 * Load data with automatic migration if needed
 */
export declare function loadDataWithMigration(data: VersionedNodeEditorData, registry?: NodeDefinitionRegistry, autoMigrate?: boolean): {
    data: NodeEditorData;
    migrated: boolean;
    migrationResult?: MigrationResult;
};
/**
 * Validate migrated data to ensure it's compatible
 */
export declare function validateMigratedData(originalData: NodeEditorData, migratedData: NodeEditorData, registry?: NodeDefinitionRegistry): {
    isValid: boolean;
    errors: string[];
};
/**
 * Bulk migration utility for multiple data files
 */
export declare function bulkMigrateData(dataList: VersionedNodeEditorData[], registry?: NodeDefinitionRegistry, onProgress?: (current: number, total: number) => void): Promise<MigrationResult[]>;
/**
 * Create a rollback function to restore original data
 */
export declare function createRollback(originalData: NodeEditorData): () => NodeEditorData;
