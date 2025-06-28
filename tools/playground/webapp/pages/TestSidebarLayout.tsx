import * as React from "react";
import { SidebarLayout } from "@/layouts/SidebarLayout";

const sidebar = (
  <div style={{ padding: "20px", backgroundColor: "#f5f5f5", height: "100%" }}>
    <h2>Sidebar</h2>
    <nav>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: "10px" }}>
          <a href="#section1">Section 1</a>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <a href="#section2">Section 2</a>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <a href="#section3">Section 3</a>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <a href="#section4">Section 4</a>
        </li>
      </ul>
    </nav>
  </div>
);

const mainContent = (
  <div style={{ padding: "20px" }}>
    <h1>Sidebar Layout Example</h1>
    <p>
      This is a demonstration of the SidebarLayout component. The sidebar can be resized by dragging the divider between the
      sidebar and main content area.
    </p>

    <section id="section1" style={{ marginTop: "40px" }}>
      <h2>Section 1</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
      </p>
    </section>

    <section id="section2" style={{ marginTop: "40px" }}>
      <h2>Section 2</h2>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </section>

    <section id="section3" style={{ marginTop: "40px" }}>
      <h2>Section 3</h2>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      </p>
    </section>

    <section id="section4" style={{ marginTop: "40px" }}>
      <h2>Section 4</h2>
      <p>
        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
        quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
      </p>
    </section>
  </div>
);

export const TestSidebarLayout = () => {
  return (
    <SidebarLayout aside={sidebar} minAsideWidth={200} maxAsideWidth={400} mobileBreakpoint={768} mobileSidebarMode="overlay">
      {mainContent}
    </SidebarLayout>
  );
};
