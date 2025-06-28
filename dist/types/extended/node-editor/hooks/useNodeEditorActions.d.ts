/**
 * Hook that provides pre-bound action creators for the NodeEditor
 * No need to call dispatch manually - actions are automatically dispatched
 */
export declare function useNodeEditorActions(): {
    addNode: (node: Parameters<(node: Omit<import('..').Node, "id">) => import('../contexts/NodeEditorContext').NodeEditorAction>[0]) => void;
    updateNode: (nodeId: Parameters<(nodeId: import('..').NodeId, updates: Partial<import('..').Node>) => import('../contexts/NodeEditorContext').NodeEditorAction>[0], updates: Parameters<(nodeId: import('..').NodeId, updates: Partial<import('..').Node>) => import('../contexts/NodeEditorContext').NodeEditorAction>[1]) => void;
    deleteNode: (nodeId: Parameters<(nodeId: import('..').NodeId) => import('../contexts/NodeEditorContext').NodeEditorAction>[0]) => void;
    moveNode: (nodeId: Parameters<(nodeId: import('..').NodeId, position: import('..').Position) => import('../contexts/NodeEditorContext').NodeEditorAction>[0], position: Parameters<(nodeId: import('..').NodeId, position: import('..').Position) => import('../contexts/NodeEditorContext').NodeEditorAction>[1]) => void;
    moveNodes: (updates: Parameters<(updates: Record<import('..').NodeId, import('..').Position>) => import('../contexts/NodeEditorContext').NodeEditorAction>[0]) => void;
    addConnection: (connection: Parameters<(connection: Omit<import('..').Connection, "id">) => import('../contexts/NodeEditorContext').NodeEditorAction>[0]) => void;
    deleteConnection: (connectionId: Parameters<(connectionId: import('..').ConnectionId) => import('../contexts/NodeEditorContext').NodeEditorAction>[0]) => void;
    setNodeData: (data: Parameters<(data: import('../types/core').NodeEditorData) => import('../contexts/NodeEditorContext').NodeEditorAction>[0]) => void;
    restoreState: (data: Parameters<(data: import('../types/core').NodeEditorData) => import('../contexts/NodeEditorContext').NodeEditorAction>[0]) => void;
    duplicateNodes: (nodeIds: Parameters<(nodeIds: import('..').NodeId[]) => import('../contexts/NodeEditorContext').NodeEditorAction>[0]) => void;
    groupNodes: (nodeIds: Parameters<(nodeIds: import('..').NodeId[], groupId?: import('..').NodeId) => import('../contexts/NodeEditorContext').NodeEditorAction>[0], groupId?: Parameters<(nodeIds: import('..').NodeId[], groupId?: import('..').NodeId) => import('../contexts/NodeEditorContext').NodeEditorAction>[1]) => void;
    ungroupNode: (groupId: Parameters<(groupId: import('..').NodeId) => import('../contexts/NodeEditorContext').NodeEditorAction>[0]) => void;
    updateGroupMembership: (updates: Parameters<(updates: Record<import('..').NodeId, {
        parentId?: import('..').NodeId;
    }>) => import('../contexts/NodeEditorContext').NodeEditorAction>[0]) => void;
    moveGroupWithChildren: (groupId: Parameters<(groupId: import('..').NodeId, delta: {
        x: number;
        y: number;
    }) => import('../contexts/NodeEditorContext').NodeEditorAction>[0], delta: Parameters<(groupId: import('..').NodeId, delta: {
        x: number;
        y: number;
    }) => import('../contexts/NodeEditorContext').NodeEditorAction>[1]) => void;
    autoLayout: (layoutType: Parameters<(layoutType: "force" | "hierarchical" | "grid", selectedOnly?: boolean) => import('../contexts/NodeEditorContext').NodeEditorAction>[0], selectedOnly?: Parameters<(layoutType: "force" | "hierarchical" | "grid", selectedOnly?: boolean) => import('../contexts/NodeEditorContext').NodeEditorAction>[1]) => void;
};
/**
 * Hook that provides both state and pre-bound actions for the NodeEditor
 * Convenient alternative to useNodeEditor when you need both state and actions
 */
