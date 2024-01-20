import React, { useState } from 'react';
import { Panel, TabMeta, PanelState, PanelID } from '../../src/layouts';
import { H1, H2, Button, Input, Textarea } from '../../src';

// Mock file content for different tabs
const mockFiles = {
  'welcome.tsx': `import React from 'react';

export const Welcome = () => {
  return (
    <div className="welcome">
      <h1>Welcome to the Panel System!</h1>
      <p>This is a VSCode-style panel system with:</p>
      <ul>
        <li>Drag & drop tabs between panels</li>
        <li>Split panels horizontally and vertically</li>
        <li>Resizable splitters</li>
        <li>Auto-cleanup of empty panels</li>
      </ul>
    </div>
  );
};`,
  'app.tsx': `import React, { useState } from 'react';
import { Panel } from './layouts/panel';

export const App = () => {
  const [state, setState] = useState(initialState);
  
  return (
    <div className="app">
      <Panel value={state} onChange={setState}>
        {(tab) => <TabContent tab={tab} />}
      </Panel>
    </div>
  );
};`,
  'types.ts': `export interface TabMeta {
  id: string;
  title: string;
  icon?: React.ReactNode;
  tooltip?: string;
  isDirty?: boolean;
  isClosable?: boolean;
  isPinned?: boolean;
  data?: Record<string, any>;
}

export interface PanelState {
  root: PanelNode;
  focusedLeafId?: string;
  recentlyClosedTabs?: TabMeta[];
}`,
  'readme.md': `# Panel System Documentation

## Features
- VSCode-compatible layout
- Drag & drop support
- Dynamic splitting
- Keyboard shortcuts
- Theme support

## Usage
\`\`\`tsx
<Panel value={state} onChange={setState}>
  {(tab) => <Content tab={tab} />}
</Panel>
\`\`\``,
};

