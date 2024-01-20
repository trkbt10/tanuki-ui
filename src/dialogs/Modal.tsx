import React from "react";
import style from "./Drawer.module.css";
import type { PopupLayoutProps } from "./parts/PopupLayout";
import { PopupLayout } from "./parts/PopupLayout";
export const Modal = ({ open = true, onClose, children, potal = true }: PopupLayoutProps) => {
  return (
    <PopupLayout open={open} onClose={onClose} potal={potal}>
      <section className={style.content}>{children}</section>
    </PopupLayout>
  );
};
Modal.displayName = "Modal";
