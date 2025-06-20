<div align="center">
  <img src="./docs/logo.png" alt="Tanuki UI Logo" width="120" height="120" />
  
  # Tanuki UI
  
  **Use HTML elements as they are.**
  
  [![npm version](https://img.shields.io/npm/v/tanuki-ui.svg?style=flat-square)](https://www.npmjs.com/package/tanuki-ui)
  [![Bundle Size](https://img.shields.io/bundlephobia/minzip/tanuki-ui?style=flat-square)](https://bundlephobia.com/package/tanuki-ui)
  [![License: Unlicense](https://img.shields.io/badge/License-Unlicense-blue.svg?style=flat-square)](http://unlicense.org/)
  
  [🎨 Component Catalog](https://trkbt10.github.io/tanuki-ui/) | [日本語](./README.ja.md) | English
</div>

---

Tanuki UI is a styled component library based on standard HTML elements. Unlike traditional UI libraries, it provides ready-to-use components while preserving HTML semantics.

## Concept

### HTML First Approach

```jsx
// Write like regular HTML
import { H1, P, Button, Input, Form } from 'tanuki-ui';

function App() {
  return (
    <main>
      <H1>Page Title</H1>
      <P>This is a paragraph. You can use it just like an HTML p element.</P>
      <Form>
        <Input type="text" placeholder="Enter text" />
        <Button type="submit">Submit</Button>
      </Form>
    </main>
  );
}
```

### Dual Export

Components are exported with both HTML element names and semantic names for intuitive usage.

```jsx
// Both are the same component
import { P, Paragraph } from 'tanuki-ui';
import { H1, Heading } from 'tanuki-ui';
import { A, Anchor } from 'tanuki-ui';
```

## 🎯 Why Tanuki UI?

<table>
<tr>
<td width="33%" align="center">

### 🚀 Lightweight
**23.5KB** gzipped<br/>
All core components

</td>
<td width="33%" align="center">

### 🎨 16 Themes
Platform-native designs<br/>
Ready to use

</td>
<td width="33%" align="center">

### 📝 HTML First
Standard semantics<br/>
No learning curve

</td>
</tr>
</table>

## 📦 Bundle Size

One of the lightest React UI libraries available:

| Package | Size |
|---------|------|
| **Core Components** | 23.5KB |
| **Core CSS** | 9.9KB |
| **Layouts** *(optional)* | +12.6KB |
| **Node Editor** *(optional)* | +49.5KB |

> 💡 Import only what you need to make it even smaller!

## Key Features

### 📄 HTML Basic Elements

Complete coverage of HTML5 semantic elements:

**Content Sections**
- `Article`, `Section`, `Nav`, `Main`, `Header`, `Footer`, `Aside`, `Address`

**Text Content**
- `H1`-`H6`, `P`, `Blockquote`, `Pre`, `Div`, `Hr`

**Embedded Content**
- `Image` (`Img`), `Figure`, `Figcaption`

**Lists**
- `List` (`Ul`), `ListItem` (`Li`), `Descriptions` (`Dl`)

**Forms**
- `Form`, `Button`, `Input`, `Textarea`, `Select`, `Label`, `Fieldset`, `Legend`
- `Progress`, `Meter`, `Output`

### 🎛️ Advanced Components

**Form Extensions**
- `MediaInput` - File upload
- `RangeInput` - Slider
- `SwitchInput` - Toggle switch
- `SortableList` - Drag & drop sorting

**Dialogs & Navigation**
- `Dialog`, `Modal`, `Alert`, `Drawer`
- `ContextualMenu`, `Popover`
- `TabNav`, `TabBar`, `SidebarList`

**Layouts**
- `AppLayout`, `SidebarLayout`, `HeaderMainLayout`
- `ScrollView`, `ParavirtualScroll`
- `Panel` System (Dynamic layouts)

### 🎨 Visual Node Editor

`tanuki-ui/extended/node-editor` provides a production-ready visual editor:

```jsx
import { NodeEditor } from 'tanuki-ui/extended/node-editor';

function MyApp() {
  return (
    <NodeEditor
      nodes={nodes}
      connections={connections}
      onNodesChange={handleNodesChange}
      onConnectionsChange={handleConnectionsChange}
    />
  );
}
```

**Features:**
- Drag & drop node manipulation
- Auto-layout functionality
- Minimap display
- Internationalization (i18n)
- Keyboard shortcuts
- History management (Undo/Redo)
- Constraint system

## 🚀 Quick Start

```bash
# Install
npm install tanuki-ui

# Import and use
```

```jsx
import { Button } from 'tanuki-ui';
import 'tanuki-ui/style.css';

function App() {
  return <Button>Click me!</Button>;
}
```

## 📥 Installation

<table>
<tr>
<td>

```bash
# npm
npm install tanuki-ui
```

</td>
<td>

```bash
# yarn
yarn add tanuki-ui
```

</td>
<td>

```bash
# pnpm
pnpm add tanuki-ui
```

</td>
<td>

```bash
# bun
bun add tanuki-ui
```

</td>
</tr>
</table>

### Peer Dependencies

- React 18.0.0 or higher
- React DOM 18.0.0 or higher

## Usage

### Basic Usage

```jsx
import { H1, P, Button } from 'tanuki-ui';
import 'tanuki-ui/style.css';

function Welcome() {
  return (
    <>
      <H1>Welcome to Tanuki UI</H1>
      <P>A UI library where HTML elements work as they are.</P>
      <Button onClick={() => alert('Hello!')}>
        Click me
      </Button>
    </>
  );
}
```

### Using Layouts

```jsx
import { AppLayout, SidebarLayout } from 'tanuki-ui/layouts';
import 'tanuki-ui/layouts/style.css';

function App() {
  return (
    <AppLayout>
      <SidebarLayout
        sidebar={<nav>Navigation</nav>}
        main={<main>Main Content</main>}
      />
    </AppLayout>
  );
}
```

### Using Node Editor

```jsx
import { NodeEditor } from 'tanuki-ui/extended/node-editor';
import 'tanuki-ui/extended/node-editor/style.css';

function GraphEditor() {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);

  return (
    <NodeEditor
      nodes={nodes}
      connections={connections}
      onNodesChange={setNodes}
      onConnectionsChange={setConnections}
    />
  );
}
```

## Themes

Multiple themes available:

```jsx
// Import theme CSS
import 'tanuki-ui/styles/monotone.css';         // Monotone (Default)
import 'tanuki-ui/styles/android12.css';        // Android 12
import 'tanuki-ui/styles/apple-liquid-glass.css'; // Apple Liquid Glass
import 'tanuki-ui/styles/aws.css';              // AWS
import 'tanuki-ui/styles/figma.css';            // Figma
import 'tanuki-ui/styles/github-dark.css';      // GitHub Dark
import 'tanuki-ui/styles/handheld-console.css'; // Handheld Console
import 'tanuki-ui/styles/ios12.css';            // iOS 12
import 'tanuki-ui/styles/linear.css';           // Linear
import 'tanuki-ui/styles/macOS12.css';          // macOS 12
import 'tanuki-ui/styles/material-design.css';  // Material Design
import 'tanuki-ui/styles/openai.css';           // OpenAI
import 'tanuki-ui/styles/vercel.css';           // Vercel
import 'tanuki-ui/styles/windows-xp.css';       // Windows XP
import 'tanuki-ui/styles/windows11.css';        // Windows 11
import 'tanuki-ui/styles/windows98.css';        // Windows 98
```

### Available Themes (16 total)

**Modern & Minimal**
- **Monotone** (`monotone.css`) - High contrast, accessibility-focused theme (Default)
- **Vercel** (`vercel.css`) - Clean, modern development-focused theme
- **Linear** (`linear.css`) - Linear app-inspired modern design
- **OpenAI** (`openai.css`) - OpenAI's clean interface styling

**Platform Themes**
- **macOS 12** (`macOS12.css`) - macOS Big Sur/Monterey design system
- **iOS 12** (`ios12.css`) - iOS design language with rounded corners
- **Windows 11** (`windows11.css`) - Windows 11 Fluent Design system
- **Android 12** (`android12.css`) - Material Design 3 (Material You)

**Developer Tools**
- **GitHub Dark** (`github-dark.css`) - GitHub's dark theme
- **Figma** (`figma.css`) - Figma design tool interface
- **AWS** (`aws.css`) - AWS console-inspired design

**Special Effects**
- **Apple Liquid Glass** (`apple-liquid-glass.css`) - Premium glass morphism effect
- **Material Design** (`material-design.css`) - Google's Material Design system

**Retro & Gaming**
- **Windows 98** (`windows98.css`) - Classic Windows 98 styling
- **Windows XP** (`windows-xp.css`) - Windows XP Luna theme
- **Handheld Console** (`handheld-console.css`) - Gaming console inspired theme

## API

### Export Structure

- **Main Package** (`tanuki-ui`): Core components
- **Layouts** (`tanuki-ui/layouts`): Layout components
- **Node Editor** (`tanuki-ui/extended/node-editor`): Advanced editor
- **Themes** (`tanuki-ui/themes/LiquidGlassFilter`): Special effects

### TypeScript Support

Full TypeScript support with standard HTML attribute inheritance:

```tsx
import { Button, Input } from 'tanuki-ui';

// Use HTML attributes as-is
<Button 
  type="submit" 
  disabled={loading}
  onClick={handleClick}
  data-testid="submit-btn"
>
  Submit
</Button>

<Input
  type="email"
  required
  placeholder="Email address"
  onChange={handleChange}
/>
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome for Android)

## Bundle Size

| Package | Size (minified + gzipped) |
|---------|---------------------------|
| Core Components | 23.5KB |
| Core CSS | 9.9KB |
| Layouts | 12.6KB |
| Layouts CSS | 2.5KB |
| Node Editor | 49.5KB |
| Node Editor CSS | 6.9KB |
| Themes (each) | ~3-5KB |

## Performance

- Optimized with React.memo
- Style isolation with CSS Modules
- Lazy loading support
- Tree-shaking ready

## License

Unlicense

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Development

```bash
# Start development environment
npm run dev:playground

# Start Storybook
npm run dev:storybook

# Build
npm run build

# Type check
npm run typecheck

# Run tests
npm test

# Lint
npm run lint
```

## Project Structure

```
tanuki-ui/
├── src/
│   ├── bars/          # Toolbars, tab bars
│   ├── blocks/        # Icons, text blocks
│   ├── controls/      # Control components
│   ├── dialogs/       # Dialogs, modals
│   ├── elements/      # HTML basic elements
│   ├── extended/      # Extended components
│   │   └── node-editor/  # Node editor
│   ├── form/          # Form elements
│   ├── hooks/         # Custom hooks
│   ├── layouts/       # Layout components
│   ├── navigations/   # Navigation
│   └── themes/        # Theme related
├── public/
│   └── styles/        # Preset themes
└── docs/              # Documentation
```