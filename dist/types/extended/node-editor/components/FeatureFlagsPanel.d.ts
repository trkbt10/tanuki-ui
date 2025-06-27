import * as React from "react";
export interface FeatureFlagsPanelProps {
    className?: string;
    onClose?: () => void;
}
/**
 * Developer panel for managing node editor feature flags
 */
export declare const FeatureFlagsPanel: React.FC<FeatureFlagsPanelProps>;
