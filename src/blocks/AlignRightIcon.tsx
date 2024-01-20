import * as React from "react";

export const AlignRightIcon = ({ size, className }: { size: number; className?: string }) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 2v20h2V2h-2zM3 7v2h14V7H3zm4 4v2h10v-2H7zm-4 4v2h14v-2H3z" />
    </svg>
  );
};
AlignRightIcon.displayName = "AlignRightIcon";