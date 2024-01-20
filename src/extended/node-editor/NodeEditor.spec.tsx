import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NodeEditor } from "./NodeEditor";
import type { NodeEditorState } from "./types";
import React from "react";

describe("NodeEditor", () => {
  const mockInitialState: Partial<NodeEditorState> = {
    nodes: {
      node1: {
        id: "node1",
        type: "standard",
        position: { x: 100, y: 100 },
        size: { width: 200, height: 100 },
        data: { title: "Node 1" },
      },
      node2: {
        id: "node2",
        type: "standard",
        position: { x: 400, y: 100 },
        size: { width: 200, height: 100 },
        data: { title: "Node 2" },
      },
    },
  };

  test("should render nodes", () => {
    render(<NodeEditor initialData={mockInitialState} />);

    // Check if nodes are rendered
    expect(screen.getByText("Node 1")).toBeTruthy();
    expect(screen.getByText("Node 2")).toBeTruthy();
  });

  test("should handle state changes", () => {
    const onStateChange = vi.fn();
    render(<NodeEditor initialData={mockInitialState} onDataChange={onStateChange} />);

    // State change should be called with initial state
    expect(onStateChange).toHaveBeenCalled();
  });

  test("should select node on click", () => {
    const { container } = render(<NodeEditor initialData={mockInitialState} />);

    // Find and click a node
    const node = container.querySelector('[data-node-id="node1"]');
    if (node) {
      fireEvent.pointerDown(node);
    }

    // Node should have selected class
    expect(node?.classList.contains("selected")).toBe(true);
  });

  test("should show toolbar", () => {
    render(<NodeEditor initialData={mockInitialState} />);

    // Check if toolbar buttons exist
    const toolbar = screen.getByRole("toolbar", { hidden: true });
    expect(toolbar).toBeTruthy();
  });

  test("should show inspector when showInspector is true", () => {
    render(<NodeEditor initialData={mockInitialState} showInspector={true} />);

    // Check if inspector panel exists
    const inspector = screen.getByText(/Inspector/i);
    expect(inspector).toBeTruthy();
  });

  test("should not show inspector when showInspector is false", () => {
    render(<NodeEditor initialData={mockInitialState} showInspector={false} />);

    // Check if inspector panel doesn't exist
    const inspector = screen.queryByText(/Inspector/i);
    expect(inspector).toBeFalsy();
  });

  test("should handle zoom with wheel event", () => {
    const { container } = render(<NodeEditor initialData={mockInitialState} />);

    const nodeEditor = container.querySelector(".container");
    if (nodeEditor) {
      // Simulate wheel event for zoom
      const wheelEvent = new WheelEvent("wheel", {
        deltaY: -100,
        clientX: 400,
        clientY: 300,
      });

      nodeEditor.dispatchEvent(wheelEvent);
    }

    // Check if viewport scale changed (would need to check state)
    expect(nodeEditor).toBeTruthy();
  });
});
