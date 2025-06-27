/**
 * Feature flags for node editor migration
 */
export interface NodeEditorFeatureFlags {
    /**
     * When true, uses the new port inference system exclusively
     * When false, maintains backward compatibility with embedded ports
     */
    useInferredPortsOnly: boolean;
    /**
     * When true, shows migration warnings in console
     */
    showMigrationWarnings: boolean;
    /**
     * When true, automatically migrates data on load
     * When false, keeps data in original format
     */
    autoMigrateOnLoad: boolean;
    /**
     * When true, saves data in new format (without ports)
     * When false, saves data in legacy format (with ports)
     */
    saveInNewFormat: boolean;
}
/**
 * Default feature flags - start with backward compatibility enabled
 */
export declare const defaultFeatureFlags: NodeEditorFeatureFlags;
/**
 * Get feature flags from environment or local storage
 */
export declare function getFeatureFlags(): NodeEditorFeatureFlags;
/**
 * Set feature flags in local storage (for development/testing)
 */
export declare function setFeatureFlags(flags: Partial<NodeEditorFeatureFlags>): void;
/**
 * React hook for feature flags
 */
export declare function useFeatureFlags(): NodeEditorFeatureFlags;
