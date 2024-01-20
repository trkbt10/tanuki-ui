import React, { ComponentProps } from "react";
import { Alert } from "./Alert";
import { useToggle } from "react-use";
import { Button } from "../form/Button";

export default {
  title: "dialogs/Alert",
  component: <></>,
};

export const basic = (props: ComponentProps<typeof Alert>) => {
  const [open, toggle] = useToggle(true);
  return (
    <>
      <Button onClick={toggle}>toggle</Button>
      <Alert
        {...props}
        open={open}
        mark="alert"
        title="Your computer was restarted because of a problem."
        description={`Click Report to see more detailed
        information and send a report to Apple.`}
        onSelect={() => {}}
        onClose={toggle}
        actions={[
          { key: "confirm", value: "ok", variant: "primary" },
          { key: "dismiss", value: "cancel" },
        ]}
      ></Alert>
    </>
  );
};

export const verical = (props: ComponentProps<typeof Alert>) => {
  const [open, toggle] = useToggle(true);
  return (
    <>
      <Button onClick={toggle}>toggle</Button>
      <Alert
        {...props}
        open={open}
        mark="alert"
        title="Your computer was restarted because of a problem."
        description={`Click Report to see more detailed
        information and send a report to Apple.`}
        onSelect={() => {}}
        onClose={toggle}
        direction={"ttb"}
        actions={[
          { key: "confirm", value: "ok", variant: "primary" },
          { key: "dismiss", value: "cancel" },
        ]}
      ></Alert>
    </>
  );
};
