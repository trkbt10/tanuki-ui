<div align="center">
  <img src="./docs/logo.png" alt="Tanuki UI Logo" width="120" height="120" />
  
  # Tanuki UI
  
  **HTML の基本要素を、そのまま使える。**
  
  [![npm version](https://img.shields.io/npm/v/tanuki-ui.svg?style=flat-square)](https://www.npmjs.com/package/tanuki-ui)
  [![Bundle Size](https://img.shields.io/bundlephobia/minzip/tanuki-ui?style=flat-square)](https://bundlephobia.com/package/tanuki-ui)
  [![License: Unlicense](https://img.shields.io/badge/License-Unlicense-blue.svg?style=flat-square)](http://unlicense.org/)
  
  [🎨 コンポーネントカタログ](https://trkbt10.github.io/tanuki-ui/) | [English](./README.md) | 日本語
</div>

---

Tanuki UI は、HTML の標準要素をベースとしたスタイル付きコンポーネントライブラリです。HTML セマンティクスを保ったまま、そのまま使えるコンポーネントを提供します。

## 特徴

- **HTML ファースト**: HTML 要素と同じように使える
- **複数のテーマ**: プラットフォーム準拠デザインをすぐに利用可能
- **デュアルエクスポート**: HTML 要素名とセマンティック名の両方

## クイックスタート

```bash
npm install tanuki-ui
```

```jsx
import { H1, P, Button } from 'tanuki-ui';
import 'tanuki-ui/style.css';

function App() {
  return (
    <>
      <H1>Tanuki UI へようこそ</H1>
      <P>HTML 要素がそのまま使える UI ライブラリです。</P>
      <Button onClick={() => alert('Hello!')}>クリック</Button>
    </>
  );
}
```

**ピア依存関係:** React 18.0.0+, React DOM 18.0.0+

## 使用方法

### 基本コンポーネント

```jsx
// 普通の HTML のように書ける
import { H1, P, Button, Input, Form } from 'tanuki-ui';

function App() {
  return (
    <main>
      <H1>ページタイトル</H1>
      <P>これは段落です。HTML の p 要素と同じように使えます。</P>
      <Form>
        <Input type="text" placeholder="テキスト入力" />
        <Button type="submit">送信</Button>
      </Form>
    </main>
  );
}
```

### デュアルエクスポート

HTML 要素名とセマンティック名の両方でエクスポートしています：

```jsx
// どちらも同じコンポーネント
import { P, Paragraph } from 'tanuki-ui';
import { H1, Heading } from 'tanuki-ui';
import { A, Anchor } from 'tanuki-ui';
```

### TypeScript サポート

HTML 標準の属性を継承した完全な TypeScript サポート：

```tsx
import { Button, Input } from 'tanuki-ui';

// HTML 属性がそのまま使える
<Button 
  type="submit" 
  disabled={loading}
  onClick={handleClick}
  data-testid="submit-btn"
>
  送信
</Button>

<Input
  type="email"
  required
  placeholder="メールアドレス"
  onChange={handleChange}
/>
```

### レイアウトを使う

```jsx
import { AppLayout, SidebarLayout } from 'tanuki-ui/layouts';
import 'tanuki-ui/layouts/style.css';

function App() {
  return (
    <AppLayout>
      <SidebarLayout
        sidebar={<nav>ナビゲーション</nav>}
        main={<main>メインコンテンツ</main>}
      />
    </AppLayout>
  );
}
```

### ノードエディターを使う

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

## コンポーネント

### HTML 基本要素

HTML5 のセマンティック要素を完全網羅：

**コンテンツセクション**
- `Article`, `Section`, `Nav`, `Main`, `Header`, `Footer`, `Aside`, `Address`

**テキストコンテンツ**
- `H1`〜`H6`, `P`, `Blockquote`, `Pre`, `Div`, `Hr`

**埋め込みコンテンツ**
- `Image` (`Img`), `Figure`, `Figcaption`

**リスト**
- `List` (`Ul`), `ListItem` (`Li`), `Descriptions` (`Dl`)

**フォーム**
- `Form`, `Button`, `Input`, `Textarea`, `Select`, `Label`, `Fieldset`, `Legend`
- `Progress`, `Meter`, `Output`

### 高機能コンポーネント

**フォーム拡張**
- `MediaInput` - ファイルアップロード
- `RangeInput` - スライダー
- `SwitchInput` - トグルスイッチ
- `SortableList` - ドラッグ&ドロップソート

**ダイアログ・ナビゲーション**
- `Dialog`, `Modal`, `Alert`, `Drawer`
- `ContextualMenu`, `Popover`
- `TabNav`, `TabBar`, `SidebarList`

**レイアウト**
- `AppLayout`, `SidebarLayout`, `HeaderMainLayout`
- `ScrollView`, `ParavirtualScroll`
- `Panel` システム（動的レイアウト）

### ビジュアルノードエディター

`tanuki-ui/extended/node-editor` では、プロダクションレディなビジュアルエディターを提供：

**特徴:**
- ドラッグ&ドロップによるノード操作
- 自動レイアウト機能
- ミニマップ表示
- 多言語対応 (i18n)
- キーボードショートカット
- 履歴管理（Undo/Redo）
- 制約システム

## テーマ

```jsx
// テーマ CSS をインポート
import 'tanuki-ui/styles/monotone.css';  // デフォルトテーマ
import 'tanuki-ui/styles/github-dark.css';
import 'tanuki-ui/styles/ios12.css';
// ... その他
```

### 利用可能なテーマ (19 種類)

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


## バンドルサイズ

| パッケージ | サイズ (minified + gzipped) |
|----------|---------------------------|
| コアコンポーネント | 25.5KB |
| Core CSS | 16.0KB |
| Layouts | 15.8KB |
| Layouts CSS | 3.5KB |
| Node Editor | 63.3KB |
| Node Editor CSS | 11.5KB |
| テーマ (各) | ~3-5KB |

## API リファレンス

### エクスポート構成

- **メインパッケージ** (`tanuki-ui`): 基本コンポーネント
- **レイアウト** (`tanuki-ui/layouts`): レイアウト専用コンポーネント  
- **ノードエディター** (`tanuki-ui/extended/node-editor`): 高機能エディター
- **テーマ** (`tanuki-ui/themes/LiquidGlassFilter`): 特殊エフェクト

## ブラウザサポート

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- モバイルブラウザ（iOS Safari, Chrome for Android）

## ライセンス

Unlicense

## 開発

```bash
# 開発環境起動
npm run dev:playground

# Storybook 起動  
npm run dev:storybook

# ビルド
npm run build

# 型チェック
npm run typecheck

# テスト実行
npm test

# リント
npm run lint
```

## プロジェクト構成

```
tanuki-ui/
├── src/
│   ├── bars/          # ツールバー、タブバー
│   ├── blocks/        # アイコン、テキストブロック
│   ├── controls/      # 操作系コンポーネント
│   ├── dialogs/       # ダイアログ、モーダル
│   ├── elements/      # HTML基本要素
│   ├── extended/      # 拡張コンポーネント
│   │   └── node-editor/  # ノードエディター
│   ├── form/          # フォーム要素
│   ├── hooks/         # カスタムフック
│   ├── layouts/       # レイアウトコンポーネント
│   ├── navigations/   # ナビゲーション
│   └── themes/        # テーマ関連
├── public/
│   └── styles/        # プリセットテーマ
└── docs/              # ドキュメント
```
