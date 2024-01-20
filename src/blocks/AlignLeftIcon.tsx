import * as React from "react";

export const AlignLeftIcon = ({ size, className }: { size: number; className?: string }) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 2v20h2V2H3zm4 5v2h14V7H7zm0 4v2h10v-2H7zm0 4v2h14v-2H7z" />
    </svg>
  );
};
AlignLeftIcon.displayName = "AlignLeftIcon";