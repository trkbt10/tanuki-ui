import React from "react";
import type { StoryObj, Meta } from "@storybook/react";
import { SidebarLayout } from "./SidebarLayout";

type Story = StoryObj<typeof SidebarLayout>;

const meta: Meta<typeof SidebarLayout> = {
  title: "Layouts/SidebarLayout",
  component: SidebarLayout,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default: Story = {
  args: {
    aside: (
      <div style={{ padding: "20px", height: "100%" }}>
        <h3 style={{ marginTop: 0 }}>Sidebar</h3>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "10px" }}>Home</li>
            <li style={{ marginBottom: "10px" }}>Profile</li>
            <li style={{ marginBottom: "10px" }}>Settings</li>
            <li style={{ marginBottom: "10px" }}>About</li>
          </ul>
        </nav>
      </div>
    ),
    children: (
      <div style={{ padding: "40px" }}>
        <h1>Main Content</h1>
        <p>Resize the sidebar by dragging its edge on desktop.</p>
        <p>On mobile, swipe left/right to switch views.</p>
      </div>
    ),
    asideId: "main-sidebar",
  },
};

export const Mobile: Story = {
  render: () => {
    const [mobileView, setMobileView] = React.useState<"aside" | "main">("main");
    
    return (
      <>
        <button
          onClick={() => setMobileView(mobileView === "aside" ? "main" : "aside")}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "#007bff",
            color: "white",
            border: "none",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            fontSize: "24px",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          {mobileView === "aside" ? "→" : "☰"}
        </button>
        <SidebarLayout
          aside={
            <div style={{ padding: "20px", height: "100%" }}>
              <h3 style={{ marginTop: 0 }}>Mobile Sidebar</h3>
              <p>Swipe to navigate between views</p>
            </div>
          }
          mobileBreakpoint={1024}
          mobileView={mobileView}
          onMobileViewChange={setMobileView}
        >
          <div style={{ padding: "40px" }}>
            <h1>Mobile Content</h1>
            <p>Use the toggle button or swipe left/right to switch views.</p>
            <div style={{ height: "200vh" }}>
              <p>Scroll down to test vertical scrolling...</p>
              {Array.from({ length: 50 }, (_, i) => (
                <p key={i}>Content line {i + 1}</p>
              ))}
            </div>
          </div>
        </SidebarLayout>
      </>
    );
  },
};

export const MobileOverlay: Story = {
  render: () => {
    const [mobileView, setMobileView] = React.useState<"aside" | "main">("main");
    
    return (
      <>
        <button
          onClick={() => setMobileView(mobileView === "aside" ? "main" : "aside")}
          style={{
            position: "fixed",
            top: "20px",
            left: "20px",
            width: "40px",
            height: "40px",
            borderRadius: "4px",
            background: "#333",
            color: "white",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          ☰
        </button>
        <SidebarLayout
          aside={
            <div style={{ padding: "20px", height: "100%" }}>
              <h3 style={{ marginTop: 0 }}>Overlay Sidebar</h3>
              <p>This sidebar overlays the main content</p>
              <nav>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li style={{ marginBottom: "10px" }}>Dashboard</li>
                  <li style={{ marginBottom: "10px" }}>Analytics</li>
                  <li style={{ marginBottom: "10px" }}>Reports</li>
                  <li style={{ marginBottom: "10px" }}>Settings</li>
                </ul>
              </nav>
            </div>
          }
          mobileBreakpoint={1024}
          mobileView={mobileView}
          onMobileViewChange={setMobileView}
          mobileSidebarMode="overlay"
          mobileOverlayMaxWidth={280}
          mobileOverlayDimBackground={true}
        >
          <div style={{ padding: "40px" }}>
            <h1>Main Content</h1>
            <p>The sidebar overlays this content when opened.</p>
            <p>Click the hamburger menu or swipe right to open the sidebar.</p>
            <p>Click the dimmed background or swipe left to close it.</p>
          </div>
        </SidebarLayout>
      </>
    );
  },
};