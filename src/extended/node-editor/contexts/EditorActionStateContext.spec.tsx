import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { EditorActionStateProvider, useEditorActionState } from "./EditorActionStateContext";

const Harness: React.FC = () => {
  const { state, dispatch, actions } = useEditorActionState();
  React.useEffect(() => {
    dispatch(actions.selectNode("n1", false));
    dispatch(actions.setSelectionBox({ start: { x: 0, y: 0 }, end: { x: 10, y: 10 } }));
    dispatch(actions.clearSelection());
  }, [dispatch, actions]);
  return <div data-testid="selected-count">{String(state.selectedNodeIds.length)}</div>;
};

describe("EditorActionStateContext", () => {
  it("provides state and actions; selection updates as expected", () => {
    const { getByTestId } = render(
      <EditorActionStateProvider>
        <Harness />
      </EditorActionStateProvider>
    );
    // After clearSelection should be 0
    expect(getByTestId("selected-count").textContent).toBe("0");
  });
});

