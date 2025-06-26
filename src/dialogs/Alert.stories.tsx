import React, { ComponentProps, useState } from "react";
import { Alert } from "./Alert";
import { useToggle } from "react-use";
import { Button } from "../form/Button";

export default {
  title: "dialogs/Alert",
  component: <></>,
};

export const basic = (props: ComponentProps<typeof Alert>) => {
  const [open, toggle] = useToggle(false);
  return (
    <>
      <Button onClick={toggle}>Show Alert</Button>
      <Alert
        {...props}
        open={open}
        mark="alert"
        title="Your computer was restarted because of a problem."
        description={`Click Report to see more detailed
        information and send a report to Apple.`}
        onSelect={(action) => {
          console.log('Selected action:', action);
          toggle(false);
        }}
        onClose={() => toggle(false)}
        actions={[
          { key: "confirm", value: "Report", variant: "primary" },
          { key: "dismiss", value: "Cancel" },
        ]}
      ></Alert>
    </>
  );
};

export const verical = (props: ComponentProps<typeof Alert>) => {
  const [open, toggle] = useToggle(false);
  return (
    <>
      <Button onClick={toggle}>Show Vertical Alert</Button>
      <Alert
        {...props}
        open={open}
        mark="alert"
        title="Your computer was restarted because of a problem."
        description={`Click Report to see more detailed
        information and send a report to Apple.`}
        onSelect={(action) => {
          console.log('Selected action:', action);
          toggle(false);
        }}
        onClose={() => toggle(false)}
        direction={"ttb"}
        actions={[
          { key: "confirm", value: "Report", variant: "primary" },
          { key: "dismiss", value: "Cancel" },
        ]}
      ></Alert>
    </>
  );
};

export const confirmDialog = (props: ComponentProps<typeof Alert>) => {
  const [open, toggle] = useToggle(false);
  const [result, setResult] = useState<string>('');
  
  return (
    <>
      <Button onClick={toggle}>Delete File</Button>
      {result && <p>Action result: {result}</p>}
      <Alert
        {...props}
        open={open}
        mark="alert"
        title="Delete File"
        description="Are you sure you want to delete this file? This action cannot be undone."
        onSelect={(action) => {
          setResult(action === 'confirm' ? 'File deleted' : 'Action cancelled');
          toggle(false);
        }}
        onClose={() => toggle(false)}
        actions={[
          { key: "confirm", value: "Delete", variant: "primary" },
          { key: "dismiss", value: "Cancel" },
        ]}
      ></Alert>
    </>
  );
};

export const multipleOptions = (props: ComponentProps<typeof Alert>) => {
  const [open, toggle] = useToggle(false);
  const [result, setResult] = useState<string>('');
  
  return (
    <>
      <Button onClick={toggle}>Save Document</Button>
      {result && <p>Selected: {result}</p>}
      <Alert
        {...props}
        open={open}
        mark="alert"
        title="Save Document"
        description="Do you want to save your changes before closing?"
        onSelect={(action) => {
          const actions: Record<string, string> = {
            save: 'Document saved',
            discard: 'Changes discarded',
            cancel: 'Action cancelled'
          };
          setResult(actions[action as string] || 'Unknown action');
          toggle(false);
        }}
        onClose={() => toggle(false)}
        actions={[
          { key: "save", value: "Save", variant: "primary" },
          { key: "discard", value: "Don't Save" },
          { key: "cancel", value: "Cancel" },
        ]}
      ></Alert>
    </>
  );
};
