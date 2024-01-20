import * as React from "react";
import { Media, MediaSourceProps } from "../elements/Media";
import { useDocumentScroll } from "../hooks/useDocumentScroll";
import { useIsomorphicLayoutEffect } from "../hooks/useIsomorphicLayoutEffect";
import { useResizeObserver } from "../hooks/useResizeObserver";
import classes from "./StickyHeader.module.css";
export const StickyHeader = ({ cover, children }: { cover: MediaSourceProps; children: React.ReactNode }) => {
  const headerRef = React.useRef<HTMLDivElement>(null);
  const coverAreaRef = React.useRef<HTMLDivElement>(null);
  const documentScroll = useDocumentScroll();
  const documentScrollRef = React.useRef(documentScroll);
  documentScrollRef.current = documentScroll;
  const headerBoundRef = React.useRef<DOMRectReadOnly>(undefined);
  const { rect: headerRect } = useResizeObserver(headerRef, {});
  if (!Object.is(headerBoundRef.current, headerRect)) {
    headerBoundRef.current = headerRect;
  }

  useIsomorphicLayoutEffect(() => {
    const header = headerRef.current;
    const coverArea = coverAreaRef.current;
    if (!coverArea || !header) {
      return;
    }
    // Reactで反映した場合、大量のDOM更新が発生するため
    // requestAnimationFrameを使用してパフォーマンスを向上させる
    let prevHeight = Number.NaN;
    let prevHeaderBound: DOMRectReadOnly | undefined = undefined;

    const loop = () => {
      const headerBound = headerBoundRef.current;
      if (!headerBound) {
        return;
      }
      // Update cover area height based on scroll
      const coverAreaHeight = headerBound.height - documentScrollRef.current;
      if (coverAreaHeight !== prevHeight) {
        coverArea.style.opacity = "1";
        coverArea.style.height = `${coverAreaHeight}px`;
        prevHeight = coverAreaHeight;
      }

      // ## coverの配置位置の調整
      // 常に画面上にあるならともかくとして、サイドバーなどのレイアウトでは
      // fixedでleft,rightが0の場合、この領域を超えてカバー画像が表示されることがある
      // これを防ぐため、headerRefの位置を取得し、画面上にある場合のみカバー画像を表示する
      if ((headerBound.x >= 0 || headerBound.y >= 0 || headerBound.width > 0) && prevHeaderBound !== headerBound) {
        coverArea.style.left = `${headerBound.x}px`;
        coverArea.style.top = `${headerBound.y}px`;
        coverArea.style.width = `${headerBound.width}px`;
        prevHeaderBound = headerBound;
      }
    };

    let id = requestAnimationFrame(function animate() {
      loop();
      id = requestAnimationFrame(animate);
    });
    return () => {
      cancelAnimationFrame(id);
    };
  }, []);
  return (
    <div className={classes.base}>
      <div className={classes.cover} ref={coverAreaRef}>
        <Media source={cover} />
      </div>
      <div ref={headerRef} className={classes.header}>
        <div className={classes.body}>{children}</div>
      </div>
    </div>
  );
};
StickyHeader.displayName = "StickyHeader";
