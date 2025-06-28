/**
 * Interaction constants for the node editor
 */
/**
 * Distance threshold for port interactions
 */
export declare const PORT_INTERACTION_THRESHOLD: {
    /** Minimum distance to drag before disconnecting a connection (1 port radius) */
    readonly DISCONNECT_THRESHOLD: number;
    /** Minimum distance to start a new connection (small threshold for responsiveness) */
    readonly NEW_CONNECTION_THRESHOLD: 2;
    /** Distance within which a port becomes a candidate for connection */
    readonly CONNECTION_SNAP_DISTANCE: number;
    /** Distance within which hovering over a port is detected */
    readonly HOVER_DISTANCE: number;
};
/**
 * Timing constants for interactions
 */
export declare const INTERACTION_TIMING: {
    /** Delay before showing tooltips */
    readonly TOOLTIP_DELAY: 500;
    /** Duration of animations */
    readonly ANIMATION_DURATION: 200;
};
