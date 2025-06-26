import type { Port, NodeId, Node, Connection, PortId } from "../types/core";
import type { NodeDefinition, NodeDefinitionRegistry } from "../types/NodeDefinition";

/**
 * Calculate which ports can be connected to from a given source port
 */
export const calculateConnectablePorts = (
  fromPort: Port,
  allNodes: Record<NodeId, Node>,
  nodeDefinitions: NodeDefinitionRegistry,
  connections: Record<string, Connection>
): Set<PortId> => {
  const connectablePorts = new Set<PortId>();
  
  console.log('🔍 Calculating connectable ports for:', fromPort);
  
  // Get fromPort's node definition
  const fromNode = allNodes[fromPort.nodeId];
  if (!fromNode) {
    console.log('❌ FromNode not found');
    return connectablePorts;
  }
  
  const fromNodeDef = nodeDefinitions.get(fromNode.type);
  
  // Check all nodes and their ports
  Object.values(allNodes).forEach(node => {
    const nodeDefinition = nodeDefinitions.get(node.type);
    if (!nodeDefinition?.ports) return;
    
    nodeDefinition.ports.forEach(portDef => {
      const toPort: Port = {
        id: `${node.id}-${portDef.id}`,
        nodeId: node.id,
        type: portDef.type,
        label: portDef.label,
        position: portDef.position,
      };
      
      // Check if ports can be connected
      const canConnect = canConnectPorts(fromPort, toPort, fromNodeDef, nodeDefinition, connections);
      if (canConnect) {
        console.log('✅ Can connect to:', toPort);
        connectablePorts.add(toPort.id);
      } else {
        console.log('❌ Cannot connect to:', toPort, 'reason: type check failed');
      }
    });
  });
  
  console.log('📋 Final connectable ports:', Array.from(connectablePorts));
  return connectablePorts;
};

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
  
  // Check custom validation functions
  if (fromNodeDef?.validateConnection) {
    return fromNodeDef.validateConnection(fromPort, toPort);
  }
  if (toNodeDef?.validateConnection) {
    return toNodeDef.validateConnection(fromPort, toPort);
  }
  
  // Check data type compatibility if specified
  const fromPortDef = fromNodeDef?.ports?.find(p => p.id === fromPort.id.split('-').pop());
  const toPortDef = toNodeDef?.ports?.find(p => p.id === toPort.id.split('-').pop());
  
  if (fromPortDef?.dataType && toPortDef?.dataType) {
    if (fromPortDef.dataType !== toPortDef.dataType) return false;
  }
  
  // Check max connections limit
  if (connections && toPortDef?.maxConnections !== undefined) {
    const toPortConnections = Object.values(connections).filter(conn => 
      conn.toPortId === toPort.id
    );
    if (toPortConnections.length >= toPortDef.maxConnections) return false;
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