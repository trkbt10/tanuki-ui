import * as React from "react";
import { drawSquirclePath } from "./drawSquirclePath";
export const composeArrowPosition = ({
  x,
  y,
  width,
  height,
  lookAtX,
  lookAtY,
  rx = 10,
  shadowMargin = 40,
  chevronSize = 16,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  lookAtX: number;
  lookAtY: number;
  rx?: number;
  shadowMargin?: number;
  chevronSize?: number;
}) => {
  const hw = width / 2;
  const hh = height / 2;

  const cpX = x + hw;
  const cpY = y + hh;
  const t = Math.atan2(lookAtY - cpY, lookAtX - cpX);

  let x2 = Math.min(Math.max(lookAtX - cpX, -hw), hw);
  let y2 = Math.min(Math.max(lookAtY - cpY, -hh), hh);

  const radius = rx * 2;
  const isPointInAreaOfCorner = (x: number, y: number) => {
    const dx = Math.abs(x) - hw;
    const dy = Math.abs(y) - hh;
    const isin = dx * dx + dy * dy < radius * radius;
    return isin;
  };
  if (isPointInAreaOfCorner(x2, y2)) {
    const angle = Math.floor(4 * ((t % (Math.PI * 2)) / (Math.PI * 2)));
    if (angle % 2 === 0) {
      x2 = Math.min(Math.max(x2, -hw), hw);
      y2 = Math.min(Math.max(y2, -hh + radius), hh - radius);
    } else {
      x2 = Math.min(Math.max(x2, -hw + radius), hw - radius);
      y2 = Math.min(Math.max(y2, -hh), hh);
    }
  }

  const arrowSnapPoint = {
    x: Math.min(Math.max(x2, -hw), hw) + width / 2 - chevronSize / 2,
    y: Math.min(Math.max(y2, -hh), hh) + height / 2 - chevronSize / 2,
  };
  const angle = (() => {
    const top = arrowSnapPoint.y < 0;
    const left = arrowSnapPoint.x < 0;
    const right = arrowSnapPoint.x > width - chevronSize;
    const bottom = arrowSnapPoint.y > height - chevronSize;
    if (bottom) {
      return 0;
    }
    if (top) {
      return 2;
    }
    if (left) {
      return 3;
    }
    if (right) {
      return 1;
    }
    return 0;
  })();
  return {
    arrowSnapPoint,
    angle,
  };
};
export const ContextualMenuBalloon: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  lookAtX: number;
  lookAtY: number;
  rx?: number;
  shadowMargin?: number;
  chevronSize?: number;
}> = ({ width, height, x, y, lookAtX, lookAtY, rx = 10, shadowMargin = 40, chevronSize = 16 }) => {
  const deps = [x, y, width, height, lookAtX, lookAtY, rx, shadowMargin, chevronSize];
  const arrowPath = React.useMemo(() => {
    const { arrowSnapPoint, angle } = composeArrowPosition({
      x,
      y,
      width,
      height,
      lookAtX,
      lookAtY,
      rx,
      shadowMargin,
      chevronSize,
    });
    return (
      <>
        <g transform={`translate(${arrowSnapPoint.x}, ${arrowSnapPoint.y})`}>
          <g transform={`translate(8, 8) rotate(${angle * 90}) translate(-8, -8)`}>
            <rect x="0" y="0" width="16" height="16" fill="transparent"></rect>
            <g transform="translate(-15, 16)">
              <path d="M7,-8.105 L10.3641716,-8.105 C12.6069526,-8.105 14.569386,-7.41371956 16.2514718,-6.03115868 C18.7746005,-3.95731736 19.6156434,-2.9203967 21.2977292,-1.1921956 C22.979815,0.536005499 23.8208579,0.536005499 25.5029437,-1.1921956 C27.1850294,-2.9203967 28.8671152,-4.6485978 30.549201,-6.03115868 C32.2312868,-7.41371956 33.0723297,-8.105 37.2775442,-8.105 C40.0810205,-8.105 41.4827586,-8.105 41.4827586,-8.105 L7,-8.105 Z"></path>
            </g>
          </g>
        </g>
      </>
    );
  }, deps);
  const filterId = React.useId();
  return (
    <svg
      style={{
        position: "absolute",
        left: -shadowMargin,
        top: -shadowMargin,
        width: width + shadowMargin * 2,
        height: height + shadowMargin * 2,
      }}
      viewBox={`${-shadowMargin} ${-shadowMargin} ${width + shadowMargin * 2} ${height + shadowMargin * 2}`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <filter x="-26.9%" y="-32.0%" width="161.5%" height="164.0%" filterUnits="objectBoundingBox" id={filterId}>
          <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
          <feGaussianBlur stdDeviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
          <feColorMatrix
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.55 0"
            type="matrix"
            in="shadowBlurOuter1"
            result="shadowMatrixOuter1"
          ></feColorMatrix>
          <feOffset dx="8" dy="0" in="SourceAlpha" result="shadowOffsetOuter2"></feOffset>
          <feGaussianBlur stdDeviation="20" in="shadowOffsetOuter2" result="shadowBlurOuter2"></feGaussianBlur>
          <feColorMatrix
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0"
            type="matrix"
            in="shadowBlurOuter2"
            result="shadowMatrixOuter2"
          ></feColorMatrix>
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
            <feMergeNode in="shadowMatrixOuter2"></feMergeNode>
          </feMerge>
        </filter>
      </defs>
      <g fillRule="evenodd" stroke="none" strokeWidth="1">
        <g style={{ mixBlendMode: "multiply" }}>
          <g fill="var(--textColor)" fillOpacity="1" filter={`url(#${filterId})`}>
            <SquircleRect x={0} y={0} rx={rx} width={width} height={height}></SquircleRect>
            {arrowPath}
          </g>
          <g fill="var(--windowBackgroundColor)" filter="var(--dialogBackgroundFilter)">
            <SquircleRect x={0} y={0} rx={rx} width={width} height={height}></SquircleRect>
            {arrowPath}
          </g>
        </g>
      </g>
    </svg>
  );
};
const SquircleRect = ({ x, y, width, height, rx }: { x: number; y: number; width: number; height: number; rx?: number }) => {
  const d = drawSquirclePath(x, y, width, height, rx ?? 0);
  return <path d={d}></path>;
};
