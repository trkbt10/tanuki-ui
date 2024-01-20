import React, { ComponentProps } from "react";
import { SegmentedControl } from "./SegmentedControl";

export default {
  title: "controls/SegmentedControl",
  component: <SegmentedControl items={["1", "2", "3"]}></SegmentedControl>,
};

export const basic = (props: ComponentProps<typeof SegmentedControl>) => {
  return <SegmentedControl {...props} items={["New", "Replied", "r"]} defaultSelected={1}></SegmentedControl>;
};
