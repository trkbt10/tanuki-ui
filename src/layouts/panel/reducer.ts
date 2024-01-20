import {
  PanelState,
  PanelNode,
  SplitNode,
  LeafNode,
  TabMeta,
  PanelID,
  TabID,
  Orientation,
  DragState,
} from './types';
import { PanelAction, PanelActionType } from './actions';

interface ReducerState {
  panelState: PanelState;
  dragState: DragState;
}

const generateId = (): string => Math.random().toString(36).substr(2, 9);

// Helper functions for tree manipulation
const findNode = (root: PanelNode, nodeId: PanelID): PanelNode | null => {
  if (root.id === nodeId) return root;
  if (root.type === 'split') {
    for (const child of root.children) {
      const found = findNode(child, nodeId);
      if (found) return found;
    }
  }
  return null;
};

const findParent = (
  root: PanelNode,
  nodeId: PanelID
): { parent: SplitNode; index: number } | null => {
  if (root.type === 'split') {
    const index = root.children.findIndex((child) => child.id === nodeId);
    if (index !== -1) {
      return { parent: root, index };
    }
    for (const child of root.children) {
      const found = findParent(child, nodeId);
      if (found) return found;
    }
  }
  return null;
};

const removeNode = (root: PanelNode, nodeId: PanelID): PanelNode | null => {
  if (root.id === nodeId) return null;
  
  if (root.type === 'split') {
    const newChildren = root.children
      .map((child) => removeNode(child, nodeId))
      .filter((child): child is PanelNode => child !== null);
    
    return { ...root, children: newChildren };
  }
  
  return root;
};

const pruneEmptyNodes = (root: PanelNode): PanelNode | null => {
  if (root.type === 'leaf') {
    return root.tabs.length > 0 ? root : null;
  }
  
  // Recursively prune children
  const prunedChildren = root.children
    .map((child) => pruneEmptyNodes(child))
    .filter((child): child is PanelNode => child !== null);
  
  // If no children left, remove this split
  if (prunedChildren.length === 0) {
    return null;
  }
  
  // If only one child, promote it (collapse unnecessary split)
  if (prunedChildren.length === 1) {
    return prunedChildren[0];
  }
  
  // Recalculate sizes for remaining children
  const newSizes = prunedChildren.map(() => 1 / prunedChildren.length);
  
  return {
    ...root,
    children: prunedChildren,
    sizes: newSizes,
  };
};

const activateTab = (state: PanelState, leafId: PanelID, tabId: TabID): PanelState => {
  const updateNode = (node: PanelNode): PanelNode => {
    if (node.id === leafId && node.type === 'leaf') {
      return { ...node, activeTabId: tabId };
    }
    if (node.type === 'split') {
      return { ...node, children: node.children.map(updateNode) };
    }
    return node;
  };

  return {
    ...state,
    root: updateNode(state.root),
    focusedLeafId: leafId,
  };
};

const closeTab = (state: PanelState, leafId: PanelID, tabId: TabID): PanelState => {
  const leaf = findNode(state.root, leafId) as LeafNode | null;
  if (!leaf || leaf.type !== 'leaf') return state;

  const tabIndex = leaf.tabs.findIndex((tab) => tab.id === tabId);
  if (tabIndex === -1) return state;

  const closedTab = leaf.tabs[tabIndex];
  const newTabs = leaf.tabs.filter((tab) => tab.id !== tabId);
  
  // Add to recently closed tabs
  const recentlyClosedTabs = [...(state.recentlyClosedTabs || []), closedTab];
  
  // Determine new active tab
  let newActiveTabId = leaf.activeTabId;
  if (leaf.activeTabId === tabId) {
    // Select right tab first, then left tab
    if (tabIndex < newTabs.length) {
      newActiveTabId = newTabs[tabIndex].id;
    } else if (newTabs.length > 0) {
      newActiveTabId = newTabs[newTabs.length - 1].id;
    } else {
      newActiveTabId = '';
    }
  }

  const updateNode = (node: PanelNode): PanelNode => {
    if (node.id === leafId && node.type === 'leaf') {
      return { ...node, tabs: newTabs, activeTabId: newActiveTabId };
    }
    if (node.type === 'split') {
      return { ...node, children: node.children.map(updateNode) };
    }
    return node;
  };

  const newRoot = updateNode(state.root);
  const prunedRoot = pruneEmptyNodes(newRoot);

  return {
    ...state,
    root: prunedRoot || createDefaultLeafNode(),
    recentlyClosedTabs: recentlyClosedTabs.slice(-10), // Keep last 10 closed tabs
  };
};

