import * as React from "react";
import {
  migrateNodeData,
  validateMigratedData,
  needsMigration,
  type MigrationResult,
  type VersionedNodeEditorData
} from "../../utils/dataMigration";
import { useNodeDefinitions } from "../../contexts/NodeDefinitionContext";
import { Button, Dialog } from "../elements";
import styles from "./DataMigrationDialog.module.css";

export interface DataMigrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: VersionedNodeEditorData;
  onMigrationComplete?: (migratedData: VersionedNodeEditorData) => void;
}

/**
 * Dialog component for migrating node editor data
 */
export const DataMigrationDialog: React.FC<DataMigrationDialogProps> = ({
  isOpen,
  onClose,
  data,
  onMigrationComplete,
}) => {
  const { registry } = useNodeDefinitions();
  const [migrationResult, setMigrationResult] = React.useState<MigrationResult | null>(null);
  const [isValidating, setIsValidating] = React.useState(false);
  const [validationErrors, setValidationErrors] = React.useState<string[]>([]);
  const [migrationStatus, setMigrationStatus] = React.useState<"pending" | "success" | "error">("pending");

  // Check if migration is needed
  const isMigrationNeeded = React.useMemo(() => needsMigration(data), [data]);

  // Reset state when dialog opens
  React.useEffect(() => {
    if (isOpen) {
      setMigrationResult(null);
      setValidationErrors([]);
      setMigrationStatus("pending");
    }
  }, [isOpen]);

  const handleMigrate = React.useCallback(() => {
    try {
      // Perform migration
      const result = migrateNodeData(data, registry);
      setMigrationResult(result);

      // Validate the migration
      setIsValidating(true);
      const validation = validateMigratedData(data, result.data, registry);
      
      if (validation.isValid) {
        setMigrationStatus("success");
        setValidationErrors([]);
      } else {
        setMigrationStatus("error");
        setValidationErrors(validation.errors);
      }
    } catch (error) {
      console.error("Migration failed:", error);
      setMigrationStatus("error");
      setValidationErrors([error instanceof Error ? error.message : "Unknown error"]);
    } finally {
      setIsValidating(false);
    }
  }, [data, registry]);

  const handleConfirm = React.useCallback(() => {
    if (migrationResult && migrationStatus === "success") {
      onMigrationComplete?.(migrationResult.data);
      onClose();
    }
  }, [migrationResult, migrationStatus, onMigrationComplete, onClose]);

  const handleDownload = React.useCallback(() => {
    if (migrationResult) {
      const blob = new Blob([JSON.stringify(migrationResult.data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "migrated-node-data.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [migrationResult]);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Data Migration"
      className={styles.migrationDialog}
    >
      <div className={styles.content}>
        {!isMigrationNeeded ? (
          <div className={styles.alreadyMigrated}>
            <p>This data is already in the new format. No migration needed.</p>
            <Button onClick={onClose}>Close</Button>
          </div>
        ) : migrationResult ? (
          <div className={styles.results}>
            <h3>Migration Results</h3>
            
            <div className={styles.statistics}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Nodes Processed:</span>
                <span className={styles.statValue}>{migrationResult.statistics.nodesProcessed}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Ports Removed:</span>
                <span className={styles.statValue}>{migrationResult.statistics.portsRemoved}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Port Overrides Created:</span>
                <span className={styles.statValue}>{migrationResult.statistics.portOverridesCreated}</span>
              </div>
            </div>

            {migrationResult.warnings.length > 0 && (
              <div className={styles.warnings}>
                <h4>Warnings</h4>
                <ul>
                  {migrationResult.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            {validationErrors.length > 0 && (
              <div className={styles.errors}>
                <h4>Validation Errors</h4>
                <ul>
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.actions}>
              {migrationStatus === "success" && (
                <>
                  <Button onClick={handleConfirm} variant="primary">
                    Apply Migration
                  </Button>
                  <Button onClick={handleDownload} variant="secondary">
                    Download Result
                  </Button>
                </>
              )}
              <Button onClick={onClose} variant="secondary">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.prompt}>
            <p>
              This data uses the old format where ports are stored directly on nodes. 
              Would you like to migrate it to the new format where ports are inferred 
              from node definitions?
            </p>
            
            <div className={styles.benefits}>
              <h4>Benefits of Migration:</h4>
              <ul>
                <li>Smaller file sizes</li>
                <li>Easier port updates across all nodes</li>
                <li>Better consistency</li>
                <li>Future compatibility</li>
              </ul>
            </div>

            <div className={styles.actions}>
              <Button 
                onClick={handleMigrate} 
                variant="primary"
                disabled={isValidating}
              >
                {isValidating ? "Migrating..." : "Migrate Data"}
              </Button>
              <Button onClick={onClose} variant="secondary">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
};

DataMigrationDialog.displayName = "DataMigrationDialog";