import { Port, NodeId, Position } from '../../../types/core';
import * as React from "react";
export interface PortInteractionHandlerProps {
    port: Port;
    node: {
        id: NodeId;
        position: Position;
    };
    children: (props: {
        onPointerDown: (e: React.PointerEvent) => void;
        onPointerEnter: (e: React.PointerEvent) => void;
        onPointerLeave: (e: React.PointerEvent) => void;
        isHovered: boolean;
        isConnecting: boolean;
        isConnectable: boolean;
        isCandidate: boolean;
        isConnected: boolean;
    }) => React.ReactNode;
}
/**
 * Handles all port interaction logic including connections and hover states
 */
export declare const PortInteractionHandler: React.FC<PortInteractionHandlerProps>;
