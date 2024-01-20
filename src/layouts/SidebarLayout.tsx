import * as React from "react";
import { useObservePointer, type PointerInfo } from "../hooks/usePointerObserver";
import classes from "./SidebarLayout.module.css";

type SidebarLayoutProps = {
  aside: React.ReactNode;
  children: React.ReactNode;
  /** aria-labelやidなど、永続化用の識別子 */
  asideId?: string;
  /** asideの最小幅 */
  minAsideWidth?: number;
  /** asideの最大幅 */
  maxAsideWidth?: number;
};

const DEFAULT_WIDTH = 240;
const MIN_WIDTH = 120;
const MAX_WIDTH = 480;

const useStateWithStorage = (key: string | undefined, initialValue: number) => {
  const [value, setValue] = React.useState<number>(initialValue);

  React.useEffect(() => {
    if (key) {
      if (typeof window === "undefined") {
        return;
      }
      const saved = window.localStorage.getItem(key);
      if (saved) {
        const num = Number(saved);
        if (!isNaN(num)) setValue(Math.min(Math.max(num, MIN_WIDTH), MAX_WIDTH));
      }
    }
  }, [key]);

  React.useEffect(() => {
    if (key) {
      if (typeof window === "undefined") {
        return;
      }
      window.localStorage.setItem(key, String(value));
    }
  }, [value, key]);

  return [value, setValue] as const;
};

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  aside,
  children,
  asideId,
  minAsideWidth = MIN_WIDTH,
  maxAsideWidth = MAX_WIDTH,
}) => {
  const storageKey = asideId ? `SidebarLayout:width:${asideId}` : undefined;
  const [asideWidth, setAsideWidth] = useStateWithStorage(storageKey, DEFAULT_WIDTH);

  // resizer用ref
  const resizerRef = React.useRef<HTMLDivElement>(null);

  // ドラッグ状態・リサイズ処理
  const isDragging = React.useRef(false);
  const baseRect = React.useRef<DOMRect | null>(null);

  const handlePointer = React.useCallback(
    (info: PointerInfo) => {
      if (info.type === "pointerdown") {
        isDragging.current = true;
        baseRect.current = document.querySelector(`.${classes.base}`)?.getBoundingClientRect() ?? null;
      } else if (info.type === "pointermove" && isDragging.current && baseRect.current) {
        const newWidth = Math.min(Math.max(info.pageX - baseRect.current.left, minAsideWidth), maxAsideWidth);
        setAsideWidth(newWidth);
      } else if (info.type === "pointerend") {
        isDragging.current = false;
        baseRect.current = null;
      }
    },
    [minAsideWidth, maxAsideWidth],
  );

  useObservePointer(resizerRef, handlePointer);

  return (
    <div className={classes.base}>
      <aside className={classes.aside} style={{ width: asideWidth }} aria-label={asideId} id={asideId}>
        {aside}
      </aside>
      <div
        className={classes.resizer}
        ref={resizerRef}
        role="separator"
        aria-orientation="vertical"
        tabIndex={0}
        aria-label="resize"
        style={{ left: asideWidth - 4 }}
      />
      <main className={classes.main}>{children}</main>
    </div>
  );
};
SidebarLayout.displayName = "SidebarLayout";
