import * as React from "react";
import { NodeEditor, InspectorPanel } from "../index";

// Example component demonstrating the new column layout system
export const ColumnLayoutExample: React.FC = () => {
  const [leftSidebarWidth, setLeftSidebarWidth] = React.useState(250);
  const [rightSidebarWidth, setRightSidebarWidth] = React.useState(280);

  // Example left sidebar content
  const leftSidebar = (
    <div style={{ padding: "16px" }}>
      <h3>Project Explorer</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ padding: "4px 0" }}>📁 Components</li>
        <li style={{ padding: "4px 0", paddingLeft: "16px" }}>📄 Button.tsx</li>
        <li style={{ padding: "4px 0", paddingLeft: "16px" }}>📄 Input.tsx</li>
        <li style={{ padding: "4px 0" }}>📁 Utils</li>
        <li style={{ padding: "4px 0", paddingLeft: "16px" }}>📄 helpers.ts</li>
      </ul>
    </div>
  );

  // Custom right sidebar content (or use default inspector)
  const rightSidebar = (
    <InspectorPanel />
  );

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <NodeEditor
        // New 3-column layout props
        leftSidebar={leftSidebar}
        rightSidebar={rightSidebar}
        leftSidebarInitialWidth={leftSidebarWidth}
        rightSidebarInitialWidth={rightSidebarWidth}
        leftSidebarMinWidth={200}
        rightSidebarMinWidth={250}
        leftSidebarMaxWidth={500}
        rightSidebarMaxWidth={600}
        onLeftSidebarWidthChange={setLeftSidebarWidth}
        onRightSidebarWidthChange={setRightSidebarWidth}
        // Backward compatibility: showInspector is deprecated but still works
        showInspector={false} // Use rightSidebar prop instead
      />
    </div>
  );
};

// Example with only right sidebar (2-column layout)
export const TwoColumnExample: React.FC = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <NodeEditor
        rightSidebar={<InspectorPanel />}
        rightSidebarInitialWidth={300}
      />
    </div>
  );
};

// Example with only left sidebar (2-column layout)
export const LeftSidebarExample: React.FC = () => {
  const leftSidebar = (
    <div style={{ padding: "16px" }}>
      <h3>Node Library</h3>
      <div style={{ marginBottom: "8px" }}>
        <button style={{ width: "100%", padding: "8px", marginBottom: "4px" }}>
          🔵 Process Node
        </button>
        <button style={{ width: "100%", padding: "8px", marginBottom: "4px" }}>
          🟢 Input Node
        </button>
        <button style={{ width: "100%", padding: "8px", marginBottom: "4px" }}>
          🔴 Output Node
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <NodeEditor
        leftSidebar={leftSidebar}
        leftSidebarInitialWidth={250}
      />
    </div>
  );
};

// Example with single column (no sidebars)
export const SingleColumnExample: React.FC = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <NodeEditor
        showInspector={false}
        // No leftSidebar or rightSidebar props = single column layout
      />
    </div>
  );
};