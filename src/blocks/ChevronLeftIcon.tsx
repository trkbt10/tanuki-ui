import * as React from "react";

type Direction = "left" | "right" | "up" | "down";

type BaseProps = {
  size?: number;
  className?: string;
  direction?: Direction;
};

const rotationMap: Record<Direction, number> = {
  left: 0,
  right: 180,
  up: -90,
  down: 90,
};

const ChevronIconBase: React.FC<BaseProps> = ({ size = 16, className, direction = "left" }) => {
  const rotation = rotationMap[direction];

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <g transform={`rotate(${rotation} 12 12)`}>
        <path d="M15.41 7.41 14 6 8 12l6 6 1.41-1.41L10.83 12z" />
      </g>
    </svg>
  );
};

ChevronIconBase.displayName = "ChevronIconBase";

export type ChevronLeftIconProps = Omit<BaseProps, "direction">;

export const ChevronLeftIcon: React.FC<ChevronLeftIconProps> = (props) => {
  return <ChevronIconBase {...props} direction="left" />;
};
ChevronLeftIcon.displayName = "ChevronLeftIcon";

export const ChevronRightIcon: React.FC<ChevronLeftIconProps> = (props) => {
  return <ChevronIconBase {...props} direction="right" />;
};
ChevronRightIcon.displayName = "ChevronRightIcon";

export const ChevronUpIcon: React.FC<ChevronLeftIconProps> = (props) => {
  return <ChevronIconBase {...props} direction="up" />;
};
ChevronUpIcon.displayName = "ChevronUpIcon";

export const ChevronDownIcon: React.FC<ChevronLeftIconProps> = (props) => {
  return <ChevronIconBase {...props} direction="down" />;
};
ChevronDownIcon.displayName = "ChevronDownIcon";
