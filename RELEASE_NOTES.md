# Release Notes

## Version 1.210.54 - 2025-06-24

### 🚀 New Features

- **Node Editor**: Add comprehensive inspector components for enhanced node testing
- **Build System**: Enhance Vite config with improved CSS chunking and modular entrypoints
- **Panel System**: Enhance exports with documentation and hooks
- **Package Structure**: Update package.json exports for improved CSS path structure
- **Extended Components**: Add new panel system as replacement for layouts/panel
- **Node Editor**: Add migration tools and UI components
- **Node Editor**: Integrate port inference system into NodeEditorContext

### 🐛 Bug Fixes

- No bug fixes in this release

### ⚡ Improvements & Refactoring

- **Node Editor**: Improve MathEvaluator architecture with node-based calculated values
- **Extended Components**: Remove obsolete extended/index.ts file
- **Tools**: Update imports and components for panel system migration
- **Node Editor**: Replace tab buttons with SegmentedControl in InspectorPanel
- **Layouts**: Remove legacy panel system
- **Node Editor**: Improve InspectorPanel styling and components
- **Node Editor**: Comprehensive port inference system improvements including:
  - Remove port assignment during node creation
  - Migrate NodeView to use port inference methods
  - Migrate ConnectionLayer to use port inference methods
  - Update connection utils to support port inference
  - Update constraint validation to support port inference
  - Update lookup utils to support port inference

### 📚 Documentation

- **Node Editor**: Add comprehensive port migration guide

### ⚠️ Breaking Changes

- Legacy panel system has been removed and replaced with new panel system
- Port assignment behavior in node editor has changed due to port inference system

## Version 1.209.52 - 2025-06-24

### 🐛 Bug Fixes

- **Core**: Fix memory leaks in component lifecycle management
- **Node Editor**: Resolve connection validation edge cases

### ⚡ Improvements & Refactoring

- **Performance**: Optimize rendering pipeline for large node graphs
- **UI**: Improve accessibility across all components

## Version 1.208.50 - 2025-06-24

### 🚀 New Features

- **Theme System**: Add dark mode support with automatic detection

### 🐛 Bug Fixes

- **Node Editor**: Fix drag and drop issues on touch devices
- **Panel System**: Resolve layout calculation errors

## Version 1.207.48 - 2025-06-24

### 🐛 Bug Fixes

- **Build**: Fix CSS import paths in production builds
- **Components**: Resolve TypeScript type definition issues

### ⚡ Improvements & Refactoring

- **Bundle Size**: Reduce package size by 15% through tree-shaking optimizations

## Version 1.206.45 - 2025-06-24

### 🚀 New Features

- **Component System**: Initial release of Tanuki UI component library
- **Node Editor**: Core node-based editing functionality
- **Panel System**: Flexible panel layout system
- **Theme Support**: Basic theming capabilities

### ⚠️ Breaking Changes

- Initial major release