const createTab = (state: PanelState, leafId: PanelID, tab: TabMeta): PanelState => {
  const updateNode = (node: PanelNode): PanelNode => {
    if (node.id === leafId && node.type === 'leaf') {
      return {
        ...node,
        tabs: [...node.tabs, tab],
        activeTabId: tab.id,
      };
    }
    if (node.type === 'split') {
      return { ...node, children: node.children.map(updateNode) };
    }
    return node;
  };

  return {
    ...state,
    root: updateNode(state.root),
    focusedLeafId: leafId,
  };
};

const moveTab = (
  state: PanelState,
  sourceLeafId: PanelID,
  targetLeafId: PanelID,
  tabId: TabID,
  targetIndex?: number
): PanelState => {
  const sourceLeaf = findNode(state.root, sourceLeafId) as LeafNode | null;
  const targetLeaf = findNode(state.root, targetLeafId) as LeafNode | null;
  
  if (!sourceLeaf || !targetLeaf || sourceLeaf.type !== 'leaf' || targetLeaf.type !== 'leaf') {
    return state;
  }

  const tab = sourceLeaf.tabs.find((t) => t.id === tabId);
  if (!tab) return state;

  // Remove from source
  const sourceTabs = sourceLeaf.tabs.filter((t) => t.id !== tabId);
  let sourceActiveTabId = sourceLeaf.activeTabId;
  
  if (sourceLeaf.activeTabId === tabId && sourceTabs.length > 0) {
    const tabIndex = sourceLeaf.tabs.findIndex((t) => t.id === tabId);
    if (tabIndex < sourceTabs.length) {
      sourceActiveTabId = sourceTabs[tabIndex].id;
    } else {
      sourceActiveTabId = sourceTabs[sourceTabs.length - 1].id;
    }
  }

  // Add to target
  const insertIndex = targetIndex ?? targetLeaf.tabs.length;
  const clampedInsertIndex = Math.max(0, Math.min(insertIndex, targetLeaf.tabs.length));
  const targetTabs = [...targetLeaf.tabs];
  targetTabs.splice(clampedInsertIndex, 0, tab);
  
  console.log('🚚 Move Tab:', { 
    tabId, 
    sourceLeafId, 
    targetLeafId, 
    requestedIndex: targetIndex,
    insertIndex,
    clampedInsertIndex,
    targetTabsLength: targetLeaf.tabs.length,
    newTargetTabsLength: targetTabs.length
  });

  const updateNode = (node: PanelNode): PanelNode => {
    if (node.id === sourceLeafId && node.type === 'leaf') {
      return { ...node, tabs: sourceTabs, activeTabId: sourceActiveTabId };
    }
    if (node.id === targetLeafId && node.type === 'leaf') {
      return { ...node, tabs: targetTabs, activeTabId: tab.id };
    }
    if (node.type === 'split') {
      return { ...node, children: node.children.map(updateNode) };
    }
    return node;
  };

  const newRoot = updateNode(state.root);
  const prunedRoot = pruneEmptyNodes(newRoot);

  return {
    ...state,
    root: prunedRoot || createDefaultLeafNode(),
    focusedLeafId: targetLeafId,
  };
};

const splitPanel = (
  state: PanelState,
  leafId: PanelID,
  orientation: Orientation,
  ratio: number = 0.5
): PanelState => {
  const leaf = findNode(state.root, leafId);
  if (!leaf || leaf.type !== 'leaf') return state;

  const newLeafId = generateId();
  const newLeaf: LeafNode = {
    id: newLeafId,
    type: 'leaf',
    tabs: [],
    activeTabId: '',
  };

  const newSplit: SplitNode = {
    id: generateId(),
    type: 'split',
    orientation,
    children: [leaf, newLeaf],
    sizes: [ratio, 1 - ratio],
  };

  const replaceNode = (node: PanelNode): PanelNode => {
    if (node.id === leafId) {
      return newSplit;
    }
    if (node.type === 'split') {
      return { ...node, children: node.children.map(replaceNode) };
    }
    return node;
  };

  // If splitting the root leaf, replace it with the new split
  if (state.root.id === leafId) {
    return { ...state, root: newSplit };
  }

  return { ...state, root: replaceNode(state.root) };
};

const resizePanel = (state: PanelState, panelId: PanelID, sizes: number[]): PanelState => {
  const updateNode = (node: PanelNode): PanelNode => {
    if (node.id === panelId && node.type === 'split') {
      return { ...node, sizes };
    }
    if (node.type === 'split') {
      return { ...node, children: node.children.map(updateNode) };
    }
    return node;
  };

  return { ...state, root: updateNode(state.root) };
};

