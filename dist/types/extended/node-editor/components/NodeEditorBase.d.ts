import * as React from "react";
interface NodeEditorBaseProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * NodeEditorBase - The outermost container component for the node editor
 * This component wraps all elements within the editor and provides the basic layout structure
 */
export declare const NodeEditorBase: React.FC<NodeEditorBaseProps>;
export {};
