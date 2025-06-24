import React, { ComponentProps } from "react";
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
  const [ref, open, toggle, bound] = useContextualMenu(false);
  const [modalOpen, toggleModalOpen] = useToggle(false);
  return (
    <>
      <Button onClick={toggleModalOpen}>Open Modal</Button>
      <Modal
        {...props}
        open={modalOpen}
        onClose={() => {
          toggleModalOpen(false);
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
            <Input placeholder="Enter your Apple ID"></Input>
          </dd>
          <dt>
            <Label>Password:</Label>
          </dt>
          <dd>
            <Input type="password" placeholder="Enter your password"></Input>
          </dd>
        </Descriptions>
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          <Button variant="primary">Sign In</Button>
          <Button onClick={() => toggleModalOpen(false)}>Cancel</Button>
        </div>
        <Button ref={ref} onClick={toggle}>
          Open Menu
        </Button>
        {bound && (
          <ContextualMenu open={open} onClose={toggle} measure={bound}>
            Menu item
          </ContextualMenu>
        )}
      </Modal>
    </>
  );
};

export const simpleModal = (props: ComponentProps<typeof Modal>) => {
  const [modalOpen, toggleModalOpen] = useToggle(false);
  return (
    <>
      <Button onClick={toggleModalOpen}>Open Simple Modal</Button>
      <Modal
        {...props}
        open={modalOpen}
        onClose={() => toggleModalOpen(false)}
      >
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Welcome!</h2>
          <p>This is a simple modal dialog.</p>
          <Button onClick={() => toggleModalOpen(false)}>Close</Button>
        </div>
      </Modal>
    </>
  );
};

export const formModal = (props: ComponentProps<typeof Modal>) => {
  const [modalOpen, toggleModalOpen] = useToggle(false);
  const [formData, setFormData] = React.useState({ name: '', email: '' });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toggleModalOpen(false);
    setFormData({ name: '', email: '' });
  };
  
  return (
    <>
      <Button onClick={toggleModalOpen}>Add User</Button>
      <Modal
        {...props}
        open={modalOpen}
        onClose={() => toggleModalOpen(false)}
      >
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          <h2>Add New User</h2>
          <div style={{ marginBottom: '16px' }}>
            <Label>Name:</Label>
            <Input 
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter name"
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <Label>Email:</Label>
            <Input 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter email"
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="primary">Save</Button>
            <Button type="button" onClick={() => toggleModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
