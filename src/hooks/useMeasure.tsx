import * as React from "react";

type BoundingRect = {
  x: number;
  y: number;
  height: number;
  width: number;
};
export const useMeasure = <T extends HTMLElement = HTMLElement>(ref: React.RefObject<T | null>) => {
  const [measure, setMeasure] = React.useState<BoundingRect>();
  const debounced = React.useDeferredValue(measure);
  const measuring = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    const boundingBox = ref.current.getBoundingClientRect();
    setMeasure({
      x: boundingBox.x,
      y: boundingBox.y,
      width: boundingBox.width,
      height: boundingBox.height,
    });
  }, [setMeasure]);
  React.useEffect(() => {
    window.addEventListener("scroll", measuring);
    return () => {
      window.removeEventListener("scroll", measuring);
    };
  }, []);
  React.useEffect(() => {
    window.addEventListener("resize", measuring, false);
    measuring();
    return () => {
      window.removeEventListener("resize", measuring, false);
    };
  }, [measuring]);
  React.useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      measuring();
    });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, [measuring]);
  return [debounced, measuring] as const;
};
