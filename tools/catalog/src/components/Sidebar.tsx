import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { CategoryInfo } from "../catalog/components";
import { DataList, SidebarList, Toolbar, Small } from "tanuki-ui";
import { HeaderMainLayout } from "tanuki-ui/layouts";
import { themes, groupThemesByCategory } from "../data/themes";
import { DEFAULT_THEME_VALUE, ensureThemeStylesheet } from "../utils/themeLoader";

interface SidebarProps {
  components: Record<string, CategoryInfo>;
}

const Sidebar: React.FC<SidebarProps> = ({ components }) => {
  const location = useLocation();
  const [selectedTheme, setSelectedTheme] = useState(DEFAULT_THEME_VALUE);
  const themesByCategory = groupThemesByCategory(themes);
  const categoryEntries = Object.entries(components);
  const groupedCategories = {
    html: categoryEntries.filter(([, info]) => info.group === "html"),
    custom: categoryEntries.filter(([, info]) => info.group === "custom"),
  } as const;
  const groupTitles: Record<keyof typeof groupedCategories, string> = {
    html: "HTML 基本要素",
    custom: "拡張コンポーネント",
  };

  // Apply selected theme CSS
  useEffect(() => {
    const selectedThemeData = themes.find((t) => t.value === selectedTheme);
    ensureThemeStylesheet(selectedThemeData);
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
            <Small style={{ fontSize: "12px", color: "var(--secondaryLabelColor)", marginLeft: "8px" }}>
              {themes.length} themes available
            </Small>
          )}
        </Toolbar>
      }
    >
      <SidebarList.List>
        {/* 特殊ページへのリンク */}
        <SidebarList.Container open>
          <SidebarList.SectionTitle title="特殊ページ" />
          <SidebarList.List>
            <Link
              to="/form-catalog"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <SidebarList.ListItem label="Form Elements Catalog" selected={location.pathname === "/form-catalog"} />
            </Link>
            <Link
              to="/component/lists/Table"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <SidebarList.ListItem label="Table Catalog" selected={location.pathname === "/component/lists/Table"} />
            </Link>
            <Link
              to="/component/controls/SegmentedControl"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <SidebarList.ListItem
                label="Segmented Control Catalog"
                selected={location.pathname === "/component/controls/SegmentedControl"}
              />
            </Link>
            <Link
              to="/component/controls/Resizer"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <SidebarList.ListItem label="Resizer Catalog" selected={location.pathname === "/component/controls/Resizer"} />
            </Link>
            <Link
              to="/component/bars/TabBar"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <SidebarList.ListItem label="TabBar Catalog" selected={location.pathname === "/component/bars/TabBar"} />
            </Link>
            <Link
              to="/component/other/Drawer"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <SidebarList.ListItem label="Drawer Catalog" selected={location.pathname === "/component/other/Drawer"} />
            </Link>
            <Link
              to="/component/extended/NodeEditor"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <SidebarList.ListItem label="NodeEditor Catalog" selected={location.pathname === "/component/extended/NodeEditor"} />
            </Link>
            <Link
              to="/component/3d-controls"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <SidebarList.ListItem label="3D Controls" selected={location.pathname.includes("/component/3d-controls")} />
            </Link>
            <Link
              to="/component/audio-controls"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <SidebarList.ListItem
                label="Audio Controls"
                selected={location.pathname.includes("/component/audio-controls")}
              />
            </Link>
          </SidebarList.List>
        </SidebarList.Container>

        {(Object.keys(groupedCategories) as Array<keyof typeof groupedCategories>).map((groupKey) => {
          const categories = groupedCategories[groupKey];
          if (categories.length === 0) return null;

          return (
            <SidebarList.Container key={groupKey} open>
              <SidebarList.SectionTitle title={groupTitles[groupKey]} />
              <SidebarList.List>
                {categories.map(([categoryKey, category]) => (
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
            </SidebarList.Container>
          );
        })}
      </SidebarList.List>
    </HeaderMainLayout>
  );
};

export default Sidebar;
