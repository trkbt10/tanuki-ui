# Node Editor 実装ドキュメント

Node Editor は、視覚的なノードベースのエディタコンポーネントです。ドラッグ&ドロップによる操作、自動レイアウト、ミニマップ、国際化、キーボードショートカット、履歴管理、制約システムなどの機能を提供します。

## 目次

1. [基本セットアップ](#基本セットアップ)
2. [NodeEditor コンポーネント](#nodeeditor-コンポーネント)
3. [NodeDefinition インターフェース](#nodedefinition-インターフェース)
4. [ポート設定](#ポート設定)
5. [カスタムノードの作成](#カスタムノードの作成)
6. [外部データ連携](#外部データ連携)
7. [レンダープロパティ](#レンダープロパティ)
8. [組み込みノード定義](#組み込みノード定義)
9. [コア型定義](#コア型定義)

## 基本セットアップ

### インポート

```jsx
import { NodeEditor } from "tanuki-ui/extended/node-editor";
import "tanuki-ui/extended/node-editor/style.css";
```

### 基本的な使用方法

```jsx
import React, { useState } from "react";

function GraphEditor() {
  const [editorData, setEditorData] = useState({
    nodes: {},
    connections: {},
  });

  return (
    <NodeEditor
      initialData={editorData}
      onDataChange={setEditorData}
      nodeDefinitions={
        [
          /* カスタムノード定義 */
        ]
      }
    />
  );
}
```

## NodeEditor コンポーネント

### コアプロパティ

| プロパティ     | 型                                                | 説明                       |
| -------------- | ------------------------------------------------- | -------------------------- |
| `initialData`  | `Partial<NodeEditorData>`                         | エディタの初期状態         |
| `onDataChange` | `(data: NodeEditorData) => void`                  | データ変更時のコールバック |
| `onSave`       | `(data: NodeEditorData) => void \| Promise<void>` | 保存処理                   |
| `onLoad`       | `() => NodeEditorData \| Promise<NodeEditorData>` | 読み込み処理               |
| `className`    | `string`                                          | カスタム CSS クラス        |

### ノード定義プロパティ

| プロパティ                  | 型                 | 説明                                         |
| --------------------------- | ------------------ | -------------------------------------------- |
| `nodeDefinitions`           | `NodeDefinition[]` | カスタムノード型定義                         |
| `includeDefaultDefinitions` | `boolean`          | 組み込みノード型を含むか（デフォルト: true） |

### 外部データプロパティ

| プロパティ         | 型                                      | 説明                   |
| ------------------ | --------------------------------------- | ---------------------- |
| `externalDataRefs` | `Record<string, ExternalDataReference>` | ノード用外部データ参照 |

### レイアウトプロパティ

| プロパティ                 | 型                | 説明                         |
| -------------------------- | ----------------- | ---------------------------- |
| `leftSidebar`              | `React.ReactNode` | 左サイドバーコンテンツ       |
| `rightSidebar`             | `React.ReactNode` | 右サイドバーコンテンツ       |
| `toolbar`                  | `React.ReactNode` | カスタムツールバーコンテンツ |
| `leftSidebarInitialWidth`  | `number`          | 左サイドバーの初期幅         |
| `rightSidebarInitialWidth` | `number`          | 右サイドバーの初期幅         |

## NodeDefinition インターフェース

```typescript
interface NodeDefinition {
  type: string; // 一意の型識別子
  displayName: string; // UI表示名
  description?: string; // 説明テキスト
  icon?: ReactNode; // アイコンコンポーネント
  category?: string; // グループ化用カテゴリ
  defaultData?: Record<string, unknown>; // デフォルトノードデータ
  defaultSize?: { width: number; height: number }; // デフォルトサイズ
  ports?: PortDefinition[]; // ポート定義
  supportsChildren?: boolean; // 子ノード対応（グループ）
  interactive?: boolean; // インタラクティブコンテンツ処理
  visualState?: "info" | "success" | "warning" | "error" | "disabled";
  constraints?: NodeConstraint[]; // 検証制約

  // カスタムレンダリング
  renderNode?: (props: NodeRenderProps) => ReactElement;
  renderInspector?: (props: InspectorRenderProps) => ReactElement;

  // 外部データ処理
  loadExternalData?: (ref: ExternalDataReference) => unknown | Promise<unknown>;
  updateExternalData?: (ref: ExternalDataReference, data: unknown) => void | Promise<void>;

  // 接続検証
  validateConnection?: (fromPort: Port, toPort: Port) => boolean;
}
```

## ポート設定

### PortDefinition インターフェース

```typescript
interface PortDefinition {
  id: string; // ポート識別子
  type: "input" | "output"; // ポート種別
  label: string; // 表示ラベル
  position: "left" | "right" | "top" | "bottom"; // ノード上の位置
  dataType?: string; // 検証用データ型（オプション）
  required?: boolean; // 必須ポートかどうか
  maxConnections?: number; // 最大接続数（デフォルト: input=1、output=無制限）
}
```

### ポート設定例

#### 標準的な入出力ポート

```typescript
ports: [
  {
    id: "input",
    type: "input",
    label: "Input",
    position: "left",
  },
  {
    id: "output",
    type: "output",
    label: "Output",
    position: "right",
  },
];
```

#### 複数入力設定

```typescript
ports: [
  {
    id: "input1",
    type: "input",
    label: "Input 1",
    position: "left",
    dataType: "number",
    required: true,
  },
  {
    id: "input2",
    type: "input",
    label: "Input 2",
    position: "left",
    dataType: "string",
  },
  {
    id: "output",
    type: "output",
    label: "Output",
    position: "right",
    maxConnections: 5,
  },
];
```

## カスタムノードの作成

### 基本カスタムノード

```typescript
const BasicNodeDefinition: NodeDefinition = {
  type: "basic-node",
  displayName: "Basic Node",
  description: "シンプルなカスタムノード",
  category: "Custom",
  defaultData: {
    title: "Basic Node",
    value: 0,
  },
  defaultSize: { width: 200, height: 100 },
  ports: [
    {
      id: "input",
      type: "input",
      label: "Input",
      position: "left",
    },
    {
      id: "output",
      type: "output",
      label: "Output",
      position: "right",
    },
  ],
};
```

### カスタムレンダラーノード

```typescript
const CustomRendererNode: NodeDefinition = {
  type: "custom-render",
  displayName: "Custom Render Node",
  defaultSize: { width: 220, height: 120 },
  renderNode: (props: NodeRenderProps) => {
    const { node, isSelected, onUpdateNode } = props;

    return (
      <div
        style={{
          padding: "12px",
          backgroundColor: isSelected ? "#e3f2fd" : "#ffffff",
          border: "2px solid #007aff",
          borderRadius: "8px",
        }}
      >
        <h3>{node.data.title}</h3>
        <input
          value={node.data.value || ""}
          onChange={(e) =>
            onUpdateNode({
              data: { ...node.data, value: e.target.value },
            })
          }
        />
      </div>
    );
  },
};
```

### インスペクター付きノード

```typescript
const InspectorNode: NodeDefinition = {
  type: "inspector-node",
  displayName: "Inspector Node",
  renderInspector: (props: InspectorRenderProps) => {
    const { node, onUpdateNode } = props;

    return (
      <div>
        <h3>ノード設定</h3>
        <label>
          タイトル:
          <input
            value={node.data.title || ""}
            onChange={(e) =>
              onUpdateNode({
                data: { ...node.data, title: e.target.value },
              })
            }
          />
        </label>
        <label>
          説明:
          <textarea
            value={node.data.description || ""}
            onChange={(e) =>
              onUpdateNode({
                data: { ...node.data, description: e.target.value },
              })
            }
          />
        </label>
      </div>
    );
  },
};
```

## 外部データ連携

### ExternalDataReference インターフェース

```typescript
interface ExternalDataReference {
  id: string; // 一意識別子
  type: string; // データ型
  version?: number; // バージョン（オプション）
  metadata?: Record<string, unknown>; // メタデータ（オプション）
}
```

### 外部データノードの実装

```typescript
const ExternalDataNode: NodeDefinition = {
  type: "external-data",
  displayName: "External Data Node",
  loadExternalData: async (ref: ExternalDataReference) => {
    // API呼び出しをシミュレート
    const response = await fetch(`/api/data/${ref.id}`);
    return response.json();
  },
  updateExternalData: async (ref: ExternalDataReference, data: unknown) => {
    await fetch(`/api/data/${ref.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  renderNode: (props: NodeRenderProps) => {
    const { externalData, isLoadingExternalData } = props;

    if (isLoadingExternalData) {
      return <div>読み込み中...</div>;
    }

    return (
      <div>
        <h3>{externalData?.title || "データなし"}</h3>
        <p>{externalData?.description}</p>
      </div>
    );
  },
};
```

### 使用例

```jsx
const externalDataRefs = {
  "node-1": { id: "task-1", type: "task" },
  "node-2": { id: "task-2", type: "task" },
};

<NodeEditor externalDataRefs={externalDataRefs} nodeDefinitions={[ExternalDataNode]} />;
```

## レンダープロパティ

### NodeRenderProps

```typescript
interface NodeRenderProps {
  node: Node; // ノードデータ
  isSelected: boolean; // 選択状態
  isDragging: boolean; // ドラッグ状態
  isEditing: boolean; // インライン編集状態
  externalData: unknown; // 外部データ（読み込み済み）
  isLoadingExternalData: boolean; // 読み込み状態
  externalDataError: Error | null; // エラー状態
  onStartEdit: () => void; // インライン編集開始
  onUpdateNode: (updates: Partial<Node>) => void; // ノード更新
}
```

### InspectorRenderProps

```typescript
interface InspectorRenderProps {
  node: Node; // 選択されたノード
  externalData: unknown; // 外部データ（読み込み済み）
  isLoadingExternalData: boolean; // 読み込み状態
  externalDataError: Error | null; // エラー状態
  onUpdateNode: (updates: Partial<Node>) => void; // ノード更新
  onUpdateExternalData: (data: unknown) => Promise<void>; // 外部データ更新
  onDeleteNode: () => void; // ノード削除
}
```

## 組み込みノード定義

### 標準ノード

```typescript
const StandardNodeDefinition: NodeDefinition = {
  type: "standard",
  displayName: "Standard Node",
  description: "カスタマイズ可能なプロパティを持つ基本ノード",
  category: "Basic",
  defaultData: { title: "New Node", content: "" },
  defaultSize: { width: 200, height: 100 },
  ports: [
    { id: "input", type: "input", label: "Input", position: "left" },
    { id: "output", type: "output", label: "Output", position: "right" },
  ],
};
```

### グループノード

```typescript
const GroupNodeDefinition: NodeDefinition = {
  type: "group",
  displayName: "Group",
  description: "他のノードを含むことができるコンテナノード",
  category: "Structure",
  defaultData: { title: "Group" },
  defaultSize: { width: 300, height: 200 },
  supportsChildren: true,
  visualState: "info",
};
```

## コア型定義

### エディタデータ構造

```typescript
interface NodeEditorData {
  nodes: Record<NodeId, Node>;
  connections: Record<ConnectionId, Connection>;
  lastDuplicatedNodeIds?: NodeId[];
}
```

### ノード構造

```typescript
interface Node {
  id: NodeId;
  type: string;
  position: Position;
  size?: Size;
  data: NodeData;
  ports?: Port[];
  children?: NodeId[];
  parentId?: NodeId;
  expanded?: boolean;
  visible?: boolean;
  locked?: boolean;
  resizable?: boolean;
}
```

### 接続構造

```typescript
interface Connection {
  id: ConnectionId;
  fromNodeId: NodeId;
  fromPortId: PortId;
  toNodeId: NodeId;
  toPortId: PortId;
}
```

### ポート構造

```typescript
interface Port {
  id: PortId;
  type: PortType;
  label: string;
  nodeId: NodeId;
  position: PortPosition;
  dataType?: string;
  maxConnections?: number;
}
```

## 実装例

### 完全な実装例

```jsx
import React, { useState } from "react";
import { NodeEditor } from "tanuki-ui/extended/node-editor";

// カスタムノード定義
const customNodeDefinitions = [
  {
    type: "calculator",
    displayName: "計算機",
    category: "数学",
    defaultData: { operation: "add", value: 0 },
    defaultSize: { width: 180, height: 120 },
    ports: [
      { id: "a", type: "input", label: "A", position: "left", dataType: "number" },
      { id: "b", type: "input", label: "B", position: "left", dataType: "number" },
      { id: "result", type: "output", label: "結果", position: "right", dataType: "number" },
    ],
    renderNode: ({ node, onUpdateNode }) => (
      <div style={{ padding: "8px" }}>
        <h4>計算機</h4>
        <select
          value={node.data.operation}
          onChange={(e) =>
            onUpdateNode({
              data: { ...node.data, operation: e.target.value },
            })
          }
        >
          <option value="add">加算</option>
          <option value="subtract">減算</option>
          <option value="multiply">乗算</option>
          <option value="divide">除算</option>
        </select>
      </div>
    ),
  },
];

function App() {
  const [editorData, setEditorData] = useState({
    nodes: {},
    connections: {},
  });

  const handleSave = async (data) => {
    console.log("エディタデータを保存:", data);
    // 保存ロジックをここに実装
  };

  return (
    <div style={{ height: "100vh" }}>
      <NodeEditor
        initialData={editorData}
        onDataChange={setEditorData}
        onSave={handleSave}
        nodeDefinitions={customNodeDefinitions}
        showInspector={true}
      />
    </div>
  );
}

export default App;
```
