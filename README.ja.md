# Tanuki UI

[English](./README.md) | 日本語

**HTML の基本要素を、そのまま使える。**

Tanuki UI は、HTML の標準要素をベースとしたスタイル付きコンポーネントライブラリです。従来の UI ライブラリとは異なり、HTML セマンティクスを保ったまま、そのまま使えるコンポーネントを提供します。

## コンセプト

### HTML First アプローチ

```jsx
// 普通の HTML のように書ける
import { H1, P, Button, Input, Form } from 'tanuki-ui';

function App() {
  return (
    <main>
      <H1>ページタイトル</H1>
      <P>これは段落です。HTMLの p 要素と同じように使えます。</P>
      <Form>
        <Input type="text" placeholder="テキスト入力" />
        <Button type="submit">送信</Button>
      </Form>
    </main>
  );
}
```

### デュアルエクスポート

直感的に使えるよう、HTML 要素名とセマンティック名の両方でエクスポートしています。

```jsx
// どちらも同じコンポーネント
import { P, Paragraph } from 'tanuki-ui';
import { H1, Heading } from 'tanuki-ui';
import { A, Anchor } from 'tanuki-ui';
```

## 🚀 軽量・高速

**驚きの軽さ** - たった **23.5KB** (gzipped) で全てのコンポーネントが使える！

- **Core Components**: 23.5KB gzipped ✨
- **CSS**: 9.9KB gzipped
- **Layouts**: +12.6KB (オプション)
- **Node Editor**: +49.5KB (オプション)

React UIライブラリの中でもトップクラスの軽量さを実現。必要な機能だけをインポートすれば、さらに小さくなります。

## 主要機能

### 📄 HTML 基本要素

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

### 🎛️ 高機能コンポーネント

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

### 🎨 ビジュアルノードエディター

`tanuki-ui/extended/node-editor` では、プロダクションレディなビジュアルエディターを提供：

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

**特徴:**
- ドラッグ&ドロップによるノード操作
- 自動レイアウト機能
- ミニマップ表示
- 多言語対応 (i18n)
- キーボードショートカット
- 履歴管理（Undo/Redo）
- 制約システム

## インストール

```bash
# npm
npm install tanuki-ui

# yarn
yarn add tanuki-ui

# pnpm
pnpm add tanuki-ui

# bun
bun add tanuki-ui
```

### ピア依存関係

```json
{
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

## 使用方法

### 基本的な使い方

```jsx
import { H1, P, Button } from 'tanuki-ui';
import 'tanuki-ui/style.css';

function Welcome() {
  return (
    <>
      <H1>Tanuki UI へようこそ</H1>
      <P>HTML 要素がそのまま使える UI ライブラリです。</P>
      <Button onClick={() => alert('Hello!')}>
        クリック
      </Button>
    </>
  );
}
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

## テーマ

複数のテーマを用意しています：

```jsx
// テーマ CSS をインポート
import 'tanuki-ui/styles/monotone.css';         // Monotone (デフォルト)
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

### 利用可能なテーマ（全16種類）

**モダン・ミニマル**
- **Monotone** (`monotone.css`) - 高コントラスト、アクセシビリティ重視のテーマ（デフォルト）
- **Vercel** (`vercel.css`) - クリーンでモダンな開発者向けテーマ
- **Linear** (`linear.css`) - Linear アプリ風のモダンデザイン
- **OpenAI** (`openai.css`) - OpenAI のクリーンなインターフェース

**プラットフォームテーマ**
- **macOS 12** (`macOS12.css`) - macOS Big Sur/Monterey デザインシステム
- **iOS 12** (`ios12.css`) - 角丸を特徴とする iOS デザイン言語
- **Windows 11** (`windows11.css`) - Windows 11 Fluent Design システム
- **Android 12** (`android12.css`) - Material Design 3 (Material You)

**開発者ツール**
- **GitHub Dark** (`github-dark.css`) - GitHub のダークテーマ
- **Figma** (`figma.css`) - Figma デザインツールインターフェース
- **AWS** (`aws.css`) - AWS コンソール風デザイン

**特殊効果**
- **Apple Liquid Glass** (`apple-liquid-glass.css`) - プレミアムグラスモーフィズム効果
- **Material Design** (`material-design.css`) - Google の Material Design システム

**レトロ・ゲーミング**
- **Windows 98** (`windows98.css`) - クラシックな Windows 98 スタイル
- **Windows XP** (`windows-xp.css`) - Windows XP Luna テーマ
- **Handheld Console** (`handheld-console.css`) - ゲーム機風テーマ

## API

### エクスポート構成

- **メインパッケージ** (`tanuki-ui`): 基本コンポーネント
- **レイアウト** (`tanuki-ui/layouts`): レイアウト専用コンポーネント  
- **ノードエディター** (`tanuki-ui/extended/node-editor`): 高機能エディター
- **テーマ** (`tanuki-ui/themes/LiquidGlassFilter`): 特殊エフェクト

### TypeScript サポート

完全な TypeScript サポートと、HTML 標準の属性を継承：

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

## ブラウザサポート

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- モバイルブラウザ（iOS Safari, Chrome for Android）

## バンドルサイズ

| パッケージ | サイズ (minified + gzipped) |
|----------|---------------------------|
| Core Components | 23.5KB |
| Core CSS | 9.9KB |
| Layouts | 12.6KB |
| Layouts CSS | 2.5KB |
| Node Editor | 49.5KB |
| Node Editor CSS | 6.9KB |
| Themes (各) | ~3-5KB |

## パフォーマンス

- React.memo による最適化
- CSS Modules によるスタイル分離
- 遅延読み込み対応
- Tree-shaking 対応

## ライセンス

MIT

## 貢献

プルリクエストを歓迎します。大きな変更の場合は、まず issue を開いて変更内容について議論してください。

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