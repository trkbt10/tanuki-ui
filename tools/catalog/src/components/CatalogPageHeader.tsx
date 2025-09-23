import React from "react";
import { Header, H1, P, Small } from "tanuki-ui";
import styles from "./CatalogPageHeader.module.css";

type Align = "start" | "center";

export interface CatalogPageHeaderProps {
  title: React.ReactNode;
  lead?: React.ReactNode;
  helperText?: React.ReactNode;
  align?: Align;
  className?: string;
  children?: React.ReactNode;
}

const joinClassNames = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(" ");

const CatalogPageHeader: React.FC<CatalogPageHeaderProps> = ({
  title,
  lead,
  helperText,
  align = "center",
  className,
  children,
}) => {
  return (
    <Header className={joinClassNames(styles.root, className)} data-align={align}>
      <H1 className={styles.title}>{title}</H1>
      {lead ? <P className={styles.lead}>{lead}</P> : null}
      {children}
      {helperText ? <Small className={styles.helperText}>{helperText}</Small> : null}
    </Header>
  );
};

export default CatalogPageHeader;
