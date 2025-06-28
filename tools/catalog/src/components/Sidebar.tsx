import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { CategoryInfo } from "../catalog/components";
import { DataList, SidebarList, Toolbar } from "tanuki-ui";
import { HeaderMainLayout } from "tanuki-ui/layouts";
import { themes, groupThemesByCategory } from "../data/themes";

interface SidebarProps {
  components: Record<string, CategoryInfo>;
}

const Sidebar: React.FC<SidebarProps> = ({ components }) => {
  const location = useLocation();
  const [selectedTheme, setSelectedTheme] = useState("monotone");
  const themesByCategory = groupThemesByCategory(themes);

  // Apply selected theme CSS
  useEffect(() => {
    // Remove existing theme CSS
    const existingTheme = document.getElementById("theme-css");
    if (existingTheme) {
      existingTheme.remove();
    }

    // Add new theme CSS
    const selectedThemeData = themes.find((t) => t.value === selectedTheme);
    if (selectedThemeData?.file) {
      const link = document.createElement("link");
      link.id = "theme-css";
      link.rel = "stylesheet";
      link.href = selectedThemeData.file;
      document.head.appendChild(link);
    }
  }, [selectedTheme]);

  return (
    <HeaderMainLayout
      header={
        <Toolbar>
          <DataList
            value={selectedTheme}
            onChange={(value) => setSelectedTheme(String(value))}
            list="themes-list"
            placeholder="Select theme..."
            style={{ minWidth: "200px" }}
          />
          <datalist id="themes-list">
            {Object.entries(themesByCategory).map(([category, categoryThemes]) => (
              <optgroup key={category} label={category}>
                {categoryThemes.map((theme) => (
                  <option key={theme.value} value={theme.value}>
                    {theme.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </datalist>
          {themes.length > 0 && (
            <span style={{ fontSize: "12px", color: "var(--secondaryLabelColor)", marginLeft: "8px" }}>
              {themes.length} themes available
            </span>
          )}
        </Toolbar>
      }
    >
      <SidebarList.List>
        {/* 特殊ページへのリンク */}
        <SidebarList.Container open>
          <SidebarList.SectionTitle title="🌟 特殊ページ" />
          <SidebarList.List>
            <Link
              to="/form-catalog"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <SidebarList.ListItem label="📝 Form Elements Catalog" selected={location.pathname === "/form-catalog"} />
            </Link>
            <Link
              to="/node-editor-test"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <SidebarList.ListItem label="🧪 NodeEditor Props Test" selected={location.pathname === "/node-editor-test"} />
            </Link>
            <Link
              to="/component/3d-controls"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <SidebarList.ListItem label="🎮 3D Controls" selected={location.pathname.includes("/component/3d-controls")} />
            </Link>
            <Link
              to="/component/audio-controls"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <SidebarList.ListItem
                label="🎵 Audio Controls"
                selected={location.pathname.includes("/component/audio-controls")}
              />
            </Link>
          </SidebarList.List>
        </SidebarList.Container>

        {Object.entries(components).map(([categoryKey, category]) => (
          <SidebarList.Container key={categoryKey} open>
            <SidebarList.SectionTitle title={`${category.icon} ${category.name}`} />
            <SidebarList.List>
              {category.components.map((component) => (
                <Link
                  to={`/component/${categoryKey}/${component.name}`}
                  key={component.name}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <SidebarList.ListItem
                    key={component.name}
                    label={component.name}
                    selected={location.pathname === `/component/${categoryKey}/${component.name}`}
                  />
                </Link>
              ))}
            </SidebarList.List>
          </SidebarList.Container>
        ))}
      </SidebarList.List>
    </HeaderMainLayout>
  );
};

export default Sidebar;
