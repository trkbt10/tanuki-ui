import React, { useState } from 'react';
import { SwipeNavigation } from '../../../../src/layouts/SwipeNavigation';

const TestSwipeNavigation: React.FC = () => {
  const [controlledOpen, setControlledOpen] = useState(false);
  const [nestedOpen, setNestedOpen] = useState(false);
  const [parentNestedOpen, setParentNestedOpen] = useState(false);

  const sidebarStyles: React.CSSProperties = {
    padding: '20px',
    height: '100%',
    background: '#f5f5f5',
    borderRight: '1px solid #e0e0e0',
  };

  const mainStyles: React.CSSProperties = {
    padding: '20px',
    minHeight: '100vh',
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ padding: '20px', margin: 0, borderBottom: '1px solid #e0e0e0' }}>
        SwipeNavigation Component Demo (Updated API)
      </h1>

      {/* Basic Example */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ padding: '20px', background: '#f0f0f0' }}>Basic SwipeNavigation</h2>
        <div style={{ height: '400px', border: '1px solid #ccc', overflow: 'hidden' }}>
          <SwipeNavigation
            sidebar={
              <div style={sidebarStyles}>
                <h3>Sidebar Content</h3>
                <nav>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '10px' }}><a href="#">Menu Item 1</a></li>
                    <li style={{ marginBottom: '10px' }}><a href="#">Menu Item 2</a></li>
                    <li style={{ marginBottom: '10px' }}><a href="#">Menu Item 3</a></li>
                  </ul>
                </nav>
              </div>
            }
          >
            <div style={mainStyles}>
              <h3>Main Content</h3>
              <p>Resize the window to mobile size (below 768px) and swipe from the left edge to open the sidebar.</p>
              <p>The sidebar will overlay the main content by default.</p>
            </div>
          </SwipeNavigation>
        </div>
      </section>

      {/* Push Mode Example */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ padding: '20px', background: '#f0f0f0' }}>Push Mode</h2>
        <div style={{ height: '400px', border: '1px solid #ccc', overflow: 'hidden' }}>
          <SwipeNavigation
            sidebar={
              <div style={sidebarStyles}>
                <h3>Push Mode Sidebar</h3>
                <p>This sidebar pushes the main content instead of overlaying it.</p>
              </div>
            }
            mobileMode="push"
          >
            <div style={mainStyles}>
              <h3>Main Content (Push Mode)</h3>
              <p>In push mode, the main content slides to make room for the sidebar.</p>
            </div>
          </SwipeNavigation>
        </div>
      </section>

      {/* Right Sidebar Example */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ padding: '20px', background: '#f0f0f0' }}>Right-positioned Sidebar</h2>
        <div style={{ height: '400px', border: '1px solid #ccc', overflow: 'hidden' }}>
          <SwipeNavigation
            sidebar={
              <div style={{ ...sidebarStyles, borderRight: 'none', borderLeft: '1px solid #e0e0e0' }}>
                <h3>Right Sidebar</h3>
                <p>Swipe from the right edge to open this sidebar.</p>
              </div>
            }
            sidebarPosition="right"
          >
            <div style={mainStyles}>
              <h3>Main Content (Right Sidebar)</h3>
              <p>The sidebar appears from the right side of the screen.</p>
            </div>
          </SwipeNavigation>
        </div>
      </section>

      {/* Controlled State Example */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ padding: '20px', background: '#f0f0f0' }}>Controlled State</h2>
        <div style={{ height: '400px', border: '1px solid #ccc', overflow: 'hidden' }}>
          <SwipeNavigation
            sidebar={
              <div style={sidebarStyles}>
                <h3>Controlled Sidebar</h3>
                <p>This sidebar's state is controlled by the parent component.</p>
                <button onClick={() => setControlledOpen(false)}>Close Sidebar</button>
              </div>
            }
            isOpen={controlledOpen}
            onOpenChange={setControlledOpen}
          >
            <div style={mainStyles}>
              <h3>Controlled State Example</h3>
              <button onClick={() => setControlledOpen(!controlledOpen)}>
                {controlledOpen ? 'Close' : 'Open'} Sidebar
              </button>
              <p>Current state: {controlledOpen ? 'Open' : 'Closed'}</p>
            </div>
          </SwipeNavigation>
        </div>
      </section>

      {/* Nested SwipeNavigation Example */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ padding: '20px', background: '#f0f0f0' }}>Nested SwipeNavigation</h2>
        <div style={{ height: '500px', border: '1px solid #ccc', overflow: 'hidden' }}>
          <SwipeNavigation
            sidebar={
              <SwipeNavigation
                sidebar={
                  <div style={{ ...sidebarStyles, background: '#e8e8e8' }}>
                    <h3>Nested Sidebar</h3>
                    <p>This is a nested sidebar inside another sidebar.</p>
                    <p>When open, swiping right will pass the gesture to the parent.</p>
                  </div>
                }
                level={1}
                sidebarWidth={240}
                isOpen={nestedOpen}
                onOpenChange={setNestedOpen}
                onSwipeThrough={(direction) => {
                  if (direction === 'right' && nestedOpen) {
                    setNestedOpen(false);
                  }
                }}
              >
                <div style={{ ...sidebarStyles, minHeight: '100%' }}>
                  <h3>Parent Sidebar</h3>
                  <button onClick={() => setNestedOpen(!nestedOpen)}>
                    {nestedOpen ? 'Close' : 'Open'} Nested Sidebar
                  </button>
                  <p>This sidebar contains another SwipeNavigation component.</p>
                </div>
              </SwipeNavigation>
            }
            sidebarWidth={320}
            isOpen={parentNestedOpen}
            onOpenChange={setParentNestedOpen}
          >
            <div style={mainStyles}>
              <h3>Nested SwipeNavigation Demo</h3>
              <button onClick={() => setParentNestedOpen(!parentNestedOpen)}>
                {parentNestedOpen ? 'Close' : 'Open'} Parent Sidebar
              </button>
              <p>This example demonstrates how nested SwipeNavigation components work together.</p>
              <ol>
                <li>Swipe from the left edge or click button to open the parent sidebar</li>
                <li>Inside the parent sidebar, swipe from the left edge again or click button to open the nested sidebar</li>
                <li>When the nested sidebar is open, swipe right to close it or continue swiping to close the parent</li>
              </ol>
              <p>Parent state: {parentNestedOpen ? 'Open' : 'Closed'}, Nested state: {nestedOpen ? 'Open' : 'Closed'}</p>
            </div>
          </SwipeNavigation>
        </div>
      </section>

      {/* Instructions */}
      <section style={{ padding: '20px', background: '#f9f9f9', marginTop: '40px' }}>
        <h2>Usage Instructions</h2>
        <ul>
          <li>On desktop: All sidebars are visible by default as a two-column layout</li>
          <li>On mobile (viewport width &lt; 768px): Sidebars are hidden and can be revealed by swiping</li>
          <li>Swipe from the edge (default 20px) to open the sidebar</li>
          <li>Swipe in the opposite direction or tap the overlay to close</li>
          <li>The swipe threshold is 25% of the sidebar width by default</li>
          <li>Nested sidebars support gesture pass-through when fully open</li>
        </ul>
      </section>
    </div>
  );
};

export default TestSwipeNavigation;