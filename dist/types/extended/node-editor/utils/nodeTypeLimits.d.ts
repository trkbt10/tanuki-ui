import { NodeEditorData } from '../types/core';
import { NodeDefinition } from '../types/NodeDefinition';
/** Build a count map of node types present in the editor state */
export declare function countNodesByType(state: NodeEditorData): Map<string, number>;
/** Get definition by type from an array */
export declare function getDefinition(defs: NodeDefinition[], type: string): NodeDefinition | undefined;
/** Determine if a given type can be added respecting maxPerFlow constraint */
export declare function canAddNodeType(type: string, defs: NodeDefinition[], counts: Map<string, number>): boolean;
/** List of node types that have reached their per-flow limit */
export declare function getDisabledNodeTypes(defs: NodeDefinition[], counts: Map<string, number>): string[];
/**
 * Filter a list of nodeIds to duplicate so that resulting duplicates do not exceed per-type limits.
 * Returns the subset of nodeIds that can be duplicated given current counts and definitions.
 */
export declare function filterDuplicableNodeIds(nodeIds: string[], state: NodeEditorData, defs: NodeDefinition[]): string[];
