import { Port } from '../../../types/core';
import * as React from "react";
export interface PortViewProps {
    port: Port;
    onPointerDown?: (e: React.PointerEvent, port: Port) => void;
    onPointerUp?: (e: React.PointerEvent, port: Port) => void;
    onPointerEnter?: (e: React.PointerEvent, port: Port) => void;
    onPointerLeave?: (e: React.PointerEvent, port: Port) => void;
    isConnecting?: boolean;
    isConnectable?: boolean;
    isCandidate?: boolean;
    isHovered?: boolean;
    isConnected?: boolean;
}
/**
 * PortView - Renders a connection port on a node
 * Handles port interactions for creating connections
 */
export declare const PortView: React.FC<PortViewProps>;
