import { NodeDefinition } from '../types/NodeDefinition';
import { Position } from '../types/core';
import * as React from "react";
export interface NodeSearchMenuProps {
    position: Position;
    nodeDefinitions: NodeDefinition[];
    onCreateNode: (nodeType: string, position: Position) => void;
    onClose: () => void;
    visible: boolean;
}
/**
 * NodeSearchMenu - QuickLook-style searchable context menu for creating nodes
 */
export declare const NodeSearchMenu: React.FC<NodeSearchMenuProps>;
