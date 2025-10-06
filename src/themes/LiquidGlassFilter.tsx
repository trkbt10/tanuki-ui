import React, { useEffect, useRef, useState, useCallback } from "react";
import { FilterObserver } from "./filter-observer";
import { useComputedStyle } from "./useComputedStyle";

export const LiquidGlassFilter: React.FC = ({ filterPattern = 'url("#liquid-glass-filter")' }: { filterPattern?: string }) => {
  const [targetElement, setTargetElement] = useState<Set<{ target: Element; key: string }>>(() => new Set());
  useEffect(() => {
    const observer = new FilterObserver(filterPattern, (element) => {
      setTargetElement((prev) => {
        const newSet = new Set(prev);
        newSet.add({
          target: element as Element,
          key: element instanceof Element && element.id ? element.id : Math.random().toString(36).substr(2, 9),
        });
        return newSet;
      });
    });
    const lazy = setTimeout(() => {
      observer.start();
    }, 0);
    return () => {
      observer.stop();
      clearTimeout(lazy);
    };
  }, [filterPattern]);
  const canvasDPI = React.useMemo(() => {
    if (typeof window === "undefined") {
      return 1;
    }
    return window.devicePixelRatio ?? 1;
  }, []);
  return (
    <>
      {Array.from(targetElement).map((item) => {
        return <LiquidGlassFilterSVG key={item.key} target={item.target} id={item.key} dpi={canvasDPI} />;
      })}
    </>
  );
};

const smoothStep = (a: number, b: number, t: number): number => {
  t = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const length = (x: number, y: number): number => {
  return Math.sqrt(x * x + y * y);
};

const roundedRectSDF = (x: number, y: number, width: number, height: number, radius: number): number => {
  const qx = Math.abs(x) - width + radius;
  const qy = Math.abs(y) - height + radius;
  return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius;
};

const fragment = (uv: { x: number; y: number }) => {
  const ix = uv.x - 0.5;
  const iy = uv.y - 0.5;
  const distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.2, 0.6);
  const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15);
  const scaled = smoothStep(0, 1, displacement);
  return { type: "t", x: ix * scaled + 0.5, y: iy * scaled + 0.5 };
};
export const LiquidGlassFilterSVG: React.FC<{
  dpi: number;
  target: Element;
  id: string;
}> = ({ target, id, dpi }) => {
  const [feDisplacementScale, setFeDisplacementScale] = useState<number>(0);

  const [feImageHref, setFeImageHref] = useState<string | null>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) {
      return;
    }

    const w = Math.floor(dimensions.width * dpi);
    const h = Math.floor(dimensions.height * dpi);
    const offscreenCanvas = new OffscreenCanvas(w, h);
    offscreenCanvas.width = w;
    offscreenCanvas.height = h;
    const context = offscreenCanvas.getContext("2d");
    if (!context) {
      return;
    }
    const imageData = context.createImageData(w, h);

    let maxScale = 0;
    const rawValues: number[] = [];

    for (let i = 0; i < imageData.data.length; i += 4) {
      const x = (i / 4) % w;
      const y = Math.floor(i / 4 / w);
      const pos = fragment({ x: x / w, y: y / h });
      const dx = pos.x * w - x;
      const dy = pos.y * h - y;
      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
      rawValues.push(dx, dy);
    }

    maxScale *= 0.5;

    let index = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = rawValues[index++] / maxScale + 0.5;
      const g = rawValues[index++] / maxScale + 0.5;
      imageData.data[i] = r * 255;
      imageData.data[i + 1] = g * 255;
      imageData.data[i + 2] = 0;
      imageData.data[i + 3] = 255;
    }
    context.putImageData(imageData, 0, 0);
    offscreenCanvas.convertToBlob().then((blob) => {
      setFeImageHref(URL.createObjectURL(blob));
    });
    setFeDisplacementScale(maxScale / dpi);
  }, [dimensions.width, dimensions.height, dpi]);
  useEffect(() => {
    return () => {
      if (feImageHref?.startsWith("blob:")) {
        URL.revokeObjectURL(feImageHref);
      }
    };
  }, [feImageHref]);
  useEffect(() => {
    if (!target) {
      return;
    }

    const updateTargetBounds = () => {
      const rect = target.getBoundingClientRect();

      setDimensions((prev) => {
        if (prev.width === rect.width && prev.height === rect.height) {
          return prev;
        }
        return {
          width: rect.width,
          height: rect.height,
        };
      });

      setPosition((prev) => {
        if (prev.x === rect.left && prev.y === rect.top) {
          return prev;
        }
        return {
          x: rect.left,
          y: rect.top,
        };
      });
    };
    let rafId: number;
    const trackPosition = () => {
      updateTargetBounds();
      rafId = requestAnimationFrame(trackPosition);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateTargetBounds();
    });

    resizeObserver.observe(target);
    trackPosition();

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      resizeObserver.disconnect();
    };
  }, [target]);

  const style = useComputedStyle(target);
  const containerStyle: React.CSSProperties = React.useMemo(() => {
    return {
      position: "fixed",
      top: position.y,
      left: position.x,
      width: dimensions.width,
      height: dimensions.height,
      overflow: "hidden",
      boxShadow: style?.boxShadow,
      borderRadius: style?.borderRadius,
      backdropFilter: `url(#${id}_filter) blur(0.25px) contrast(1.2) brightness(1.05) saturate(1.1)`,
      zIndex: style?.zIndex,
      pointerEvents: "none",
    };
  }, [position.x, position.y, dimensions.width, dimensions.height, id, style?.borderRadius, style?.boxShadow]);
  // Don't render if dimensions haven't been set yet
  if (dimensions.width === 0 || dimensions.height === 0) {
    return null;
  }

  return (
    <>
      {/* SVG Filter */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9998,
        }}
      >
        <defs>
          <filter
            id={`${id}_filter`}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
            x="0"
            y="0"
            width={dimensions.width.toString()}
            height={dimensions.height.toString()}
          >
            <feImage
              id={`${id}_map`}
              width={dimensions.width.toString()}
              height={dimensions.height.toString()}
              xlinkHref={feImageHref || undefined}
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2={`${id}_map`}
              xChannelSelector="R"
              yChannelSelector="G"
              scale={feDisplacementScale}
            />
          </filter>
        </defs>
      </svg>

      <div style={containerStyle} />
    </>
  );
};
