import * as React from "react";

export const AlignBottomIcon = ({ size, className }: { size: number; className?: string }) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 3v14h2V3H7zm4 4v10h2V7h-2zm4-4v14h2V3h-2zM2 19v2h20v-2H2z" />
    </svg>
  );
};
AlignBottomIcon.displayName = "AlignBottomIcon";