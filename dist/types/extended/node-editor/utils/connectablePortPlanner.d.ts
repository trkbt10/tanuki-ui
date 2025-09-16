import { Connection, ConnectionDisconnectState, ConnectionDragState, Node, NodeId, Port, PortId, PortType } from '../types/core';
import { NodeDefinition } from '../types/NodeDefinition';
import { ConnectionSwitchBehavior } from './connectionSwitchBehavior';
export interface ComputeConnectablePortsParams {
    dragState?: ConnectionDragState | null;
    disconnectState?: ConnectionDisconnectState | null;
    fallbackPort?: Port | null;
    nodes: Record<NodeId, Node>;
    connections: Record<string, Connection>;
    getNodePorts: (nodeId: string) => Port[];
    getNodeDefinition: (type: string) => NodeDefinition | undefined;
}
export interface ConnectablePortSourceInfo {
    nodeId: NodeId;
    portId: PortId;
    portType: PortType;
    portIndex: number;
}
export interface ConnectablePortDescriptor {
    key: string;
    nodeId: NodeId;
    portId: PortId;
    portType: PortType;
    portIndex: number;
    source: ConnectablePortSourceInfo;
    behavior: ConnectionSwitchBehavior;
}
export interface ConnectablePortsResult {
    ids: Set<string>;
    descriptors: Map<string, ConnectablePortDescriptor>;
    source: ConnectablePortSourceInfo | null;
}
/**
 * Determine the ports that can accept a connection for the current interaction context.
 * Returns both the raw identifiers and detailed descriptors to aid debugging and UI decisions.
 */
export declare const computeConnectablePortIds: ({ dragState, disconnectState, fallbackPort, nodes, connections, getNodePorts, getNodeDefinition, }: ComputeConnectablePortsParams) => ConnectablePortsResult;
export declare const resolveConnectableSourcePort: ({ dragState, disconnectState, fallbackPort, }: Pick<ComputeConnectablePortsParams, "dragState" | "disconnectState" | "fallbackPort">) => Port | null;
export declare const emptyConnectablePorts: () => ConnectablePortsResult;
