import React from 'react';
import { SwipeNavigation } from '../../../../../src/layouts/SwipeNavigation';

const DynamicSizingDemo: React.FC = () => {
  const menuStyles: React.CSSProperties = {
    padding: '20px',
    height: '100%',
    background: '#f5f5f5',
    boxSizing: 'border-box',
    overflowY: 'auto',
  };

  const createViewStyles = (minWidth: string): React.CSSProperties => ({
    padding: '20px',
    height: '100%',
    background: '#ffffff',
    boxSizing: 'border-box',
    overflowY: 'auto',
    minWidth,
    maxWidth: '800px',
  });

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <SwipeNavigation
        dynamicSizing={true}
        defaultViewWidth={300}
        menuWidth={250}
        menu={
          <div style={menuStyles}>
            <h2 style={{ marginTop: 0 }}>Menu</h2>
            <p>Dynamic sizing enabled</p>
            <nav>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{ color: '#0066cc', textDecoration: 'none' }}>View 1 (Narrow)</a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{ color: '#0066cc', textDecoration: 'none' }}>View 2 (Medium)</a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{ color: '#0066cc', textDecoration: 'none' }}>View 3 (Wide)</a>
                </li>
              </ul>
            </nav>
          </div>
        }
      >
        {/* Narrow View */}
        <div style={createViewStyles('250px')}>
          <h2>Narrow View</h2>
          <p>This view has minimal content and should be narrow.</p>
          <div style={{ 
            background: '#e3f2fd', 
            padding: '16px', 
            borderRadius: '8px',
            width: '200px'
          }}>
            <h4>Compact Content</h4>
            <p style={{ margin: '8px 0' }}>Small sidebar-style content</p>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </div>
        </div>

        {/* Medium View */}
        <div style={createViewStyles('400px')}>
          <h2>Medium View</h2>
          <p>This view has moderate content and should be medium width.</p>
          <div style={{ 
            background: '#f3e5f5', 
            padding: '20px', 
            borderRadius: '8px'
          }}>
            <h4>Standard Content</h4>
            <p>This view contains a typical amount of content that benefits from a medium width layout.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
              <div style={{ background: 'white', padding: '12px', borderRadius: '4px' }}>
                <h5 style={{ marginTop: 0 }}>Card 1</h5>
                <p style={{ margin: 0, fontSize: '14px' }}>Some content here</p>
              </div>
              <div style={{ background: 'white', padding: '12px', borderRadius: '4px' }}>
                <h5 style={{ marginTop: 0 }}>Card 2</h5>
                <p style={{ margin: 0, fontSize: '14px' }}>More content here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wide View */}
        <div style={createViewStyles('600px')}>
          <h2>Wide View</h2>
          <p>This view has extensive content and should be wide.</p>
          <div style={{ 
            background: '#e8f5e8', 
            padding: '24px', 
            borderRadius: '8px'
          }}>
            <h4>Extensive Content Layout</h4>
            <p>This view is designed to showcase content that benefits from a wider layout, such as data tables, dashboards, or detailed forms.</p>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '20px', 
              marginTop: '20px' 
            }}>
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} style={{ 
                  background: 'white', 
                  padding: '16px', 
                  borderRadius: '8px',
                  border: '1px solid #ddd'
                }}>
                  <h5 style={{ marginTop: 0 }}>Item {i + 1}</h5>
                  <p style={{ margin: '8px 0', fontSize: '14px' }}>
                    Content that needs more horizontal space to display properly.
                  </p>
                  <div style={{ 
                    background: '#f0f0f0', 
                    height: '40px', 
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    color: '#666'
                  }}>
                    Chart/Graph Area
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SwipeNavigation>
    </div>
  );
};

export default DynamicSizingDemo;