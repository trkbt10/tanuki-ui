import React, { useEffect, useRef } from "react";

interface LiquidGlassFilterProps {
  id?: string;
  scale?: number;
  animationDuration?: string;
}

export function LiquidGlassFilter({
  id = "liquid-glass-filter",
  scale = 1.2,
  animationDuration = "0.3s",
}: LiquidGlassFilterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate normal map dynamically based on shape
  const generateNormalMap = (width: number, height: number, shape: "circle" | "rectangle" = "circle") => {
    const canvas = canvasRef.current;
    if (!canvas) return "";

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;

        let nx, ny, nz;

        if (shape === "circle") {
          // Calculate distance from center
          const dx = x - centerX;
          const dy = y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance <= radius) {
            // Inside circle - calculate normal based on sphere surface
            const normalizedDx = dx / radius;
            const normalizedDy = dy / radius;
            const z = Math.sqrt(Math.max(0, 1 - normalizedDx * normalizedDx - normalizedDy * normalizedDy));

            nx = normalizedDx;
            ny = normalizedDy;
            nz = z;
          } else {
            // Outside circle - flat normal
            nx = 0;
            ny = 0;
            nz = 1;
          }
        } else {
          // Rectangle shape with rounded edges
          const edgeDistance = Math.min(x, y, width - x - 1, height - y - 1);
          const normalizedEdge = Math.min(edgeDistance / 20, 1); // 20px edge softness

          nx = (x / width - 0.5) * normalizedEdge;
          ny = (y / height - 0.5) * normalizedEdge;
          nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
        }

        // Convert normal to RGB (0-255 range)
        data[index] = Math.floor((nx + 1) * 127.5); // Red channel (X)
        data[index + 1] = Math.floor((ny + 1) * 127.5); // Green channel (Y)
        data[index + 2] = Math.floor(nz * 255); // Blue channel (Z)
        data[index + 3] = 255; // Alpha
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  };

  useEffect(() => {
    // Generate normal map when component mounts
    generateNormalMap(256, 256, "circle");
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{ display: "none" }} width={256} height={256} />
      <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }} aria-hidden="true">
        <defs>
          <filter id={id} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
            <feDisplacementMap in="SourceGraphic" in2="blurred" scale="77" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </>
  );
}

// Hook for easy integration with existing components
export function useLiquidGlass(filterId: string = "liquid-glass-filter") {
  return {
    style: {
      backdropFilter: `url(#${filterId}) blur(20px)`,
      WebkitBackdropFilter: `url(#${filterId}) blur(20px)`,
    },
    className: "liquid-glass-element",
  };
}
