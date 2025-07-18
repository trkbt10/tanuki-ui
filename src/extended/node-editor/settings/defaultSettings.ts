import type { SettingDefinition } from "./types";

/**
 * Default settings definitions for the node editor
 */
export const defaultSettings: SettingDefinition[] = [
  // General settings
  {
    key: "general.language",
    label: "Language",
    description: "Interface language",
    category: "general",
    type: "select",
    defaultValue: "en",
    options: [
      { value: "en", label: "English" },
      { value: "ja", label: "日本語" },
      { value: "zh", label: "中文" },
      { value: "ko", label: "한국어" },
      { value: "es", label: "Español" },
      { value: "fr", label: "Français" },
      { value: "de", label: "Deutsch" },
    ],
    order: 1,
  },
  {
    key: "general.autoSave",
    label: "Auto Save",
    description: "Automatically save changes",
    category: "general",
    type: "boolean",
    defaultValue: true,
    order: 2,
  },
  {
    key: "general.autoSaveInterval",
    label: "Auto Save Interval",
    description: "Auto save interval in seconds",
    category: "general",
    type: "number",
    defaultValue: 30,
    min: 5,
    max: 300,
    dependsOn: "general.autoSave",
    showWhen: (settings) => settings["general.autoSave"] === true,
    order: 3,
  },
  {
    key: "general.confirmBeforeExit",
    label: "Confirm Before Exit",
    description: "Show confirmation dialog before closing",
    category: "general",
    type: "boolean",
    defaultValue: true,
    order: 4,
  },

  // Appearance settings
  {
    key: "appearance.theme",
    label: "Theme",
    description: "Visual theme",
    category: "appearance",
    type: "select",
    defaultValue: "light",
    options: [
      { value: "light", label: "Light" },
      { value: "dark", label: "Dark" },
      { value: "auto", label: "Auto (System)" },
    ],
    order: 1,
  },
  {
    key: "appearance.fontSize",
    label: "Font Size",
    description: "Base font size in pixels",
    category: "appearance",
    type: "range",
    defaultValue: 14,
    min: 10,
    max: 24,
    step: 1,
    order: 2,
  },
  {
    key: "appearance.fontFamily",
    label: "Font Family",
    description: "Font family for the interface",
    category: "appearance",
    type: "select",
    defaultValue: "system",
    options: [
      { value: "system", label: "System Default" },
      { value: "Inter", label: "Inter" },
      { value: "Roboto", label: "Roboto" },
      { value: "Arial", label: "Arial" },
      { value: "monospace", label: "Monospace" },
    ],
    order: 3,
  },
  {
    key: "appearance.showGrid",
    label: "Show Grid",
    description: "Display grid lines on canvas",
    category: "appearance",
    type: "boolean",
    defaultValue: true,
    order: 4,
  },
  {
    key: "appearance.gridSize",
    label: "Grid Size",
    description: "Grid size in pixels",
    category: "appearance",
    type: "number",
    defaultValue: 20,
    min: 5,
    max: 100,
    dependsOn: "appearance.showGrid",
    showWhen: (settings) => settings["appearance.showGrid"] === true,
    order: 5,
  },
  {
    key: "appearance.gridOpacity",
    label: "Grid Opacity",
    description: "Grid line opacity",
    category: "appearance",
    type: "range",
    defaultValue: 0.3,
    min: 0.1,
    max: 1,
    step: 0.1,
    dependsOn: "appearance.showGrid",
    showWhen: (settings) => settings["appearance.showGrid"] === true,
    order: 6,
  },
  {
    key: "appearance.snapToGrid",
    label: "Snap to Grid",
    description: "Snap nodes to grid when moving",
    category: "appearance",
    type: "boolean",
    defaultValue: false,
    order: 7,
  },
  {
    key: "appearance.showMinimap",
    label: "Show Minimap",
    description: "Display minimap overlay",
    category: "appearance",
    type: "boolean",
    defaultValue: true,
    order: 8,
  },
  {
    key: "appearance.showStatusBar",
    label: "Show Status Bar",
    description: "Display status bar at bottom",
    category: "appearance",
    type: "boolean",
    defaultValue: true,
    order: 9,
  },
  {
    key: "appearance.showToolbar",
    label: "Show Toolbar",
    description: "Display toolbar",
    category: "appearance",
    type: "boolean",
    defaultValue: true,
    order: 10,
  },
  {
    key: "appearance.canvasBackground",
    label: "Canvas Background",
    description: "Canvas background color",
    category: "appearance",
    type: "color",
    defaultValue: "#ffffff",
    order: 11,
  },

  // Behavior settings
  {
    key: "behavior.doubleClickToEdit",
    label: "Double Click to Edit",
    description: "Double click nodes to edit properties",
    category: "behavior",
    type: "boolean",
    defaultValue: true,
    order: 1,
  },
  {
    key: "behavior.autoConnect",
    label: "Auto Connect",
    description: "Automatically connect compatible ports when dragging",
    category: "behavior",
    type: "boolean",
    defaultValue: true,
    order: 2,
  },
  {
    key: "behavior.smoothAnimations",
    label: "Smooth Animations",
    description: "Enable smooth animations for transitions",
    category: "behavior",
    type: "boolean",
    defaultValue: true,
    order: 3,
  },
  {
    key: "behavior.dragThreshold",
    label: "Drag Threshold",
    description: "Minimum distance to start dragging (pixels)",
    category: "behavior",
    type: "number",
    defaultValue: 5,
    min: 1,
    max: 20,
    order: 4,
  },
  {
    key: "behavior.connectionStyle",
    label: "Connection Style",
    description: "Style of connection lines",
    category: "behavior",
    type: "select",
    defaultValue: "curved",
    options: [
      { value: "straight", label: "Straight" },
      { value: "curved", label: "Curved" },
      { value: "orthogonal", label: "Orthogonal" },
    ],
    order: 5,
  },
  {
    key: "behavior.selectionMode",
    label: "Selection Mode",
    description: "How to select multiple nodes",
    category: "behavior",
    type: "select",
    defaultValue: "click",
    options: [
      { value: "click", label: "Click with Modifier" },
      { value: "drag", label: "Drag Selection Box" },
    ],
    order: 6,
  },
  {
    key: "behavior.wheelZoomSensitivity",
    label: "Zoom Sensitivity",
    description: "Mouse wheel zoom sensitivity",
    category: "behavior",
    type: "range",
    defaultValue: 1,
    min: 0.1,
    max: 3,
    step: 0.1,
    order: 7,
  },

  // Performance settings
  {
    key: "performance.maxHistorySteps",
    label: "Max History Steps",
    description: "Maximum number of undo/redo steps",
    category: "performance",
    type: "number",
    defaultValue: 50,
    min: 10,
    max: 200,
    order: 1,
  },
  {
    key: "performance.renderOptimization",
    label: "Render Optimization",
    description: "Enable render optimization techniques",
    category: "performance",
    type: "boolean",
    defaultValue: true,
    order: 2,
  },
  {
    key: "performance.lazyLoading",
    label: "Lazy Loading",
    description: "Load nodes and connections lazily",
    category: "performance",
    type: "boolean",
    defaultValue: true,
    order: 3,
  },
  {
    key: "performance.virtualScrolling",
    label: "Virtual Scrolling",
    description: "Use virtual scrolling for large node lists",
    category: "performance",
    type: "boolean",
    defaultValue: true,
    order: 4,
  },
  {
    key: "performance.maxVisibleNodes",
    label: "Max Visible Nodes",
    description: "Maximum number of nodes to render at once",
    category: "performance",
    type: "number",
    defaultValue: 1000,
    min: 100,
    max: 5000,
    order: 5,
  },

  // Keyboard shortcuts
  {
    key: "keyboard.undo",
    label: "Undo",
    description: "Keyboard shortcut for undo",
    category: "keyboard",
    type: "text",
    defaultValue: "Ctrl+Z",
    pattern: "^(Ctrl\\+|Cmd\\+|Alt\\+|Shift\\+)*[A-Za-z0-9]+$",
    order: 1,
  },
  {
    key: "keyboard.redo",
    label: "Redo",
    description: "Keyboard shortcut for redo",
    category: "keyboard",
    type: "text",
    defaultValue: "Ctrl+Y",
    pattern: "^(Ctrl\\+|Cmd\\+|Alt\\+|Shift\\+)*[A-Za-z0-9]+$",
    order: 2,
  },
  {
    key: "keyboard.selectAll",
    label: "Select All",
    description: "Keyboard shortcut for select all",
    category: "keyboard",
    type: "text",
    defaultValue: "Ctrl+A",
    pattern: "^(Ctrl\\+|Cmd\\+|Alt\\+|Shift\\+)*[A-Za-z0-9]+$",
    order: 3,
  },
  {
    key: "keyboard.delete",
    label: "Delete",
    description: "Keyboard shortcut for delete",
    category: "keyboard",
    type: "text",
    defaultValue: "Delete",
    order: 4,
  },
  {
    key: "keyboard.copy",
    label: "Copy",
    description: "Keyboard shortcut for copy",
    category: "keyboard",
    type: "text",
    defaultValue: "Ctrl+C",
    pattern: "^(Ctrl\\+|Cmd\\+|Alt\\+|Shift\\+)*[A-Za-z0-9]+$",
    order: 5,
  },
  {
    key: "keyboard.paste",
    label: "Paste",
    description: "Keyboard shortcut for paste",
    category: "keyboard",
    type: "text",
    defaultValue: "Ctrl+V",
    pattern: "^(Ctrl\\+|Cmd\\+|Alt\\+|Shift\\+)*[A-Za-z0-9]+$",
    order: 6,
  },
  {
    key: "keyboard.duplicate",
    label: "Duplicate",
    description: "Keyboard shortcut for duplicate",
    category: "keyboard",
    type: "text",
    defaultValue: "Ctrl+D",
    pattern: "^(Ctrl\\+|Cmd\\+|Alt\\+|Shift\\+)*[A-Za-z0-9]+$",
    order: 7,
  },
  {
    key: "keyboard.group",
    label: "Group",
    description: "Keyboard shortcut for group nodes",
    category: "keyboard",
    type: "text",
    defaultValue: "Ctrl+G",
    pattern: "^(Ctrl\\+|Cmd\\+|Alt\\+|Shift\\+)*[A-Za-z0-9]+$",
    order: 8,
  },
  {
    key: "keyboard.save",
    label: "Save",
    description: "Keyboard shortcut for save",
    category: "keyboard",
    type: "text",
    defaultValue: "Ctrl+S",
    pattern: "^(Ctrl\\+|Cmd\\+|Alt\\+|Shift\\+)*[A-Za-z0-9]+$",
    order: 9,
  },

  // Plugin settings
  {
    key: "plugins.autoUpdate",
    label: "Auto Update Plugins",
    description: "Automatically update plugins when available",
    category: "plugins",
    type: "boolean",
    defaultValue: false,
    order: 1,
  },
  {
    key: "plugins.allowUnsafe",
    label: "Allow Unsafe Plugins",
    description: "Allow loading plugins without security verification",
    category: "plugins",
    type: "boolean",
    defaultValue: false,
    order: 2,
  },
  {
    key: "plugins.maxMemoryUsage",
    label: "Max Memory Usage",
    description: "Maximum memory usage for plugins (MB)",
    category: "plugins",
    type: "number",
    defaultValue: 100,
    min: 10,
    max: 1000,
    order: 3,
  },

  // Advanced settings
  {
    key: "advanced.debugMode",
    label: "Debug Mode",
    description: "Enable debug mode with additional logging",
    category: "advanced",
    type: "boolean",
    defaultValue: false,
    order: 1,
  },
  {
    key: "advanced.showPerformanceMetrics",
    label: "Show Performance Metrics",
    description: "Display performance metrics in the UI",
    category: "advanced",
    type: "boolean",
    defaultValue: false,
    order: 2,
  },
  {
    key: "advanced.logLevel",
    label: "Log Level",
    description: "Minimum log level to display",
    category: "advanced",
    type: "select",
    defaultValue: "info",
    options: [
      { value: "debug", label: "Debug" },
      { value: "info", label: "Info" },
      { value: "warn", label: "Warning" },
      { value: "error", label: "Error" },
    ],
    order: 3,
  },
  {
    key: "advanced.experimentalFeatures",
    label: "Experimental Features",
    description: "Enable experimental features (may be unstable)",
    category: "advanced",
    type: "boolean",
    defaultValue: false,
    order: 4,
  },
  {
    key: "advanced.customCSS",
    label: "Custom CSS",
    description: "Custom CSS to apply to the editor",
    category: "advanced",
    type: "textarea",
    defaultValue: "",
    placeholder: "/* Enter custom CSS here */",
    order: 5,
  },
];
