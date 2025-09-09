import React from "react";
import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { KeyboardShortcutProvider, useKeyboardShortcut } from "./KeyboardShortcutContext";

const Harness: React.FC = () => {
  const { registerShortcut } = useKeyboardShortcut();
  const [hit, setHit] = React.useState(0);
  React.useEffect(() => {
    registerShortcut({ key: "k", ctrl: true }, () => setHit((v) => v + 1));
  }, [registerShortcut]);
  return <div data-testid="hit">{String(hit)}</div>;
};

describe("KeyboardShortcutContext", () => {
  it("invokes handler on matching keydown", () => {
    const { getByTestId } = render(
      <KeyboardShortcutProvider>
        <Harness />
      </KeyboardShortcutProvider>
    );
    const evt = new KeyboardEvent("keydown", { key: "k", ctrlKey: true });
    document.dispatchEvent(evt);
    expect(getByTestId("hit").textContent).toBe("1");
  });
});

