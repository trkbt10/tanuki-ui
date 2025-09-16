import * as React from "react";
export interface PropertySectionProps {
    title: string;
    className?: string;
    bodyClassName?: string;
    headerRight?: React.ReactNode;
    children: React.ReactNode;
}
/**
 * PropertySection
 * - Reusable sidebar section with a small, uppercase title
 * - Applies consistent vertical spacing (Figma-like)
 */
export declare const PropertySection: React.FC<PropertySectionProps>;
