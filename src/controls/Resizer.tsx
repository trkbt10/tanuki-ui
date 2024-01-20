import * as React from "react";
import style from "./Resizer.module.css";
import { useObservePointer } from "../hooks/usePointerObserver";
import { ObservePointerCallback } from "../hooks/pointer-utilities/ObservePointerCallback";
import { useMeasure } from "../hooks/useMeasure";
const inRange = (val: number, amount: number) => {
  return -amount < val && val < amount;
};
const pack = (val: number, min: number, max: number) => {
  // どちらか近い方に丸める
  if (val < min) {
    return min;
  }
  if (val > max) {
    return max;
  }
  return (min + max) / 2;
};
export type OnResize = (params: { x: number; y: number; width: number; height: number }, final: boolean) => void;
export const useResizer = (ref: React.RefObject<HTMLDivElement>, onResize: OnResize) => {
  const [bound] = useMeasure(ref);
  const hoverRef = React.useRef(false);

  React.useEffect(() => {
    const elm = ref.current;
    if (!elm) {
      return;
    }
    const handleHover = (e: PointerEvent) => {
      const isHover = e.type === "pointerover" || e.type === "pointermove";
      const bound = elm.getBoundingClientRect();
      const area = 12;
      const x = e.pageX - bound.x;
      const y = e.pageY - bound.y;
      const edges = {
        x: inRange(x, area),
        y: inRange(y, area),
        width: inRange(bound.width - x, area),
        height: inRange(bound.height - y, area),
      };

      const isEdge = edges.x || edges.y || edges.width || edges.height;
      if (isHover && isEdge) {
        // ew-resize, ns-resize, nwse-resize, nesw-resize
        const horizontal = edges.x ? "w" : edges.width ? "e" : "";
        const vertical = edges.y ? "n" : edges.height ? "s" : "";

        let cursor = "auto";

        if (horizontal && vertical) {
          const direction = vertical + horizontal;
          cursor = direction === "nw" || direction === "se" ? "nwse-resize" : "nesw-resize";
        } else if (horizontal) {
          cursor = "ew-resize";
        } else if (vertical) {
          cursor = "ns-resize";
        }
        hoverRef.current = true;
        elm.style.cursor = cursor;
      } else {
        hoverRef.current = false;
        elm.style.cursor = "auto";
      }
    };
    elm.addEventListener("pointerover", handleHover);
    window.addEventListener("pointermove", handleHover);
    elm.addEventListener("pointerout", handleHover);
    return () => {
      elm.removeEventListener("pointerover", handleHover);
      window.addEventListener("pointermove", handleHover);
      elm.removeEventListener("pointerout", handleHover);
    };
  }, [ref]);
  const dragging = React.useRef<{
    active: boolean;
    x: number;
    y: number;
  }>({
    active: false,
    x: 0,
    y: 0,
  });

  const handler: ObservePointerCallback = React.useCallback(
    (e) => {
      if (!bound) {
        return;
      }
      if (!dragging.current.active && hoverRef.current) {
        const x = e.pageX - bound.x;
        const y = e.pageY - bound.y;
        const originX = pack(1 - x / bound.width, 0, 1);
        const originY = pack(1 - y / bound.height, 0, 1);
        dragging.current = {
          active: e.isFinal ? false : true,
          x: originX,
          y: originY,
        };
      }

      if (!hoverRef.current && !dragging.current.active) {
        return;
      }
      onResize(resize(e.deltaX, e.deltaY, dragging.current.x, dragging.current.y), e.isFinal);
    },
    [bound],
  );
  useObservePointer(ref, handler);
  return;
};
export const Resizer: React.FC<{
  onResize: OnResize;
  max?: number;
  min?: number;
  step?: number;
  originX?: number;
  originY?: number;
  autoplace?: boolean;
}> = ({ autoplace = true, onResize, originX, originY, max, min, step }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const origin = React.useMemo(() => ({ x: originX ?? 0.5, y: originY ?? 0.5 }), [originX, originY]);
  const handler: ObservePointerCallback = React.useCallback(
    (e) => {
      if (e.type === "pointerdown") {
        return;
      }
      onResize(resize(e.deltaX, e.deltaY, origin.x, origin.y), e.isFinal);
    },
    [max, min, step, origin],
  );
  useObservePointer(ref, handler);
  const position = React.useMemo(() => {
    if (autoplace) {
      // 0,0を原点としたカーソルの傾きでカーソルを変える
      const angle = Math.atan2(origin.y, origin.x);
      // 45度ごとに変える。
      const cursors = ["ew", "nwse", "ns", "nesw", "ew", "nwse", "ns", "nesw"];
      const index = Math.round(angle / (Math.PI / 4));

      const cursor = `${cursors.at(index)}-resize`;
      // -1 ~ 1の範囲を0 ~ 100%に変換
      const top = (origin.x + 1) / 2;
      const left = (origin.y + 1) / 2;
      return {
        top: `${top * 100}%`,
        left: `${left * 100}%`,
        cursor,
        content: `${angle}`,
      };
    }
    return {};
  }, [autoplace, origin]);
  return <div className={style.resizer} ref={ref} style={position}></div>;
};
Resizer.displayName = "Resizer";

export const resize = (
  deltaX: number,
  deltaY: number,
  originX: number,
  originY: number,
): { x: number; y: number; width: number; height: number } => {
  // originは -1 ~ 1の範囲で、0,0が中心
  // deltaX, deltaYは移動量
  // x, yは左上の座標
  const x = originX;
  const y = originY;
  const width = deltaX;
  const height = deltaY;
  return { x, y, width, height };
};
