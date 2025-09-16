import { NodeData, Size, Position } from '../types/core';
export type ClipboardNode = {
    id: string;
    type: string;
    position: Position;
    size?: Size;
    data?: NodeData;
};
export type ClipboardConnection = {
    fromNodeId: string;
    fromPortId: string;
    toNodeId: string;
    toPortId: string;
};
export type ClipboardData = {
    nodes: ClipboardNode[];
    connections: ClipboardConnection[];
};
export declare function setClipboard(data: ClipboardData): void;
export declare function getClipboard(): ClipboardData | null;
export declare function clearClipboard(): void;
