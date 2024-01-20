import * as React from "react";

export const AlignCenterIcon = ({ size, className }: { size: number; className?: string }) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 7v2h14V7H5zm2 4v2h10v-2H7zm-2 4v2h14v-2H5z" />
    </svg>
  );
};
AlignCenterIcon.displayName = "AlignCenterIcon";