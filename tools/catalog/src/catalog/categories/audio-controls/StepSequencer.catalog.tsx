import React, { useState } from "react";
import { StepSequencer } from "tanuki-ui/extended/audio-controls";
import { CatalogMeta } from "../../../CatalogMeta";

export const StepSequencerMeta: CatalogMeta = {
  title: "StepSequencer",
  category: "audio-controls",
  description: "ステップシーケンサー。固定ステップをクリックでON/OFF、ドラムマシン風UI",
};

export const StepSequencerBasic = () => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  React.useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % 16);
      }, 125);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div>
      <button onClick={() => setIsPlaying(!isPlaying)} style={{ marginBottom: "16px" }}>
        {isPlaying ? "Stop" : "Play"}
      </button>
      <StepSequencer
        steps={16}
        tracks={4}
        currentStep={currentStep}
        isPlaying={isPlaying}
        trackLabels={["Kick", "Snare", "Hi-Hat", "Open Hat"]}
      />
    </div>
  );
};

export const StepSequencer32Steps = () => {
  return (
    <StepSequencer
      steps={32}
      tracks={8}
      trackLabels={["Kick", "Snare", "Hi-Hat", "Open Hat", "Crash", "Ride", "Tom 1", "Tom 2"]}
    />
  );
};
