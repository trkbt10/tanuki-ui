import React, { ComponentProps } from "react";
import { TabBar } from "./TabBar";

export default {
  title: "bars/tabbar",
  component: <></>,
};

export const basic = () => {
  return (
    <>
      <TabBar
        items={[
          { icon: "user", key: "A", value: "A" },
          { icon: "image", key: "B", value: "B" },
          { icon: "settings", key: "C", value: "C" },
          { icon: "twitter", key: "D", value: "D" },
        ]}
        onSelect={console.log}
      ></TabBar>
    </>
  );
};
