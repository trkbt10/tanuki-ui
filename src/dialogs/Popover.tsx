import * as React from "react";
import classes from "./Popover.module.css";

export const Popover = (
  props: React.PropsWithChildren<{
    id: string;
  }>,
) => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    element.setAttribute("id", props.id);
    element.setAttribute("role", "dialog");
    element.setAttribute("aria-modal", "true");
    element.setAttribute("aria-hidden", "true");
    element.setAttribute("popover", "true");
  }, []);
  const handlePointer: React.PointerEventHandler<HTMLElement> = React.useCallback((e) => {
    const type = e.type;
    const target = e.target as HTMLElement;
    const root = ref.current;

    const targetHasPopover = target.querySelector(`[popover]`);
    if (!targetHasPopover) {
      return;
    }
    const popover = targetHasPopover.closest(`[popover]`);
    if (!popover) {
      return;
    }
    if (type === "pointerover") {
      //   popover.showPopover();
      // } else {
      //   popover.matches(":popover-open") && popover.hidePopover();
    }
  }, []);
  return (
    <div ref={ref} className={classes.popover} onPointerOver={handlePointer} onPointerLeave={handlePointer}>
      {props.children}
    </div>
  );
};
