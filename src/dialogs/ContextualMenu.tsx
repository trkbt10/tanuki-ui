import * as React from "react";
import { useToggle } from "react-use";
import { useMeasure } from "../hooks/useMeasure";
import { usePopup } from "../hooks/usePopup";
import style from "./ContextualMenu.module.css";
import { ContextualMenuBalloon } from "./parts/ContextualMenuBalloon";
import { Portal } from "./Portal";
type BoundingRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export const ContextualMenu: React.FC<{
  open?: boolean;
  onClose: (open: boolean) => void;
  measure: BoundingRect;
  children: React.ReactNode;
  render?: (props: BoundingRect) => React.ReactNode;
}> = ({ open = true, onClose, children, measure, render }) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [bound] = useMeasure<HTMLDivElement>(contentRef);
  const rect = React.useMemo(() => {
    if (typeof window === "undefined") {
      return { x: 0, y: 0, overflowX: 0, overflowY: 0, width: 0, height: 0 };
    }
    const viewArea = {
      x: window.scrollX,
      y: window.scrollY,
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const body = {
      width: Math.min(viewArea.width, 320),
      height: Math.min(viewArea.height, 240),
    };
    const contentView = {
      x: measure.x < (viewArea.width + viewArea.x) / 2 ? measure.x : measure.x,
      y: measure.y < (viewArea.height + viewArea.y) / 2 ? measure.y : measure.y - body.height - measure.height,
      width: body.width,
      height: body.height,
    };

    const rightEdge = contentView.x + contentView.width;
    const leftEdge = contentView.x;
    const overflowX = Math.max(rightEdge - viewArea.width, 0);
    const underflowX = Math.min(leftEdge, 0);
    contentView.x += -overflowX + underflowX;

    const topEdge = contentView.y;
    const bottomEdge = contentView.y + contentView.height;
    const overflowY = Math.max(bottomEdge - viewArea.height, 0);
    const underflowY = Math.min(topEdge, 0);
    contentView.y += -overflowY + underflowY;

    if (contentView.y < (viewArea.y + viewArea.height) / 2) {
      contentView.y += measure.height;
    }

    return contentView;
  }, [measure, bound]);
  const [containerRef, bodyRef] = usePopup({
    onClose,
  });
  const depthRef = React.useRef<HTMLElement>(null);
  const lookAt = {
    x: measure.x + measure.width / 2,
    y: measure.y + measure.height / 2,
  };
  return (
    <>
      <i ref={depthRef}></i>
      <Portal parentNode={depthRef.current}>
        <div
          className={style.base}
          data-open={open}
          style={{
            pointerEvents: open ? "auto" : "none",
          }}
        >
          <div className={style.container} ref={containerRef}>
            <div
              className={style.body}
              style={{
                width: rect.width,
                height: rect.height,
                transform: `translate(${rect.x}px, ${rect.y}px)`,
              }}
            >
              <div className={style.decoration}>
                <ContextualMenuBalloon
                  width={rect.width}
                  height={rect.height}
                  x={rect.x}
                  y={rect.y}
                  lookAtX={lookAt.x}
                  lookAtY={lookAt.y}
                ></ContextualMenuBalloon>
              </div>

              <div className={style.content} ref={bodyRef}>
                <div ref={contentRef} className={style.fitbox}>
                  {children}
                  {render && render(rect)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
};
ContextualMenu.displayName = "ContextualMenu";
export const useContextualMenu = (
  defaultIsOpen?: boolean,
): [React.MutableRefObject<any>, boolean, (nextValue?: any) => void, BoundingRect | undefined] => {
  const [open, toggle] = useToggle(defaultIsOpen ?? false);
  const ref = React.useRef<any>(null);
  const [rect, forceUpdate] = useMeasure(ref);
  React.useEffect(() => {
    forceUpdate();
  }, [open]);
  return [ref, open, toggle, rect];
};
