import React from "react";
import { Route, Routes } from "react-router";
import { SidebarLayout } from "tanuki-ui/layouts";
import { components } from "./catalog/components";
import ComponentView from "./components/ComponentView";
import HomePage from "./components/HomePage";
import FormCatalog from "./components/FormCatalog";
import TableCatalog from "./components/TableCatalog";
import SegmentedControlCatalog from "./components/SegmentedControlCatalog";
import ResizerCatalog from "./components/ResizerCatalog";
import TabBarCatalog from "./components/TabBarCatalog";
import DrawerCatalog from "./components/DrawerCatalog";
import {
  NodeEditorCatalog,
  CustomPortRendererCatalog,
  FloatingSidebarNodeEditorCatalog,
} from "./catalog/extended/node-editor";
import CategoryPage from "./components/CategoryPage";
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
            <Route path="/component/lists/Table" element={<TableCatalog />} />
            <Route path="/component/controls/SegmentedControl" element={<SegmentedControlCatalog />} />
            <Route path="/component/controls/Resizer" element={<ResizerCatalog />} />
            <Route path="/component/bars/TabBar" element={<TabBarCatalog />} />
            <Route path="/component/other/Drawer" element={<DrawerCatalog />} />
            <Route path="/component/extended/NodeEditor" element={<NodeEditorCatalog />} />
            <Route path="/component/extended/NodeEditor/custom-port" element={<CustomPortRendererCatalog />} />
            <Route path="/component/extended/NodeEditor/floating-sidebar" element={<FloatingSidebarNodeEditorCatalog />} />
            <Route path="/component/:category" element={<CategoryPage />} />
            <Route path="/component/:category/:name" element={<ComponentView />} />
          </Routes>
        </div>
      </SidebarLayout>
    </div>
  );
}

export default App;
