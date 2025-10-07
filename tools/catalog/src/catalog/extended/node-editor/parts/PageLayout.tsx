import React from "react";
import { Article, Main as TanukiMain, Section as TanukiSection } from "tanuki-ui";
import styles from "./PageLayout.module.css";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, className }) => {
  return <Article className={`${styles.page} ${className || ""}`}>{children}</Article>;
};

interface MainProps {
  children: React.ReactNode;
  className?: string;
}

export const Main: React.FC<MainProps> = ({ children, className }) => {
  return <TanukiMain className={`${styles.main} ${className || ""}`}>{children}</TanukiMain>;
};

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className }) => {
  return <TanukiSection className={`${styles.section} ${className || ""}`}>{children}</TanukiSection>;
};

interface SectionIntroProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionIntro: React.FC<SectionIntroProps> = ({ children, className }) => {
  return <div className={`${styles.sectionIntro} ${className || ""}`}>{children}</div>;
};