export const TestPanel: React.FC = () => {
  const [panelState, setPanelState] = useState<PanelState>({
    root: {
      id: 'root',
      type: 'leaf',
      tabs: [
        {
          id: 'welcome',
          title: 'Welcome.tsx',
          isDirty: false,
          data: { content: mockFiles['welcome.tsx'] },
        },
        {
          id: 'app',
          title: 'App.tsx',
          isDirty: true,
          data: { content: mockFiles['app.tsx'] },
        },
        {
          id: 'types',
          title: 'types.ts',
          isDirty: false,
          data: { content: mockFiles['types.ts'] },
        },
      ],
      activeTabId: 'welcome',
    },
    focusedLeafId: 'root',
    recentlyClosedTabs: [],
  });

  const [fileCounter, setFileCounter] = useState(1);

  const handleRequestTabCreate = (leafId: PanelID): TabMeta | undefined => {
    const newFileId = `file${fileCounter}`;
    setFileCounter(prev => prev + 1);
    
    return {
      id: newFileId,
      title: `NewFile${fileCounter}.tsx`,
      isDirty: false,
      data: { 
        content: `// New file created at ${new Date().toLocaleTimeString()}\n\nconst NewComponent = () => {\n  return <div>Hello from ${newFileId}!</div>;\n};\n\nexport default NewComponent;` 
      },
    };
  };

  const handleTabClose = (tabId: string, leafId: PanelID): boolean => {
    // Allow all tabs to be closed
    return true;
  };

  const handleTabMove = (
    tabId: string,
    sourceLeafId: PanelID,
    targetLeafId: PanelID,
    targetIndex?: number
  ): boolean => {
    // Allow all tab moves
    return true;
  };

  const handlePanelSplit = (
    leafId: PanelID,
    orientation: 'horizontal' | 'vertical',
    ratio?: number
  ): boolean => {
    // Allow all splits
    return true;
  };

  const renderTabContent = (tab: TabMeta) => {
    const content = tab.data?.content || 'No content available';
    
    return (
      <div style={{ 
        padding: '16px', 
        height: '100%', 
        overflow: 'auto',
        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
        fontSize: '13px',
        lineHeight: '1.5',
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '16px',
          paddingBottom: '8px',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <H2 style={{ margin: 0, fontSize: '16px' }}>{tab.title}</H2>
          {tab.isDirty && (
            <span style={{ 
              marginLeft: '8px',
              color: '#ff6b35',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              ● modified
            </span>
          )}
        </div>
        
        <pre style={{ 
          background: '#f8f8f8',
          padding: '16px',
          borderRadius: '4px',
          border: '1px solid #e0e0e0',
          margin: 0,
          whiteSpace: 'pre-wrap',
          overflow: 'auto',
          fontSize: '12px',
        }}>
          {content}
        </pre>
        
        <div style={{ marginTop: '16px', padding: '16px', background: '#f9f9f9', borderRadius: '4px' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '13px' }}>Try these actions:</h4>
          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px' }}>
            <li>Drag this tab to split the panel (drop on edges)</li>
            <li>Drag between existing panels to move tabs</li>
            <li>Use + button to create new tabs</li>
            <li>Try Ctrl+W (Cmd+W) to close tabs</li>
            <li>Resize panels by dragging the splitter</li>
          </ul>
        </div>
      </div>
    );
  };

  const addMarkdownFile = () => {
    const tab: TabMeta = {
      id: `readme-${Date.now()}`,
      title: 'README.md',
      isDirty: false,
      data: { content: mockFiles['readme.md'] },
    };
    
    // Find the focused leaf or first leaf
    const leafId = panelState.focusedLeafId || 'root';
    const newTab = handleRequestTabCreate(leafId);
    if (newTab) {
      // Manually add the markdown tab instead
      setPanelState(prev => ({
        ...prev,
        root: addTabToLeaf(prev.root, leafId, tab),
      }));
    }
  };

  // Helper function to add tab to specific leaf
  const addTabToLeaf = (node: any, leafId: string, tab: TabMeta): any => {
    if (node.type === 'leaf' && node.id === leafId) {
      return {
        ...node,
        tabs: [...node.tabs, tab],
        activeTabId: tab.id,
      };
    }
    if (node.type === 'split') {
      return {
        ...node,
        children: node.children.map((child: any) => addTabToLeaf(child, leafId, tab)),
      };
    }
    return node;
  };

  return (
    <div style={{ padding: '20px' }}>
      <H1>Panel System Test</H1>
      <p>
        A VSCode-style panel system with drag & drop, splitting, and dynamic layout management.
        Try dragging tabs, creating new ones, and splitting panels!
      </p>
      
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button onClick={addMarkdownFile} size="small">
          Add README.md
        </Button>
        <span style={{ fontSize: '12px', color: '#666' }}>
          Current panels: {countPanels(panelState.root)} | 
          Total tabs: {countTabs(panelState.root)}
        </span>
      </div>
      
      <div style={{ 
        width: '100%', 
        height: '600px', 
        border: '1px solid #ccc',
        borderRadius: '4px',
        overflow: 'hidden',
      }}>
        <Panel
          value={panelState}
          onChange={setPanelState}
          onRequestTabCreate={handleRequestTabCreate}
          onTabClose={handleTabClose}
          onTabMove={handleTabMove}
          onPanelSplit={handlePanelSplit}
          options={{
            enableTabDrag: true,
            enablePanelSplit: true,
            enableTabReorder: true,
            showCloseButton: true,
            maxTabWidth: 200,
            minTabWidth: 80,
            minPanelSize: 100,
            splitterSize: 4,
          }}
        >
          {renderTabContent}
        </Panel>
      </div>
      
      <div style={{ marginTop: '16px', fontSize: '12px', color: '#666' }}>
        <h4>Keyboard Shortcuts:</h4>
        <ul style={{ margin: 0, paddingLeft: '16px' }}>
          <li><kbd>Ctrl+W</kbd> / <kbd>Cmd+W</kbd> - Close active tab</li>
          <li><kbd>Ctrl+T</kbd> / <kbd>Cmd+T</kbd> - New tab</li>
          <li><kbd>Ctrl+\</kbd> / <kbd>Cmd+\</kbd> - Split right</li>
          <li><kbd>Ctrl+Tab</kbd> - Next tab</li>
        </ul>
      </div>
    </div>
  );
};

// Helper functions
const countPanels = (node: any): number => {
  if (node.type === 'leaf') return 1;
  return node.children.reduce((sum: number, child: any) => sum + countPanels(child), 0);
};

const countTabs = (node: any): number => {
  if (node.type === 'leaf') return node.tabs.length;
  return node.children.reduce((sum: number, child: any) => sum + countTabs(child), 0);
};