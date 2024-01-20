import * as React from "react";

export const DistributeHorizontalIcon = ({ size, className }: { size: number; className?: string }) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 6v12h3V6H4zm6.5 2v8h3V8h-3zM17 6v12h3V6h-3zM2 3v18h2V3H2zm18 0v18h2V3h-2z" />
    </svg>
  );
};
DistributeHorizontalIcon.displayName = "DistributeHorizontalIcon";