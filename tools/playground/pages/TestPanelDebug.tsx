import React, { useState, useCallback, useRef } from 'react';
import { Panel, TabMeta, PanelState, PanelID } from '../../src/extended/panel';

// Simple debug component without custom tab bar to avoid conflicts
export const TestPanelDebug: React.FC = () => {
  const [panelState, setPanelState] = useState<PanelState>({
    root: {
      id: 'root',
      type: 'split',
      orientation: 'horizontal',
      sizes: [0.5, 0.5],
      children: [
        {
          id: 'left',
          type: 'leaf',
          tabs: [
            { id: 'tab1', title: 'File1.tsx', isDirty: false },
            { id: 'tab2', title: 'File2.tsx', isDirty: true },
            { id: 'tab3', title: 'File3.tsx', isDirty: false },
          ],
          activeTabId: 'tab1',
        },
        {
          id: 'right',
          type: 'leaf',
          tabs: [
            { id: 'tab4', title: 'File4.tsx', isDirty: false },
            { id: 'tab5', title: 'File5.tsx', isDirty: true },
          ],
          activeTabId: 'tab4',
        },
      ],
    },
    focusedLeafId: 'left',
    recentlyClosedTabs: [],
  });

  const [debugLog, setDebugLog] = useState<string[]>([]);
  const stateRef = useRef(panelState);
  stateRef.current = panelState;

  const addDebugLog = useCallback((message: string) => {
    console.log(`🐛 ${message}`);
    setDebugLog(prev => [...prev.slice(-15), `${new Date().toLocaleTimeString()}: ${message}`]);
  }, []);

  const handleRequestTabCreate = useCallback((leafId: PanelID): TabMeta | undefined => {
    const newTabId = `tab-${Date.now()}`;
    addDebugLog(`✅ Creating new tab: ${newTabId} in leaf: ${leafId}`);
    return {
      id: newTabId,
      title: `New-${newTabId.slice(-4)}.tsx`,
      isDirty: false,
    };
  }, [addDebugLog]);

  const handleTabClose = useCallback((tabId: string, leafId: PanelID): boolean => {
    addDebugLog(`❌ Closing tab: ${tabId} from leaf: ${leafId}`);
    return true;
  }, [addDebugLog]);

  const handleTabMove = useCallback((
    tabId: string,
    sourceLeafId: PanelID,
    targetLeafId: PanelID,
    targetIndex?: number
  ): boolean => {
    console.log('🎬 EXTERNAL TAB MOVE CALLBACK:', { tabId, sourceLeafId, targetLeafId, targetIndex });
    console.log('🎬 Current panel state before move:', panelState);
    addDebugLog(`🔄 External callback: Moving tab: ${tabId} from ${sourceLeafId} to ${targetLeafId} at index ${targetIndex}`);
    return true;
  }, [addDebugLog, panelState]);

  const handlePanelSplit = useCallback((
    leafId: PanelID,
    orientation: 'horizontal' | 'vertical',
    ratio?: number
  ): boolean => {
    addDebugLog(`🔀 Splitting panel: ${leafId} ${orientation} with ratio ${ratio}`);
    return true;
  }, [addDebugLog]);

  const renderTabContent = useCallback((tab: TabMeta) => {
    return (
      <div style={{ 
        padding: '20px', 
        height: '100%', 
        overflow: 'auto',
        backgroundColor: '#fafafa',
        fontFamily: 'monospace',
        fontSize: '14px'
      }}>
        <h2 style={{ margin: '0 0 16px 0', color: '#333' }}>{tab.title}</h2>
        <div style={{ marginBottom: '16px' }}>
          <strong>Tab ID:</strong> {tab.id}
          {tab.isDirty && <span style={{ color: 'orange', marginLeft: '8px' }}>● Unsaved</span>}
        </div>
        
        <div style={{ 
          background: '#fff', 
          border: '1px solid #ddd', 
          borderRadius: '4px', 
          padding: '16px',
          marginBottom: '16px'
        }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#555' }}>Drag Test Instructions:</h3>
          <ol style={{ margin: 0, paddingLeft: '20px' }}>
            <li>Try dragging this tab to the other panel</li>
            <li>Try dragging to the edges to split panels</li>
            <li>Watch the debug log for events</li>
            <li>Look for drop zones (blue dashed areas)</li>
          </ol>
        </div>

        <div style={{ 
          background: '#f0f0f0', 
          border: '1px solid #ccc', 
          borderRadius: '4px', 
          padding: '12px' 
        }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Sample Code Content:</h4>
          <pre style={{ 
            margin: 0, 
            fontSize: '12px', 
            lineHeight: 1.4,
            whiteSpace: 'pre-wrap' 
          }}>
{`import React from 'react';

export const ${tab.title.replace('.tsx', '')} = () => {
  return (
    <div>
      <h1>Hello from ${tab.title}</h1>
      <p>This is sample content for testing.</p>
    </div>
  );
};`}
          </pre>
        </div>
      </div>
    );
  }, []);

  const clearLog = useCallback(() => {
    setDebugLog([]);
  }, []);

  const addTestTab = useCallback(() => {
    const newTab = handleRequestTabCreate('left');
    if (newTab) {
      setPanelState(prev => ({
        ...prev,
        root: {
          ...prev.root,
          children: prev.root.type === 'split' ? prev.root.children.map(child => 
            child.id === 'left' && child.type === 'leaf' 
              ? { ...child, tabs: [...child.tabs, newTab], activeTabId: newTab.id }
              : child
          ) : []
        } as any
      }));
    }
  }, [handleRequestTabCreate]);

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
    }}>
      {/* Debug Controls */}
      <div style={{ 
        padding: '12px', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white',
        borderBottom: '2px solid #5a67d8'
      }}>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>
          🔧 Panel System Debug Tool
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            onClick={clearLog} 
            style={{ 
              padding: '6px 12px', 
              fontSize: '12px',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🗑️ Clear Log
          </button>
          <button 
            onClick={addTestTab} 
            style={{ 
              padding: '6px 12px', 
              fontSize: '12px',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ➕ Add Test Tab
          </button>
          <span style={{ fontSize: '12px', opacity: 0.9 }}>
            Drag tabs between panels • Watch for blue drop zones • Check console for detailed logs
          </span>
        </div>
      </div>

      {/* Main Panel Area */}
      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Panel
            value={panelState}
            onChange={(newState) => {
              const oldState = stateRef.current;
              const isActualChange = JSON.stringify(oldState) !== JSON.stringify(newState);
              
              console.log('🔄 Panel onChange called:', { 
                oldState, 
                newState,
                isActualChange
              });
              
              if (isActualChange) {
                addDebugLog(`📝 Panel state changed: ${newState.root.type === 'split' ? newState.root.children.length : 1} panels`);
                setPanelState(newState);
              } else {
                console.log('⚠️ onChange called but no actual state change detected');
              }
            }}
            onRequestTabCreate={handleRequestTabCreate}
            onTabClose={handleTabClose}
            onTabMove={handleTabMove}
            onPanelSplit={handlePanelSplit}
            options={{
              enableTabDrag: true,
              enablePanelSplit: true,
              showCloseButton: true,
              maxTabWidth: 200,
              minTabWidth: 80,
            }}
          >
            {renderTabContent}
          </Panel>
        </div>

        {/* Debug Log Panel */}
        <div style={{ 
          width: '320px', 
          background: '#1a1a1a', 
          color: '#e0e0e0', 
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '2px solid #333'
        }}>
          <div style={{ 
            padding: '12px', 
            borderBottom: '1px solid #333',
            background: '#2d2d2d'
          }}>
            <h3 style={{ 
              margin: '0', 
              fontSize: '14px', 
              color: '#4fc3f7',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              📊 Debug Log
              <span style={{ 
                fontSize: '11px', 
                color: '#888',
                background: '#333',
                padding: '2px 6px',
                borderRadius: '10px'
              }}>
                {debugLog.length}
              </span>
            </h3>
          </div>
          <div style={{ 
            flex: 1,
            padding: '8px',
            fontSize: '11px',
            overflow: 'auto',
            lineHeight: 1.4
          }}>
            {debugLog.length === 0 ? (
              <div style={{ 
                color: '#666', 
                fontStyle: 'italic',
                textAlign: 'center',
                marginTop: '20px'
              }}>
                No events logged yet...<br />
                Start dragging tabs to see activity!
              </div>
            ) : (
              debugLog.map((log, index) => (
                <div 
                  key={index} 
                  style={{ 
                    marginBottom: '4px', 
                    padding: '4px 6px',
                    background: index === debugLog.length - 1 ? '#333' : 'transparent',
                    borderRadius: '3px',
                    borderLeft: '2px solid #4fc3f7',
                    paddingLeft: '8px'
                  }}
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPanelDebug;