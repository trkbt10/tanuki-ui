import React, { ComponentProps } from "react";
import { Button } from "../form/Button";
import { Dialog } from "./Dialog";
import { useToggle } from "react-use";

export default {
  title: "dialogs/Dialog",
  component: <Dialog onClose={() => {}} />,
};

export const basic = (props: ComponentProps<typeof Dialog>) => {
  const [open, toggle] = useToggle(true);
  return (
    <div>
      <Button onClick={toggle}>Open</Button>
      <Dialog open={open} onClose={toggle}>
        <form method="dialog">
          <p>Text</p>
          <input type="text" />
          <button>ok</button>
        </form>
      </Dialog>
    </div>
  );
};
