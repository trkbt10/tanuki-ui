import React from "react";
import { useNodeEditor, useNodeCanvas, useEditorActionState } from "tanuki-ui/extended/node-editor";

export interface DebugOverlayProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export const DebugOverlay: React.FC<DebugOverlayProps> = ({
  position = "top-left",
}) => {
  const { state } = useNodeEditor();
  const canvasState = useNodeCanvas();
  const actionState = useEditorActionState();
  
  const nodeCount = Object.keys(state.nodes).length;
  const connectionCount = Object.keys(state.connections).length;
  const selectedCount = actionState.state.selectedNodeIds.length;

  const positionStyles = {
    "top-left": { top: 16, left: 16 },
    "top-right": { top: 16, right: 16 },
    "bottom-left": { bottom: 16, left: 16 },
    "bottom-right": { bottom: 16, right: 16 },
  };

  return (
    <div
      style={{
        position: "absolute",
        ...positionStyles[position],
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        padding: "12px",
        borderRadius: "8px",
        fontSize: "12px",
        fontFamily: "monospace",
        zIndex: 1000,
        minWidth: "200px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "8px", fontSize: "14px" }}>
        🔧 Debug Info
      </div>
      <div style={{ lineHeight: "1.4" }}>
        <div>Nodes: {nodeCount}</div>
        <div>Connections: {connectionCount}</div>
        <div>Selected: {selectedCount}</div>
        <div>Scale: {canvasState.state.viewport.scale.toFixed(2)}x</div>
        <div>
          Offset: ({canvasState.state.viewport.offset.x.toFixed(0)}, {canvasState.state.viewport.offset.y.toFixed(0)})
        </div>
        <div>Grid: {canvasState.state.gridSettings.enabled ? "ON" : "OFF"}</div>
        <div>
          Action: {actionState.state.dragState ? "DRAG" : 
                   actionState.state.connectionDragState ? "CONNECT" : 
                   actionState.state.connectionDisconnectState ? "DISCONNECT" : 
                   "IDLE"}
        </div>
      </div>
    </div>
  );
};