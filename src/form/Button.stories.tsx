import React from "react";
import { Button } from "./Button";
import { ComponentProps } from "react";

export default {
  title: "forms/button",
  component: Button,
  argTypes: {
    variant: {
      options: ["primary", "secondary", "cta"],
      control: { type: "radio" },
    },
  },
  args: {
    children: "Button",
  },
};

export const Basic = (args: ComponentProps<typeof Button>) => <Button {...args} />;
