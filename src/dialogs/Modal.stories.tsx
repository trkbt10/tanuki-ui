import { ComponentProps } from "react";
import { useToggle } from "react-use";
import { Descriptions } from "../elements/Descriptions";
import { Paragraph } from "../elements/Paragraph";
import { Button } from "../form/Button";
import { Input } from "../form/Input";
import { Label } from "../form/Label";
import { ContextualMenu, useContextualMenu } from "./ContextualMenu";
import { Modal } from "./Modal";

export default {
  title: "dialogs/Modal",
  component: <></>,
};

export const basic = (props: ComponentProps<typeof Modal>) => {
  const [ref, open, toggle, bound] = useContextualMenu(true);
  const [modalOpen, toggleModalOpen] = useToggle(true);
  return (
    <>
      <button onClick={toggleModalOpen}>toggle</button>
      <Modal
        {...props}
        open={modalOpen}
        onClose={() => {
          toggleModalOpen();
        }}
      >
        <Label>Sign-In Required</Label>
        <Paragraph>
          If you have an Apple ID and password, enter them here.
          <br /> If you've used the iTunes Store or iCloud, for example, you have an Apple ID.
        </Paragraph>
        <Descriptions>
          <dt>
            <Label>Apple ID:</Label>
          </dt>
          <dd>
            <Input></Input>
          </dd>
          <dt>
            <Label>Password:</Label>
          </dt>
          <dd>
            <Input></Input>
          </dd>
        </Descriptions>
        <Button ref={ref} onClick={toggle}>
          Open
        </Button>
        {bound && (
          <ContextualMenu open={open} onClose={toggle} measure={bound}>
            ok
          </ContextualMenu>
        )}
      </Modal>
    </>
  );
};
