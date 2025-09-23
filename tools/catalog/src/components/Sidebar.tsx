import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { CategoryInfo } from "../catalog/components";
import { DataList, SidebarList, Toolbar, Small } from "tanuki-ui";
import { HeaderMainLayout } from "tanuki-ui/layouts";
import { themes, groupThemesByCategory } from "../data/themes";
import { DEFAULT_THEME_VALUE, ensureThemeStylesheet } from "../utils/themeLoader";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  components: Record<string, CategoryInfo>;
}

const Sidebar: React.FC<SidebarProps> = ({ components }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState(DEFAULT_THEME_VALUE);
  const themesByCategory = groupThemesByCategory(themes);
  const categoryEntries = useMemo(() => Object.entries(components), [components]);
  const groupedCategories = useMemo(
    () => ({
      html: categoryEntries.filter(([, info]) => info.group === "html"),
      custom: categoryEntries.filter(([, info]) => info.group === "custom"),
    }) as const,
    [categoryEntries],
  );
  const normalizeLabel = React.useCallback((value: string) => value.replace(/^[^\p{L}\p{N}]+\s*/u, ""), []);
  const groupTitles: Record<keyof typeof groupedCategories, string> = {
    html: "HTML 基本要素",
    custom: "拡張コンポーネント",
  };

  const pathParts = location.pathname.split("/").filter(Boolean);
  const activeCategoryFromPath = pathParts[0] === "component" ? pathParts[1] : undefined;
  const activeComponentFromPath = pathParts[0] === "component" ? pathParts[2] : undefined;
  const activeGroupFromPath = activeCategoryFromPath ? components[activeCategoryFromPath]?.group : undefined;
  const routeLevel = activeComponentFromPath ? 2 : activeCategoryFromPath ? 1 : 0;

  const [selectedGroup, setSelectedGroup] = useState<keyof typeof groupedCategories | undefined>(
    activeGroupFromPath as keyof typeof groupedCategories | undefined,
  );

  useEffect(() => {
    const selectedThemeData = themes.find((t) => t.value === selectedTheme);
    ensureThemeStylesheet(selectedThemeData);
  }, [selectedTheme]);

  useEffect(() => {
    if (activeGroupFromPath) {
      setSelectedGroup(activeGroupFromPath as keyof typeof groupedCategories);
    }
  }, [activeGroupFromPath]);

  const handleGroupSelect = (groupKey: keyof typeof groupedCategories) => {
    setSelectedGroup(groupKey);
  };

  const selectedGroupCategories = selectedGroup ? groupedCategories[selectedGroup] ?? [] : [];
  const selectedCategoryKey = activeCategoryFromPath;
  const selectedCategoryInfo = selectedCategoryKey ? components[selectedCategoryKey] : undefined;

  const currentLevel = Math.max(routeLevel, selectedGroup ? 1 : 0);
  const canGoBack = currentLevel > 0;
  const handleBack = () => {
    if (routeLevel > 0) {
      navigate(-1);
      return;
    }
    if (selectedGroup) {
      setSelectedGroup(undefined);
    }
  };

  const levelTitle = (() => {
    if (currentLevel === 2) {
      return selectedCategoryInfo ? `${selectedCategoryInfo.icon ?? ""} ${selectedCategoryInfo.name}` : "コンポーネント";
    }
    if (currentLevel === 1) {
      return selectedGroup ? groupTitles[selectedGroup] : "カテゴリ";
    }
    return "コンポーネント コレクション";
  })();

  const levelCaption = (() => {
    if (currentLevel === 2 && selectedCategoryInfo) {
      return selectedCategoryInfo.description;
    }
    if (currentLevel === 1) {
      return selectedGroup ? groupTitles[selectedGroup] : "カテゴリ選択";
    }
    return "全体";
  })();

  const trackStyle = {
    transform: `translateX(-${currentLevel * 100}%)`,
  } as const;

  const specialPages = useMemo(
    () => [
      { label: "Form Elements Catalog", to: "/form-catalog" },
      { label: "Table Catalog", to: "/component/lists/Table" },
      { label: "Segmented Control Catalog", to: "/component/controls/SegmentedControl" },
      { label: "Resizer Catalog", to: "/component/controls/Resizer" },
      { label: "TabBar Catalog", to: "/component/bars/TabBar" },
      { label: "Drawer Catalog", to: "/component/other/Drawer" },
      { label: "NodeEditor Catalog", to: "/component/extended/NodeEditor" },
      { label: "3D Controls", to: "/component/3d-controls" },
      { label: "Audio Controls", to: "/component/audio-controls" },
    ],
    [],
  );

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
      <div className={styles.sidebarRoot}>
        <div className={styles.navigatorHeader}>
          {canGoBack && (
            <button type="button" className={styles.backButton} onClick={handleBack}>
              <span className={styles.backGlyph}>{"<"}</span>
              <span>戻る</span>
            </button>
          )}
          <div className={styles.headerTitle}>
            <span>{levelTitle}</span>
            <span className={styles.headerCaption}>{levelCaption}</span>
          </div>
        </div>

        <div className={styles.viewport}>
          <div className={styles.track} style={trackStyle}>
            <div className={styles.pane}>
              <div className={styles.surface}>
                <div className={styles.scrollArea}>
                  <div className={styles.sectionHeading}>Collections</div>
                <SidebarList.List>
                  {(Object.keys(groupedCategories) as Array<keyof typeof groupedCategories>).map((groupKey) => (
                    <SidebarList.ListItem
                      key={groupKey}
                      label={normalizeLabel(groupTitles[groupKey])}
                      selected={selectedGroup === groupKey || activeGroupFromPath === groupKey}
                      onClick={() => handleGroupSelect(groupKey)}
                    />
                  ))}
                </SidebarList.List>

                  <div className={styles.sectionHeading}>Special Pages</div>
                  <SidebarList.List>
                    {specialPages.map((page) => {
                      const isActive =
                        location.pathname === page.to || location.pathname.startsWith(`${page.to}/`);
                      return (
                        <Link key={page.to} to={page.to} className={styles.linkReset}>
                          <SidebarList.ListItem label={page.label} selected={isActive} />
                        </Link>
                      );
                    })}
                  </SidebarList.List>
                </div>
              </div>
            </div>

            <div className={styles.pane}>
              <div className={styles.surface}>
                <div className={styles.sectionHeading}>カテゴリ</div>
                <div className={styles.scrollArea}>
                  {selectedGroup ? (
                    selectedGroupCategories.length > 0 ? (
                      <SidebarList.List>
                        {selectedGroupCategories.map(([categoryKey, categoryInfo]) => (
                          <Link key={categoryKey} to={`/component/${categoryKey}`} className={styles.linkReset}>
                            <SidebarList.ListItem
                              label={normalizeLabel(categoryInfo.name)}
                              selected={selectedCategoryKey === categoryKey}
                            />
                          </Link>
                        ))}
                      </SidebarList.List>
                    ) : (
                      <div className={styles.placeholder}>このグループにはカテゴリがありません</div>
                    )
                  ) : (
                    <div className={styles.placeholder}>グループを選択してください</div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.pane}>
              <div className={styles.surface}>
                <div className={styles.sectionHeading}>コンポーネント</div>
                <div className={styles.scrollArea}>
                  {selectedCategoryInfo ? (
                    selectedCategoryInfo.components.length > 0 ? (
                      <SidebarList.List>
                        {selectedCategoryInfo.components.map((component) => (
                          <Link
                            key={component.name}
                            to={`/component/${selectedCategoryKey}/${component.name}`}
                            className={styles.linkReset}
                          >
                            <SidebarList.ListItem
                              label={component.name}
                              selected={activeComponentFromPath === component.name}
                            />
                          </Link>
                        ))}
                      </SidebarList.List>
                    ) : (
                      <div className={styles.placeholder}>このカテゴリにはコンポーネントがありません</div>
                    )
                  ) : (
                    <div className={styles.placeholder}>カテゴリを選択してください</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderMainLayout>
  );
};

export default Sidebar;
