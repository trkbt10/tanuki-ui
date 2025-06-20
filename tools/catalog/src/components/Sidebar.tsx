import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { CategoryInfo } from "../catalog/components";
import { Select, SidebarList, Toolbar } from "tanuki-ui";
import { HeaderMainLayout } from "tanuki-ui/layouts";
// 実際に存在するテーマファイルを基にしたテーマリスト
const themes = [
  { value: "monotone", label: "Monotone (Default)", file: "/tanuki-ui/styles/monotone.css" },
  { value: "android12", label: "Android 12", file: "/tanuki-ui/styles/android12.css" },
  { value: "apple-liquid-glass", label: "Apple Liquid Glass", file: "/tanuki-ui/styles/apple-liquid-glass.css" },
  { value: "figma", label: "Figma", file: "/tanuki-ui/styles/figma.css" },
  { value: "ios", label: "iOS", file: "/tanuki-ui/styles/ios.css" },
  { value: "ios12", label: "iOS 12", file: "/tanuki-ui/styles/ios12.css" },
  { value: "macOS12", label: "macOS 12", file: "/tanuki-ui/styles/macOS12.css" },
  { value: "nintendo-switch", label: "Nintendo Switch", file: "/tanuki-ui/styles/nintendo-switch.css" },
  { value: "vercel", label: "Vercel", file: "/tanuki-ui/styles/vercel.css" },
  { value: "windows11", label: "Windows 11", file: "/tanuki-ui/styles/windows11.css" },
  { value: "windows98", label: "Windows 98", file: "/tanuki-ui/styles/windows98.css" },
];

interface SidebarProps {
  components: Record<string, CategoryInfo>;
}

const Sidebar: React.FC<SidebarProps> = ({ components }) => {
  const location = useLocation();
  const [selectedTheme, setSelectedTheme] = useState("monotone");

  // テーマCSSを動的に読み込み
  useEffect(() => {
    // 既存のテーマCSSを削除
    const existingTheme = document.getElementById("theme-css");
    if (existingTheme) {
      existingTheme.remove();
    }

    // 新しいテーマCSSを追加
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
          <Toolbar.Body>
            <Toolbar.Title>
              <strong>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                  Tanuki UI
                </Link>
              </strong>
            </Toolbar.Title>
            <Select value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}>
              {themes.map((theme) => (
                <option key={theme.value} value={theme.value}>
                  {theme.label}
                </option>
              ))}
            </Select>
          </Toolbar.Body>
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
              <SidebarList.ListItem
                label="📝 Form Elements Catalog"
                selected={location.pathname === "/form-catalog"}
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
