import React, { useEffect, useRef, useState } from "react";

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
  const [bumpMap, setBumpMap] = useState<string | null>(null);
  const [animateRipples, setAnimateRipples] = useState(true);

  const generateBumpTexture = (width: number, height: number, curvature: number) => {
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
    const maxRadius = Math.min(centerX, centerY);
    const curvatureClamp = Math.min(Math.max(curvature, 0.6), 2.5);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;

        const normalizedX = (x - centerX) / maxRadius;
        const normalizedY = (y - centerY) / maxRadius;
        const radialDistance = Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY);

        const falloff = Math.max(0, 1 - Math.pow(radialDistance, curvatureClamp * 1.15));

        let heightValue = 0;
        if (falloff > 0) {
          const directionalSheen = Math.max(0, 1 - Math.abs(normalizedX * 0.55 + normalizedY * 0.4));
          const microRipple = Math.max(0, Math.sin((normalizedX + normalizedY) * Math.PI * 0.9) * 0.08);
          heightValue = Math.min(1, falloff * 0.82 + directionalSheen * 0.28 + microRipple);
        }

        const intensity = Math.pow(heightValue, 1.1);
        const channelValue = Math.round(intensity * 255);
        const alpha = falloff > 0 ? Math.max(0.18, falloff) : 0;

        data[index] = channelValue;
        data[index + 1] = channelValue;
        data[index + 2] = channelValue;
        data[index + 3] = Math.round(alpha * 255);
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/png");
  };

  useEffect(() => {
    const texture = generateBumpTexture(256, 256, scale);
    setBumpMap(texture || null);
  }, [scale]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      setAnimateRipples(true);
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAnimateRipples(!mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const displacementScale = 18 * scale;
  const surfaceScale = 3.6 * scale;

  return (
    <>
      <canvas ref={canvasRef} style={{ display: "none" }} width={256} height={256} />
      <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }} aria-hidden="true">
        <defs>
          <filter
            id={id}
            x="-45%"
            y="-45%"
            width="190%"
            height="190%"
            filterUnits="objectBoundingBox"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="baseBlur" />
            <feColorMatrix
              in="baseBlur"
              type="matrix"
              values="1.08 0 0 0 0  0 1.08 0 0 0  0 0 1.08 0 0  0 0 0 1 0"
              result="saturated"
            />
            <feComponentTransfer in="saturated" result="lifted">
              <feFuncR type="gamma" amplitude="1" exponent="0.92" offset="0.015" />
              <feFuncG type="gamma" amplitude="1" exponent="0.92" offset="0.015" />
              <feFuncB type="gamma" amplitude="1" exponent="0.92" offset="0.02" />
              <feFuncA type="gamma" amplitude="1" exponent="1" offset="0" />
            </feComponentTransfer>
            <feTurbulence type="fractalNoise" baseFrequency="0.7 0.9" numOctaves="2" seed="28" result="ripples">
              {animateRipples && (
                <animate
                  attributeName="baseFrequency"
                  dur={animationDuration}
                  values="0.6 0.85;0.88 1.1;0.6 0.85"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feGaussianBlur in="ripples" stdDeviation="0.45" result="softRipples" />
            <feDisplacementMap
              in="lifted"
              in2="softRipples"
              scale={displacementScale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="refracted"
            >
              {animateRipples && (
                <animate
                  attributeName="scale"
                  dur={animationDuration}
                  values={`${displacementScale};${displacementScale * 1.18};${displacementScale}`}
                  repeatCount="indefinite"
                />
              )}
            </feDisplacementMap>
            <feGaussianBlur in="SourceAlpha" stdDeviation="2.6" result="edgeBlur" />
            <feColorMatrix
              in="edgeBlur"
              type="matrix"
              values="0 0 0 0 0.14  0 0 0 0 0.18  0 0 0 0 0.22  0 0 0 0.55 0"
              result="edgeTint"
            />
            {bumpMap && (
              <>
                <feImage xlinkHref={bumpMap} preserveAspectRatio="xMidYMid slice" result="bump" />
                <feGaussianBlur in="bump" stdDeviation="1.15" result="softBump" />
                <feSpecularLighting
                  in="softBump"
                  surfaceScale={surfaceScale}
                  specularConstant="0.9"
                  specularExponent="34"
                  lightingColor="#ffffff"
                  result="specular"
                >
                  <fePointLight x="-160" y="-220" z="600" />
                </feSpecularLighting>
                <feComposite in="specular" in2="SourceAlpha" operator="in" result="highlight" />
                <feBlend in="highlight" in2="edgeTint" mode="screen" result="glaze" />
              </>
            )}
            <feFlood floodColor="#ffffff" floodOpacity="0.05" result="sheenFill" />
            <feComposite in="sheenFill" in2="SourceAlpha" operator="in" result="sheen" />
            <feBlend in={bumpMap ? "glaze" : "edgeTint"} in2="refracted" mode="overlay" result="layeredGlass" />
            <feBlend in="layeredGlass" in2="sheen" mode="screen" result="withSheen" />
            <feComposite in="withSheen" in2="SourceAlpha" operator="in" result="finalGlass" />
            <feColorMatrix in="finalGlass" type="saturate" values="1.08" />
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
