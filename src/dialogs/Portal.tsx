import * as React from "react";
import { createPortal } from "react-dom";
import { useDocument } from "../hooks/useDocumentBody";
export const Portal: React.FC<React.PropsWithChildren<{ parentNode?: HTMLElement | null }>> = ({ children, parentNode }) => {
  const uniqueId = React.useId();
  const [mountNode, setMountNode] = React.useState<HTMLElement>();
  const document = useDocument();
  React.useEffect(() => {
    if (!document) {
      return;
    }
    const element = document.createElement("div");
    element.setAttribute("id", uniqueId);
    document.body.appendChild(element);
    setMountNode(element);
    return () => {
      if (document.body.contains(element)) {
        document.body.removeChild(element);
      }
      setMountNode(undefined);
    };
  }, [uniqueId, document]);
  const zIndexList = React.useMemo(() => {
    if (!parentNode) {
      return [1];
    }
    return getZIndexList(parentNode);
  }, [parentNode, uniqueId]);
  if (!(mountNode && zIndexList)) {
    return <></>;
  }
  return <>{createPortal(<PortalLayer zIndexList={zIndexList}>{children}</PortalLayer>, mountNode)}</>;
};
const PortalLayer = ({ zIndexList, children }: React.PropsWithChildren<{ zIndexList: number[] }>) => {
  const [zIndex, ...otherZIndex] = zIndexList;
  return (
    <div style={{ position: "relative", zIndex }}>
      {otherZIndex.length ? <PortalLayer zIndexList={otherZIndex}>{children}</PortalLayer> : children}
    </div>
  );
};

const getZIndexList = (e: HTMLElement): number[] => {
  const results: number[] = [];
  const walker = (e: HTMLElement): any => {
    const z = window.getComputedStyle(e).getPropertyValue("z-index");

    const zNumber = +z;
    if (!Number.isNaN(zNumber)) {
      results.push(zNumber);
    }
    if (e.parentElement) {
      walker(e.parentElement);
    }
  };
  walker(e);
  return results.reverse();
};
