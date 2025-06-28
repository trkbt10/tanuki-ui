import { Connection, Node, Port } from '../../types/core';
import * as React from "react";
export interface ConnectionViewProps {
    connection: Connection;
    fromNode: Node;
    toNode: Node;
    fromPort: Port;
    toPort: Port;
    isSelected: boolean;
    isHovered: boolean;
    isDragging?: boolean;
    dragProgress?: number;
    fromNodePosition?: {
        x: number;
        y: number;
    };
    toNodePosition?: {
        x: number;
        y: number;
    };
    fromNodeSize?: {
        width: number;
        height: number;
    };
    toNodeSize?: {
        width: number;
        height: number;
    };
    onPointerDown?: (e: React.PointerEvent, connectionId: string) => void;
    onPointerEnter?: (e: React.PointerEvent, connectionId: string) => void;
    onPointerLeave?: (e: React.PointerEvent, connectionId: string) => void;
}
export declare const ConnectionView: React.NamedExoticComponent<ConnectionViewProps>;
