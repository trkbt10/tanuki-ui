import * as React from "react";
import { Button, ContextualMenu, Dialog, H1, useContextualMenu } from "@/index";
export const NestedDialogs = (props: React.PropsWithChildren<{}>) => {
  return (
    <div>
      <H1>Dialog</H1>
      <RecursiveDialog depth={1}></RecursiveDialog>
    </div>
  );
};
const RecursiveDialog = ({ depth }: { depth: number }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        {open ? "Close" : "Open"} Dialog
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        {open && (
          <>
            <H1>Dialog {depth}</H1>
            <RecursiveDialog depth={depth + 1} />
          </>
        )}
      </Dialog>
    </>
  );
};
