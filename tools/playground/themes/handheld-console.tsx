import React from "react";
import { createRoot } from "react-dom/client";
import { AllForms } from "../pages/AllForms";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import { TestForm } from "../pages/TestForm";
import { TestNativeSortable } from "../pages/TestNativeSortable";
import { NestedDialogs } from "../pages/NestedDialogs";
import { ControlledInputState } from "../pages/ControlledInputState";
const pages = [
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
];
const mountNode = document.getElementById("react-app");
if (!mountNode) {
  throw new Error("mountNode is not found");
}
const root = createRoot(mountNode);
root.render(
  <React.StrictMode>
    <Router>
      <header
        style={{
          position: "sticky",
          top: 0,
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          zIndex: 1,
          left: 0,
          width: "100%",
          height: "3rem",
          borderBottom: "1px solid #ccc",
        }}
      >
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
      </header>
      <main>
        <Routes>
          {pages.map((page, i) => {
            return <Route key={i} path={page.path} element={<page.component />}></Route>;
          })}
        </Routes>
      </main>
    </Router>
  </React.StrictMode>,
);
