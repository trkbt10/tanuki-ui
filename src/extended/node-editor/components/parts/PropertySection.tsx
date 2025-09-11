import * as React from "react";
import { H4 } from "../elements";
import inspectorStyles from "../InspectorPanel.module.css";

export interface PropertySectionProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * PropertySection
 * - Reusable sidebar section with a small, uppercase title
 * - Applies consistent vertical spacing (Figma-like)
 */
export const PropertySection: React.FC<PropertySectionProps> = ({ title, className, children }) => {
  return (
    <section className={[inspectorStyles.inspectorSection, className].filter(Boolean).join(" ")}> 
      <H4 className={inspectorStyles.inspectorSectionTitle}>{title}</H4>
      <div className={inspectorStyles.sectionBody}>{children}</div>
    </section>
  );
};

PropertySection.displayName = "PropertySection";

