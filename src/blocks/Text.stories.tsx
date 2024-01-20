import React, { ComponentProps } from "react";
import { Text } from "./Text";
export default {
  title: "blocks/Text",
  component: <Text></Text>,
};

export const Basic = () => {
  return <Text>text</Text>;
};

export const Ruby = () => {
  return <Text ruby="かっかそうよう">隔靴掻痒</Text>;
};

export const RubyAndText = () => {
  return (
    <>
      <Text ruby="かっかそうよう">隔靴掻痒</Text>
      <Text>五里霧中</Text>
    </>
  );
};
