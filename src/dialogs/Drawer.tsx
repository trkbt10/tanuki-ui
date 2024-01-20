import * as React from "react";
import { PopupLayout } from "./parts/PopupLayout";
import classNames from "./Drawer.module.css";
export const Drawer: React.FC<
  React.PropsWithChildren<React.ComponentProps<typeof PopupLayout>> & {
    header?: React.ReactNode;
  }
> = ({ direction, open = true, onClose, header, children, potal = true }) => {
  return (
    <PopupLayout open={open} onClose={onClose} potal={potal} variant="drawer" direction={direction}>
      {header}
      <section className={classNames.content}>{children}</section>
    </PopupLayout>
  );
};
Drawer.displayName = "Drawer";
