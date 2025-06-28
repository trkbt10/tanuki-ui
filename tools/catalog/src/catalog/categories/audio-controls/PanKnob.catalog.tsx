import React, { useState } from "react";
import { PanKnob } from "tanuki-ui/extended/audio-controls";
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
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <PanKnob size="small" value={value} onChange={setValue} />
      <PanKnob size="medium" value={value} onChange={setValue} />
      <PanKnob size="large" value={value} onChange={setValue} />
    </div>
  );
};

export const PanKnobCustomRange = () => {
  const [value, setValue] = useState(0);

  return (
    <div style={{ display: "flex", gap: "32px" }}>
      <div>
        <h4>Standard (-100 to +100)</h4>
        <PanKnob value={value} onChange={setValue} />
      </div>
      <div>
        <h4>Limited (-50 to +50)</h4>
        <PanKnob value={value} onChange={setValue} min={-50} max={50} />
      </div>
    </div>
  );
};
