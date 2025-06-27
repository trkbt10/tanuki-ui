import { SettingsManager } from '../settings/SettingsManager';
import * as React from "react";
export interface StatusBarProps {
    className?: string;
    autoSave?: boolean;
    isSaving?: boolean;
    settingsManager?: SettingsManager;
}
/**
 * StatusBar - Displays current editor state information
 */
export declare const StatusBar: React.FC<StatusBarProps>;