const reorderTab = (state: PanelState, leafId: PanelID, tabId: TabID, newIndex: number): PanelState => {
  const updateNode = (node: PanelNode): PanelNode => {
    if (node.id === leafId && node.type === 'leaf') {
      const tabIndex = node.tabs.findIndex((tab) => tab.id === tabId);
      if (tabIndex === -1) return node;
      
      // Simple reorder logic
      const newTabs = [...node.tabs];
      const [movedTab] = newTabs.splice(tabIndex, 1);
      
      // Insert at new position, clamp to valid range  
      const insertIndex = Math.max(0, Math.min(newIndex, newTabs.length));
      newTabs.splice(insertIndex, 0, movedTab);
      
      console.log('🔄 REORDER:', { 
        tabId, 
        from: tabIndex, 
        to: insertIndex,
        originalTabs: node.tabs.map(t => t.id),
        newTabs: newTabs.map(t => t.id)
      });
      
      return { ...node, tabs: newTabs };
    }
    if (node.type === 'split') {
      return { ...node, children: node.children.map(updateNode) };
    }
    return node;
  };

  return { ...state, root: updateNode(state.root) };
};

const restoreTab = (state: PanelState): PanelState => {
  if (!state.recentlyClosedTabs || state.recentlyClosedTabs.length === 0) {
    return state;
  }

  const tabToRestore = state.recentlyClosedTabs[state.recentlyClosedTabs.length - 1];
  const newRecentlyClosedTabs = state.recentlyClosedTabs.slice(0, -1);
  
  // Add to focused leaf or create new leaf if none focused
  const focusedLeafId = state.focusedLeafId || findFirstLeafId(state.root);
  
  if (focusedLeafId) {
    return createTab(
      { ...state, recentlyClosedTabs: newRecentlyClosedTabs },
      focusedLeafId,
      tabToRestore
    );
  }

  return state;
};

const findFirstLeafId = (node: PanelNode): string | null => {
  if (node.type === 'leaf') return node.id;
  if (node.type === 'split') {
    for (const child of node.children) {
      const leafId = findFirstLeafId(child);
      if (leafId) return leafId;
    }
  }
  return null;
};

const createDefaultLeafNode = (): LeafNode => ({
  id: generateId(),
  type: 'leaf',
  tabs: [],
  activeTabId: '',
});

