import React, { useMemo, useState } from "react";
import type { StoryObj, Meta } from "@storybook/react";
import { ViewSwitcher, type ViewSwitcherItem } from "./ViewSwitcher";
import { SegmentedControl } from "../controls/SegmentedControl";

type Story = StoryObj<typeof ViewSwitcher>;

const meta: Meta<typeof ViewSwitcher> = {
  title: "Layouts/ViewSwitcher",
  component: ViewSwitcher,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

// Simple view components
const createView = (title: string, color: string) => () => (
  <div
    style={{
      padding: "20px",
      minHeight: "100vh",
      background: `linear-gradient(to bottom, ${color}f0, ${color}e0)`,
    }}
  >
    <h2 style={{ marginTop: "60px" }}>{title}</h2>
    <p>This is {title.toLowerCase()}. You can swipe left/right or use the segment control above.</p>
    <div style={{ height: "200vh" }}>
      <p>Scroll down to test vertical scrolling...</p>
      {Array.from({ length: 100 }, (_, i) => (
        <p key={i}>
          Content line {i + 1} - This is scrollable content in {title}
        </p>
      ))}
    </div>
  </div>
);

const BasicViews: ViewSwitcherItem[] = [
  { label: "Home", component: createView("Home View", "#f0f0"), key: "home" },
  { label: "Profile", component: createView("Profile View", "#e0f0f"), key: "profile" },
  { label: "Settings", component: createView("Settings View", "#f0ffe"), key: "settings" },
];

export const Default: Story = {
  args: {
    items: BasicViews,
    defaultSelected: 0,
  },
};

export const ManyViews: Story = {
  args: {
    items: Array.from({ length: 5 }, (_, i) => ({
      label: `Tab ${i + 1}`,
      component: createView(`View ${i + 1}`, `hsl(${i * 60}, 50%, 95%)`),
      key: `view-${i + 1}`,
    })),
    defaultSelected: 2,
  },
};

export const WithCallback: Story = {
  args: {
    items: BasicViews,
    onViewChange: (index) => {
      console.log("View changed to:", index);
    },
  },
};

export const PositionTracking: Story = {
  render: () => {
    const [positionInfo, setPositionInfo] = React.useState<string>("");

    const items = useMemo<ViewSwitcherItem[]>(
      () => [
        {
          label: "Position",
          component: () => (
            <div style={{ padding: "20px", marginTop: "60px" }}>
              <h2>Position Tracking Demo</h2>
              <p>This demo shows how the SegmentedControl position can be tracked.</p>
              <div
                style={{
                  background: "#f5f5f5",
                  padding: "10px",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                  fontSize: "12px",
                }}
              >
                {positionInfo || "Position info will appear here..."}
              </div>
              <div style={{ height: "150vh" }}>
                <p>Scroll down to see position updates...</p>
                {Array.from({ length: 50 }, (_, i) => (
                  <p key={i}>Line {i + 1} - Position tracking content</p>
                ))}
              </div>
            </div>
          ),
          key: "position",
        },
        {
          label: "Tracking",
          component: () => (
            <div style={{ padding: "20px", marginTop: "60px" }}>
              <h2>Tracking View</h2>
              <p>Switch tabs to see position changes.</p>
            </div>
          ),
          key: "tracking",
        },
      ],
      [positionInfo],
    );

    return (
      <ViewSwitcher
        items={items}
        onViewChange={(index) => {
          console.log("View changed to:", index);
          setPositionInfo(`Selected view: ${index}`);
        }}
      />
    );
  },
};

export const DragInteraction: Story = {
  render: () => {
    const items = useMemo<ViewSwitcherItem[]>(
      () => [
        {
          label: "Drag Demo",
          component: () => (
            <div style={{ padding: "20px", marginTop: "60px" }}>
              <h2>Drag-to-Select Demo</h2>
              <p>Try these interactions with the SegmentedControl above:</p>
              <ul>
                <li>
                  <strong>Click:</strong> Normal tap/click to switch tabs
                </li>
                <li>
                  <strong>Drag:</strong> Press and hold on the active tab, then drag to other tabs
                </li>
                <li>
                  <strong>Preview:</strong> See the indicator move as you drag over different segments
                </li>
              </ul>
              <div
                style={{
                  background: "#e3f2fd",
                  padding: "15px",
                  borderRadius: "8px",
                  margin: "20px 0",
                }}
              >
                <strong>💡 Tip:</strong> Drag interaction only works when starting from the currently active segment.
              </div>
              <div style={{ height: "100vh" }}>
                <p>This provides a more intuitive way to navigate between tabs, especially on touch devices.</p>
                {Array.from({ length: 30 }, (_, i) => (
                  <p key={i}>Content line {i + 1} - Test the drag interaction above!</p>
                ))}
              </div>
            </div>
          ),
          key: "drag",
        },
        {
          label: "Touch",
          component: () => (
            <div style={{ padding: "20px", marginTop: "60px" }}>
              <h2>Touch Interaction</h2>
              <p>Optimized for both mouse and touch input.</p>
              <div style={{ height: "100vh" }}>
                {Array.from({ length: 40 }, (_, i) => (
                  <p key={i}>Touch-friendly content {i + 1}</p>
                ))}
              </div>
            </div>
          ),
          key: "touch",
        },
        {
          label: "Mobile",
          component: () => (
            <div style={{ padding: "20px", marginTop: "60px" }}>
              <h2>Mobile Optimized</h2>
              <p>Smooth interactions on mobile devices.</p>
              <div style={{ height: "100vh" }}>
                {Array.from({ length: 40 }, (_, i) => (
                  <p key={i}>Mobile content {i + 1}</p>
                ))}
              </div>
            </div>
          ),
          key: "mobile",
        },
      ],
      [],
    );

    return (
      <ViewSwitcher
        items={items}
        onViewChange={(index) => {
          console.log("Drag interaction - View changed to:", index);
        }}
      />
    );
  },
};

export const MemoizedExample: Story = {
  render: () => {
    const memoizedItems = useMemo<ViewSwitcherItem[]>(
      () => [
        {
          label: "Dashboard",
          component: createView("Dashboard", "#f8f9fa"),
          key: "dashboard",
        },
        {
          label: "Analytics",
          component: createView("Analytics", "#e3f2fd"),
          key: "analytics",
        },
        {
          label: "Reports",
          component: createView("Reports", "#f3e5f5"),
          key: "reports",
        },
      ],
      [],
    );

    const handleViewChange = useMemo(
      () => (index: number) => {
        console.log("Memoized view change:", index);
      },
      [],
    );

    return <ViewSwitcher items={memoizedItems} onViewChange={handleViewChange} defaultSelected={0} />;
  },
};

export const WithCustomHeader: Story = {
  render: () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const items = useMemo<ViewSwitcherItem[]>(
      () => [
        {
          label: "Home",
          component: createView("Home View", "#f0f0"),
          key: "home",
        },
        {
          label: "Profile",
          component: createView("Profile View", "#e0f0f"),
          key: "profile",
        },
        {
          label: "Settings",
          component: createView("Settings View", "#f0ffe"),
          key: "settings",
        },
      ],
      [],
    );

    const header = (
      <SegmentedControl
        items={items.map(item => item.label)}
        selectedIndex={currentIndex}
        controlled={true}
        onSelect={setCurrentIndex}
      />
    );

    return (
      <ViewSwitcher
        items={items}
        header={header}
        currentIndex={currentIndex}
        controlled={true}
        onViewChange={setCurrentIndex}
      />
    );
  },
};