export declare function useNodeEditorState(): {
    state: import('../types/core').NodeEditorData;
    actions: {
        addNode: (node: Parameters<(node: Omit<import('..').Node, "id">) => import('../contexts/NodeEditorContext').NodeEditorAction>[0]) => void;
        updateNode: (nodeId: Parameters<(nodeId: import('..').NodeId, updates: Partial<import('..').Node>) => import('../contexts/NodeEditorContext').NodeEditorAction>[0], updates: Parameters<(nodeId: import('..').NodeId, updates: Partial<import('..').Node>) => import('../contexts/NodeEditorContext').NodeEditorAction>[1]) => void;
        deleteNode: (nodeId: Parameters<(nodeId: import('..').NodeId) => import('../contexts/NodeEditorContext').NodeEditorAction>[0]) => void;
        moveNode: (nodeId: Parameters<(nodeId: import('..').NodeId, position: import('..').Position) => import('../contexts/NodeEditorContext').NodeEditorAction>[0], position: Parameters<(nodeId: import('..').NodeId, position: import('..').Position) => import('../contexts/NodeEditorContext').NodeEditorAction>[1]) => void;
        moveNodes: (updates: Parameters<(updates: Record<import('..').NodeId, import('..').Position>) => import('../contexts/NodeEditorContext').NodeEditorAction>[0]) => void;
        addConnection: (connection: Parameters<(connection: Omit<import('..').Connection, "id">) => import('../contexts/NodeEditorContext').NodeEditorAction>[0]) => void;
        deleteConnection: (connectionId: Parameters<(connectionId: import('..').ConnectionId) => import('../contexts/NodeEditorContext').NodeEditorAction>[0]) => void;
        setNodeData: (data: Parameters<(data: import('../types/core').NodeEditorData) => import('../contexts/NodeEditorContext').NodeEditorAction>[0]) => void;
        restoreState: (data: Parameters<(data: import('../types/core').NodeEditorData) => import('../contexts/NodeEditorContext').NodeEditorAction>[0]) => void;
        duplicateNodes: (nodeIds: Parameters<(nodeIds: import('..').NodeId[]) => import('../contexts/NodeEditorContext').NodeEditorAction>[0]) => void;
        groupNodes: (nodeIds: Parameters<(nodeIds: import('..').NodeId[], groupId?: import('..').NodeId) => import('../contexts/NodeEditorContext').NodeEditorAction>[0], groupId?: Parameters<(nodeIds: import('..').NodeId[], groupId?: import('..').NodeId) => import('../contexts/NodeEditorContext').NodeEditorAction>[1]) => void;
        ungroupNode: (groupId: Parameters<(groupId: import('..').NodeId) => import('../contexts/NodeEditorContext').NodeEditorAction>[0]) => void;
        updateGroupMembership: (updates: Parameters<(updates: Record<import('..').NodeId, {
            parentId?: import('..').NodeId;
        }>) => import('../contexts/NodeEditorContext').NodeEditorAction>[0]) => void;
        moveGroupWithChildren: (groupId: Parameters<(groupId: import('..').NodeId, delta: {
            x: number;
            y: number;
        }) => import('../contexts/NodeEditorContext').NodeEditorAction>[0], delta: Parameters<(groupId: import('..').NodeId, delta: {
            x: number;
            y: number;
        }) => import('../contexts/NodeEditorContext').NodeEditorAction>[1]) => void;
        autoLayout: (layoutType: Parameters<(layoutType: "force" | "hierarchical" | "grid", selectedOnly?: boolean) => import('../contexts/NodeEditorContext').NodeEditorAction>[0], selectedOnly?: Parameters<(layoutType: "force" | "hierarchical" | "grid", selectedOnly?: boolean) => import('../contexts/NodeEditorContext').NodeEditorAction>[1]) => void;
    };
};
