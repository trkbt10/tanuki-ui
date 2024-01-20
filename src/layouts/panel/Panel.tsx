import React, { useRef, useEffect, useState, useCallback } from 'react';
import { PanelProvider, usePanelContext, useDragState, usePanelActions } from './context';
import {
  PanelProps,
  PanelNode,
  SplitNode,
  LeafNode,
  TabMeta,
  PanelID,
  TabID,
  SplitDirection,
  Orientation,
} from './types';
import styles from './Panel.module.css';

// Main Panel component
export const Panel: React.FC<PanelProps> = ({
  value,
  defaultValue,
  onChange,
  style,
  className,
  children,
  onRequestTabCreate,
  onTabClose,
  onTabMove,
  onPanelSplit,
  onPanelClose,
  renderTabBar,
  renderSplitter,
  renderDropZone,
  options,
}) => {
  return (
    <PanelProvider
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
    >
      <div className={`${styles.panel} ${className || ''}`} style={style}>
        <PanelRenderer
          children={children}
          onRequestTabCreate={onRequestTabCreate}
          onTabClose={onTabClose}
          onTabMove={onTabMove}
          onPanelSplit={onPanelSplit}
          onPanelClose={onPanelClose}
          renderTabBar={renderTabBar}
          renderSplitter={renderSplitter}
          renderDropZone={renderDropZone}
        />
      </div>
    </PanelProvider>
  );
};

// Internal renderer component
interface PanelRendererProps {
  children: (tab: TabMeta) => React.JSX.Element;
  onRequestTabCreate?: (leafId: PanelID) => TabMeta | undefined;
  onTabClose?: (tabId: TabID, leafId: PanelID) => boolean | void;
  onTabMove?: (
    tabId: TabID,
    sourceLeafId: PanelID,
    targetLeafId: PanelID,
    targetIndex?: number
  ) => boolean | void;
  onPanelSplit?: (
    leafId: PanelID,
    orientation: Orientation,
    ratio?: number
  ) => boolean | void;
  onPanelClose?: (panelId: PanelID) => boolean | void;
  renderTabBar?: (props: any) => React.JSX.Element;
  renderSplitter?: (props: any) => React.JSX.Element;
  renderDropZone?: (props: any) => React.JSX.Element;
}

const PanelRenderer: React.FC<PanelRendererProps> = (props) => {
  const { state } = usePanelContext();
  const dragState = useDragState();
  
  return (
    <div className={`${styles.panelContainer} ${dragState.isDragging ? styles.dragActive : ''}`}>
      <NodeRenderer node={state.root} {...props} />
    </div>
  );
};

// Node renderer (recursive)
interface NodeRendererProps extends PanelRendererProps {
  node: PanelNode;
}

const NodeRenderer: React.FC<NodeRendererProps> = React.memo(({ node, ...props }) => {
  if (node.type === 'split') {
    return <SplitNodeRenderer node={node} {...props} />;
  } else {
    return <LeafNodeRenderer node={node} {...props} />;
  }
});

// Split node renderer
interface SplitNodeRendererProps extends PanelRendererProps {
  node: SplitNode;
}

