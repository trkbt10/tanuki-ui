import * as React from "react";
import { Link, useMatches, useOutlet } from "react-router";
import classes from "./webapp.module.css";
import { TabBar, Toolbar } from "../src";
function Root(props: React.PropsWithChildren<{}>) {
  const outlet = useOutlet();
  const items = React.useMemo(() => {
    return [
      {
        key: "top",
        value: "top",
        icon: "home",
      },
      {
        key: "sub",
        value: "sub",
        icon: "user",
      },
      {
        key: "sub",
        value: "sub2",
        icon: "user",
      },
    ];
  }, []);
  return (
    <div className={classes.root}>
      <header className={classes.AppHeader}>
        <Toolbar
          style={{
            paddingTop: "env(safe-area-inset-top)",
            height: "100%",
          }}
        >
          <Toolbar.Title>
            <strong>App</strong>
          </Toolbar.Title>
          <Toolbar.Body>
            <nav>
              <ul>
                <li>
                  <Link to="/">top</Link>
                </li>
                <li>
                  <Link to="/subpage">subpage</Link>
                </li>
              </ul>
            </nav>
          </Toolbar.Body>
        </Toolbar>
      </header>
      <main className={classes.AppMain}>
        <div className={classes.AppMainInner}>{outlet}</div>
      </main>
      <footer className={classes.AppFooter}>
        <Toolbar
          style={{
            paddingBottom: "env(safe-area-inset-bottom)",
            height: "100%",
          }}
        >
          <TabBar items={items} onSelect={console.log}></TabBar>
        </Toolbar>
      </footer>
    </div>
  );
}
import { Root as ClientRoot, createRoot } from "react-dom/client";
import { Route, RouterProvider, createHashRouter, createMemoryRouter, createRoutesFromElements } from "react-router";
import { StickyHeader } from "../src/layouts";

const isPWADisplayMode = "standalone" in window.navigator;
const routerFactory = isPWADisplayMode ? createMemoryRouter : createHashRouter;
function useComputedStyle() {
  const data = React.useMemo(() => {
    const computed = getComputedStyle(document.documentElement, "");
    return computed;
  }, []);
  return data;
}
const Variables = () => {
  const cs = useComputedStyle();
  return (
    <div>
      <h1>Variables</h1>
      <dl>
        {Array.from(cs).map((key) => {
          const value = cs.getPropertyValue(key);
          return (
            <React.Fragment key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </React.Fragment>
          );
        })}
      </dl>
    </div>
  );
};
const TestStickyHeader = () => {
  return (
    <div>
      <StickyHeader cover="/test.png">
        <div>
          <h1>Sticky Header Example</h1>
          <p>This header will stick to the top when you scroll down.</p>
        </div>
      </StickyHeader>
      <div>
        <h2>Sticky Header Content</h2>
        <p>
          This is an example of a sticky header that remains at the top of the viewport when you scroll down. The header
          contains a cover image and some text.
        </p>
        <p>
          Scroll down to see the sticky header in action. The header will remain visible at the top of the page while you scroll
          through the content below.
        </p>
      </div>
    </div>
  );
};
const routes = createRoutesFromElements(
  <Route>
    <Route path="subpage" element={<TestStickyHeader />}></Route>
    <Route element={<Root />}>
      <Route path="/" element={<Variables />} />
    </Route>
  </Route>,
);
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

const mountNode = document.getElementById("react-app")!;
let root: ClientRoot = createRoot(mountNode);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
