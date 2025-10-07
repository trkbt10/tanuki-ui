import React from "react";
import { H3, P } from "tanuki-ui";
import styles from "./TestCard.module.css";

interface TestGridProps {
  children: React.ReactNode;
  className?: string;
}

export const TestGrid: React.FC<TestGridProps> = ({ children, className }) => {
  return <div className={`${styles.testGrid} ${className || ""}`}>{children}</div>;
};

interface TestCardProps {
  children: React.ReactNode;
  className?: string;
}

export const TestCard: React.FC<TestCardProps> = ({ children, className }) => {
  return <div className={`${styles.testCard} ${className || ""}`}>{children}</div>;
};

interface TestCardHeaderProps {
  title: string;
  className?: string;
}

export const TestCardHeader: React.FC<TestCardHeaderProps> = ({ title, className }) => {
  return (
    <div className={`${styles.testCardHeader} ${className || ""}`}>
      <H3 className={styles.testCardTitle}>{title}</H3>
    </div>
  );
};

interface TestCardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const TestCardBody: React.FC<TestCardBodyProps> = ({ children, className }) => {
  return <P className={`${styles.testCardBody} ${className || ""}`}>{children}</P>;
};
