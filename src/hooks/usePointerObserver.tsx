import * as React from "react";
import { PointerManager, ObservePointerCallback } from "./pointer-utilities/ObservePointerCallback";
export type { ObservePointerCallback };
export type PointerInfo = {
  pointerId: string;
  type: "pointerdown" | "pointerend" | "pointermove";
  timestamp: number;
  elapsedtime: number;
  pageX: number;
  pageY: number;
  deltaX: number;
  deltaY: number;
  startX: number;
  startY: number;
  clientX: number;
  clientY: number;
  offsetX: number;
  offsetY: number;
  button: number;
  isFinal: boolean;
  target: Element;
  defaultPrevented: boolean;
  ZIndexList: number[];
};

let tm: PointerManager;

export const useObservePointer = <T extends HTMLElement | SVGElement>(
  ref: React.RefObject<T | null>,
  callback: ObservePointerCallback,
) => {
  if (!tm) {
    tm = new PointerManager();
  }
  const callbackRef = React.useRef<ObservePointerCallback>(callback);
  callbackRef.current = callback;

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    const elm = ref.current as HTMLElement;
    const handlePointerDown = (e: PointerEvent) => {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      tm.addTrackTarget(e, (params) => {
        if (!callbackRef.current) {
          return;
        }
        callbackRef.current(params);
      });
    };
    elm.addEventListener("pointerdown", handlePointerDown);
    return () => {
      elm.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);
};
export const observePointer = useObservePointer;

export const usePointerObserver = <T extends HTMLElement | SVGElement>(ref: React.RefObject<T>) => {
  const [pointerInfo, setPointerInfo] = React.useState<PointerInfo>();
  useObservePointer(ref, setPointerInfo);
  return [pointerInfo];
};
