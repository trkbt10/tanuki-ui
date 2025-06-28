/**
 * Hook that provides pre-bound action creators for the Editor Action State
 * No need to call dispatch manually - actions are automatically dispatched
 */
export declare function useActionStateActions(): {
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
/**
 * Hook that provides both state and pre-bound actions for the Editor Action State
 * Convenient alternative to useEditorActionState when you need both state and actions
 */
export declare function useActionState(): {
    state: import('../contexts/EditorActionStateContext').EditorActionState;
    actions: {
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
