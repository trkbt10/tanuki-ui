import { Position } from '../types/core';
import * as React from "react";
export type ContextTarget = {
    type: "node";
    id: string;
} | {
    type: "connection";
    id: string;
} | {
    type: "canvas";
};
export interface ContextActionMenuProps {
    position: Position;
    target: ContextTarget;
    visible: boolean;
    onClose: () => void;
}
export declare const ContextActionMenu: React.FC<ContextActionMenuProps>;
