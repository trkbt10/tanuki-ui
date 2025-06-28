import * as React from "react";
import { Route, createRoutesFromElements } from "react-router";
import { Root } from "./components/Root";
import { Variables } from "./pages/Variables";
import { TestStickyHeader } from "./pages/TestStickyHeader";
import { TestSidebarLayout } from "./pages/TestSidebarLayout";
import SwipeNavigationIndex from "./pages/SwipeNavigationIndex";
import BasicDemo from "./pages/swipe-navigation/BasicDemo";
import DynamicSizingDemo from "./pages/swipe-navigation/DynamicSizingDemo";

export const routes = createRoutesFromElements(
  <Route>
    <Route path="subpage" element={<TestStickyHeader />}></Route>
    <Route path="sidebar-layout" element={<TestSidebarLayout />}></Route>
    <Route path="swipe-navigation" element={<SwipeNavigationIndex />}></Route>
    <Route path="swipe-navigation/basic" element={<BasicDemo />}></Route>
    <Route path="swipe-navigation/dynamic-sizing" element={<DynamicSizingDemo />}></Route>
    <Route element={<Root />}>
      <Route path="/" element={<Variables />} />
    </Route>
  </Route>
);
