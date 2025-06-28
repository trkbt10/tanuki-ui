import { TabBar } from "@/bars/TabBar";
import { Toolbar } from "@/bars/Toolbar";
import * as React from "react";
import { Link, useOutlet } from "react-router";
import classes from "../styles/webapp.module.css";

export function Root(props: React.PropsWithChildren<{}>) {
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
  const links = React.useMemo(() => {
    return [
      { to: "/", label: "top" },
      { to: "/subpage", label: "subpage" },
      { to: "/sidebar-layout", label: "sidebar-layout" },
      { to: "/swipe-navigation", label: "swipe-navigation" },
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
            <Toolbar.SegmentedControl
              items={links.map((link) => {
                return (
                  <Link
                    to={link.to}
                    key={link.to}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              onSelect={(key) => console.log("Selected:", key)}
            ></Toolbar.SegmentedControl>
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
