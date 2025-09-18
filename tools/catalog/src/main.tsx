import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";
import App from "./App";
import "tanuki-ui/global.css";
import { themes } from "./data/themes";
import { DEFAULT_THEME_VALUE, ensureThemeStylesheet } from "./utils/themeLoader";

const defaultTheme = themes.find((theme) => theme.value === DEFAULT_THEME_VALUE) ?? themes[0];
ensureThemeStylesheet(defaultTheme);

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
