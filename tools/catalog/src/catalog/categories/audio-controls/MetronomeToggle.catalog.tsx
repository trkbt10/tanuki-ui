import React, { useState } from "react";
import { MetronomeToggle } from "tanuki-ui/extended/audio-controls";
import { CatalogMeta } from "../../../CatalogMeta";

export const MetronomeToggleMeta: CatalogMeta = {
  title: "MetronomeToggle",
  category: "audio-controls",
  description: "メトロノームのON/OFF。右クリックでBPMと拍子設定",
};

export const MetronomeToggleBasic = () => {
  const [isActive, setIsActive] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [timeSignature, setTimeSignature] = useState("4/4");

  return (
    <MetronomeToggle
      isActive={isActive}
      bpm={bpm}
      timeSignature={timeSignature}
      onToggle={setIsActive}
      onBpmChange={setBpm}
      onTimeSignatureChange={setTimeSignature}
    />
  );
};

export const MetronomeToggleSizes = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <MetronomeToggle size="small" isActive={isActive} onToggle={setIsActive} />
      <MetronomeToggle size="medium" isActive={isActive} onToggle={setIsActive} />
      <MetronomeToggle size="large" isActive={isActive} onToggle={setIsActive} />
    </div>
  );
};
