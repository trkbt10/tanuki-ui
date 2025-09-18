import React, { useState } from "react";
import { XyPad } from "tanuki-ui/extended/audio-controls";
import { H4 } from "tanuki-ui";
import { DemoRow, DemoStack, DemoCard } from "../../../components/DemoLayouts";
import { CatalogMeta } from "../../../CatalogMeta";

export const XyPadMeta: CatalogMeta = {
  title: "XyPad",
  category: "audio-controls",
  description: "2パラメータをXY平面で同時操作。シンセのフィルタ&レゾナンスなどに使用",
};

export const XyPadBasic = () => {
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);

  return (
    <XyPad
      x={x}
      y={y}
      onChange={(newX, newY) => {
        setX(newX);
        setY(newY);
      }}
      onChangeEnd={(finalX, finalY) => {
        console.log("Final position:", finalX, finalY);
      }}
    />
  );
};

export const XyPadCustomLabels = () => {
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);

  return (
    <XyPad
      x={x}
      y={y}
      labelX="Filter"
      labelY="Resonance"
      onChange={(newX, newY) => {
        setX(newX);
        setY(newY);
      }}
    />
  );
};

export const XyPadCustomRange = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  return (
    <DemoRow style={{ gap: "32px" }}>
      <DemoCard>
        <DemoStack>
          <H4>Standard (0-100)</H4>
          <XyPad
            x={x}
            y={y}
            onChange={(newX, newY) => {
              setX(newX);
              setY(newY);
            }}
          />
        </DemoStack>
      </DemoCard>
      <DemoCard>
        <DemoStack>
          <H4>Bipolar (-1 to +1)</H4>
          <XyPad
            x={x}
            y={y}
            minX={-1}
            maxX={1}
            minY={-1}
            maxY={1}
            defaultX={0}
            defaultY={0}
            onChange={(newX, newY) => {
              setX(newX);
              setY(newY);
            }}
          />
        </DemoStack>
      </DemoCard>
    </DemoRow>
  );
};
