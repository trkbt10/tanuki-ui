import { useEffect, useCallback } from 'react';
import { usePanelState, usePanelActions, usePanelOptions } from '../context';
import { PanelNode, LeafNode } from '../types';

// Helper function to find all leaf nodes
const findAllLeaves = (node: PanelNode): LeafNode[] => {
  if (node.type === 'leaf') {
    return [node];
  }
  return node.children.flatMap(findAllLeaves);
};

// Helper function to find focused leaf
const findFocusedLeaf = (root: PanelNode, focusedLeafId?: string): LeafNode | null => {
  if (!focusedLeafId) return null;
  
  const findNode = (node: PanelNode): LeafNode | null => {
    if (node.type === 'leaf' && node.id === focusedLeafId) {
      return node;
    }
    if (node.type === 'split') {
      for (const child of node.children) {
        const found = findNode(child);
        if (found) return found;
      }
    }
    return null;
  };
  
  return findNode(root);
};

export const useKeyboardShortcuts = () => {
  const state = usePanelState();
  const actions = usePanelActions();
  const options = usePanelOptions();

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!options.enableKeyboardShortcuts) return;

    const isCtrl = event.ctrlKey || event.metaKey;
    const isShift = event.shiftKey;
    const key = event.key;

    // Get focused leaf
    const focusedLeaf = findFocusedLeaf(state.root, state.focusedLeafId);
    if (!focusedLeaf) return;

    // Close tab (Ctrl+W / Cmd+W)
    if (isCtrl && key === 'w' && !isShift) {
      event.preventDefault();
      if (focusedLeaf.activeTabId) {
        actions.closeTab(focusedLeaf.id, focusedLeaf.activeTabId);
      }
      return;
    }

    // New tab (Ctrl+T / Cmd+T)
    if (isCtrl && key === 't' && !isShift) {
      event.preventDefault();
      // This would typically trigger onRequestTabCreate
      // For now, we'll just focus the panel
      actions.focusPanel(focusedLeaf.id);
      return;
    }

    // Split right (Ctrl+\ / Cmd+\)
    if (isCtrl && key === '\\' && !isShift) {
      event.preventDefault();
      actions.splitPanel(focusedLeaf.id, 'horizontal');
      return;
    }

    // Tab navigation (Ctrl+Tab / Ctrl+Shift+Tab)
    if (isCtrl && key === 'Tab') {
      event.preventDefault();
      const currentTabIndex = focusedLeaf.tabs.findIndex(
        tab => tab.id === focusedLeaf.activeTabId
      );
      
      if (currentTabIndex !== -1) {
        let nextIndex: number;
        if (isShift) {
          // Previous tab
          nextIndex = currentTabIndex === 0 
            ? focusedLeaf.tabs.length - 1 
            : currentTabIndex - 1;
        } else {
          // Next tab
          nextIndex = currentTabIndex === focusedLeaf.tabs.length - 1 
            ? 0 
            : currentTabIndex + 1;
        }
        
        const nextTab = focusedLeaf.tabs[nextIndex];
        if (nextTab) {
          actions.activateTab(focusedLeaf.id, nextTab.id);
        }
      }
      return;
    }

    // Tab navigation with arrows (Ctrl+PageUp/PageDown)
    if (isCtrl && (key === 'PageUp' || key === 'PageDown')) {
      event.preventDefault();
      const currentTabIndex = focusedLeaf.tabs.findIndex(
        tab => tab.id === focusedLeaf.activeTabId
      );
      
      if (currentTabIndex !== -1) {
        let nextIndex: number;
        if (key === 'PageUp') {
          // Previous tab
          nextIndex = currentTabIndex === 0 
            ? focusedLeaf.tabs.length - 1 
            : currentTabIndex - 1;
        } else {
          // Next tab
          nextIndex = currentTabIndex === focusedLeaf.tabs.length - 1 
            ? 0 
            : currentTabIndex + 1;
        }
        
        const nextTab = focusedLeaf.tabs[nextIndex];
        if (nextTab) {
          actions.activateTab(focusedLeaf.id, nextTab.id);
        }
      }
      return;
    }

    // Direct tab selection (Ctrl+1-9)
    if (isCtrl && key >= '1' && key <= '9') {
      event.preventDefault();
      const tabIndex = parseInt(key) - 1;
      const tab = focusedLeaf.tabs[tabIndex];
      if (tab) {
        actions.activateTab(focusedLeaf.id, tab.id);
      }
      return;
    }

    // Panel navigation (Ctrl+K combinations)
    if (isCtrl && key === 'k') {
      // This would be handled by the next keydown event
      // For now, we'll mark this as a special state
      return;
    }

    // Restore tab (Ctrl+Shift+T)
    if (isCtrl && isShift && key === 't') {
      event.preventDefault();
      actions.restoreTab();
      return;
    }

    // Move tab to right/left group (Ctrl+Alt+Arrow)
    if (isCtrl && event.altKey && (key === 'ArrowLeft' || key === 'ArrowRight')) {
      event.preventDefault();
      
      if (!focusedLeaf.activeTabId) return;
      
      const allLeaves = findAllLeaves(state.root);
      const currentLeafIndex = allLeaves.findIndex(leaf => leaf.id === focusedLeaf.id);
      
      if (currentLeafIndex !== -1) {
        let targetLeafIndex: number;
        if (key === 'ArrowRight') {
          targetLeafIndex = currentLeafIndex === allLeaves.length - 1 ? 0 : currentLeafIndex + 1;
        } else {
          targetLeafIndex = currentLeafIndex === 0 ? allLeaves.length - 1 : currentLeafIndex - 1;
        }
        
        const targetLeaf = allLeaves[targetLeafIndex];
        if (targetLeaf && targetLeaf.id !== focusedLeaf.id) {
          actions.moveTab(
            focusedLeaf.id,
            targetLeaf.id,
            focusedLeaf.activeTabId
          );
        }
      }
      return;
    }

    // Focus panel groups (Ctrl+1-3)
    if (isCtrl && !isShift && !event.altKey && key >= '1' && key <= '3') {
      event.preventDefault();
      const allLeaves = findAllLeaves(state.root);
      const panelIndex = parseInt(key) - 1;
      const targetPanel = allLeaves[panelIndex];
      
      if (targetPanel) {
        actions.focusPanel(targetPanel.id);
      }
      return;
    }
  }, [state, actions, options.enableKeyboardShortcuts]);

  useEffect(() => {
    if (options.enableKeyboardShortcuts) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
    return; // Explicit return for when keyboard shortcuts are disabled
  }, [handleKeyDown, options.enableKeyboardShortcuts]);
};