import * as React from "react";
import classes from "./ParavirtualScroll.module.css";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useResizeObserver } from "../hooks/useResizeObserver";
import { useIsomorphicLayoutEffect } from "../hooks/useIsomorphicLayoutEffect";

type Direction = "vertical" | "horizontal";

const Context = React.createContext<{
  dimensionCache: Map<number, number>;
  offsets: number[];
  scrollContainer: HTMLElement | null | undefined;
  updateDimension: (index: number, dimension: number) => void;
  direction: Direction;
  chunkSize: number;
}>(
  new Proxy(
    {},
    {
      get: () => {
        throw new Error("Context not initialized");
      },
    },
  ) as any,
);
Context.displayName = "ParavirtualScrollContext";

export const ParavirtualScroll = React.memo(
  ({
    children,
    direction = "vertical",
    chunkSize = 1,
  }: {
    children: React.ReactNode;
    direction?: Direction;
    chunkSize?: number;
  }) => {
    const [virtualScrollState, setVirtualScrollState] = React.useState<{
      cache: Map<number, number>;
      offsets: number[];
      totalSize: number;
    }>(() => {
      const cache = new Map<number, number>();
      return {
        cache,
        offsets: [],
        totalSize: 0,
      };
    });
    const updateDimension = React.useCallback((key: number, dimension: number) => {
      setVirtualScrollState((prev) => {
        const prevDimension = prev.cache.get(key);
        if (prevDimension === dimension) {
          return prev;
        }
        const next = new Map(prev.cache);
        next.set(key, dimension);
        const offsets: number[] = [];
        const totalSize = Array.from(next.keys()).reduce((offset, key) => {
          const value = next.get(key) ?? 0;
          offsets[key] = offset;
          offset += value;
          return offset;
        }, 0);
        return {
          cache: next,
          offsets,
          totalSize,
        };
      });
    }, []);
    const pageStyle = React.useMemo(() => {
      const style: React.CSSProperties = {
        position: "relative",
      };
      if (direction === "vertical") {
        style.minHeight = virtualScrollState.totalSize;
      } else {
        style.minWidth = virtualScrollState.totalSize;
        style.display = "flex";
      }
      return style;
    }, [virtualScrollState.totalSize, direction]);
    const pageRootRef = React.useRef<HTMLDivElement>(null);
    const [scrollRoot, setScrollRoot] = React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
      if (!pageRootRef.current) return;

      // 親要素を辿ってスクロール可能な要素を探す
      let parent = pageRootRef.current.parentElement;
      while (parent) {
        const style = window.getComputedStyle(parent);
        const overflow = style.overflow + style.overflowY + style.overflowX;
        if (overflow.includes("auto") || overflow.includes("scroll")) {
          setScrollRoot(parent);
          return;
        }
        parent = parent.parentElement;
      }
      // スクロールコンテナが見つからない場合はnull（ビューポート）
      setScrollRoot(null);
    }, []);

    const value = React.useMemo(() => {
      return {
        dimensionCache: virtualScrollState.cache,
        offsets: virtualScrollState.offsets,
        updateDimension,
        scrollContainer: scrollRoot,
        direction,
        chunkSize,
      };
    }, [virtualScrollState.cache, virtualScrollState.offsets, updateDimension, scrollRoot, direction, chunkSize]);
    const mappedChildren = React.useMemo(() => {
      return React.Children.toArray(children);
    }, [children]);

    const chunkedChildren = React.useMemo(() => {
      if (chunkSize <= 1) {
        return mappedChildren.map((child, index) => ({ children: [child], chunkIndex: index }));
      }

      const chunks: { children: React.ReactNode[]; chunkIndex: number }[] = [];
      for (let i = 0; i < mappedChildren.length; i += chunkSize) {
        chunks.push({
          children: mappedChildren.slice(i, i + chunkSize),
          chunkIndex: Math.floor(i / chunkSize),
        });
      }
      return chunks;
    }, [mappedChildren, chunkSize]);

    return (
      <div className={classes.page} style={pageStyle} ref={pageRootRef}>
        <Context.Provider value={value}>
          {chunkedChildren.map((chunk) => {
            return (
              <ParavirtualScrollChunk key={chunk.chunkIndex} chunkIndex={chunk.chunkIndex}>
                {chunk.children}
              </ParavirtualScrollChunk>
            );
          })}
        </Context.Provider>
      </div>
    );
  },
);
ParavirtualScroll.displayName = "ParavirtualScroll";

