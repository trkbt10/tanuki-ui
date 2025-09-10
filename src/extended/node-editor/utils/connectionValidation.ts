import type { Port, Connection } from "../types/core";
import type { NodeDefinition } from "../types/NodeDefinition";

/**
 * Check if two ports can be connected
 */
export const canConnectPorts = (
  fromPort: Port,
  toPort: Port,
  fromNodeDef?: NodeDefinition,
  toNodeDef?: NodeDefinition,
  connections?: Record<string, Connection>
): boolean => {
  // Basic connection rules
  if (fromPort.type === toPort.type) return false; // Same type cannot connect
  if (fromPort.nodeId === toPort.nodeId) return false; // Same node cannot connect
  if (fromPort.id === toPort.id) return false; // Same port cannot connect
  
  // Ensure proper input/output pairing
  if (fromPort.type === "output" && toPort.type !== "input") return false;
  if (fromPort.type === "input" && toPort.type !== "output") return false;
  
  // Check if connection already exists
  if (connections) {
    const existingConnection = Object.values(connections).find(conn => 
      (conn.fromPortId === fromPort.id && conn.toPortId === toPort.id) ||
      (conn.fromPortId === toPort.id && conn.toPortId === fromPort.id)
    );
    if (existingConnection) return false;
  }
  
  // Check custom validation functions (both must allow)
  if (fromNodeDef?.validateConnection) {
    if (!fromNodeDef.validateConnection(fromPort, toPort)) return false;
  }
  if (toNodeDef?.validateConnection) {
    if (!toNodeDef.validateConnection(fromPort, toPort)) return false;
  }
  
  // Check data type compatibility if specified
  const fromPortDef = fromNodeDef?.ports?.find(p => p.id === fromPort.id);
  const toPortDef = toNodeDef?.ports?.find(p => p.id === toPort.id);
  
  if (fromPortDef?.dataType && toPortDef?.dataType) {
    if (fromPortDef.dataType !== toPortDef.dataType) return false;
  }
  
  // Check max connections limit (both ends if defined)
  if (connections) {
    if (toPortDef?.maxConnections !== undefined) {
      const toPortConnections = Object.values(connections).filter(conn => conn.toPortId === toPort.id);
      if (toPortConnections.length >= toPortDef.maxConnections) return false;
    }
    if (fromPortDef?.maxConnections !== undefined) {
      const fromPortConnections = Object.values(connections).filter(conn => conn.fromPortId === fromPort.id);
      if (fromPortConnections.length >= fromPortDef.maxConnections) return false;
    }
  }
  
  return true;
};

/**
 * Get port definition from node definition
 */
export const getPortDefinition = (
  port: Port,
  nodeDefinition?: NodeDefinition
) => {
  if (!nodeDefinition?.ports) return undefined;
  const portDefId = port.id.split('-').pop(); // Extract port def id from full port id
  return nodeDefinition.ports.find(p => p.id === portDefId);
};
