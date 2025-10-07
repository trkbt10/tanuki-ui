import React from "react";
import { H3, P } from "tanuki-ui";
import styles from "./ExampleCard.module.css";

interface ExampleGridProps {
  children: React.ReactNode;
  className?: string;
}

export const ExampleGrid: React.FC<ExampleGridProps> = ({ children, className }) => {
  return <div className={`${styles.exampleGrid} ${className || ""}`}>{children}</div>;
};

interface ExampleCardProps {
  children: React.ReactNode;
  className?: string;
}

export const ExampleCard: React.FC<ExampleCardProps> = ({ children, className }) => {
  return <div className={`${styles.exampleCard} ${className || ""}`}>{children}</div>;
};

interface ExampleHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export const ExampleHeader: React.FC<ExampleHeaderProps> = ({ title, description, className }) => {
  return (
    <div className={`${styles.exampleHeader} ${className || ""}`}>
      <H3 className={styles.exampleTitle}>{title}</H3>
      {description && <P className={styles.exampleDescription}>{description}</P>}
    </div>
  );
};

interface SingleColumnContentProps {
  children: React.ReactNode;
  className?: string;
}

export const SingleColumnContent: React.FC<SingleColumnContentProps> = ({ children, className }) => {
  return <div className={`${styles.singleColumnContent} ${className || ""}`}>{children}</div>;
};
