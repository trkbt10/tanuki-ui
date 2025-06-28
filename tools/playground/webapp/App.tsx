import * as React from "react";
import {
  RouterProvider,
  createHashRouter,
  createMemoryRouter,
} from "react-router";
import { routes } from "./routes";

const isPWADisplayMode = "standalone" in window.navigator;
const routerFactory = isPWADisplayMode ? createMemoryRouter : createHashRouter;

const router = routerFactory(routes, {
  future: {},
});

export const App: React.FC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
App.displayName = "App";