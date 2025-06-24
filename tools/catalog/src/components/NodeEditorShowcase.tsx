import React, { useState } from "react";
import { NodeEditor } from "tanuki-ui/extended/node-editor";
import type { NodeEditorData, NodeDefinition } from "tanuki-ui/extended/node-editor";
import { H2, H3, P, Section, Article, Button } from "tanuki-ui";

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
    "node1": {
      id: "node1",
      type: "data-source",
      position: { x: 100, y: 150 },
      size: { width: 180, height: 100 },
      data: { title: "Number Input", value: 10 },
    },
    "node2": {
      id: "node2",
      type: "data-source",
      position: { x: 100, y: 300 },
      size: { width: 180, height: 100 },
      data: { title: "Number Input", value: 5 },
    },
    "node3": {
      id: "node3",
      type: "math-add",
      position: { x: 400, y: 200 },
      size: { width: 150, height: 80 },
      data: { title: "Add", result: 0 },
    },
  },
  connections: {
    "conn1": {
      id: "conn1",
      from: { nodeId: "node1", portId: "output" },
      to: { nodeId: "node3", portId: "a" },
    } as any,
    "conn2": {
      id: "conn2", 
      from: { nodeId: "node2", portId: "output" },
      to: { nodeId: "node3", portId: "b" },
    } as any,
  },
};

const NodeEditorShowcase: React.FC = () => {
  const [editorData, setEditorData] = useState<NodeEditorData>(initialDemoData);

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
        <H3>🚀 インタラクティブデモ</H3>
        <P>
          下記のエディターでは、ノードの移動、ポート間の接続、ズーム・パンなどの基本操作を体験できます。
          右側のインスペクターパネルでノードの詳細も確認できます。
        </P>

        <Section style={{ marginBottom: "16px" }}></Section>

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
            <NodeEditor
              initialData={editorData}
              onDataChange={setEditorData}
              nodeDefinitions={basicNodeDefinitions}
              showInspector={true}
            />
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
            {`import { NodeEditor } from 'tanuki-ui/extended/node-editor';

function MyApp() {
  const [data, setData] = useState({
    nodes: {},
    connections: {}
  });

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <NodeEditor
        initialData={data}
        onDataChange={setData}
        showInspector={true}
      />
    </div>
  );
}`}
          </pre>
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
