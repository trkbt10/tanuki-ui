import React from "react";
import { Link } from "react-router";

const SwipeNavigationIndex: React.FC = () => {
  const demos = [
    {
      path: "/swipe-navigation/dynamic-sizing",
      title: "Dynamic Sizing Demo",
      description: "Views adapt width based on content size",
    },
    { path: "/swipe-navigation/basic", title: "Basic SwipeNavigation", description: "Horizontal slide between two views" },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui, -apple-system, sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h1>SwipeNavigation Demos</h1>
      <p style={{ marginBottom: "30px", color: "#666" }}>
        SwipeNavigation provides iOS-style horizontal view navigation. Test each variant in full-screen mode. Resize your
        browser to mobile size (&lt;768px) to experience swipe gestures.
      </p>

      <div style={{ display: "grid", gap: "20px" }}>
        {demos.map((demo) => (
          <Link
            key={demo.path}
            to={demo.path}
            style={{
              display: "block",
              padding: "20px",
              border: demo.featured ? "2px solid #3b82f6" : "1px solid #e0e0e0",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
              background: demo.featured ? "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)" : "#f9f9f9",
              transition: "all 0.2s",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              const isFeatured = demo.featured;
              e.currentTarget.style.background = isFeatured ? "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)" : "#f0f0f0";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = isFeatured
                ? "0 8px 16px rgba(59, 130, 246, 0.15)"
                : "0 4px 8px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              const isFeatured = demo.featured;
              e.currentTarget.style.background = isFeatured ? "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)" : "#f9f9f9";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>{demo.title}</h3>
            <p style={{ margin: 0, color: "#666" }}>{demo.description}</p>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: "40px", padding: "20px", background: "#f0f8ff", borderRadius: "8px" }}>
        <h3>Testing Tips</h3>
        <ul style={{ margin: 0, paddingLeft: "20px" }}>
          <li>
            <strong>🚀 Try Body Scroll Demo on iOS Safari</strong> - notice how the address bar auto-hides!
          </li>
          <li>Use Chrome DevTools device emulation for consistent mobile testing</li>
          <li>Swipe horizontally to navigate between views</li>
          <li>Swipe threshold is 25% of screen width</li>
          <li>Views slide like native mobile app navigation</li>
          <li>Desktop shows both views side by side</li>
        </ul>
      </div>
    </div>
  );
};

export default SwipeNavigationIndex;
