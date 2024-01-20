import React, { ComponentProps } from "react";
import { Text } from "../blocks/Text";
import { TabNav } from "./TabNav";

export default {
  title: "lists/TabNav",
  component: <></>,
};

export const basic = () => {
  const [selectedTab, selectTab] = React.useState("default");
  const [items, setItems] = React.useState(() => {
    return [
      {
        key: "default",
        value: "default",
      },
      {
        key: "a",
        value: "a",
      },
      {
        key: "b",
        value: "b",
      },
    ];
  });
  return <TabNav value={selectedTab} onChange={selectTab} itemWrapper={Text} setItems={setItems} items={items}></TabNav>;
};