export const WithCustomHeaderContent: Story = {
  render: () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const items = useMemo<ViewSwitcherItem[]>(
      () => [
        {
          label: "Tab 1",
          component: createView("First Tab", "#ffebee"),
          key: "tab1",
        },
        {
          label: "Tab 2",
          component: createView("Second Tab", "#e8f5e9"),
          key: "tab2",
        },
        {
          label: "Tab 3",
          component: createView("Third Tab", "#e3f2fd"),
          key: "tab3",
        },
      ],
      [],
    );

    const customHeader = (
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
        <button 
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          style={{ padding: '8px 16px', borderRadius: '4px' }}
        >
          Previous
        </button>
        <span style={{ padding: '0 20px' }}>
          {currentIndex + 1} / {items.length}
        </span>
        <button 
          onClick={() => setCurrentIndex(Math.min(items.length - 1, currentIndex + 1))}
          disabled={currentIndex === items.length - 1}
          style={{ padding: '8px 16px', borderRadius: '4px' }}
        >
          Next
        </button>
      </div>
    );

    return (
      <ViewSwitcher
        items={items}
        header={customHeader}
        currentIndex={currentIndex}
        controlled={true}
        onViewChange={setCurrentIndex}
      />
    );
  },
};

export const NoHeader: Story = {
  render: () => {
    const items = useMemo<ViewSwitcherItem[]>(
      () => [
        {
          label: "Swipe Only",
          component: () => (
            <div style={{ padding: "20px" }}>
              <h2>No Header Navigation</h2>
              <p>This ViewSwitcher has no header - use swipe gestures to navigate between views.</p>
              <div style={{ height: "100vh", background: "#f5f5f5", padding: "20px", marginTop: "20px" }}>
                <p>Swipe left to go to the next view →</p>
              </div>
            </div>
          ),
          key: "view1",
        },
        {
          label: "Second View",
          component: () => (
            <div style={{ padding: "20px" }}>
              <h2>Second View</h2>
              <p>← Swipe right to go back or swipe left to continue →</p>
              <div style={{ height: "100vh", background: "#e8f5e9", padding: "20px", marginTop: "20px" }}>
                <p>You're on view 2 of 3</p>
              </div>
            </div>
          ),
          key: "view2",
        },
        {
          label: "Last View",
          component: () => (
            <div style={{ padding: "20px" }}>
              <h2>Last View</h2>
              <p>← Swipe right to go back</p>
              <div style={{ height: "100vh", background: "#e3f2fd", padding: "20px", marginTop: "20px" }}>
                <p>This is the last view</p>
              </div>
            </div>
          ),
          key: "view3",
        },
      ],
      [],
    );

    return <ViewSwitcher items={items} onViewChange={(index) => console.log("Swiped to view:", index)} />;
  },
};
