import * as React from "react";
import { usePopup } from "../hooks/usePopup";
import classes from "./Dialog.module.css";
import { Portal } from "./Portal";
import { useMergedRef } from "../hooks/useControlledInputState";

export const Dialog = React.memo(
  React.forwardRef<
    HTMLDialogElement,
    React.JSX.IntrinsicElements["dialog"] & {
      modal?: boolean;
    }
  >(({ onClose, modal = true, open, ...props }, ref) => {
    const [baseRef, bodyRef] = usePopup({ onClose: onClose ?? (() => {}) });
    const refLocal = React.useRef<HTMLDialogElement>(null);
    const $ref = useMergedRef(ref, refLocal);
    const Wrapper = modal ? React.Fragment : Portal;
    React.useEffect(() => {
      const dialog = refLocal.current;
      if (!dialog) {
        return;
      }
      if (open) {
        modal ? dialog.showModal() : dialog.show();
      } else {
        dialog.close();
      }
    }, [open, modal]);
    const handleClose: React.ReactEventHandler<HTMLDialogElement> = React.useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onClose) {
          onClose(e);
        }
      },
      [onClose],
    );
    const backdrop = <div ref={baseRef} className={classes.backdrop}></div>;
    const content = (
      <div className={classes.body} data-role="dialog-body" ref={bodyRef}>
        {props.children}
      </div>
    );
    return (
      <Wrapper>
        <dialog
          className={classes.dialog}
          {...props}
          open={modal ? undefined : open}
          ref={$ref}
          onClose={handleClose}
          data-role={modal ? "modal" : "dialog-body"}
        >
          {open && (
            <>
              {backdrop}
              {content}
            </>
          )}
        </dialog>
      </Wrapper>
    );
  }),
);
Dialog.displayName = "Dialog";

export const DialogFooter: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <footer className={classes.dialogFooter}>{children}</footer>;
};
