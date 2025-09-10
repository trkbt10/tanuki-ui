/**
 * Internationalization types for Node Editor
 */

export type Locale = "en" | "ja" | "zh" | "ko" | "es" | "fr" | "de";

export interface I18nMessages {
  // General UI
  loading: string;
  error: string;
  success: string;
  warning: string;
  cancel: string;
  confirm: string;
  save: string;
  delete: string;
  edit: string;
  copy: string;
  paste: string;

  // Node Editor UI
  addNode: string;
  deleteNode: string;
  duplicateNode: string;
  groupNodes: string;
  ungroupNodes: string;
  selectAll: string;
  clearSelection: string;

  // Toolbar
  resetView: string;
  zoomIn: string;
  zoomOut: string;
  autoLayout: string;
  gridSnap: string;
  gridSnapOn: string;
  gridSnapOff: string;

  // Context Menu
  contextMenuAddNode: string;
  contextMenuDeleteNode: string;
  contextMenuDuplicateNode: string;
  contextMenuEditNode: string;
  contextMenuGroupSelected: string;
  contextMenuDeleteConnection: string;
  contextMenuStyleInfo: string;
  contextMenuStyleSuccess: string;
  contextMenuStyleWarning: string;
  contextMenuStyleError: string;
  contextMenuExpandGroup: string;
  contextMenuCollapseGroup: string;

  // Status Bar
  statusSelection: string;
  statusTotal: string;
  statusMode: string;
  statusZoom: string;
  statusPosition: string;
  statusGrid: string;
  statusNone: string;

  // Operation Modes
  modeReady: string;
  modeMoving: string;
  modeConnecting: string;
  modeDisconnecting: string;
  modeSelecting: string;
  modePanning: string;

  // Node Types
  nodeStandard: string;
  nodeGroup: string;
  nodeInput: string;
  nodeOutput: string;

  // Inspector Panel
  inspectorTitle: string;
  inspectorNodeProperties: string;
  inspectorConnectionProperties: string;
  inspectorPosition: string;
  inspectorSize: string;
  inspectorData: string;
  inspectorVisible: string;
  inspectorLocked: string;
  inspectorExpanded: string;
  inspectorGridSettings?: string;
  inspectorShowGrid?: string;
  inspectorSnapToGrid?: string;
  inspectorGridSize?: string;
  inspectorSnapThreshold?: string;
  inspectorEmptyStatePrompt?: string;
  inspectorMultipleSelection?: string;
  inspectorTabLayers?: string;
  inspectorTabProperties?: string;

  // Keyboard Shortcuts
  shortcutUndo: string;
  shortcutRedo: string;
  shortcutSelectAll: string;
  shortcutDelete: string;
  shortcutCopy: string;
  shortcutPaste: string;
  shortcutDuplicate: string;
  shortcutGroup: string;
  shortcutAutoLayout: string;
  shortcutSave: string;

  // Validation Messages
  validationNodeTitle: string;
  validationConnectionExists: string;
  validationInvalidConnection: string;
  validationCircularConnection: string;

  // Version Management
  versionSnapshot: string;
  versionCreated: string;
  versionModified: string;
  versionAuthor: string;
  versionDescription: string;
  versionTags: string;

  // Layer Management
  layerVisible: string;
  layerHidden: string;
  layerLocked: string;
  layerUnlocked: string;
  layerToggleVisibility: string;
  layerToggleLock: string;

  // Drag and Drop
  dragHint: string;
  dropHint: string;
  connectHint: string;
  disconnectHint: string;
  snapHint: string;

  // Error Messages
  errorNodeNotFound: string;
  errorConnectionNotFound: string;
  errorInvalidAction: string;
  errorSaveFailed: string;
  errorLoadFailed: string;
  errorExportFailed: string;
  errorImportFailed: string;

  // Units and Formatting
  unitPixels: string;
  unitPercent: string;
  formatNodes: string;
  formatConnections: string;
  formatSnapGrid: string;
  // Generic field labels
  fieldTitle?: string;
  fieldContent?: string;
}

export type I18nKey = keyof I18nMessages;

export interface I18nConfig {
  locale: Locale;
  fallbackLocale: Locale;
  messages: Record<Locale, I18nMessages>;
}

export interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: I18nKey, params?: Record<string, string | number>) => string;
  availableLocales: Locale[];
}
