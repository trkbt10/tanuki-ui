import React, { useState } from "react";
import { PanKnob } from "tanuki-ui/extended/audio-controls";
import { H4 } from "tanuki-ui";
import { DemoRow, DemoStack, DemoCard } from "../../../components/DemoLayouts";
import { CatalogMeta } from "../../../CatalogMeta";

export const PanKnobMeta: CatalogMeta = {
  title: "PanKnob",
  category: "audio-controls",
  description: "左右パンを調整する回転ノブ。中央クリックでリセット",
};

export const PanKnobBasic = () => {
  const [value, setValue] = useState(0);

  return <PanKnob value={value} onChange={setValue} onChangeEnd={(val) => console.log("Final value:", val)} />;
};

export const PanKnobSizes = () => {
  const [value, setValue] = useState(0);

  return (
    <DemoRow style={{ gap: "16px", alignItems: "center" }}>
      <PanKnob size="small" value={value} onChange={setValue} />
      <PanKnob size="medium" value={value} onChange={setValue} />
      <PanKnob size="large" value={value} onChange={setValue} />
    </DemoRow>
  );
};

export const PanKnobCustomRange = () => {
  const [value, setValue] = useState(0);

  return (
    <DemoRow style={{ gap: "32px" }}>
      <DemoCard>
        <DemoStack>
          <H4>Standard (-100 to +100)</H4>
          <PanKnob value={value} onChange={setValue} />
        </DemoStack>
      </DemoCard>
      <DemoCard>
        <DemoStack>
          <H4>Limited (-50 to +50)</H4>
          <PanKnob value={value} onChange={setValue} min={-50} max={50} />
        </DemoStack>
      </DemoCard>
    </DemoRow>
  );
};
