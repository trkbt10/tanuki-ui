import { useEffect, useRef } from "react";

export const usePopup = <T extends HTMLElement = HTMLDivElement>({
  onClose: onClose,
  id,
}: {
  onClose: (...params: any[]) => any;
  id?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<T>(null);
  const dismissRef = useRef(onClose);
  dismissRef.current = onClose;
  useEffect(() => {
    let memorizedTarget: EventTarget | null;
    const handleWindowClick = (ev: PointerEvent) => {
      if (ev.defaultPrevented) {
        return;
      }
      if (!bodyRef.current) {
        return;
      }
      if (!(ev.target instanceof HTMLElement)) {
        return;
      }
      if (ev.type === "pointerdown") {
        memorizedTarget = ev.target;
      }
      if (ev.type !== "pointerdown" && memorizedTarget !== ev.target) {
        return;
      }
      if (bodyRef.current.contains(ev.target)) {
        ev.stopPropagation();
        return;
      }
      if (containerRef.current?.contains(ev.target)) {
        ev.preventDefault();
        ev.stopPropagation();
        dismissRef.current();
        return;
      }
    };
    window?.addEventListener("pointerdown", handleWindowClick, true);
    window?.addEventListener("pointerup", handleWindowClick, true);
    return () => {
      window?.removeEventListener("pointerdown", handleWindowClick, true);
      window?.removeEventListener("pointerup", handleWindowClick, true);
    };
  }, []);
  return [containerRef, bodyRef] as const;
};
