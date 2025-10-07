import React from "react";
import styles from "./EditorSurface.module.css";

interface EditorSurfaceProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const EditorSurface: React.FC<EditorSurfaceProps> = ({ children, className, style }) => {
  return (
    <div className={`${styles.editorSurface} ${className || ""}`}>
      <div className={styles.editorSurfaceInner} style={style}>
        {children}
      </div>
    </div>
  );
};
