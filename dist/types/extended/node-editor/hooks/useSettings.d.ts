import { SettingsManager } from '../settings/SettingsManager';
type ThemeValue = "light" | "dark" | "auto";
interface Settings {
    showGrid: boolean;
    showMinimap: boolean;
    showStatusBar: boolean;
    theme: ThemeValue;
    autoSave: boolean;
    autoSaveInterval: number;
    smoothAnimations: boolean;
    doubleClickToEdit: boolean;
    fontSize: number;
    gridSize: number;
    gridOpacity: number;
    canvasBackground: string;
}
export declare function useSettings(settingsManager?: SettingsManager): Settings;
export {};
