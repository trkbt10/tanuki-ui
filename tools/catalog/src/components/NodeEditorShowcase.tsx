import React, { useState } from "react";
import { Link } from "react-router";
import { NodeEditor } from "tanuki-ui/extended/node-editor";
import type { NodeEditorData, NodeDefinition } from "tanuki-ui/extended/node-editor";
import { H2, H3, P, Section, Article, Button, Label } from "tanuki-ui";

// Basic node definitions for the demo
const basicNodeDefinitions: NodeDefinition[] = [
  {
    type: "math-add",
    displayName: "Add",
    description: "Adds two numbers together",
    category: "Math",
    icon: "➕",
    defaultSize: { width: 150, height: 80 },
    defaultData: { title: "Add", result: 0 },
    ports: [
      { id: "a", type: "input", label: "A", position: "left", dataType: "number" },
      { id: "b", type: "input", label: "B", position: "left", dataType: "number" },
      { id: "result", type: "output", label: "Result", position: "right", dataType: "number" },
    ],
  },
  {
    type: "data-source",
    displayName: "Data Source",
    description: "Provides data input",
    category: "Data",
    icon: "📊",
    defaultSize: { width: 180, height: 100 },
    defaultData: { title: "Data Source", value: 42 },
    ports: [{ id: "output", type: "output", label: "Value", position: "right", dataType: "number" }],
  },
];

// Initial demo data with some nodes
const initialDemoData: NodeEditorData = {
  nodes: {
    node1: {
      id: "node1",
      type: "data-source",
      position: { x: 100, y: 150 },
      size: { width: 180, height: 100 },
      data: { title: "Number Input", value: 10 },
    },
    node2: {
      id: "node2",
      type: "data-source",
      position: { x: 100, y: 300 },
      size: { width: 180, height: 100 },
      data: { title: "Number Input", value: 5 },
    },
    node3: {
      id: "node3",
      type: "math-add",
      position: { x: 400, y: 200 },
      size: { width: 150, height: 80 },
      data: { title: "Add", result: 0 },
    },
  },
  connections: {
    conn1: {
      id: "conn1",
      fromNodeId: "node1",
      fromPortId: "output",
      toNodeId: "node3",
      toPortId: "a",
    },
    conn2: {
      id: "conn2",
      fromNodeId: "node2",
      fromPortId: "output",
      toNodeId: "node3",
      toPortId: "b",
    },
  },
};

// Alternative demo data for testing controlled mode
const alternativeDemoData: NodeEditorData = {
  nodes: {
    alt1: {
      id: "alt1",
      type: "data-source",
      position: { x: 200, y: 100 },
      size: { width: 180, height: 100 },
      data: { title: "Alternative Source", value: 20 },
    },
    alt2: {
      id: "alt2",
      type: "math-add",
      position: { x: 450, y: 100 },
      size: { width: 150, height: 80 },
      data: { title: "Alternative Add", result: 0 },
    },
  },
  connections: {},
};

