import * as React from "react";
import { Dialog } from "../Dialog";
export type PopupLayoutProps = React.PropsWithChildren<{
  variant?: "alert" | "drawer" | string;
  potal?: boolean;
  animationName?: string;
  direction?: "ltr" | "rtl" | "ttb" | "btt";
}> &
  React.ComponentPropsWithRef<typeof Dialog>;
export const PopupLayout = React.memo(
  ({ potal, open = true, onClose, onCancel, children, variant, animationName, direction = "btt" }: PopupLayoutProps) => {
    return (
      <Dialog
        onClose={onClose}
        onCancel={onCancel}
        open={open}
        modal={false}
        data-variant={variant}
        data-animation={animationName}
        data-direction={direction}
      >
        {children}
      </Dialog>
    );
  },
);
PopupLayout.displayName = "PopupLayout";
