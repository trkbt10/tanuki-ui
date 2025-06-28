import * as React from "react";
import { Root as ClientRoot, createRoot } from "react-dom/client";
import { App } from "./App";
import "@/global.css";
import "../public/monotone.css";

const mountNode = document.getElementById("react-app")!;
let root: ClientRoot = createRoot(mountNode);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);