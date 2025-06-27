/**
 * Hook that provides all pre-bound action creators in one convenient object
 * Combines actions from all editor contexts without needing to call dispatch
 *
 * @example
 * ```tsx
 * const actions = useEditorActions();
 *
 * // Direct action calls without dispatch
 * actions.editor.addNode(newNode);
 * actions.canvas.setViewport(newViewport);
 * actions.interaction.selectNode(nodeId);
 * ```
 */
export declare function useEditorActions(): {
    /** Node editor actions (add/remove/update nodes and connections) */
    editor: {
        addNode: (node: Parameters<(node: Omit<import('..').Node, "id">) => import('../types').NodeEditorAction>[0]) => void;
        updateNode: (nodeId: Parameters<(nodeId: import('..').NodeId, updates: Partial<import('..').Node>) => import('../types').NodeEditorAction>[0], updates: Parameters<(nodeId: import('..').NodeId, updates: Partial<import('..').Node>) => import('../types').NodeEditorAction>[1]) => void;
        deleteNode: (nodeId: Parameters<(nodeId: import('..').NodeId) => import('../types').NodeEditorAction>[0]) => void;
        moveNode: (nodeId: Parameters<(nodeId: import('..').NodeId, position: import('..').Position) => import('../types').NodeEditorAction>[0], position: Parameters<(nodeId: import('..').NodeId, position: import('..').Position) => import('../types').NodeEditorAction>[1]) => void;
        moveNodes: (updates: Parameters<(updates: Record<import('..').NodeId, import('..').Position>) => import('../types').NodeEditorAction>[0]) => void;
        addConnection: (connection: Parameters<(connection: Omit<import('..').Connection, "id">) => import('../types').NodeEditorAction>[0]) => void;
        deleteConnection: (connectionId: Parameters<(connectionId: import('..').ConnectionId) => import('../types').NodeEditorAction>[0]) => void;
        setNodeData: (data: Parameters<(data: import('..').NodeEditorData) => import('../types').NodeEditorAction>[0]) => void;
        restoreState: (data: Parameters<(data: import('..').NodeEditorData) => import('../types').NodeEditorAction>[0]) => void;
        duplicateNodes: (nodeIds: Parameters<(nodeIds: import('..').NodeId[]) => import('../types').NodeEditorAction>[0]) => void;
        groupNodes: (nodeIds: Parameters<(nodeIds: import('..').NodeId[], groupId?: import('..').NodeId) => import('../types').NodeEditorAction>[0], groupId?: Parameters<(nodeIds: import('..').NodeId[], groupId?: import('..').NodeId) => import('../types').NodeEditorAction>[1]) => void;
        ungroupNode: (groupId: Parameters<(groupId: import('..').NodeId) => import('../types').NodeEditorAction>[0]) => void;
        updateGroupMembership: (updates: Parameters<(updates: Record<import('..').NodeId, {
            parentId?: import('..').NodeId;
        }>) => import('../types').NodeEditorAction>[0]) => void;
        moveGroupWithChildren: (groupId: Parameters<(groupId: import('..').NodeId, delta: {
            x: number;
            y: number;
        }) => import('../types').NodeEditorAction>[0], delta: Parameters<(groupId: import('..').NodeId, delta: {
            x: number;
            y: number;
        }) => import('../types').NodeEditorAction>[1]) => void;
        autoLayout: (layoutType: Parameters<(layoutType: "force" | "hierarchical" | "grid", selectedOnly?: boolean) => import('../types').NodeEditorAction>[0], selectedOnly?: Parameters<(layoutType: "force" | "hierarchical" | "grid", selectedOnly?: boolean) => import('../types').NodeEditorAction>[1]) => void;
    };
    /** Canvas viewport and grid actions */
    canvas: {
        setViewport: (viewport: Parameters<(viewport: import('..').Viewport) => import('../contexts').NodeCanvasAction>[0]) => void;
        panViewport: (delta: Parameters<(delta: {
            x: number;
            y: number;
        }) => import('../contexts').NodeCanvasAction>[0]) => void;
        zoomViewport: (scale: Parameters<(scale: number, center?: {
            x: number;
            y: number;
        }) => import('../contexts').NodeCanvasAction>[0], center?: Parameters<(scale: number, center?: {
            x: number;
            y: number;
        }) => import('../contexts').NodeCanvasAction>[1]) => void;
        resetViewport: () => void;
        startPan: (position: Parameters<(position: {
            x: number;
            y: number;
        }) => import('../contexts').NodeCanvasAction>[0]) => void;
        updatePan: (position: Parameters<(position: {
            x: number;
            y: number;
        }) => import('../contexts').NodeCanvasAction>[0]) => void;
        endPan: () => void;
    };
    /** User interaction actions (drag, resize, selection) */
    interaction: {
        selectNode: (nodeId: Parameters<(nodeId: import('..').NodeId, multiple?: boolean) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[0], multiple?: Parameters<(nodeId: import('..').NodeId, multiple?: boolean) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[1]) => void;
        selectConnection: (connectionId: Parameters<(connectionId: import('..').ConnectionId, multiple?: boolean) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[0], multiple?: Parameters<(connectionId: import('..').ConnectionId, multiple?: boolean) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[1]) => void;
        clearSelection: () => void;
        selectAllNodes: (nodeIds: Parameters<(nodeIds: import('..').NodeId[]) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[0]) => void;
        setSelectionBox: (box: Parameters<(box: import('../contexts/EditorActionStateContext').SelectionBox | null) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[0]) => void;
        startNodeDrag: (nodeIds: Parameters<(nodeIds: import('..').NodeId[], startPosition: {
            x: number;
            y: number;
        }, initialPositions: Record<import('..').NodeId, {
            x: number;
            y: number;
        }>, affectedChildNodes: Record<import('..').NodeId, import('..').NodeId[]>) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[0], startPosition: Parameters<(nodeIds: import('..').NodeId[], startPosition: {
            x: number;
            y: number;
        }, initialPositions: Record<import('..').NodeId, {
            x: number;
            y: number;
        }>, affectedChildNodes: Record<import('..').NodeId, import('..').NodeId[]>) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[1], initialPositions: Parameters<(nodeIds: import('..').NodeId[], startPosition: {
            x: number;
            y: number;
        }, initialPositions: Record<import('..').NodeId, {
            x: number;
            y: number;
        }>, affectedChildNodes: Record<import('..').NodeId, import('..').NodeId[]>) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[2], affectedChildNodes: Parameters<(nodeIds: import('..').NodeId[], startPosition: {
            x: number;
            y: number;
        }, initialPositions: Record<import('..').NodeId, {
            x: number;
            y: number;
        }>, affectedChildNodes: Record<import('..').NodeId, import('..').NodeId[]>) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[3]) => void;
        updateNodeDrag: (offset: Parameters<(offset: {
            x: number;
            y: number;
        }) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[0]) => void;
        endNodeDrag: () => void;
        setHoveredNode: (nodeId: Parameters<(nodeId: import('..').NodeId | null) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[0]) => void;
        setHoveredConnection: (connectionId: Parameters<(connectionId: import('..').ConnectionId | null) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[0]) => void;
        startConnectionDrag: (fromPort: Parameters<(fromPort: import('..').Port) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[0]) => void;
        updateConnectionDrag: (toPosition: Parameters<(toPosition: {
            x: number;
            y: number;
        }, candidatePort: import('..').Port | null) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[0], candidatePort: Parameters<(toPosition: {
            x: number;
            y: number;
        }, candidatePort: import('..').Port | null) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[1]) => void;
        endConnectionDrag: () => void;
        setHoveredPort: (port: Parameters<(port: import('..').Port | null) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[0]) => void;
        updateConnectedPorts: (connectedPorts: Parameters<(connectedPorts: Set<import('..').PortId>) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[0]) => void;
        startConnectionDisconnect: (originalConnection: Parameters<(originalConnection: {
            id: import('..').ConnectionId;
            fromNodeId: import('..').NodeId;
            fromPortId: import('..').PortId;
            toNodeId: import('..').NodeId;
            toPortId: import('..').PortId;
        }, disconnectedEnd: "from" | "to", fixedPort: import('..').Port, draggingPosition: {
            x: number;
            y: number;
        }) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[0], disconnectedEnd: Parameters<(originalConnection: {
            id: import('..').ConnectionId;
            fromNodeId: import('..').NodeId;
            fromPortId: import('..').PortId;
            toNodeId: import('..').NodeId;
            toPortId: import('..').PortId;
        }, disconnectedEnd: "from" | "to", fixedPort: import('..').Port, draggingPosition: {
            x: number;
            y: number;
        }) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[1], fixedPort: Parameters<(originalConnection: {
            id: import('..').ConnectionId;
            fromNodeId: import('..').NodeId;
            fromPortId: import('..').PortId;
            toNodeId: import('..').NodeId;
            toPortId: import('..').PortId;
        }, disconnectedEnd: "from" | "to", fixedPort: import('..').Port, draggingPosition: {
            x: number;
            y: number;
        }) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[2], draggingPosition: Parameters<(originalConnection: {
            id: import('..').ConnectionId;
            fromNodeId: import('..').NodeId;
            fromPortId: import('..').PortId;
            toNodeId: import('..').NodeId;
            toPortId: import('..').PortId;
        }, disconnectedEnd: "from" | "to", fixedPort: import('..').Port, draggingPosition: {
            x: number;
            y: number;
        }) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[3]) => void;
        updateConnectionDisconnect: (draggingPosition: Parameters<(draggingPosition: {
            x: number;
            y: number;
        }, candidatePort: import('..').Port | null) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[0], candidatePort: Parameters<(draggingPosition: {
            x: number;
            y: number;
        }, candidatePort: import('..').Port | null) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[1]) => void;
        endConnectionDisconnect: () => void;
        startNodeResize: (nodeId: Parameters<(nodeId: import('..').NodeId, startPosition: {
            x: number;
            y: number;
        }, startSize: {
            width: number;
            height: number;
        }, handle: "se") => import('../contexts/EditorActionStateContext').EditorActionStateAction>[0], startPosition: Parameters<(nodeId: import('..').NodeId, startPosition: {
            x: number;
            y: number;
        }, startSize: {
            width: number;
            height: number;
        }, handle: "se") => import('../contexts/EditorActionStateContext').EditorActionStateAction>[1], startSize: Parameters<(nodeId: import('..').NodeId, startPosition: {
            x: number;
            y: number;
        }, startSize: {
            width: number;
            height: number;
        }, handle: "se") => import('../contexts/EditorActionStateContext').EditorActionStateAction>[2], handle: Parameters<(nodeId: import('..').NodeId, startPosition: {
            x: number;
            y: number;
        }, startSize: {
            width: number;
            height: number;
        }, handle: "se") => import('../contexts/EditorActionStateContext').EditorActionStateAction>[3]) => void;
        updateNodeResize: (currentSize: Parameters<(currentSize: {
            width: number;
            height: number;
        }) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[0]) => void;
        endNodeResize: () => void;
        showContextMenu: (position: Parameters<(position: {
            x: number;
            y: number;
        }, nodeId?: import('..').NodeId, canvasPosition?: {
            x: number;
            y: number;
        }) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[0], nodeId?: Parameters<(position: {
            x: number;
            y: number;
        }, nodeId?: import('..').NodeId, canvasPosition?: {
            x: number;
            y: number;
        }) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[1], canvasPosition?: Parameters<(position: {
            x: number;
            y: number;
        }, nodeId?: import('..').NodeId, canvasPosition?: {
            x: number;
            y: number;
        }) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[2]) => void;
        hideContextMenu: () => void;
    };
};
/**
 * Hook that provides common editor actions with semantic names
 * More intuitive for basic operations
 */
