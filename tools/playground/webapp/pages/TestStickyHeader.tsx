import * as React from "react";
import { StickyHeader } from "@/layouts/StickyHeader";

export const TestStickyHeader = () => {
  return (
    <div>
      <StickyHeader cover="/test.png">
        <div>
          <h1>Sticky Header Example</h1>
          <p>This header will stick to the top when you scroll down.</p>
        </div>
      </StickyHeader>
      <div>
        <h2>Sticky Header Content</h2>
        <p>
          This is an example of a sticky header that remains at the top of the viewport when you scroll down. The header
          contains a cover image and some text.
        </p>
        <p>
          Scroll down to see the sticky header in action. The header will remain visible at the top of the page while you scroll
          through the content below.
        </p>
      </div>
    </div>
  );
};