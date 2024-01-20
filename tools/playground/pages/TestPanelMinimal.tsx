import React, { useState, useCallback } from 'react';

// 最小限のタブドラッグテスト
export const TestPanelMinimal: React.FC = () => {
  const [tabs, setTabs] = useState([
    { id: 'tab1', title: 'Tab 1' },
    { id: 'tab2', title: 'Tab 2' },
    { id: 'tab3', title: 'Tab 3' },
  ]);
  const [dragState, setDragState] = useState<{
    dragging: boolean;
    draggedId: string | null;
    dragOverIndex: number | null;
  }>({
    dragging: false,
    draggedId: null,
    dragOverIndex: null,
  });

  const handleDragStart = useCallback((e: React.DragEvent, tabId: string) => {
    console.log('🟢 DRAG START:', tabId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/tab-id', tabId);
    setDragState(prev => ({ ...prev, dragging: true, draggedId: tabId }));
  }, []);

  const handleDragEnd = useCallback(() => {
    console.log('🔴 DRAG END');
    setDragState({ dragging: false, draggedId: null, dragOverIndex: null });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragState(prev => ({ ...prev, dragOverIndex: index }));
    console.log('🟡 DRAG OVER:', index);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const draggedTabId = e.dataTransfer.getData('text/tab-id');
    
    console.log('🟣 DROP:', { draggedTabId, dropIndex, currentDragState: dragState });
    
    if (draggedTabId && dragState.dragging) {
      setTabs(prevTabs => {
        const draggedIndex = prevTabs.findIndex(tab => tab.id === draggedTabId);
        if (draggedIndex === -1) return prevTabs;
        
        const newTabs = [...prevTabs];
        const [draggedTab] = newTabs.splice(draggedIndex, 1);
        newTabs.splice(dropIndex, 0, draggedTab);
        
        console.log('✅ REORDER SUCCESS:', {
          from: draggedIndex,
          to: dropIndex,
          newOrder: newTabs.map(t => t.id)
        });
        
        return newTabs;
      });
    } else {
      console.log('❌ DROP FAILED:', { 
        hasDraggedTabId: !!draggedTabId, 
        isDragging: dragState.dragging 
      });
    }
    
    setDragState(prev => ({ ...prev, dragOverIndex: null }));
  }, [dragState]);

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'monospace',
      background: '#f5f5f5'
    }}>
      <h2>Minimal Tab Drag Test</h2>
      <p>Current state: {JSON.stringify(dragState)}</p>
      
      <div style={{ 
        display: 'flex', 
        gap: '2px', 
        padding: '10px',
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}>
        {tabs.map((tab, index) => {
          const isDragging = dragState.draggedId === tab.id;
          const isDragOver = dragState.dragOverIndex === index;
          
          return (
            <div
              key={tab.id}
              draggable
              onDragStart={(e) => handleDragStart(e, tab.id)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              style={{
                padding: '8px 16px',
                background: isDragging ? '#ffeb3b' : isDragOver ? '#e3f2fd' : '#efefef',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                opacity: isDragging ? 0.5 : 1,
                transform: isDragOver ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.title}
            </div>
          );
        })}
        
        {/* End drop zone */}
        <div
          onDragOver={(e) => handleDragOver(e, tabs.length)}
          onDrop={(e) => handleDrop(e, tabs.length)}
          style={{
            width: dragState.dragOverIndex === tabs.length ? '20px' : '10px',
            height: '100%',
            background: dragState.dragOverIndex === tabs.length ? '#e3f2fd' : 'transparent',
            border: dragState.dragOverIndex === tabs.length ? '2px dashed #2196f3' : 'none',
            transition: 'all 0.2s ease'
          }}
        />
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '12px' }}>
        <h3>Debug Info:</h3>
        <p>Tabs order: {tabs.map(t => t.id).join(' → ')}</p>
        <p>Drag state: {JSON.stringify(dragState, null, 2)}</p>
      </div>
    </div>
  );
};

export default TestPanelMinimal;