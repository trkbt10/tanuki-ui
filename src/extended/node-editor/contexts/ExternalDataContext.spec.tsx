import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ExternalDataProvider, useExternalDataRef } from "./ExternalDataContext";
import type { ExternalDataReference } from "../types/NodeDefinition";

const Harness: React.FC = () => {
  const ref = useExternalDataRef("node-1");
  return <div data-testid="has-ref">{String(!!ref)}</div>;
};

describe("ExternalDataContext", () => {
  it("provides refs to nodes", () => {
    const refs: Record<string, ExternalDataReference> = {
      "node-1": { id: "ref-1", type: "url", metadata: { href: "https://example.com" } },
    };
    const { getByTestId } = render(
      <ExternalDataProvider refs={refs}>
        <Harness />
      </ExternalDataProvider>
    );
    expect(getByTestId("has-ref").textContent).toBe("true");
  });
});
