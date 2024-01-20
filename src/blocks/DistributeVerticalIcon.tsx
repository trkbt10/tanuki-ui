import * as React from "react";

export const DistributeVerticalIcon = ({ size, className }: { size: number; className?: string }) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 4h12v3H6V4zm2 6.5h8v3H8v-3zM6 17h12v3H6v-3zM3 2h18v2H3V2zm0 18h18v2H3v-2z" />
    </svg>
  );
};
DistributeVerticalIcon.displayName = "DistributeVerticalIcon";