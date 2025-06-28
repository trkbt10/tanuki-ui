import React from 'react';
import { SwipeNavigation } from '../../../../../src/layouts/SwipeNavigation';

const BasicDemo: React.FC = () => {
  const primaryStyles: React.CSSProperties = {
    padding: '20px',
    height: '100%',
    background: '#ffffff',
    boxSizing: 'border-box',
    overflowY: 'auto',
  };

  const secondaryStyles: React.CSSProperties = {
    padding: '20px',
    height: '100%',
    background: '#f5f5f5',
    boxSizing: 'border-box',
    overflowY: 'auto',
  };

  return (
    <SwipeNavigation
        useBodyScroll={true}
        menuWidth={300}
        menu={
          <div style={secondaryStyles}>
            <h2 style={{ marginTop: 0 }}>Menu</h2>
            <p style={{ lineHeight: 1.6 }}>
              This is the menu that slides in from the left.
            </p>
            <nav style={{ marginTop: '30px' }}>
              <h3>Navigation Menu</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '16px' }}>
                  <a href="#" style={{ color: '#0066cc', textDecoration: 'none' }}>Dashboard</a>
                </li>
                <li style={{ marginBottom: '16px' }}>
                  <a href="#" style={{ color: '#0066cc', textDecoration: 'none' }}>Profile</a>
                </li>
                <li style={{ marginBottom: '16px' }}>
                  <a href="#" style={{ color: '#0066cc', textDecoration: 'none' }}>Settings</a>
                </li>
                <li style={{ marginBottom: '16px' }}>
                  <a href="#" style={{ color: '#0066cc', textDecoration: 'none' }}>Messages</a>
                </li>
                <li style={{ marginBottom: '16px' }}>
                  <a href="#" style={{ color: '#0066cc', textDecoration: 'none' }}>Notifications</a>
                </li>
              </ul>
            </nav>
            <div style={{ marginTop: '40px', padding: '16px', background: '#e0e0e0', borderRadius: '8px' }}>
              <h4 style={{ marginTop: 0 }}>Additional Info</h4>
              <p style={{ margin: '8px 0' }}>This view can contain any content</p>
              <p style={{ margin: '8px 0', fontSize: '14px', color: '#666' }}>Swipe right to go back to the primary view</p>
            </div>
          </div>
        }
      >
        <div style={primaryStyles}>
          <h1>Basic SwipeNavigation Demo</h1>
          <p style={{ fontSize: '18px', lineHeight: 1.6 }}>
            This demonstrates a horizontal slide navigation between two views.
          </p>
          
          <div style={{ marginTop: '30px', padding: '20px', background: '#f0f8ff', borderRadius: '8px' }}>
            <h3 style={{ marginTop: 0 }}>Instructions:</h3>
            <ul>
              <li>On desktop: Both views are visible side by side</li>
              <li>On mobile (resize window to &lt;768px): Swipe left to show the secondary view</li>
              <li>Swipe right to return to the primary view</li>
              <li>The views slide horizontally like a mobile app navigation</li>
            </ul>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3>Primary View Content</h3>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} style={{ lineHeight: 1.6 }}>
                This is content in the primary view. The secondary view is to the left and can be accessed by swiping.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            ))}
          </div>
        </div>
    </SwipeNavigation>
  );
};

export default BasicDemo;