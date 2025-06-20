import React from "react";
import { Route, Routes } from "react-router";
import { SidebarLayout } from "tanuki-ui/layouts";
import { components } from "./catalog/components";
import ComponentView from "./components/ComponentView";
import HomePage from "./components/HomePage";
import FormCatalog from "./components/FormCatalog";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        inset: 0,
        width: "100%",
        maxHeight: "100svh",
        overflow: "hidden",
      }}
    >
      <SidebarLayout aside={<Sidebar components={components} />}>
        <div style={{ flex: 1, overflow: "auto" }}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/form-catalog" element={<FormCatalog />} />
            <Route path="/component/:category/:name" element={<ComponentView />} />
          </Routes>
        </div>
      </SidebarLayout>
    </div>
  );
}

export default App;
