import { ReactNode } from 'react';
import { NodeDefinition } from '../types/NodeDefinition';
/**
 * Get the icon for a node type from node definitions
 * Falls back to default icons if no custom icon is defined
 */
export declare const getNodeIcon: (nodeType: string, nodeDefinitions: NodeDefinition[]) => ReactNode;
