import React, { useState } from "react";
import { VolumeFader } from "tanuki-ui/extended/audio-controls";
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
    <div style={{ display: "flex", gap: "32px" }}>
      <div>
        <h4>Standard (-60 to +12 dB)</h4>
        <VolumeFader value={value} onChange={setValue} />
      </div>
      <div>
        <h4>Limited (-20 to +6 dB)</h4>
        <VolumeFader value={value} onChange={setValue} min={-20} max={6} />
      </div>
    </div>
  );
};
