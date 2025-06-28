import { VersionedNodeEditorData } from '../utils/dataMigration';
import * as React from "react";
export interface DataMigrationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    data: VersionedNodeEditorData;
    onMigrationComplete?: (migratedData: VersionedNodeEditorData) => void;
}
/**
 * Dialog component for migrating node editor data
 */
export declare const DataMigrationDialog: React.FC<DataMigrationDialogProps>;
