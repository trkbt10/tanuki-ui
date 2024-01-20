import React, { useState } from 'react';
import { Panel, TabMeta, PanelState, PanelID } from './index';

// Example usage of the Panel component
export const PanelExample: React.FC = () => {
  const [panelState, setPanelState] = useState<PanelState>({
    root: {
      id: 'root',
      type: 'leaf',
      tabs: [
        {
          id: 'tab1',
          title: 'Welcome.tsx',
          isDirty: false,
        },
        {
          id: 'tab2',
          title: 'App.tsx',
          isDirty: true,
        },
      ],
      activeTabId: 'tab1',
    },
    focusedLeafId: 'root',
    recentlyClosedTabs: [],
  });

  const handleRequestTabCreate = (leafId: PanelID): TabMeta | undefined => {
    const newTabId = `tab-${Date.now()}`;
    return {
      id: newTabId,
      title: `New File ${newTabId.slice(-4)}`,
      isDirty: false,
    };
  };

  const handleTabClose = (tabId: string, leafId: PanelID): boolean => {
    // You can add logic here to prevent closing if there are unsaved changes
    return true;
  };

  const renderTabContent = (tab: TabMeta) => {
    return (
      <div style={{ padding: '16px', height: '100%', overflow: 'auto' }}>
        <h2>{tab.title}</h2>
        <p>Content for {tab.title}</p>
        {tab.isDirty && (
          <p style={{ color: 'orange' }}>This file has unsaved changes.</p>
        )}
        
        <div style={{ marginTop: '20px' }}>
          <h3>Example Content</h3>
          <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px' }}>
{`import React from 'react';

export const ${tab.title.replace('.tsx', '')} = () => {
  return (
    <div>
      <h1>Hello from ${tab.title}</h1>
    </div>
  );
};`}
          </pre>
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: '100%', height: '600px', border: '1px solid #ccc' }}>
      <Panel
        value={panelState}
        onChange={setPanelState}
        onRequestTabCreate={handleRequestTabCreate}
        onTabClose={handleTabClose}
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
  );
};

export default PanelExample;