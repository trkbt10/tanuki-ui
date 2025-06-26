import * as React from "react";
import { 
  useFeatureFlags, 
  setFeatureFlags, 
  type NodeEditorFeatureFlags 
} from "../config/featureFlags";
import { SwitchInput } from "../../../form/custom-inputs/SwitchInput";
import { Button } from "../../../form/Button";
import styles from "./FeatureFlagsPanel.module.css";

export interface FeatureFlagsPanelProps {
  className?: string;
  onClose?: () => void;
}

/**
 * Developer panel for managing node editor feature flags
 */
export const FeatureFlagsPanel: React.FC<FeatureFlagsPanelProps> = ({ 
  className, 
  onClose 
}) => {
  const currentFlags = useFeatureFlags();
  const [localFlags, setLocalFlags] = React.useState<NodeEditorFeatureFlags>(currentFlags);
  const [hasChanges, setHasChanges] = React.useState(false);

  // Check for changes
  React.useEffect(() => {
    const changed = Object.keys(localFlags).some(
      key => localFlags[key as keyof NodeEditorFeatureFlags] !== currentFlags[key as keyof NodeEditorFeatureFlags]
    );
    setHasChanges(changed);
  }, [localFlags, currentFlags]);

  const handleToggle = (flag: keyof NodeEditorFeatureFlags) => {
    setLocalFlags(prev => ({
      ...prev,
      [flag]: !prev[flag]
    }));
  };

  const handleApply = () => {
    setFeatureFlags(localFlags);
    setHasChanges(false);
    
    // Show reload message if needed
    if (localFlags.useInferredPortsOnly !== currentFlags.useInferredPortsOnly) {
      if (window.confirm("Changing port inference mode requires a page reload. Reload now?")) {
        window.location.reload();
      }
    }
  };

  const handleReset = () => {
    setLocalFlags(currentFlags);
    setHasChanges(false);
  };

  return (
    <div className={`${styles.panel} ${className || ""}`}>
      <div className={styles.header}>
        <h3>Node Editor Feature Flags</h3>
        {onClose && (
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.description}>
          Configure feature flags for the node editor migration. 
          These settings are stored in localStorage for development.
        </div>

        <div className={styles.flags}>
          <div className={styles.flag}>
            <div className={styles.flagHeader}>
              <label htmlFor="useInferredPortsOnly">
                Use Inferred Ports Only
              </label>
              <SwitchInput
                id="useInferredPortsOnly"
                checked={localFlags.useInferredPortsOnly}
                onChange={() => handleToggle("useInferredPortsOnly")}
              />
            </div>
            <p className={styles.flagDescription}>
              When enabled, ports are exclusively inferred from NodeDefinitions. 
              Legacy embedded ports are ignored. <strong>Requires reload.</strong>
            </p>
          </div>

          <div className={styles.flag}>
            <div className={styles.flagHeader}>
              <label htmlFor="showMigrationWarnings">
                Show Migration Warnings
              </label>
              <SwitchInput
                id="showMigrationWarnings"
                checked={localFlags.showMigrationWarnings}
                onChange={() => handleToggle("showMigrationWarnings")}
              />
            </div>
            <p className={styles.flagDescription}>
              Display console warnings during data migration.
            </p>
          </div>

          <div className={styles.flag}>
            <div className={styles.flagHeader}>
              <label htmlFor="autoMigrateOnLoad">
                Auto-Migrate on Load
              </label>
              <SwitchInput
                id="autoMigrateOnLoad"
                checked={localFlags.autoMigrateOnLoad}
                onChange={() => handleToggle("autoMigrateOnLoad")}
              />
            </div>
            <p className={styles.flagDescription}>
              Automatically migrate old data format when loading.
            </p>
          </div>

          <div className={styles.flag}>
            <div className={styles.flagHeader}>
              <label htmlFor="saveInNewFormat">
                Save in New Format
              </label>
              <SwitchInput
                id="saveInNewFormat"
                checked={localFlags.saveInNewFormat}
                onChange={() => handleToggle("saveInNewFormat")}
              />
            </div>
            <p className={styles.flagDescription}>
              Save data without embedded ports (new format).
            </p>
          </div>
        </div>

        <div className={styles.currentState}>
          <h4>Current State</h4>
          <pre>{JSON.stringify(currentFlags, null, 2)}</pre>
        </div>

        <div className={styles.actions}>
          <Button 
            onClick={handleApply} 
            variant="primary"
            disabled={!hasChanges}
          >
            Apply Changes
          </Button>
          <Button 
            onClick={handleReset} 
            variant="secondary"
            disabled={!hasChanges}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

FeatureFlagsPanel.displayName = "FeatureFlagsPanel";