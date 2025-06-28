import React from "react";
import { createRoot } from "react-dom/client";
import { AllForms } from "./pages/AllForms";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import { TestForm } from "./pages/TestForm";
import { TestNativeSortable } from "./pages/TestNativeSortable";
import { NestedDialogs } from "./pages/NestedDialogs";
import { ControlledInputState } from "./pages/ControlledInputState";
import { TestWindow } from "./pages/TestWindow";
import { TestDataList } from "./pages/TestDataList";
import { TestNodeEditor } from "./pages/TestNodeEditor";
import { TestPanel } from "./pages/TestPanel";
import { TestPanelDebug } from "./pages/TestPanelDebug";
import { TestPanelMinimal } from "./pages/TestPanelMinimal";
import { HeaderMainLayout, StickyHeader } from "@/layouts";
import { H2, SidebarList, Toolbar } from "@/index";
import { CloseIcon } from "@/blocks/Icon";
import { SearchIcon } from "@/blocks/SearchIcon";
import classes from "./index.module.css";
import { CloseButton } from "@/form/CloseButton";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Sample Application</h1>
      <p>This application showcases various features and components.</p>
      <p>Use the navigation above to explore different pages.</p>

      <h2>Icon</h2>
      <div className={classes.iconContainer}>
        <CloseIcon size={32} />
        <SearchIcon size={32} />
        <CloseButton />
      </div>
      <H2>SidebarList</H2>
      <div className={classes.sidebarListContainer}>
        <SidebarList.Container open>
          <SidebarList.Summary>Header</SidebarList.Summary>
          <SidebarList.List>
            <SidebarList.ListItem label="a"></SidebarList.ListItem>
            <SidebarList.ListItem label="b"></SidebarList.ListItem>
            <SidebarList.ListItem label="c">
              <SidebarList.List>
                <SidebarList.ListItem label="1"></SidebarList.ListItem>
                <SidebarList.ListItem label="2"></SidebarList.ListItem>
                <SidebarList.ListItem label="3"></SidebarList.ListItem>
              </SidebarList.List>
            </SidebarList.ListItem>

            <SidebarList.ListItem label="d">
              <SidebarList.List>
                <SidebarList.ListItem label="1"></SidebarList.ListItem>
                <SidebarList.ListItem label="2"></SidebarList.ListItem>
                <SidebarList.ListItem label="3"></SidebarList.ListItem>
              </SidebarList.List>
            </SidebarList.ListItem>
          </SidebarList.List>
        </SidebarList.Container>
      </div>
    </div>
  );
};
const TestStickyHeader = () => {
  return (
    <StickyHeader cover="/test.png">
      <h1>Sticky Header Example</h1>
      <p>This header will stick to the top when you scroll down.</p>
    </StickyHeader>
  );
};
const pages = [
  {
    path: "/",
    label: "home",
    component: Home,
  },
  {
    path: "/sticky-header",
    label: "sticky-header",
    component: TestStickyHeader,
  },
  {
    path: "/all-forms",
    label: "All Forms",
    component: AllForms,
  },
  {
    path: "/test-form",
    label: "TestForm",
    component: TestForm,
  },
  {
    path: "/test-native-sortable",
    label: "TestNativeSortable",
    component: TestNativeSortable,
  },
  {
    path: "/nested-dialogs",
    label: "NestedDialogs",
    component: NestedDialogs,
  },
  {
    path: "/controlled-input-state",
    label: "ControlledInputState",
    component: ControlledInputState,
  },
  {
    path: "/window",
    label: "Window",
    component: TestWindow,
  },
  {
    path: "/data-list",
    label: "Data-list",
    component: TestDataList,
  },
  {
    path: "/node-editor",
    label: "Node Editor",
    component: TestNodeEditor,
  },
  {
    path: "/panel-system",
    label: "Panel System",
    component: TestPanel,
  },
  {
    path: "/panel-debug",
    label: "Panel Debug",
    component: TestPanelDebug,
  },
  {
    path: "/panel-minimal",
    label: "Panel Minimal",
    component: TestPanelMinimal,
  },
];
const mountNode = document.getElementById("react-app");
if (!mountNode) {
  throw new Error("mountNode is not found");
}
const root = createRoot(mountNode);
root.render(
  <React.StrictMode>
    <Router>
      <HeaderMainLayout
        header={
          <Toolbar>
            <Toolbar.Body>
              <Toolbar.Title>
                <strong>Samples</strong>
                <small></small>
              </Toolbar.Title>
              <nav>
                <ul
                  style={{
                    display: "flex",
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    gap: "1rem",
                  }}
                >
                  {pages.map((page, i) => {
                    return (
                      <li key={i}>
                        <Link to={page.path}>
                          <span>{page.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </Toolbar.Body>
          </Toolbar>
        }
      >
        <Routes>
          {pages.map((page, i) => {
            return <Route key={i} path={page.path} element={<page.component />}></Route>;
          })}
        </Routes>
      </HeaderMainLayout>
    </Router>
  </React.StrictMode>
);
