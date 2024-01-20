import React from "react";
import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import classes from "./SegmentedControl.module.css";
import { Segment } from "./Segment";
import { useToggle } from "../hooks/useToggle";

export interface SegmentedControlProps {
  items: React.ReactNode[];
  selectedIndex?: number;
  defaultSelected?: number;
  onSelect?: (index: number) => void;
  element?: React.FC<React.PropsWithChildren<React.ComponentProps<typeof Segment>>>;
  // New: Enable external control and position tracking
  controlled?: boolean;
  onPositionChange?: (rect: {
    left: number;
    top: number;
    width: number;
    height: number;
    // Also provides absolute positioning for advanced use cases
    x?: number;
    y?: number;
    right?: number;
    bottom?: number;
  }) => void;
  // New: Drag state callbacks
  onDragStart?: (index: number) => void;
  onDragEnd?: (index: number) => void;
  onDragPreview?: (index: number) => void;
}

// Backward compatibility: Keep the old interface available
export interface LegacySegmentedControlProps {
  items: React.ReactNode[];
  defaultSelected?: number;
  onSelect?: (item: number) => void;
  element?: React.FC<React.PropsWithChildren<React.ComponentProps<typeof Segment>>>;
}

export const SegmentedControl: FC<SegmentedControlProps> = memo(
  ({
    items,
    selectedIndex: controlledIndex,
    defaultSelected = 0,
    onSelect,
    element: Element = Segment,
    controlled = false,
    onPositionChange,
    onDragStart,
    onDragEnd,
    onDragPreview,
  }) => {
    const [internalIndex, setInternalIndex] = useState(defaultSelected);
    const [itemRect, setItemRect] = useState<Record<string, number>>({});
    const ref = useRef<HTMLDivElement>(null);

    // Drag state
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartIndex, setDragStartIndex] = useState<number | null>(null);
    const [previewIndex, setPreviewIndex] = useState<number | null>(null);

    // Use controlled or internal state
    const selectedIndex = controlled ? controlledIndex ?? defaultSelected : internalIndex;

    // Use preview index during drag, otherwise use selected index
    const displayIndex = isDragging && previewIndex !== null ? previewIndex : selectedIndex;

    // Handle selection change
    const handleIndexChange = useCallback(
      (newIndex: number) => {
        if (!controlled) {
          setInternalIndex(newIndex);
        }
        onSelect?.(newIndex);
      },
      [controlled, onSelect],
    );
    const selectSegment: React.MouseEventHandler<HTMLButtonElement> = useCallback(
      (e) => {
        if (!(e.target instanceof HTMLButtonElement)) {
          return;
        }
        const index = parseInt(e.target.dataset["index"] ?? "0");
        handleIndexChange(index);
      },
      [handleIndexChange],
    );

    // Drag handlers
    const handleDragStart = useCallback(
      (e: React.PointerEvent<HTMLButtonElement>) => {
        if (!(e.target instanceof HTMLButtonElement)) return;

        const index = parseInt(e.target.dataset["index"] ?? "0");

        // Only allow drag from currently selected segment
        if (index !== selectedIndex) return;

        setIsDragging(true);
        setDragStartIndex(index);
        setPreviewIndex(index);

        // Notify external listeners
        onDragStart?.(index);

        // Capture pointer to track movement outside element
        e.currentTarget.setPointerCapture(e.pointerId);
      },
      [selectedIndex, onDragStart],
    );

    const handleDragMove = useCallback(
      (e: React.PointerEvent<HTMLButtonElement>) => {
        if (!isDragging || !ref.current) return;

        // Find which segment the pointer is over
        const containerRect = ref.current.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;

        const buttons = Array.from(ref.current.children).filter((child) =>
          child.classList.contains(classes.segmentButton),
        ) as HTMLElement[];

        let targetIndex = dragStartIndex;

        for (let i = 0; i < buttons.length; i++) {
          const button = buttons[i];
          const buttonRect = button.getBoundingClientRect();
          const buttonRelativeLeft = buttonRect.left - containerRect.left;
          const buttonRelativeRight = buttonRect.right - containerRect.left;

          if (relativeX >= buttonRelativeLeft && relativeX <= buttonRelativeRight) {
            targetIndex = i;
            break;
          }
        }

        if (targetIndex !== null && targetIndex !== previewIndex) {
          setPreviewIndex(targetIndex);
          // Notify external listeners about preview change
          onDragPreview?.(targetIndex);
        }
      },
      [isDragging, dragStartIndex, previewIndex, onDragPreview],
    );

    const handleDragEnd = useCallback(
      (e: React.PointerEvent<HTMLButtonElement>) => {
        if (!isDragging) return;

        // Release pointer capture
        e.currentTarget.releasePointerCapture(e.pointerId);

        const finalIndex = previewIndex !== null ? previewIndex : selectedIndex;

        // Apply the final selection if it changed
        if (previewIndex !== null && previewIndex !== selectedIndex) {
          handleIndexChange(previewIndex);
        }

        // Notify external listeners about drag end
        onDragEnd?.(finalIndex);

        // Reset drag state
        setIsDragging(false);
        setDragStartIndex(null);
        setPreviewIndex(null);
      },
      [isDragging, previewIndex, selectedIndex, handleIndexChange, onDragEnd],
    );

    // Calculate indicator position and notify external listeners
    const updateItemRect = useCallback(
      (targetIndex: number) => {
        if (!ref.current) {
          return;
        }

        const children = Array.from(ref.current.children).filter((child) => child.classList.contains(classes.segmentButton));

        if (children.length === 0 || targetIndex >= children.length) {
          return;
        }

        const target = children[targetIndex] as HTMLElement;
        const rect = target.getBoundingClientRect();
        const containerRect = ref.current.getBoundingClientRect();

        const relativeRect = {
          top: rect.top - containerRect.top,
          left: rect.left - containerRect.left,
          width: rect.width,
          height: rect.height,
        };

        setItemRect(relativeRect);

        // Notify external listeners about position change
        if (onPositionChange) {
          onPositionChange({
            ...relativeRect,
            // Also provide absolute position for advanced use cases
            x: rect.x,
            y: rect.y,
            right: rect.right,
            bottom: rect.bottom,
          });
        }
      },
      [onPositionChange],
    );

    // Update position when display index changes
    useEffect(() => {
      updateItemRect(displayIndex);
    }, [displayIndex, updateItemRect]);

    // Update position on resize
    useEffect(() => {
      if (!ref.current) return;

      const resizeObserver = new ResizeObserver(() => {
        updateItemRect(displayIndex);
      });

      resizeObserver.observe(ref.current);

      return () => {
        resizeObserver.disconnect();
      };
    }, [displayIndex, updateItemRect]);
    const focus: React.PointerEventHandler<HTMLButtonElement> = useCallback(
      (e) => {
        if (e.target instanceof HTMLButtonElement) {
          const isActive = e.target.dataset.index === displayIndex.toString();
          if (!isActive) {
            return;
          }
          setFocus(true);
        }
      },
      [displayIndex],
    );
    const blur: React.PointerEventHandler<HTMLButtonElement> = useCallback(
      (e) => {
        if (e.target instanceof HTMLButtonElement) {
          const isActive = e.target.dataset.index === displayIndex.toString();
          if (!isActive) {
            return;
          }
          setFocus(false);
        }
      },
      [displayIndex],
    );
    const [focused, toggleFocus, setFocus] = useToggle(false);
    return (
      <div className={classes.segmentControl} ref={ref}>
        {items.map((item, i) => {
          return (
            <SegmentButton
              key={i}
              index={i}
              active={i === displayIndex}
              onClick={selectSegment}
              focus={focus}
              blur={blur}
              onPointerDown={handleDragStart}
              onPointerMove={handleDragMove}
              onPointerUp={handleDragEnd}
              onPointerCancel={handleDragEnd}
            >
              <Element>{item}</Element>
            </SegmentButton>
          );
        })}
        {itemRect && itemRect.left !== undefined && (
          <div
            className={classes.indicator}
            role="presentation"
            data-focus={focused}
            style={{
              transform: `translate(${itemRect.left}px, ${itemRect.top}px) scale(${focused ? 0.97 : 1})`,
              width: itemRect.width,
              height: itemRect.height,
            }}
          >
            {items.at(displayIndex)}
          </div>
        )}
      </div>
    );
  },
);
SegmentedControl.displayName = "SegmentedControl";

