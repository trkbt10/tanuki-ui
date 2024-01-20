import * as React from "react";

export const AlignMiddleIcon = ({ size, className }: { size: number; className?: string }) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 5v14h2V5H7zm4 2v10h2V7h-2zm4-2v14h2V5h-2zM2 11v2h20v-2H2z" />
    </svg>
  );
};
AlignMiddleIcon.displayName = "AlignMiddleIcon";