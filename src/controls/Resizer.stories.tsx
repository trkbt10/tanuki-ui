import React, { ComponentProps } from "react";
import { Resizer } from "./Resizer";

export default {
  title: "controls/Resizer",
  component: <></>,
};

export const basic = (props: ComponentProps<typeof Resizer>) => {
  const [size, setSize] = React.useState(100);
  return <div style={{ position: "absolute", left: "0%", height: "100%", width: size }}>{size}</div>;
};