export declare function useCommonActions(): {
    addNode: (node: Parameters<(node: Omit<import('..').Node, "id">) => import('../types').NodeEditorAction>[0]) => void;
    removeNode: (nodeId: Parameters<(nodeId: import('..').NodeId) => import('../types').NodeEditorAction>[0]) => void;
    updateNode: (nodeId: Parameters<(nodeId: import('..').NodeId, updates: Partial<import('..').Node>) => import('../types').NodeEditorAction>[0], updates: Parameters<(nodeId: import('..').NodeId, updates: Partial<import('..').Node>) => import('../types').NodeEditorAction>[1]) => void;
    duplicateNodes: (nodeIds: Parameters<(nodeIds: import('..').NodeId[]) => import('../types').NodeEditorAction>[0]) => void;
    addConnection: (connection: Parameters<(connection: Omit<import('..').Connection, "id">) => import('../types').NodeEditorAction>[0]) => void;
    removeConnection: (connectionId: Parameters<(connectionId: import('..').ConnectionId) => import('../types').NodeEditorAction>[0]) => void;
    selectNode: (nodeId: Parameters<(nodeId: import('..').NodeId, multiple?: boolean) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[0], multiple?: Parameters<(nodeId: import('..').NodeId, multiple?: boolean) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[1]) => void;
    selectAllNodes: (nodeIds: Parameters<(nodeIds: import('..').NodeId[]) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[0]) => void;
    clearSelection: () => void;
    setViewport: (viewport: Parameters<(viewport: import('..').Viewport) => import('../contexts').NodeCanvasAction>[0]) => void;
    panViewport: (delta: Parameters<(delta: {
        x: number;
        y: number;
    }) => import('../contexts').NodeCanvasAction>[0]) => void;
    zoomViewport: (scale: Parameters<(scale: number, center?: {
        x: number;
        y: number;
    }) => import('../contexts').NodeCanvasAction>[0], center?: Parameters<(scale: number, center?: {
        x: number;
        y: number;
    }) => import('../contexts').NodeCanvasAction>[1]) => void;
    resetViewport: () => void;
    showContextMenu: (position: Parameters<(position: {
        x: number;
        y: number;
    }, nodeId?: import('..').NodeId, canvasPosition?: {
        x: number;
        y: number;
    }) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[0], nodeId?: Parameters<(position: {
        x: number;
        y: number;
    }, nodeId?: import('..').NodeId, canvasPosition?: {
        x: number;
        y: number;
    }) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[1], canvasPosition?: Parameters<(position: {
        x: number;
        y: number;
    }, nodeId?: import('..').NodeId, canvasPosition?: {
        x: number;
        y: number;
    }) => import('../contexts/EditorActionStateContext').EditorActionStateAction>[2]) => void;
    hideContextMenu: () => void;
};