const SegmentButton: FC<
  React.PropsWithChildren<{
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    index?: number;
    active: boolean;
    focus: React.PointerEventHandler<HTMLButtonElement>;
    blur: React.PointerEventHandler<HTMLButtonElement>;
    onPointerDown?: React.PointerEventHandler<HTMLButtonElement>;
    onPointerMove?: React.PointerEventHandler<HTMLButtonElement>;
    onPointerUp?: React.PointerEventHandler<HTMLButtonElement>;
    onPointerCancel?: React.PointerEventHandler<HTMLButtonElement>;
  }>
> = ({ children, index, active, onClick, focus, blur, onPointerDown, onPointerMove, onPointerUp, onPointerCancel }) => {
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      focus(e);
      onPointerDown?.(e);
    },
    [focus, onPointerDown],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      blur(e);
      onPointerUp?.(e);
    },
    [blur, onPointerUp],
  );

  const handlePointerCancel = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      blur(e);
      onPointerCancel?.(e);
    },
    [blur, onPointerCancel],
  );

  const handlePointerLeave = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      // Only blur if not dragging (pointer capture prevents leave during drag)
      if (!e.currentTarget.hasPointerCapture(e.pointerId)) {
        blur(e);
      }
    },
    [blur],
  );

  return (
    <button
      onClick={onClick}
      type="button"
      data-index={index}
      data-active={active}
      className={classes.segmentButton}
      onPointerDown={handlePointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerLeave={handlePointerLeave}
      style={{
        touchAction: "none", // Prevent scrolling during drag
      }}
    >
      {children}
    </button>
  );
};
