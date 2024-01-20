import * as React from "react";
import { ChevronMark } from "./ChevronMark";
export default {
  title: "blocks/ChevronMark",
  component: ChevronMark,
  argTypes: {
    direction: {
      options: ["up", "down", "left", "right"],
      control: {
        type: "radio",
        labels: { up: "↑", down: "↓", left: "←", right: "→" },
      },
    },
  },
};
export const basic = (props: React.ComponentProps<typeof ChevronMark>) => {
  return <ChevronMark direction={props.direction}></ChevronMark>;
};
