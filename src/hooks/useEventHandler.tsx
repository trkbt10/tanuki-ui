import React from "react";
const compareObjects = (prev: any, next: any) => {
  if (prev === next) return true;
  if (typeof prev !== "object" || typeof next !== "object") return false;
  if (Object.keys(prev).length !== Object.keys(next).length) return false;

  for (const key in prev) {
    if (prev[key] !== next[key]) return false;
  }
  return true;
};
const useMemoCompare = <T,>(value: T): T => {
  const ref = React.useRef<T>(value);
  if (!compareObjects(ref.current, value)) {
    ref.current = value;
  }
  return ref.current;
};
export const useEventHandler = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  eventName: keyof HTMLElementEventMap,
  handler: (event: HTMLElementEventMap[keyof HTMLElementEventMap]) => void,
  options?: boolean | AddEventListenerOptions,
): void => {
  const memorizedOptions = useMemoCompare(options);
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const eventHandler = (event: HTMLElementEventMap[keyof HTMLElementEventMap]) => {
      handler(event);
    };

    element.addEventListener(eventName, eventHandler, memorizedOptions);

    return () => {
      element.removeEventListener(eventName, eventHandler, memorizedOptions);
    };
  }, [ref, eventName, handler, memorizedOptions]);
};
