import * as React from "react";
import { Button } from "@/index";
import { Window } from "@/layouts/Window";
export function TestWindow(props: React.PropsWithChildren<{}>) {
  const [windows, setWindows] = React.useState<
    {
      id: string;
      title: string;
      top: number;
      left: number;
      width: number;
      height: number;
    }[]
  >(() => {
    return [
      {
        id: "1",
        title: "Test Window",
        top: 20,
        left: 20,
        width: 400,
        height: 300,
      },
      {
        id: "2",
        title: "Test Window 2",
        top: 50,
        left: 50,
        width: 400,
        height: 300,
      },
    ];
  });
  return (
    <div>
      <Button
        onClick={() => {
          setWindows([
            ...windows,
            {
              id: Math.random().toString(36).slice(2),
              title: "Test Window",
              top: 20,
              left: 20,
              width: 400,
              height: 300,
            },
          ]);
        }}
      >
        CreateWindow
      </Button>
      {windows.map((w) => (
        <Window
          key={w.id}
          title={w.title}
          open
          top={w.top}
          left={w.left}
          width={w.width}
          height={w.height}
          resizable
          expand
          fullscreen
          onClose={() => {
            setWindows(windows.filter((x) => x.id !== w.id));
          }}
        >
          <div
            style={{
              width: 1000,
              height: 1000,
            }}
          >
            scroll
          </div>
        </Window>
      ))}
    </div>
  );
}
