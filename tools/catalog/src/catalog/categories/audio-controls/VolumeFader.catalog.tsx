import React, { useState } from "react";
import { VolumeFader } from "tanuki-ui/extended/audio-controls";
import { H4 } from "tanuki-ui";
import { DemoRow, DemoStack, DemoCard } from "../../../components/DemoLayouts";
import { CatalogMeta } from "../../../CatalogMeta";

export const VolumeFaderMeta: CatalogMeta = {
  title: "VolumeFader",
  category: "audio-controls",
  description: "音量フェーダー。dB目盛り付き、Ctrlで微調整",
};

export const VolumeFaderBasic = () => {
  const [value, setValue] = useState(0);

  return <VolumeFader value={value} onChange={setValue} onChangeEnd={(val) => console.log("Final value:", val)} />;
};

export const VolumeFaderHorizontal = () => {
  const [value, setValue] = useState(0);

  return <VolumeFader value={value} onChange={setValue} orientation="horizontal" />;
};

export const VolumeFaderCustomRange = () => {
  const [value, setValue] = useState(0);

  return (
    <DemoRow style={{ gap: "32px" }}>
      <DemoCard>
        <DemoStack>
          <H4>Standard (-60 to +12 dB)</H4>
          <VolumeFader value={value} onChange={setValue} />
        </DemoStack>
      </DemoCard>
      <DemoCard>
        <DemoStack>
          <H4>Limited (-20 to +6 dB)</H4>
          <VolumeFader value={value} onChange={setValue} min={-20} max={6} />
        </DemoStack>
      </DemoCard>
    </DemoRow>
  );
};
