import React, { useState } from "react";
import { LoopToggle } from "tanuki-ui/extended/audio-controls";
import { CatalogMeta } from "../../../CatalogMeta";

export const LoopToggleMeta: CatalogMeta = {
  title: "LoopToggle",
  category: "audio-controls",
  description: "ループ再生トグル。Alt+ドラッグで範囲指定",
};

export const LoopToggleBasic = () => {
  const [isLooping, setIsLooping] = useState(false);

  return (
    <LoopToggle
      isLooping={isLooping}
      onToggle={setIsLooping}
      onRangeSelect={(start, end) => console.log("Range:", start, end)}
    />
  );
};

export const LoopToggleSizes = () => {
  const [isLooping, setIsLooping] = useState(false);

  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <LoopToggle size="small" isLooping={isLooping} onToggle={setIsLooping} />
      <LoopToggle size="medium" isLooping={isLooping} onToggle={setIsLooping} />
      <LoopToggle size="large" isLooping={isLooping} onToggle={setIsLooping} />
    </div>
  );
};
