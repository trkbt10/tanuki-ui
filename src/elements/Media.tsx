import React from "react";
import { useIsomorphicLayoutEffect } from "react-use";

export type MediaSourceProps =
  | string
  | { src: string; alt?: string }
  | HTMLVideoElement
  | HTMLImageElement
  | HTMLCanvasElement
  | HTMLObjectElement
  | HTMLIFrameElement;

export const Media = ({ source, className }: { source: MediaSourceProps; className?: string }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    if (
      source instanceof HTMLVideoElement ||
      source instanceof HTMLImageElement ||
      source instanceof HTMLCanvasElement ||
      source instanceof HTMLObjectElement ||
      source instanceof HTMLIFrameElement
    ) {
      // 直接DOM要素が渡された場合はそのまま表示
      container.appendChild(source);
      return () => {
        if (container.contains(source)) {
          container.removeChild(source);
        }
      };
    }
    return () => {};
  }, [source]);

  if (typeof source === "string") {
    return <img src={source} className={className} />;
  }
  if (typeof source === "object" && "src" in source && typeof source.src === "string") {
    const alt = "alt" in source && typeof source.alt === "string" ? source.alt : "";
    return <img src={source.src} alt={alt} className={className} />;
  }
  return (
    <div ref={containerRef} className={className}>
      {React.isValidElement(source) ? React.cloneElement(source, {}) : <div className={className}>Unsupported media type</div>}
    </div>
  );
};