const NodeEditorShowcase: React.FC = () => {
  const [editorData, setEditorData] = useState<NodeEditorData>(initialDemoData);
  const [controlledData, setControlledData] = useState<NodeEditorData>(initialDemoData);
  const [isControlled, setIsControlled] = useState(false);

  return (
    <Article>
      <Section style={{ marginBottom: "24px" }}>
        <H2>🎛️ NodeEditor - ビジュアルプログラミング環境</H2>
        <P>
          NodeEditorは、ノードベースのビジュアルプログラミング環境を提供する高度なコンポーネントです。
          ドラッグ&ドロップでノードを作成・配置し、ポート間を接続してデータフローを構築できます。
        </P>
      </Section>

      <Section style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
          <H3 style={{ margin: 0 }}>🚀 インタラクティブデモ</H3>
          <Link
            to="/node-editor-test"
            style={{
              display: "inline-block",
              padding: "6px 12px",
              background: "#007bff",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            🧪 Props テストページへ
          </Link>
        </div>
        <P>
          下記のエディターでは、ノードの移動、ポート間の接続、ズーム・パンなどの基本操作を体験できます。
          右側のインスペクターパネルでノードの詳細も確認できます。
        </P>

        <Section style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "12px" }}>
            <Label>
              <input
                type="checkbox"
                checked={isControlled}
                onChange={(e) => setIsControlled(e.target.checked)}
                style={{ marginRight: "8px" }}
              />
              Controlled Mode (data prop) を使用する
            </Label>

            {isControlled && (
              <>
                <Button onClick={() => setControlledData(initialDemoData)} style={{ fontSize: "12px", padding: "4px 8px" }}>
                  データ A をロード
                </Button>
                <Button onClick={() => setControlledData(alternativeDemoData)} style={{ fontSize: "12px", padding: "4px 8px" }}>
                  データ B をロード
                </Button>
                <Button
                  onClick={() => setControlledData({ nodes: {}, connections: {} })}
                  style={{ fontSize: "12px", padding: "4px 8px" }}
                >
                  クリア
                </Button>
              </>
            )}
          </div>

          <P style={{ fontSize: "14px", color: "#666" }}>
            {isControlled
              ? "Controlled Mode: コンポーネントの状態は親コンポーネントが管理します。上のボタンで即座にデータを切り替えられます。"
              : "Uncontrolled Mode: コンポーネントが内部的に状態を管理します (initialData)。"}
          </P>
        </Section>

        <Section
          style={{
            width: "100%",
            height: "600px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div style={{ width: "100%", height: "100%" }}>
            {isControlled ? (
              <NodeEditor
                initialData={controlledData}
                onDataChange={setControlledData}
                nodeDefinitions={basicNodeDefinitions}
              />
            ) : (
              <NodeEditor initialData={editorData} onDataChange={setEditorData} nodeDefinitions={basicNodeDefinitions} />
            )}
          </div>
        </Section>
      </Section>

      <Section style={{ marginBottom: "24px" }}>
        <H3>✨ 主な機能</H3>
        <Section>
          <H3 style={{ fontSize: "16px" }}>🎯 ビジュアルプログラミング</H3>
          <P>ノードとコネクションによる直感的なプログラムフロー設計</P>
        </Section>

        <Section>
          <H3 style={{ fontSize: "16px" }}>🎨 カスタマイズ可能</H3>
          <P>独自のノードタイプ、レンダラー、インスペクターパネルを定義可能</P>
        </Section>

        <Section>
          <H3 style={{ fontSize: "16px" }}>⚡ 高性能</H3>
          <P>大量のノードでもスムーズな動作を実現する最適化されたレンダリング</P>
        </Section>

        <Section>
          <H3 style={{ fontSize: "16px" }}>🔧 豊富なAPI</H3>
          <P>保存/読み込み、アンドゥ/リドゥ、キーボードショートカットなど</P>
        </Section>
      </Section>

      <Section style={{ marginBottom: "24px" }}>
        <H3>🛠️ 使用方法</H3>

        <Section style={{ marginBottom: "16px" }}>
          <H3 style={{ fontSize: "16px" }}>📝 Uncontrolled Mode (initialData)</H3>
          <P>コンポーネントが内部的に状態を管理する方式です。defaultValueのような動作をします。</P>
          <Section
            style={{
              background: "#f8f9fa",
              padding: "16px",
              borderRadius: "8px",
              borderLeft: "4px solid #28a745",
              marginBottom: "16px",
            }}
          >
            <pre
              style={{
                margin: 0,
                fontFamily: '"Courier New", monospace',
                fontSize: "13px",
                lineHeight: "1.5",
                overflow: "auto",
              }}
            >
              {`// Uncontrolled Mode
function UncontrolledNodeEditor() {
  const [savedData, setSavedData] = useState(initialData);

  return (
    <NodeEditor
      initialData={savedData}  // 初期値として設定
      onDataChange={(data) => {
        // 変更通知を受け取る（オプション）
        console.log("Data changed:", data);
      }}
    />
  );
}`}
            </pre>
          </Section>
        </Section>

        <Section>
          <H3 style={{ fontSize: "16px" }}>🎛️ Controlled Mode (data)</H3>
          <P>親コンポーネントが状態を管理する方式です。valueのような動作をします。</P>
          <Section
            style={{
              background: "#f8f9fa",
              padding: "16px",
              borderRadius: "8px",
              borderLeft: "4px solid #007bff",
            }}
          >
            <pre
              style={{
                margin: 0,
                fontFamily: '"Courier New", monospace',
                fontSize: "13px",
                lineHeight: "1.5",
                overflow: "auto",
              }}
            >
              {`// Controlled Mode
function ControlledNodeEditor() {
  const [data, setData] = useState(initialData);

  return (
    <NodeEditor
      data={data}              // 状態を直接制御
      onDataChange={setData}   // 必須：状態更新ハンドラー
    />
  );
}`}
            </pre>
          </Section>
        </Section>
      </Section>

      <Section style={{ marginTop: "24px" }}>
        <H3>💡 Props の比較</H3>
        <Section
          style={{
            background: "#f8f9fa",
            padding: "16px",
            borderRadius: "8px",
            border: "1px solid #dee2e6",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <H3 style={{ fontSize: "14px", color: "#28a745" }}>Uncontrolled Mode</H3>
              <P>
                • <code>initialData</code> prop を使用
              </P>
              <P>• コンポーネントが内部状態を管理</P>
              <P>• 再レンダー時に initialData を変更しても無視される</P>
              <P>• HTMLの defaultValue と同じ動作</P>
            </div>
            <div>
              <H3 style={{ fontSize: "14px", color: "#007bff" }}>Controlled Mode</H3>
              <P>
                • <code>data</code> prop を使用
              </P>
              <P>• 親コンポーネントが状態を管理</P>
              <P>• data prop の変更は即座に反映される</P>
              <P>• HTMLの value と同じ動作</P>
            </div>
          </div>
        </Section>
      </Section>

      <Section>
        <H3>🎮 操作方法</H3>
        <Section>
          <P>
            <strong>マウス操作:</strong>
          </P>
          <P>• 左クリック + ドラッグ: ノード移動</P>
          <P>• 右クリック: コンテキストメニュー（新規ノード追加）</P>
          <P>• ポートをドラッグ: 新しい接続を作成</P>
          <P>• 中央ボタン/スペース + ドラッグ: キャンバスのパン</P>
          <P>• マウスホイール: ズーム</P>
        </Section>

        <Section>
          <P>
            <strong>キーボードショートカット:</strong>
          </P>
          <P>• Ctrl/Cmd + Z: アンドゥ</P>
          <P>• Ctrl/Cmd + Y: リドゥ</P>
          <P>• Delete: 選択したノード/接続を削除</P>
          <P>• Ctrl/Cmd + A: 全選択</P>
        </Section>
      </Section>
    </Article>
  );
};

export default NodeEditorShowcase;
