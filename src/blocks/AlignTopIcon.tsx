import * as React from "react";

export const AlignTopIcon = ({ size, className }: { size: number; className?: string }) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 3v2h20V3H2zm5 4v14h2V7H7zm4 0v10h2V7h-2zm4 0v14h2V7h-2z" />
    </svg>
  );
};
AlignTopIcon.displayName = "AlignTopIcon";