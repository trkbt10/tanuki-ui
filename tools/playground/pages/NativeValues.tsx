import React from "react";
import { createRoot } from "react-dom/client";
import { Descriptions } from "@/elements/Descriptions";
import { H3 } from "@/elements/Heading";

const App: React.FC = (props) => {
  const screen: any = window.screen;
  return (
    <div>
      <h1>React App</h1>
      <H3>Colours</H3>
      <SystemColours></SystemColours>
      <Descriptions>
        <dt>TouchEvent</dt>
        <dd>{navigator.maxTouchPoints}</dd>
        <dt>PointerEvent</dt>
        <dd>{"pointerevents" in window}</dd>
        <dt>Mouse</dt>
        <dd></dd>
      </Descriptions>
      <br />
      <Descriptions>
        <dt>personalbar</dt>
        <dd>{window.personalbar.visible ? "yes" : "no"}</dd>
        <dt>devicePixelRatio</dt>
        <dd>{window.devicePixelRatio}</dd>
        <dt>menubar</dt>
        <dd>{typeof window.menubar}</dd>
        <dt>Online</dt>
        <dd>{window.navigator.onLine ? "Yes" : "No"}</dd>
        <dt>platform</dt>
        <dd>{window.navigator.platform}</dd>
      </Descriptions>
      <H3>Screen</H3>
      <Descriptions>
        <dt>availHeight</dt>
        <dd>{screen.availHeight}</dd>
        <dt>availLeft</dt>
        <dd>{screen.availLeft}</dd>
        <dt>availTop</dt>
        <dd>{screen.availTop}</dd>
        <dt>availWidth</dt>
        <dd>{screen.availWidth}</dd>
        <dt>colorDepth</dt>
        <dd>{screen.colorDepth}</dd>
        <dt>mozOrientation</dt>
        <dd>{screen.mozOrientation}</dd>
        <dt>pixelDepth</dt>
        <dd>{screen.pixelDepth}</dd>
        <dt>top</dt>
        <dd>{screen.top}</dd>
        <dt>left</dt>
        <dd>{screen.left}</dd>
        <dt>height</dt>
        <dd>{screen.height}</dd>
        <dt>width</dt>
        <dd>{screen.width}</dd>
      </Descriptions>
    </div>
  );
};

let mountNode = document.getElementById("react-app");
if (mountNode) {
  const root = createRoot(mountNode);
  root.render(<App />);
}

const SystemColours = () => {
  return (
    <Descriptions>
      <dt style={{ color: "AccentColor" }}>Accent</dt>
      <dd>AccentColor</dd>
      <dt style={{ color: "AccentColorText" }}>AccentColorText</dt>
      <dd>Text of AccentColorText</dd>

      <dt style={{ color: "ActiveText" }}>ActiveText</dt>
      <dd>Text of active links</dd>

      <dt style={{ color: "ButtonBorder" }}>ButtonBorder</dt>
      <dd>Base border color of controls</dd>

      <dt style={{ color: "ButtonFace" }}>ButtonFace</dt>
      <dd>Background color of controls</dd>

      <dt style={{ color: "ButtonText" }}>ButtonText</dt>
      <dd>Foreground color of controls</dd>

      <dt style={{ color: "Canvas" }}>Canvas</dt>
      <dd>Background of application content or documents</dd>

      <dt style={{ color: "CanvasText" }}>CanvasText</dt>
      <dd>Foreground color in application content or documents</dd>

      <dt style={{ color: "Field" }}>Field</dt>
      <dd>Background of input fields</dd>

      <dt style={{ color: "FieldText" }}>FieldText</dt>
      <dd>Text in input fields</dd>

      <dt style={{ color: "GrayText" }}>GrayText</dt>
      <dd>Foreground color for disabled items (e.g. a disabled control)</dd>

      <dt style={{ color: "Highlight" }}>Highlight</dt>
      <dd>Background of selected items</dd>

      <dt style={{ color: "HighlightText" }}>HighlightText</dt>
      <dd>Foreground color of selected items</dd>

      <dt style={{ color: "LinkText" }}>LinkText</dt>
      <dd>Text of non-active, non-visited links</dd>

      <dt style={{ color: "Mark" }}>Mark</dt>
      <dd>Background of text that has been specially marked (such as by the HTML mark element)</dd>

      <dt style={{ color: "MarkText" }}>MarkText</dt>
      <dd>Text that has been specially marked (such as by the HTML mark element)</dd>

      <dt style={{ color: "VisitedText" }}>VisitedText</dt>
      <dd>Text of visited links</dd>
    </Descriptions>
  );
};
