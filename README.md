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

Tanuki UI is a styled component library based on standard HTML elements. It provides ready-to-use components while preserving HTML semantics.

## Features

- **HTML First**: Use components just like HTML elements
- **Multiple Themes**: Platform-native designs ready to use
- **Dual Export**: HTML element names and semantic names

## Quick Start

```bash
npm install tanuki-ui
```

```jsx
import { H1, P, Button } from 'tanuki-ui';
import 'tanuki-ui/style.css';

function App() {
  return (
    <>
      <H1>Welcome to Tanuki UI</H1>
      <P>A UI library where HTML elements work as they are.</P>
      <Button onClick={() => alert('Hello!')}>Click me</Button>
    </>
  );
}
```

**Peer Dependencies:** React 18.0.0+, React DOM 18.0.0+

## Usage

### Basic Components

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

Components are exported with both HTML element names and semantic names:

```jsx
// Both are the same component
import { P, Paragraph } from 'tanuki-ui';
import { H1, Heading } from 'tanuki-ui';
import { A, Anchor } from 'tanuki-ui';
```

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

## Components

### HTML Basic Elements

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

### Advanced Components

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

### Visual Node Editor

`tanuki-ui/extended/node-editor` provides a production-ready visual editor:

**Features:**
- Drag & drop node manipulation
- Auto-layout functionality
- Minimap display
- Internationalization (i18n)
- Keyboard shortcuts
- History management (Undo/Redo)
- Constraint system

## Themes

```jsx
// Import theme CSS
import 'tanuki-ui/styles/monotone.css';  // Default theme
import 'tanuki-ui/styles/github-dark.css';
import 'tanuki-ui/styles/ios12.css';
// ... and more
```

### Available Themes (19 total)

**Accessibility**
- **Monotone (Default)** (`monotone.css`) - High contrast accessibility-focused design with clear visual hierarchy and enhanced readability

**Modern**
- **Apple Liquid Glass** (`apple-liquid-glass.css`) - Premium glass morphism design with translucent effects and blur

**Developer**
- **GitHub Dark** (`github-dark.css`) - GitHub's dark theme with professional developer-focused aesthetics
- **Vercel** (`vercel.css`) - Geist-based palette with official neutral/brand tokens and typography updates

**Apple**
- **iOS 12** (`ios12.css`) - Implements Apple's Human Interface Guidelines with authentic iOS styling and dynamic color system
- **macOS 12** (`macOS12.css`) - Apple's design system with translucent effects and refined interface elements

**Google**
- **Android 12** (`android12.css`) - Based on Material You design system with dynamic color, large touch targets, and smooth animations
- **Material Design** (`material-design.css`) - Google's Material Design system with elevation layers and dynamic color palette

**Microsoft**
- **Windows 11** (`windows11.css`) - Modern, clean design with subtle shadows, rounded corners, and Fluent Design principles

**Retro**
- **8-bit Game Console RPG** (`8bit-gameconsole-rpg.css`) - Authentic retro 8-bit console experience with pixel-perfect design, monochrome palette, chunky borders, and classic RPG aesthetics
- **Windows 98** (`windows98.css`) - Recreates the classic Windows 98 interface with 3D beveled controls, retro typography, and nostalgic aesthetics
- **Windows XP** (`windows-xp.css`) - Recreates the iconic Luna Blue interface with gradient buttons, rounded corners, and the classic XP aesthetic

**Gaming**
- **Handheld Console** (`handheld-console.css`) - Nintendo Switch and handheld gaming aesthetics with rounded corners and vibrant colors

**Design**
- **Figma** (`figma.css`) - Recreates Figma's modern design system with clean typography, subtle shadows, and professional aesthetics

**Enterprise**
- **AWS** (`aws.css`) - Amazon Web Services console-inspired design with professional cloud interface aesthetics

**Productivity**
- **Linear** (`linear.css`) - Linear app-inspired modern design with clean typography and minimal interface elements

**AI**
- **OpenAI** (`openai.css`) - OpenAI's clean interface styling with thoughtful typography and modern color palette

**Media**
- **YouTube** (`youtube.css`) - Modern, clean design inspired by YouTube's interface with rounded corners, subtle shadows, and video-centric aesthetics

**Communication**
- **Naver LINE** (`naver-line.css`) - Inspired by LY Corporation's LINE brand with crisp white surfaces, bright green accents, and friendly messaging vibes


## API Reference

### Export Structure

- **Main Package** (`tanuki-ui`): Core components
- **Layouts** (`tanuki-ui/layouts`): Layout components
- **Node Editor** (`tanuki-ui/extended/node-editor`): Advanced editor
- **Themes** (`tanuki-ui/themes/LiquidGlassFilter`): Special effects

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome for Android)

## License

Unlicense

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
