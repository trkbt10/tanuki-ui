import * as React from "react";
import { useNodeEditor } from "../../contexts/node-editor";
import { useNodeCanvas } from "../../contexts/NodeCanvasContext";
import styles from "./Minimap.module.css";

export interface MinimapProps {
  width?: number;
  height?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  /** Show/hide the minimap */
  visible?: boolean;
  /** Scale factor for minimap rendering */
  scale?: number;
}

export const Minimap: React.FC<MinimapProps> = ({
  width = 200,
  height = 150,
  position = "top-right",
  className,
  visible = true,
  scale = 0.1
}) => {
  const { state } = useNodeEditor();
  const { state: canvasState, dispatch: canvasDispatch, actions: canvasActions } = useNodeCanvas();
  const canvasRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState<{ x: number; y: number; viewportOffset: { x: number; y: number } } | null>(null);
  const [hasDragged, setHasDragged] = React.useState(false);
  
  // Calculate bounds of all nodes
  const nodeBounds = React.useMemo(() => {
    const nodes = Object.values(state.nodes);
    if (nodes.length === 0) {
      return { minX: 0, minY: 0, maxX: 1000, maxY: 1000 };
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    nodes.forEach(node => {
      const x = node.position.x;
      const y = node.position.y;
      const width = node.size?.width || 150;
      const height = node.size?.height || 100;

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + width);
      maxY = Math.max(maxY, y + height);
    });

    // Add padding
    const padding = 100;
    return {
      minX: minX - padding,
      minY: minY - padding,
      maxX: maxX + padding,
      maxY: maxY + padding
    };
  }, [state.nodes]);

  // Calculate scale to fit all nodes in minimap
  const minimapScale = React.useMemo(() => {
    const boundsWidth = nodeBounds.maxX - nodeBounds.minX;
    const boundsHeight = nodeBounds.maxY - nodeBounds.minY;
    
    const scaleX = (width - 20) / boundsWidth;
    const scaleY = (height - 40) / boundsHeight;
    
    return Math.min(scaleX, scaleY, scale);
  }, [nodeBounds, width, height]);

  // Transform world coordinates to minimap coordinates
  const worldToMinimap = React.useCallback((x: number, y: number) => {
    return {
      x: (x - nodeBounds.minX) * minimapScale + 10,
      y: (y - nodeBounds.minY) * minimapScale + 30
    };
  }, [nodeBounds, minimapScale]);

  // Transform minimap coordinates to world coordinates
  const minimapToWorld = React.useCallback((x: number, y: number) => {
    return {
      x: (x - 10) / minimapScale + nodeBounds.minX,
      y: (y - 30) / minimapScale + nodeBounds.minY
    };
  }, [nodeBounds, minimapScale]);

  // Calculate viewport rectangle in minimap coordinates
  const viewportRect = React.useMemo(() => {
    const viewport = canvasState.viewport;
    
    // Calculate visible area in world coordinates
    const visibleWidth = window.innerWidth / viewport.scale;
    const visibleHeight = window.innerHeight / viewport.scale;
    
    const worldTopLeft = {
      x: -viewport.offset.x / viewport.scale,
      y: -viewport.offset.y / viewport.scale
    };
    
    const worldBottomRight = {
      x: worldTopLeft.x + visibleWidth,
      y: worldTopLeft.y + visibleHeight
    };

    const minimapTopLeft = worldToMinimap(worldTopLeft.x, worldTopLeft.y);
    const minimapBottomRight = worldToMinimap(worldBottomRight.x, worldBottomRight.y);

    return {
      x: minimapTopLeft.x,
      y: minimapTopLeft.y,
      width: Math.max(1, minimapBottomRight.x - minimapTopLeft.x),
      height: Math.max(1, minimapBottomRight.y - minimapTopLeft.y)
    };
  }, [canvasState.viewport, worldToMinimap]);

  // Navigate to position based on minimap coordinates
  const navigateToPosition = React.useCallback((clientX: number, clientY: number) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const clickY = clientY - rect.top;
    
    // Convert minimap click coordinates to world coordinates
    const worldPos = minimapToWorld(clickX, clickY);
    
    // Get current viewport state
    const viewport = canvasState.viewport;
    
    // Calculate where this world position should appear on screen
    // We want the clicked world position to appear at the same screen position where we clicked on the minimap
    const screenX = (clickX / width) * window.innerWidth;
    const screenY = ((clickY - 30) / (height - 30)) * window.innerHeight; // Account for header
    
    // Calculate new viewport offset so that worldPos appears at screenX, screenY
    const newOffsetX = screenX - worldPos.x * viewport.scale;
    const newOffsetY = screenY - worldPos.y * viewport.scale;
    
    // Dispatch the action to update the viewport
    canvasDispatch(canvasActions.setViewport({
      ...viewport,
      offset: { x: newOffsetX, y: newOffsetY }
    }));
  }, [canvasState.viewport, canvasDispatch, canvasActions, minimapToWorld, width, height]);

  // Handle minimap interactions
  const handlePointerDown = React.useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setHasDragged(false); // Reset drag flag
    
    // Store drag start position and current viewport offset
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      viewportOffset: { ...canvasState.viewport.offset }
    });
    
    // Capture pointer for smooth dragging
    if (canvasRef.current) {
      canvasRef.current.setPointerCapture(e.pointerId);
    }
  }, [canvasState.viewport.offset]);

  const handlePointerMove = React.useCallback((e: React.PointerEvent) => {
    if (!isDragging || !dragStart) return;
    e.preventDefault();
    
    // Calculate mouse movement in screen pixels
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    // Check if this is significant movement to constitute a drag
    const dragThreshold = 3; // pixels
    if (!hasDragged && (Math.abs(deltaX) > dragThreshold || Math.abs(deltaY) > dragThreshold)) {
      setHasDragged(true);
    }
    
    // Convert screen pixel movement to world coordinate movement
    // The scale factor for minimap to world coordinate conversion
    const worldWidth = nodeBounds.maxX - nodeBounds.minX;
    const worldHeight = nodeBounds.maxY - nodeBounds.minY;
    const minimapWidth = width - 20; // Account for padding
    const minimapHeight = height - 60; // Account for header and padding
    
    const worldDeltaX = (deltaX / minimapWidth) * worldWidth;
    const worldDeltaY = (deltaY / minimapHeight) * worldHeight;
    
    // Apply the movement to viewport offset (inverted because moving minimap right should move viewport left)
    const viewport = canvasState.viewport;
    const newOffsetX = dragStart.viewportOffset.x - worldDeltaX * viewport.scale;
    const newOffsetY = dragStart.viewportOffset.y - worldDeltaY * viewport.scale;
    
    // Dispatch the action to update the viewport
    canvasDispatch(canvasActions.setViewport({
      ...viewport,
      offset: { x: newOffsetX, y: newOffsetY }
    }));
  }, [isDragging, dragStart, hasDragged, canvasState.viewport, canvasDispatch, canvasActions, nodeBounds, width, height]);

  const handlePointerUp = React.useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    setDragStart(null);
    
    // Release pointer capture
    if (canvasRef.current) {
      canvasRef.current.releasePointerCapture(e.pointerId);
    }
    
    // Reset hasDragged flag after a short delay to prevent click events
    setTimeout(() => {
      setHasDragged(false);
    }, 0);
  }, []);

  // Handle click for navigation (when not dragging)
  const handleClick = React.useCallback((e: React.MouseEvent) => {
    // Only handle click if we haven't dragged - this prevents navigation after drag operations
    if (!hasDragged && !isDragging && !dragStart) {
      navigateToPosition(e.clientX, e.clientY);
    }
  }, [hasDragged, isDragging, dragStart, navigateToPosition]);

  const positionClass = position.replace("-", "");

  if (!visible) return null;

  return (
    <div 
      className={`${styles.minimapContainer} ${styles[positionClass]} ${className || ""}`}
      style={{ width, height }}
    >
      <div className={styles.minimapHeader}>
        <span className={styles.minimapTitle}>Minimap</span>
        <span className={styles.minimapStats}>
          {Object.keys(state.nodes).length} nodes
        </span>
        <span className={styles.minimapZoom}>{Math.round(canvasState.viewport.scale * 100)}%</span>
      </div>
      <div 
        ref={canvasRef}
        className={`${styles.minimapCanvas} ${isDragging ? styles.minimapCanvasDragging : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={handleClick}
        style={{ 
          width: width, 
          height: height - 30,
          cursor: isDragging ? "grabbing" : "grab"
        }}
      >
        {/* Render connections as lines */}
        <svg className={styles.minimapConnections} viewBox={`0 0 ${width} ${height - 30}`}>
          {Object.values(state.connections || {}).map(connection => {
            const fromNode = state.nodes[connection.fromNodeId];
            const toNode = state.nodes[connection.toNodeId];
            
            if (!fromNode || !toNode) return null;

            const fromPos = worldToMinimap(
              fromNode.position.x + (fromNode.size?.width || 150) / 2,
              fromNode.position.y + (fromNode.size?.height || 100) / 2
            );
            const toPos = worldToMinimap(
              toNode.position.x + (toNode.size?.width || 150) / 2,
              toNode.position.y + (toNode.size?.height || 100) / 2
            );

            return (
              <line
                key={connection.id}
                x1={fromPos.x}
                y1={fromPos.y - 30}
                x2={toPos.x}
                y2={toPos.y - 30}
                className={styles.minimapConnection}
              />
            );
          })}
        </svg>

        {/* Render nodes */}
        {Object.values(state.nodes).map(node => {
          const pos = worldToMinimap(node.position.x, node.position.y);
          const size = {
            width: (node.size?.width || 150) * minimapScale,
            height: (node.size?.height || 100) * minimapScale
          };
          const isGroupNode = node.type === "group";

          return (
            <div
              key={node.id}
              className={`${styles.minimapNode} ${isGroupNode ? styles.minimapGroupNode : ""}`}
              style={{
                left: pos.x,
                top: pos.y,
                width: Math.max(2, size.width),
                height: Math.max(2, size.height)
              }}
              data-node-type={node.type}
            />
          );
        })}

        {/* Render viewport indicator */}
        <div
          className={`${styles.minimapViewport} ${isDragging ? styles.minimapViewportDragging : ""}`}
          style={{
            left: viewportRect.x,
            top: viewportRect.y,
            width: viewportRect.width,
            height: viewportRect.height
          }}
        />
      </div>
    </div>
  );
};

Minimap.displayName = "Minimap";
