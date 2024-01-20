import * as React from "react";
import { WebGLRectangleNode } from "./WebGLRectangleNode";

/**
 * Test component to verify WebGLRectangleNode can be properly
 * remounted after unmounting (disposal)
 */
export const TestWebGLRemount: React.FC = () => {
  const [mounted, setMounted] = React.useState(true);
  const [color, setColor] = React.useState("#2196F3");

  return (
    <div style={{ padding: "20px" }}>
      <h2>WebGL Remount Test</h2>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setMounted(!mounted)}>
          {mounted ? "Unmount" : "Mount"} WebGL Component
        </button>
        <button onClick={() => setColor(color === "#2196F3" ? "#FF5722" : "#2196F3")} style={{ marginLeft: "10px" }}>
          Toggle Color
        </button>
      </div>
      
      <div style={{ border: "1px solid #ccc", padding: "10px", minHeight: "320px" }}>
        {mounted ? (
          <WebGLRectangleNode
            width={300}
            height={300}
            color={color}
            borderRadius={5}
          />
        ) : (
          <p>Component unmounted - click "Mount" to recreate</p>
        )}
      </div>
      
      <div style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
        <p>Instructions:</p>
        <ol>
          <li>Click "Unmount" to dispose the WebGL renderer</li>
          <li>Check console for "Successfully disposed WebGL renderer"</li>
          <li>Click "Mount" to recreate the component</li>
          <li>Verify the teapot renders correctly with animation</li>
        </ol>
      </div>
    </div>
  );
};