const SplitNodeRenderer: React.FC<SplitNodeRendererProps> = React.memo(({
  node,
  renderSplitter,
  ...props
}) => {
  const actions = usePanelActions();
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSplitterResize = useCallback(
    (index: number, delta: number) => {
      if (!containerRef.current) return;

      const containerSize =
        node.orientation === 'horizontal'
          ? containerRef.current.offsetWidth
          : containerRef.current.offsetHeight;

      const newSizes = [...node.sizes];
      const totalSize = newSizes.reduce((sum, size) => sum + size, 0);
      
      // Convert to pixel values
      const pixelSizes = newSizes.map((size) => (size / totalSize) * containerSize);
      
      // Apply delta
      pixelSizes[index] += delta;
      pixelSizes[index + 1] -= delta;
      
      // Ensure minimum sizes
      const minSize = 50; // Minimum panel size in pixels
      if (pixelSizes[index] < minSize) {
        const diff = minSize - pixelSizes[index];
        pixelSizes[index] = minSize;
        pixelSizes[index + 1] -= diff;
      }
      if (pixelSizes[index + 1] < minSize) {
        const diff = minSize - pixelSizes[index + 1];
        pixelSizes[index + 1] = minSize;
        pixelSizes[index] -= diff;
      }

      // Convert back to ratios
      const totalPixels = pixelSizes.reduce((sum, size) => sum + size, 0);
      const finalSizes = pixelSizes.map((size) => size / totalPixels);
      
      actions.resizePanel(node.id, finalSizes);
    },
    [node.id, node.orientation, node.sizes, actions]
  );

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: node.orientation === 'horizontal' ? 'row' : 'column',
    width: '100%',
    height: '100%',
  };

  return (
    <div ref={containerRef} className={styles.splitContainer} style={containerStyle}>
      {node.children.map((child, index) => (
        <React.Fragment key={child.id}>
          <div
            className={styles.panelChild}
            style={{
              flex: node.sizes[index] || 1,
              minWidth: node.orientation === 'horizontal' ? '50px' : undefined,
              minHeight: node.orientation === 'vertical' ? '50px' : undefined,
            }}
          >
            <NodeRenderer node={child} {...props} />
          </div>
          
          {index < node.children.length - 1 && (
            <Splitter
              orientation={node.orientation}
              onResize={(delta) => handleSplitterResize(index, delta)}
              onResizeStart={() => setIsResizing(true)}
              onResizeEnd={() => setIsResizing(false)}
              isResizing={isResizing}
              renderSplitter={renderSplitter}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
});

// Leaf node renderer
interface LeafNodeRendererProps extends PanelRendererProps {
  node: LeafNode;
}

const LeafNodeRenderer: React.FC<LeafNodeRendererProps> = React.memo(({
  node,
  children,
  onRequestTabCreate,
  onTabClose,
  onTabMove,
  renderTabBar,
  ...props
}) => {
  const actions = usePanelActions();
  const dragState = useDragState();

  const activeTab = node.tabs.find((tab) => tab.id === node.activeTabId);

  const handleTabClick = useCallback(
    (tabId: TabID) => {
      actions.activateTab(node.id, tabId);
    },
    [actions, node.id]
  );

  const handleTabClose = useCallback(
    (tabId: TabID) => {
      const shouldClose = onTabClose ? onTabClose(tabId, node.id) : true;
      if (shouldClose !== false) {
        actions.closeTab(node.id, tabId);
      }
    },
    [actions, node.id, onTabClose]
  );

  const handleNewTab = useCallback(() => {
    if (onRequestTabCreate) {
      const newTab = onRequestTabCreate(node.id);
      if (newTab) {
        actions.createTab(node.id, newTab);
      }
    }
  }, [actions, node.id, onRequestTabCreate]);

  const handleTabDragStart = useCallback(
    (tabId: TabID, event: React.DragEvent) => {
      console.log('🚀 Tab Drag Start:', { tabId, leafId: node.id });
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/tab-id', tabId);
      actions.startDrag(tabId, node.id);
    },
    [actions, node.id]
  );

  const handleTabDragEnd = useCallback(() => {
    console.log('🏁 Tab Drag End - Scheduling cleanup');
    // Use longer delay to ensure all drop handlers complete
    setTimeout(() => {
      console.log('🧹 Executing endDrag cleanup');
      actions.endDrag();
    }, 200);
  }, [actions]);

  const handleTabDrop = useCallback(
    (draggedTabId: TabID, index: number) => {
      console.log('📍 LEAF DROP:', { 
        draggedTabId, 
        index, 
        sourceLeaf: dragState.sourceLeafId, 
        targetLeaf: node.id,
        currentDragState: dragState
      });

      // Minimal validation - just check we have the essential data
      if (!draggedTabId || !dragState.sourceLeafId) {
        console.log('❌ Missing essential data:', { draggedTabId, sourceLeafId: dragState.sourceLeafId });
        return;
      }

      console.log('✅ Proceeding with drop execution');

      if (dragState.sourceLeafId === node.id) {
        // Same panel: reorder
        console.log('🔄 REORDER in same panel');
        actions.reorderTab(node.id, draggedTabId, index);
      } else {
        // Different panel: move
        console.log('🚚 MOVE to different panel');
        const shouldMove = onTabMove ? onTabMove(draggedTabId, dragState.sourceLeafId, node.id, index) : true;
        if (shouldMove !== false) {
          actions.moveTab(dragState.sourceLeafId, node.id, draggedTabId, index);
        }
      }
    },
    [actions, node.id, dragState, onTabMove]
  );

  const isDropTarget = dragState.dropTargetLeafId === node.id;

  return (
    <div className={`${styles.leafContainer} ${isDropTarget ? styles.dropTarget : ''} ${dragState.isDragging ? styles.dragging : ''}`}>
      <DropZoneLayer leafId={node.id} />
      
      {renderTabBar ? (
        renderTabBar({
          leafId: node.id,
          tabs: node.tabs,
          activeTabId: node.activeTabId,
          onTabClick: handleTabClick,
          onTabClose: handleTabClose,
          onTabDragStart: handleTabDragStart,
          onTabDragEnd: handleTabDragEnd,
          onTabDrop: handleTabDrop,
          onNewTab: handleNewTab,
          isDropTarget,
        })
      ) : (
        <DefaultTabBar
          leafId={node.id}
          tabs={node.tabs}
          activeTabId={node.activeTabId}
          onTabClick={handleTabClick}
          onTabClose={handleTabClose}
          onTabDragStart={handleTabDragStart}
          onTabDragEnd={handleTabDragEnd}
          onTabDrop={handleTabDrop}
          onNewTab={handleNewTab}
          isDropTarget={isDropTarget}
        />
      )}
      
      <div className={styles.tabContent}>
        {activeTab && children(activeTab)}
      </div>
    </div>
  );
});

// Default tab bar implementation
interface DefaultTabBarProps {
  leafId: PanelID;
  tabs: TabMeta[];
  activeTabId: TabID;
  onTabClick: (tabId: TabID) => void;
  onTabClose: (tabId: TabID) => void;
  onTabDragStart: (tabId: TabID, event: React.DragEvent) => void;
  onTabDragEnd: () => void;
  onTabDrop: (tabId: TabID, index: number) => void;
  onNewTab: () => void;
  isDropTarget: boolean;
}

const DefaultTabBar: React.FC<DefaultTabBarProps> = React.memo(({
  tabs,
  activeTabId,
  onTabClick,
  onTabClose,
  onTabDragStart,
  onTabDragEnd,
  onTabDrop,
  onNewTab,
  isDropTarget,
}) => {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragState = useDragState();

  const handleTabDragStart = useCallback((e: React.DragEvent, tabId: string) => {
    console.log('🎯 START Drag:', { tabId });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/tab-id', tabId);
    onTabDragStart(tabId, e);
  }, [onTabDragStart]);

  const handleTabDragEnd = useCallback(() => {
    console.log('🏁 DefaultTabBar END Drag - clearing UI state only');
    setDragOverIndex(null);
    // Don't call onTabDragEnd immediately - let drop events complete first
    setTimeout(() => {
      console.log('🏁 DefaultTabBar calling onTabDragEnd');
      onTabDragEnd();
    }, 50);
  }, [onTabDragEnd]);

  // Simplified drag over - just track which position we're over
  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
    console.log('🎯 OVER:', index);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  // Simplified drop handler - execute immediately without waiting for drag state
  const handleDrop = useCallback((e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    const draggedTabId = e.dataTransfer.getData('text/tab-id');
    
    console.log('💧 TabBar DROP:', { draggedTabId, dropIndex, isDragging: dragState.isDragging });
    
    // Execute drop immediately if we have a valid tab ID
    if (draggedTabId) {
      console.log('🚀 Executing tab drop immediately');
      onTabDrop(draggedTabId, dropIndex);
    } else {
      console.log('❌ No dragged tab ID found');
    }
    
    setDragOverIndex(null);
  }, [onTabDrop, dragState.isDragging]);

  return (
    <div className={`${styles.tabBar} ${isDropTarget ? styles.dropTarget : ''}`}>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => {
          const isDragging = dragState.isDragging && dragState.draggedTabId === tab.id;
          const isDragOver = dragOverIndex === index;
          
          return (
            <div
              key={tab.id}
              className={`${styles.tab} ${
                tab.id === activeTabId ? styles.activeTab : ''
              } ${isDragging ? styles.tabDragging : ''} ${
                isDragOver ? styles.tabDragOver : ''
              }`}
              draggable={true}
              onDragStart={(e) => handleTabDragStart(e, tab.id)}
              onDragEnd={handleTabDragEnd}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onClick={() => onTabClick(tab.id)}
            >
              <span className={styles.tabTitle}>{tab.title}</span>
              {tab.isClosable !== false && (
                <button
                  className={styles.tabCloseButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTabClose(tab.id);
                  }}
                >
                  ×
                </button>
              )}
            </div>
          );
        })}
        
        {/* Drop zone at the end for appending tabs */}
        <div
          className={`${styles.tabDropZone} ${
            dragOverIndex === tabs.length ? styles.tabDragOver : ''
          }`}
          onDragOver={(e) => handleDragOver(e, tabs.length)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, tabs.length)}
        />
      </div>
      
      <button className={styles.newTabButton} onClick={onNewTab}>
        +
      </button>
    </div>
  );
});

// Splitter component
interface SplitterProps {
  orientation: Orientation;
  onResize: (delta: number) => void;
  onResizeStart: () => void;
  onResizeEnd: () => void;
  isResizing: boolean;
  renderSplitter?: (props: any) => React.JSX.Element;
}

const Splitter: React.FC<SplitterProps> = React.memo(({
  orientation,
  onResize,
  onResizeStart,
  onResizeEnd,
  isResizing,
  renderSplitter,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      setIsDragging(true);
      setStartPos({ x: event.clientX, y: event.clientY });
      onResizeStart();
      
      const handleMouseMove = (e: MouseEvent) => {
        const delta =
          orientation === 'horizontal'
            ? e.clientX - startPos.x
            : e.clientY - startPos.y;
        onResize(delta);
        setStartPos({ x: e.clientX, y: e.clientY });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        onResizeEnd();
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [orientation, onResize, onResizeStart, onResizeEnd, startPos]
  );

  if (renderSplitter) {
    return renderSplitter({
      orientation,
      onResize,
      onResizeStart,
      onResizeEnd,
      isResizing,
    });
  }

  return (
    <div
      className={`${styles.splitter} ${
        orientation === 'horizontal' ? styles.verticalSplitter : styles.horizontalSplitter
      } ${isDragging ? styles.splitterDragging : ''}`}
      onMouseDown={handleMouseDown}
    />
  );
});

// Drop zone layer for drag and drop
interface DropZoneLayerProps {
  leafId: PanelID;
}

const DropZoneLayer: React.FC<DropZoneLayerProps> = React.memo(({ leafId }) => {
  const dragState = useDragState();
  const actions = usePanelActions();
  const [activeZone, setActiveZone] = useState<SplitDirection | 'center' | null>(null);

  const handleDrop = useCallback(
    (direction?: SplitDirection) => {
      console.log('💧 DropZone Drop:', { leafId, direction, dragState });
      actions.setDropTarget(leafId, direction);
      actions.executeDrop();
      setActiveZone(null);
      // Don't call endDrag here - let the tab drag end handler manage it
    },
    [actions, leafId, dragState]
  );

  const handleDragEnter = useCallback((zone: SplitDirection | 'center') => {
    // Only activate zone if we're NOT dragging to the same panel (tab reordering)
    if (dragState.sourceLeafId !== leafId) {
      console.log('🔥 DropZone activated:', { zone, leafId, sourceLeafId: dragState.sourceLeafId });
      setActiveZone(zone);
    } else {
      console.log('🚫 DropZone ignored (same panel):', { zone, leafId });
    }
  }, [dragState.sourceLeafId, leafId]);

  const handleDragLeave = useCallback(() => {
    setActiveZone(null);
  }, []);

  if (!dragState.isDragging) {
    return null;
  }

  const isSamePanel = dragState.sourceLeafId === leafId;
  
  // Don't render drop zones at all for same-panel operations (tab reordering)
  if (isSamePanel) {
    console.log('🚫 DropZone hidden for same panel operation');
    return null;
  }

  return (
    <div className={styles.dropZoneLayer}>
      {/* Only show split zones when dragging to a different panel */}
      {(
        <>
          <div
            className={`${styles.dropZone} ${styles.dropZoneLeft} ${
              activeZone === 'left' ? styles.active : ''
            }`}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => handleDragEnter('left')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => {
              e.preventDefault();
              const tabId = e.dataTransfer.getData('text/tab-id');
              if (tabId) handleDrop('left');
            }}
          />
          <div
            className={`${styles.dropZone} ${styles.dropZoneRight} ${
              activeZone === 'right' ? styles.active : ''
            }`}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => handleDragEnter('right')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => {
              e.preventDefault();
              const tabId = e.dataTransfer.getData('text/tab-id');
              if (tabId) handleDrop('right');
            }}
          />
          <div
            className={`${styles.dropZone} ${styles.dropZoneTop} ${
              activeZone === 'top' ? styles.active : ''
            }`}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => handleDragEnter('top')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => {
              e.preventDefault();
              const tabId = e.dataTransfer.getData('text/tab-id');
              if (tabId) handleDrop('top');
            }}
          />
          <div
            className={`${styles.dropZone} ${styles.dropZoneBottom} ${
              activeZone === 'bottom' ? styles.active : ''
            }`}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => handleDragEnter('bottom')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => {
              e.preventDefault();
              const tabId = e.dataTransfer.getData('text/tab-id');
              if (tabId) handleDrop('bottom');
            }}
          />
          <div
            className={`${styles.dropZone} ${styles.dropZoneCenter} ${
              activeZone === 'center' ? styles.active : ''
            }`}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => handleDragEnter('center')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => {
              e.preventDefault();
              const tabId = e.dataTransfer.getData('text/tab-id');
              if (tabId) handleDrop();
            }}
          />
        </>
      )}
    </div>
  );
});


export default Panel;