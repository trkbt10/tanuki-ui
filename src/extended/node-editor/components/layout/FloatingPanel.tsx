import * as React from "react";
import styles from "./FloatingPanel.module.css";

export interface FloatingPanelProps {
  /** Panel content */
  children: React.ReactNode;
  /** Panel ID */
  id?: string;
  /** Whether panel is visible */
  visible?: boolean;
  /** Initial position */
  initialPosition?: { x: number; y: number };
  /** Panel size */
  size?: { width: number; height: number };
  /** Whether panel is draggable */
  draggable?: boolean;
  /** Whether panel is resizable */
  resizable?: boolean;
  /** Z-index */
  zIndex?: number;
  /** Position change callback */
  onPositionChange?: (position: { x: number; y: number }) => void;
  /** Size change callback */
  onSizeChange?: (size: { width: number; height: number }) => void;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

/**
 * FloatingPanel - A draggable and resizable panel that floats above the main content
 */
export const FloatingPanel: React.FC<FloatingPanelProps> = ({
  id,
  children,
  visible = true,
  initialPosition = { x: 100, y: 100 },
  size = { width: 300, height: 400 },
  draggable = true,
  resizable = true,
  zIndex = 1000,
  onPositionChange,
  onSizeChange,
  className,
  style,
}) => {
  const [position, setPosition] = React.useState(initialPosition);
  const [dimensions, setDimensions] = React.useState(size);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isResizing, setIsResizing] = React.useState(false);
  const dragStartRef = React.useRef<{ x: number; y: number; initialX: number; initialY: number } | null>(null);
  const resizeStartRef = React.useRef<{
    x: number;
    y: number;
    initialWidth: number;
    initialHeight: number;
  } | null>(null);

  // Handle drag start
  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!draggable) return;
      if ((e.target as HTMLElement).closest(`.${styles.resizeHandle}`)) return;

      setIsDragging(true);
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        initialX: position.x,
        initialY: position.y,
      };
    },
    [draggable, position]
  );

  // Handle resize start
  const handleResizeMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!resizable) return;
      e.stopPropagation();

      setIsResizing(true);
      resizeStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        initialWidth: dimensions.width,
        initialHeight: dimensions.height,
      };
    },
    [resizable, dimensions]
  );

  // Handle mouse move
  React.useEffect(() => {
    if (!isDragging && !isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && dragStartRef.current) {
        const deltaX = e.clientX - dragStartRef.current.x;
        const deltaY = e.clientY - dragStartRef.current.y;
        const newPosition = {
          x: dragStartRef.current.initialX + deltaX,
          y: dragStartRef.current.initialY + deltaY,
        };
        setPosition(newPosition);
        onPositionChange?.(newPosition);
      }

      if (isResizing && resizeStartRef.current) {
        const deltaX = e.clientX - resizeStartRef.current.x;
        const deltaY = e.clientY - resizeStartRef.current.y;
        const newSize = {
          width: Math.max(200, resizeStartRef.current.initialWidth + deltaX),
          height: Math.max(150, resizeStartRef.current.initialHeight + deltaY),
        };
        setDimensions(newSize);
        onSizeChange?.(newSize);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      dragStartRef.current = null;
      resizeStartRef.current = null;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, onPositionChange, onSizeChange]);

  if (!visible) return null;

  return (
    <div
      id={id}
      className={`${styles.floatingPanel} ${className || ""} ${isDragging ? styles.dragging : ""} ${
        isResizing ? styles.resizing : ""
      }`}
      style={{
        ...style,
        left: position.x,
        top: position.y,
        width: dimensions.width,
        height: dimensions.height,
        zIndex,
        cursor: isDragging ? "grabbing" : draggable ? "grab" : "default",
      }}
      onMouseDown={handleMouseDown}
    >
      <div className={styles.content}>{children}</div>
      {resizable && (
        <div className={styles.resizeHandle} onMouseDown={handleResizeMouseDown}>
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M16 0 L16 16 L0 16 Z" fill="currentColor" opacity="0.5" />
          </svg>
        </div>
      )}
    </div>
  );
};
