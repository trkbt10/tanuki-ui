import { ComponentProps } from "react";
import { useToggle } from "react-use";
import { Button } from "../form/Button";
import { BarItems, Toolbar } from "..";
import { Drawer } from "./Drawer";

export default {
  title: "dialogs/Drawer",
  component: <></>,
};

export const Basic = (props: ComponentProps<typeof Drawer>) => {
  const [open, toggle] = useToggle(true);
  return (
    <>
      <Button onClick={toggle}>toggle</Button>
      <Drawer
        {...props}
        open={open}
        onClose={toggle}
        header={
          <Toolbar>
            <BarItems.Body>
              <BarItems.PushButton onClick={toggle}>Close</BarItems.PushButton>
            </BarItems.Body>
          </Toolbar>
        }
      >
        <div>Hello</div>
      </Drawer>
    </>
  );
};

export const Left = (props: ComponentProps<typeof Drawer>) => {
  return <Basic direction="ltr" {...props}></Basic>;
};

export const Right = (props: ComponentProps<typeof Drawer>) => {
  return <Basic direction="rtl" {...props}></Basic>;
};

export const Top = (props: ComponentProps<typeof Drawer>) => {
  return <Basic direction="ttb" {...props}></Basic>;
};

export const Bottom = (props: ComponentProps<typeof Drawer>) => {
  return <Basic direction="btt" {...props}></Basic>;
};
