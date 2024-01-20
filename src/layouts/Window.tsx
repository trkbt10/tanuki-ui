import React, { useId, useRef } from "react";
import classes from "./Window.module.css";
import { useObservePointer, ObservePointerCallback } from "../hooks/usePointerObserver";
import { createPortal } from "react-dom";
export type WindowProps = {
  id?: string;
  children?: React.ReactNode;
  height?: number;
  width?: number;
  top?: number;
  left?: number;
  resizable?: boolean;
  expand?: boolean;
  fullscreen?: boolean;
  onClose?: () => void;
  title?: string;
  open?: boolean;
  style?: React.CSSProperties;
  titleBarMode?: "default" | "hidden";
  icons?: {
    close?: React.ReactNode;
    expand?: React.ReactNode;
    fullscreen?: React.ReactNode;
  };
};

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};
const between = (value: number, range: number) => {
  return value >= -range && value <= +range;
};
const getDirection = (offsetX: number, offsetY: number, width: number, height: number, edgeSize: number) => {
  let dir = 0b0000; // left, right, top, bottom
  // 左
  if (between(offsetX, edgeSize)) {
    dir |= 0b1000;
  }
  // 右
  if (between(offsetX - width, edgeSize)) {
    dir |= 0b0100;
  }
  // 上
  if (between(offsetY, edgeSize)) {
    dir |= 0b0010;
  }
  // 下
  if (between(offsetY - height, edgeSize)) {
    dir |= 0b0001;
  }

  return dir;
};
const nextZIndex = (id: string) => {
  const windows = document.getElementsByClassName(classes.windowContainer);
  const zIndexes = Array.from(windows).map((x) => {
    if (x instanceof HTMLElement) {
      return parseInt(x.style.zIndex, 10);
    }
    return 0;
  });
  const max = zIndexes.length > 0 ? Math.max(...zIndexes) : 0;
  return max + 1;
};
export const Window: React.FC<WindowProps> = (props) => {
  const mountNode = React.useRef<HTMLDivElement>(null);
  const id = props.id || useId();
  const [expand, setExpand] = React.useState(true);

  if (!mountNode.current && typeof document !== "undefined") {
    const mountPoint = document.querySelector(`.${classes.window}`);
    if (mountPoint) {
      mountNode.current = mountPoint as HTMLDivElement;
    } else {
      mountNode.current = document.createElement("div");
      mountNode.current.className = classes.window;
      document.body.appendChild(mountNode.current);
    }
  }
  React.useEffect(() => {
    if (!mountNode.current) {
      return;
    }
    const childrenCount = mountNode.current.children.length;
    return () => {
      if (childrenCount <= 0) {
        mountNode.current?.remove();
      }
    };
  }, []);
  const [rect, setRect] = React.useState<Rect>(() => {
    return {
      y: props.top || 0,
      x: props.left || 0,
      width: props.width || 400,
      height: props.height || 300,
    };
  });
  const [delta, setDelta] = React.useState<Rect>(() => ({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }));
  const rectRef = React.useRef<Rect>(rect);
  rectRef.current = rect;

  const [pending, startTransition] = React.useTransition();
  const [level, setLevel] = React.useState<number>(nextZIndex(id));
  const container = React.useRef<HTMLDivElement>(null);
  const titleBarRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const prevWindowSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    const onResize = (e: Event) => {
      if (container.current) {
        const rect = container.current.getBoundingClientRect();
        // move to relative position
        const previousRatio = {
          x: rect.x / prevWindowSize.width,
          y: rect.y / prevWindowSize.height,
        };
        const nextPosition = {
          x: previousRatio.x * window.innerWidth,
          y: previousRatio.y * window.innerHeight,
        };
        startTransition(() => {
          setRect((prev) => {
            return {
              x: nextPosition.x,
              y: nextPosition.y,
              width: prev.width,
              height: prev.height,
            };
          });
        });
      }

      prevWindowSize.width = window.innerWidth;
      prevWindowSize.height = window.innerHeight;
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  const observePointerCallback: ObservePointerCallback = React.useCallback(
    (e) => {
      const delta = {
        x: e.deltaX,
        y: e.deltaY,
      };
      startTransition(() => {
        if (e.type === "pointerdown") {
          setLevel(nextZIndex(id));
        }
        if (e.isFinal) {
          setDelta((prev) => ({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
          }));
          setRect((prev) => {
            return {
              width: prev.width,
              height: prev.height,
              x: prev.x + delta.x,
              y: prev.y + delta.y,
            };
          });
        } else {
          setDelta((prev) => ({
            x: delta.x,
            y: delta.y,
            width: prev.width,
            height: prev.height,
          }));
        }
      });
    },
    [id],
  );
  useObservePointer(titleBarRef, observePointerCallback);
  const controlRef = React.useRef<HTMLDivElement>(null);
  const [controllerStyle, setControllerStyle] = React.useState<React.CSSProperties>({});
  const showCursor = React.useCallback((e: React.PointerEvent) => {
    const isLeave = e.type === "pointerleave";
    const edgeSize = 6;
    const rect = rectRef.current;
    const offsetX = e.clientX - rect.x;
    const offsetY = e.clientY - rect.y;

    const dir = getDirection(offsetX, offsetY, rect.width, rect.height, edgeSize);
    if (dir === 0 || isLeave) {
      setControllerStyle({
        cursor: "default",
      });
      return;
    }
    // ew, ns, nwse, neswのいずれか
    const pattern: {
      [key: number]: string;
    } = {
      0b1000: "ew",
      0b0100: "ew",
      0b0010: "ns",
      0b0001: "ns",
      0b0101: "nwse",
      0b0110: "nesw",
      0b1001: "nesw",
      0b1010: "nwse",
    };
    setControllerStyle({
      cursor: pattern[dir] + "-resize",
    });
  }, []);
  const observeContainerPointer: ObservePointerCallback = React.useCallback(
    (e) => {
      const edgeSize = 6;
      const rect = rectRef.current;
      const offsetX = e.clientX - rect.x;
      const offsetY = e.clientY - rect.y;

      const dir = getDirection(offsetX, offsetY, rect.width, rect.height, edgeSize);
      if (dir === 0) {
        return;
      }
      const delta = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      };
      if (dir & 0b1000) {
        delta.width -= e.deltaX;
        delta.x = e.deltaX;
      }
      if (dir & 0b0100) {
        delta.width += e.deltaX;
      }
      if (dir & 0b0010) {
        delta.height -= e.deltaY;
        delta.y = e.deltaY;
      }
      if (dir & 0b0001) {
        delta.height += e.deltaY;
      }
      startTransition(() => {
        if (e.isFinal) {
          setDelta({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
          });
          setRect((prev) => {
            return {
              width: prev.width + delta.width,
              height: prev.height + delta.height,
              x: prev.x + delta.x,
              y: prev.y + delta.y,
            };
          });
        } else {
          setDelta(delta);
        }
      });
    },
    [id],
  );
  useObservePointer(controlRef, observeContainerPointer);
  const onFocus = React.useCallback(() => {
    setLevel(nextZIndex(id));
  }, [id]);
  const style = React.useMemo(() => {
    return {
      height: expand ? rect.height + delta.height : 32,
      width: rect.width + delta.width,
      transform: `translate3d(${rect.x + delta.x}px, ${rect.y + delta.y}px, 0)`,
      zIndex: level,
      willChange: "transform, width, height",
    };
  }, [rect, delta, level, expand]);
  const onFullscreen = React.useCallback(() => {
    const fullscreenAllowed = "fullscreenEnabled" in document;
    if (!fullscreenAllowed) {
      console.warn("Fullscreen is not supported in this browser.");
      return;
    }
    const fullscreenElement = document.fullscreenElement;
    if (fullscreenElement) {
      document.exitFullscreen();
    } else {
      if (container.current) {
        container.current.requestFullscreen().catch((err) => {
          console.error("Error attempting to enable full-screen mode:", err);
        });
      }
    }
  }, []);
  const onExpand = React.useCallback(() => {
    setExpand((prev) => !prev);
  }, [expand]);
  const isAppleDevice = React.useMemo(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return false;
    }
    const userAgent = navigator.userAgent;
    return /Mac|iPad|iPhone|iPod/.test(userAgent);
  }, []);
  if (!mountNode.current || (typeof props.open === "boolean" && props.open === false)) {
    return null;
  }
  return (
    <>
      {createPortal(
        <div id={id} className={classes.windowContainer} style={style} ref={container} onFocus={onFocus}>
          <div
            className={classes.control}
            ref={controlRef}
            onPointerEnter={showCursor}
            onPointerLeave={showCursor}
            onPointerMove={showCursor}
            style={controllerStyle}
          />
          {props.titleBarMode !== "hidden" && (
            <div className={classes.title} ref={titleBarRef} data-parent={id} data-layout={isAppleDevice ? "ew" : "ns"}>
              <div></div>
              <div className={classes.label}>
                <strong>{props.title}</strong>
              </div>
              <div className={classes.buttons}>
                {props.onClose && (
                  <WindowButton onClick={props.onClose} type={"close"}>
                    {props.icons?.close || <span>✕</span>}
                  </WindowButton>
                )}
                {props.expand && (
                  <WindowButton onClick={onExpand} type={"expand"}>
                    {props.icons?.expand || <span>-</span>}
                  </WindowButton>
                )}
                {props.fullscreen && (
                  <WindowButton onClick={onFullscreen} type={"fullscreen"}>
                    {props.icons?.fullscreen || <span>⤡</span>}
                  </WindowButton>
                )}
              </div>
            </div>
          )}
          <div
            className={classes.content}
            draggable="false"
            style={{
              ...props.style,
              visibility: expand ? "visible" : "hidden",
            }}
          >
            {props.children}
          </div>
        </div>,
        mountNode.current,
      )}
    </>
  );
};
const WindowButton = (props: { onClick: () => void; children?: React.ReactNode; type: "close" | "expand" | "fullscreen" }) => {
  const elementProps = React.useMemo(() => {
    const upperFirst = props.type.charAt(0).toUpperCase() + props.type.slice(1);

    return {
      "aria-label": `${upperFirst} window`,
      title: `${upperFirst} window`,
      "data-variant": props.type,
    };
  }, [props.type]);
  return (
    <button className={classes.button} {...elementProps} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
export default Window;
