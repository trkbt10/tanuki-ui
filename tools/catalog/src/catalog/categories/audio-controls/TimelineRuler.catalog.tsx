import React, { useState } from "react";
import { TimelineRuler, Playhead } from "tanuki-ui/extended/audio-controls";
import { CatalogMeta } from "../../../CatalogMeta";

export const TimelineRulerMeta: CatalogMeta = {
  title: "TimelineRuler",
  category: "audio-controls",
  description: "タイムラインルーラー。小節・拍・時間表示、ダブルクリックでマーカー追加",
};

export const TimelineRulerBasic = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [markers, setMarkers] = useState([
    { id: "1", position: 0.25, label: "Intro" },
    { id: "2", position: 0.5, label: "Verse" },
    { id: "3", position: 0.75, label: "Chorus" },
  ]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <TimelineRuler
        duration={120}
        currentTime={currentTime}
        markers={markers}
        onSeek={setCurrentTime}
        onMarkerAdd={(position) => {
          const newMarker = {
            id: Date.now().toString(),
            position,
            label: `Marker ${markers.length + 1}`,
          };
          setMarkers([...markers, newMarker]);
        }}
        onMarkerRemove={(id) => {
          setMarkers(markers.filter((m) => m.id !== id));
        }}
      />
      <Playhead position={currentTime} duration={120} height={100} onSeek={setCurrentTime} />
    </div>
  );
};

export const TimelineRulerWithZoom = () => {
  const [zoom, setZoom] = useState(1);

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <label>Zoom: {zoom.toFixed(2)}x</label>
        <input
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
          style={{ marginLeft: "8px" }}
        />
      </div>
      <TimelineRuler duration={300} zoom={zoom} onZoomChange={setZoom} />
    </div>
  );
};
