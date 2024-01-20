# Tanuki UI

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
npm install tanuki-ui react react-use
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
import 'tanuki-ui/styles/ios12.css';        // iOS 12 風
import 'tanuki-ui/styles/macOS12.css';      // macOS 12 風
import 'tanuki-ui/styles/windows11.css';    // Windows 11 風
import 'tanuki-ui/styles/nintendo-switch.css'; // Nintendo Switch 風
```

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

## ライセンス

MIT

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
```