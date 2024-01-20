import * as React from "react";
import { Button, ContextualMenu, Dialog, H1, useContextualMenu } from "../../src";
export const TextContextualMenu = (props: React.PropsWithChildren<{}>) => {
  return (
    <div>
      <H1>ContextMenu</H1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
          height: "100vh",
        }}
      >
        <ContextualMenuView></ContextualMenuView>
        <ContextualMenuView></ContextualMenuView>
        <ContextualMenuView></ContextualMenuView>
      </div>
    </div>
  );
};
function ContextualMenuView() {
  const [ref, open, toggle, rect] = useContextualMenu(true);
  return (
    <>
      <Button
        ref={ref}
        onClick={toggle}
        style={{
          width: 100,
        }}
      >
        Open
      </Button>
      {rect && (
        <ContextualMenu open={open} onClose={toggle} measure={rect}>
          <NestedDialog />
        </ContextualMenu>
      )}
    </>
  );
}
function NestedDialog() {
  const [ref, open, toggle, rect] = useContextualMenu(false);
  return (
    <>
      <Button ref={ref} onClick={toggle}>
        Open Dialog
      </Button>
      <Dialog open={open} onClose={toggle}>
        <div>Body</div>
      </Dialog>
    </>
  );
}
