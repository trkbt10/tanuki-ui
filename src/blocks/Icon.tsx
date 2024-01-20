import { FC, memo, useMemo } from "react";
import style from "./Icon.module.css";
import React from "react";
export const Icon: FC<{
  src: string;
  width?: number | string;
  height?: number | string;
  size?: number;
}> = memo(({ src, width, height, size }) => {
  const postfix = useMemo(() => {
    const matches = src.match(/-([a-zA-Z]+)$/);
    if (!matches) {
      return null;
    }
    return matches[1];
  }, [src]);
  return (
    <i
      data-fa
      className={style.icon}
      data-icon={src}
      data-postfix={postfix}
      style={{
        width,
        height,
        fontSize: size ?? width,
      }}
    ></i>
  );
});
Icon.displayName = "Icon";

const IconBase = memo(({ children, size }: { children: React.ReactNode; size?: number }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      width={size}
      height={size}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
});

export const CloseIcon: FC<{
  size?: number;
}> = memo(({ size }) => {
  return (
    <IconBase size={size}>
      <path d="M203.6,73.72c5.84-5.88,5.84-15.42,0-21.31-5.84-5.88-15.3-5.88-21.14,0l-54.47,53.65-54.47-53.05c-5.84-5.88-15.3-5.88-21.14,0-5.84,5.88-5.84,15.42,0,21.31l54.49,53.03-54.49,54.93c-5.84,5.88-5.84,15.42,0,21.31,5.84,5.88,15.3,5.88,21.14,0l54.47-54.95,54.49,54.93c5.84,5.88,15.3,5.88,21.14,0,5.84-5.88,5.84-15.42,0-21.31l-54.51-54.91,54.49-53.63Z" />
    </IconBase>
  );
});
export const IndeterminateIcon: FC<{
  size?: number;
}> = memo(({ size }) => {
  return (
    <IconBase size={size}>
      <rect x="29.34" y="113.16" width="198.32" height="30.68" rx="15.34" ry="15.34" />
    </IconBase>
  );
});
export const Checkmark = ({ size }: { size?: number }) => {
  return (
    <IconBase size={size}>
      <path d="M231.6,56.14c6,6,6,15.75,0,21.76l-122.96,122.96c-6,6-15.75,6-21.76,0l-61.48-61.48c-6-6-6-15.75,0-21.76,6-6,15.75-6,21.76,0l50.62,50.57,112.1-112.05c6-6,15.75-6,21.76,0h-.05Z" />
    </IconBase>
  );
};
Checkmark.displayName = "Checkmark";