export const panelReducer = (state: ReducerState, action: PanelAction): ReducerState => {
  switch (action.type) {
    case PanelActionType.ACTIVATE_TAB:
      return {
        ...state,
        panelState: activateTab(
          state.panelState,
          action.payload.leafId,
          action.payload.tabId
        ),
      };

    case PanelActionType.CLOSE_TAB:
      return {
        ...state,
        panelState: closeTab(
          state.panelState,
          action.payload.leafId,
          action.payload.tabId
        ),
      };

    case PanelActionType.CREATE_TAB:
      return {
        ...state,
        panelState: createTab(
          state.panelState,
          action.payload.leafId,
          action.payload.tab
        ),
      };

    case PanelActionType.MOVE_TAB:
      console.log('📢 REDUCER MOVE_TAB:', action.payload);
      const newStateFromMove = moveTab(
        state.panelState,
        action.payload.sourceLeafId,
        action.payload.targetLeafId,
        action.payload.tabId,
        action.payload.targetIndex
      );
      console.log('📢 REDUCER MOVE_TAB result:', { 
        oldState: state.panelState, 
        newState: newStateFromMove,
        changed: JSON.stringify(state.panelState) !== JSON.stringify(newStateFromMove)
      });
      return {
        ...state,
        panelState: newStateFromMove,
      };

    case PanelActionType.REORDER_TAB:
      console.log('📢 REDUCER REORDER_TAB:', action.payload);
      const newStateFromReorder = reorderTab(
        state.panelState,
        action.payload.leafId,
        action.payload.tabId,
        action.payload.newIndex
      );
      console.log('📢 REDUCER REORDER_TAB result:', { 
        oldState: state.panelState, 
        newState: newStateFromReorder,
        changed: JSON.stringify(state.panelState) !== JSON.stringify(newStateFromReorder)
      });
      return {
        ...state,
        panelState: newStateFromReorder,
      };

    case PanelActionType.SPLIT_PANEL:
      return {
        ...state,
        panelState: splitPanel(
          state.panelState,
          action.payload.leafId,
          action.payload.orientation,
          action.payload.ratio
        ),
      };

    case PanelActionType.CLOSE_PANEL: {
      const newRoot = removeNode(state.panelState.root, action.payload.panelId);
      const prunedRoot = newRoot ? pruneEmptyNodes(newRoot) : null;
      
      return {
        ...state,
        panelState: {
          ...state.panelState,
          root: prunedRoot || createDefaultLeafNode(),
        },
      };
    }

    case PanelActionType.RESIZE_PANEL:
      return {
        ...state,
        panelState: resizePanel(
          state.panelState,
          action.payload.panelId,
          action.payload.sizes
        ),
      };

    case PanelActionType.FOCUS_PANEL:
      return {
        ...state,
        panelState: {
          ...state.panelState,
          focusedLeafId: action.payload.leafId,
        },
      };

    case PanelActionType.START_DRAG:
      return {
        ...state,
        dragState: {
          isDragging: true,
          draggedTabId: action.payload.tabId,
          sourceLeafId: action.payload.sourceLeafId,
        },
      };

    case PanelActionType.SET_DROP_TARGET:
      return {
        ...state,
        dragState: {
          ...state.dragState,
          dropTargetLeafId: action.payload.leafId,
          dropDirection: action.payload.direction,
          insertIndex: action.payload.insertIndex,
        },
      };

    case PanelActionType.END_DRAG:
      return {
        ...state,
        dragState: {
          isDragging: false,
        },
      };

    case PanelActionType.EXECUTE_DROP: {
      const { dragState } = state;
      if (!dragState.isDragging || !dragState.draggedTabId || !dragState.sourceLeafId) {
        return {
          ...state,
          dragState: { isDragging: false },
        };
      }

      let newPanelState = state.panelState;

      // Handle drop logic based on drop target
      if (dragState.dropTargetLeafId && dragState.dropDirection) {
        // Split and move operation
        const orientation = 
          dragState.dropDirection === 'left' || dragState.dropDirection === 'right'
            ? 'horizontal'
            : 'vertical';
        
        // Split the target panel first
        const splitState = splitPanel(
          newPanelState,
          dragState.dropTargetLeafId,
          orientation,
          0.5
        );

        // Find the newly created leaf (it should be the second child in the new split)
        const targetNode = findNode(splitState.root, dragState.dropTargetLeafId);
        if (targetNode) {
          const parentInfo = findParent(splitState.root, dragState.dropTargetLeafId);
          if (parentInfo && parentInfo.parent.type === 'split') {
            const targetIndex = parentInfo.parent.children.findIndex(
              child => child.id === dragState.dropTargetLeafId
            );
            
            let newLeafIndex: number;
            if (dragState.dropDirection === 'right' || dragState.dropDirection === 'bottom') {
              newLeafIndex = targetIndex + 1;
            } else {
              newLeafIndex = targetIndex;
            }
            
            const newLeaf = parentInfo.parent.children[newLeafIndex];
            if (newLeaf && newLeaf.type === 'leaf') {
              // Move the tab to the new leaf
              newPanelState = moveTab(
                splitState,
                dragState.sourceLeafId,
                newLeaf.id,
                dragState.draggedTabId
              );
            }
          }
        }
      } else if (dragState.dropTargetLeafId) {
        // Simple move operation (center drop)
        newPanelState = moveTab(
          newPanelState,
          dragState.sourceLeafId,
          dragState.dropTargetLeafId,
          dragState.draggedTabId,
          dragState.insertIndex
        );
      }

      return {
        ...state,
        panelState: newPanelState,
        dragState: { isDragging: false },
      };
    }

    case PanelActionType.PRUNE_EMPTY_NODES: {
      const prunedRoot = pruneEmptyNodes(state.panelState.root);
      return {
        ...state,
        panelState: {
          ...state.panelState,
          root: prunedRoot || createDefaultLeafNode(),
        },
      };
    }

    case PanelActionType.RESTORE_TAB:
      return {
        ...state,
        panelState: restoreTab(state.panelState),
      };

    case PanelActionType.SET_STATE:
      return {
        ...state,
        panelState: action.payload.state,
      };

    default:
      return state;
  }
};

export const createInitialState = (initialPanelState?: PanelState): ReducerState => {
  const defaultState: PanelState = {
    root: createDefaultLeafNode(),
    pruneEmptyPanel: true,
    recentlyClosedTabs: [],
  };

  return {
    panelState: initialPanelState || defaultState,
    dragState: {
      isDragging: false,
    },
  };
};