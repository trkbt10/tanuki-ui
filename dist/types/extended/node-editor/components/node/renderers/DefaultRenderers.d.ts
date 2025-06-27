import { NodeRenderProps, InspectorRenderProps } from '../../../types/NodeDefinition';
import { Node } from '../../../types/core';
import * as React from "react";
/**
 * Default node renderer
 */
export declare const DefaultNodeRenderer: React.FC<NodeRenderProps>;
interface ExtendedInspectorRenderProps extends InspectorRenderProps {
    selectedNodes?: Node[];
    onAlignNodes?: (alignmentType: string, nodes: Node[]) => void;
}
/**
 * Default inspector renderer with optimized performance
 */
export declare const DefaultInspectorRenderer: React.FC<ExtendedInspectorRenderProps>;
export {};
