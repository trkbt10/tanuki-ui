import React from "react";
import { useNavigate, useLocation } from "react-router";
import { TabBar } from "tanuki-ui";
import CatalogPageHeader from "../../../../components/CatalogPageHeader";
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  title: string;
  lead: string;
  helperText?: string;
  showNav?: boolean;
}

const navItems = [
  { key: "overview", value: "Overview", path: "/component/extended/NodeEditor" },
  { key: "custom-port", value: "Custom Port Renderer", path: "/component/extended/NodeEditor/custom-port" },
  { key: "floating-sidebar", value: "Floating Sidebar", path: "/component/extended/NodeEditor/floating-sidebar" },
];

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  lead,
  helperText,
  showNav = true,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the default selected index based on the current path
  const defaultSelected = React.useMemo(() => {
    const index = navItems.findIndex(item => item.path === location.pathname);
    return index >= 0 ? index : 0;
  }, [location.pathname]);

  const handleSelect = React.useCallback((item: typeof navItems[0], index: number) => {
    navigate(item.path);
  }, [navigate]);

  return (
    <header className={styles.header}>
      <CatalogPageHeader
        title={title}
        lead={lead}
        helperText={helperText}
        align="start"
      />
      {showNav && (
        <TabBar
          items={navItems}
          defaultSelected={defaultSelected}
          onSelect={handleSelect}
        />
      )}
    </header>
  );
};
