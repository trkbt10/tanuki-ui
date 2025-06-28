import * as React from "react";
export interface ResizeHandleProps {
    /** The resize handle position - now only 'se' (bottom-right) is supported */
    position: 'se';
    /** Called when resize starts */
    onResizeStart: (e: React.PointerEvent, handle: 'se') => void;
    /** Whether this handle is currently being used for resizing */
    isResizing?: boolean;
    /** Whether the handle should be visible (when parent node is hovered or selected) */
    isVisible?: boolean;
}
/**
 * ResizeHandle - Individual resize handle for nodes
 */
export declare const ResizeHandle: React.FC<ResizeHandleProps>;
