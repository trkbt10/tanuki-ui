import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";
import App from "./App";
import "tanuki-ui/global.css";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  );
}
