import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { NodeCanvasProvider, useNodeCanvas } from "./NodeCanvasContext";

const Harness: React.FC = () => {
  const { state, dispatch, actions } = useNodeCanvas();
  React.useEffect(() => {
    dispatch(actions.panViewport({ x: 5, y: 7 }));
    dispatch(actions.zoomViewport(2));
    dispatch(actions.setSpacePanning(true));
  }, [dispatch, actions]);
  return (
    <div>
      <div data-testid="offset">{`${state.viewport.offset.x},${state.viewport.offset.y}`}</div>
      <div data-testid="scale">{String(state.viewport.scale)}</div>
      <div data-testid="space">{String(state.isSpacePanning)}</div>
    </div>
  );
};

describe("NodeCanvasContext", () => {
  it("pans and zooms viewport; toggles space panning", () => {
    const { getByTestId } = render(
      <NodeCanvasProvider>
        <Harness />
      </NodeCanvasProvider>
    );
    expect(getByTestId("offset").textContent).toBe("5,7");
    expect(getByTestId("scale").textContent).toBe("2");
    expect(getByTestId("space").textContent).toBe("true");
  });
});