const ParavirtualScrollChunk = React.memo(({ children, chunkIndex }: { children: React.ReactNode[]; chunkIndex: number }) => {
  const { dimensionCache, updateDimension, offsets, scrollContainer, direction, chunkSize } = React.useContext(Context);
  const ref = React.useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersectionObserver<HTMLDivElement>(ref, {
    rootMargin: "100px",
    threshold: 0,
    root: scrollContainer,
  });
  const resizeObserver = useResizeObserver(ref, {});

  useIsomorphicLayoutEffect(() => {
    if (!resizeObserver.rect) {
      return;
    }
    if (!isIntersecting) {
      return;
    }
    const dimension = direction === "vertical" ? resizeObserver.rect.height : resizeObserver.rect.width;
    updateDimension(chunkIndex, dimension);
  }, [resizeObserver.rect, isIntersecting, direction, chunkIndex, updateDimension]);

  const lineCSSProperties = React.useMemo(() => {
    if (isIntersecting) {
      return {};
    }
    const dimension = dimensionCache.get(chunkIndex);
    if (typeof dimension !== "number") {
      return {};
    }

    if (direction === "vertical") {
      return {
        height: dimension,
      };
    } else {
      return {
        width: dimension,
      };
    }
  }, [dimensionCache, isIntersecting, chunkIndex, direction]);

  const dimensionCached = dimensionCache.has(chunkIndex);
  const shouldDisplay = isIntersecting || !dimensionCached;
  const position = React.useMemo(() => {
    const offset = offsets[chunkIndex];
    const style: React.CSSProperties = {
      opacity: dimensionCached ? 1 : 0,
    };
    if (direction === "vertical") {
      style.top = offset;
      style.width = "100%";
    } else {
      style.left = offset;
      style.height = "100%";
    }
    return style;
  }, [dimensionCached, chunkIndex, offsets, direction]);

  return (
    <div ref={ref} style={position} className={classes.line}>
      {shouldDisplay ? (
        <>
          {chunkSize <= 1 ? children[0] : children.map((child, index) => <React.Fragment key={index}>{child}</React.Fragment>)}
        </>
      ) : (
        <div className={classes.ghost} style={lineCSSProperties}></div>
      )}
    </div>
  );
});
ParavirtualScrollChunk.displayName = "ParavirtualScrollChunk";

export const ParavirtualScrollItem = React.memo(({ children, index }: { children: React.ReactNode; index: number }) => {
  const { dimensionCache, updateDimension, offsets, scrollContainer, direction } = React.useContext(Context);
  const ref = React.useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersectionObserver<HTMLDivElement>(ref, {
    rootMargin: "100px",
    threshold: 0,
    root: scrollContainer,
  });
  const resizeObserver = useResizeObserver(ref, {});
  useIsomorphicLayoutEffect(() => {
    if (!resizeObserver.rect) {
      return;
    }
    if (!isIntersecting) {
      return;
    }
    const dimension = direction === "vertical" ? resizeObserver.rect.height : resizeObserver.rect.width;
    updateDimension(index, dimension);
  }, [resizeObserver.rect, isIntersecting, direction, index, updateDimension]);
  const lineCSSProperties = React.useMemo(() => {
    if (isIntersecting) {
      return {};
    }
    const dimension = dimensionCache.get(index);
    if (typeof dimension !== "number") {
      return {};
    }

    if (direction === "vertical") {
      return {
        height: dimension,
      };
    } else {
      return {
        width: dimension,
      };
    }
  }, [dimensionCache, isIntersecting, index, direction]);
  const dimensionCached = dimensionCache.has(index);
  const shouldDisplay = isIntersecting || !dimensionCached;
  const position = React.useMemo(() => {
    const offset = offsets[index];
    const style: React.CSSProperties = {
      opacity: dimensionCached ? 1 : 0,
    };
    if (direction === "vertical") {
      style.top = offset;
      style.width = "100%";
    } else {
      style.left = offset;
      style.height = "100%";
    }
    return style;
  }, [dimensionCached, index, offsets, direction]);

  return (
    <div ref={ref} style={position} className={classes.line}>
      {shouldDisplay ? <>{children}</> : <div className={classes.ghost} style={lineCSSProperties}></div>}
    </div>
  );
});
ParavirtualScrollItem.displayName = "ParavirtualScrollItem";
