import React, { useState } from "react";
import { NodeEditor } from "tanuki-ui/extended/node-editor";
import type { NodeEditorData, NodeDefinition } from "tanuki-ui/extended/node-editor";
import { H2, H3, P, Section, Article, Button } from "tanuki-ui";

const NodeEditorShowcase: React.FC = () => {
  const [editorData, setEditorData] = useState<Partial<NodeEditorData>>({
    nodes: {
      node1: {
        id: "node1",
        type: "standard",
        position: { x: 150, y: 100 },
        size: { width: 200, height: 120 },
        data: { 
          title: "入力ノード",
          description: "データの入力を行います"
        },
      },
      node2: {
        id: "node2", 
        type: "standard",
        position: { x: 450, y: 200 },
        size: { width: 200, height: 120 },
        data: { 
          title: "処理ノード",
          description: "データを変換・処理します"
        },
      },
      node3: {
        id: "node3",
        type: "standard", 
        position: { x: 750, y: 150 },
        size: { width: 200, height: 120 },
        data: { 
          title: "出力ノード",
          description: "結果を出力します"
        },
      }
    },
    connections: {
      conn1: {
        id: "conn1",
        sourceNodeId: "node1",
        sourcePortId: "output",
        targetNodeId: "node2", 
        targetPortId: "input"
      },
      conn2: {
        id: "conn2",
        sourceNodeId: "node2",
        sourcePortId: "output", 
        targetNodeId: "node3",
        targetPortId: "input"
      }
    },
    viewport: {
      x: 0,
      y: 0,
      zoom: 1
    }
  });

  // カスタムノード定義
  const customNodeDefinition: NodeDefinition = {
    type: "demo-node",
    displayName: "デモノード",
    category: "カタログ",
    defaultData: { 
      title: "カスタムノード",
      value: 0 
    },
    defaultSize: { width: 180, height: 100 },
    ports: [
      { 
        id: "input", 
        type: "input", 
        label: "入力", 
        position: "left",
        dataType: "number"
      },
      { 
        id: "output", 
        type: "output", 
        label: "出力", 
        position: "right",
        dataType: "number"
      }
    ],
    renderNode: ({ node, isSelected, onDataChange }) => (
      <Section style={{ 
        padding: "12px", 
        background: isSelected ? "#e3f2fd" : "white",
        border: `2px solid ${isSelected ? "#2196f3" : "#ddd"}`,
        borderRadius: "8px",
        minWidth: "180px"
      }}>
        <H3 style={{ margin: "0 0 8px 0", fontSize: "14px" }}>
          {node.data.title}
        </H3>
        <P style={{ margin: "0", fontSize: "12px", color: "#666" }}>
          値: {node.data.value || 0}
        </P>
      </Section>
    )
  };

  const handleReset = () => {
    setEditorData({
      nodes: {
        welcomeNode: {
          id: "welcomeNode",
          type: "demo-node", 
          position: { x: 400, y: 300 },
          size: { width: 180, height: 100 },
          data: { 
            title: "ようこそ！",
            value: 42
          },
        }
      },
      connections: {},
      viewport: { x: 0, y: 0, zoom: 1 }
    });
  };

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
        
        <Section style={{ marginBottom: "16px" }}>
          <Button onClick={handleReset}>
            🔄 リセット
          </Button>
        </Section>

        <Section style={{ 
          width: "100%", 
          height: "600px", 
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          <NodeEditor
            initialData={editorData}
            onDataChange={setEditorData}
            nodeDefinitions={[customNodeDefinition]}
            includeDefaultDefinitions={true}
            showInspector={true}
            rightSidebarInitialWidth={280}
            toolbar={
              <Section style={{ 
                padding: "8px 16px", 
                background: "#f5f5f5",
                borderBottom: "1px solid #ddd",
                fontSize: "12px"
              }}>
                💡 ノードを右クリックして新しいノードを追加、ポートをドラッグして接続を作成
              </Section>
            }
          />
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
        <Section style={{ 
          background: "#f8f9fa", 
          padding: "16px",
          borderRadius: "8px",
          borderLeft: "4px solid #007bff"
        }}>
          <pre style={{
            margin: 0,
            fontFamily: '"Courier New", monospace',
            fontSize: "13px",
            lineHeight: "1.5",
            overflow: "auto"
          }}>
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
          <P><strong>マウス操作:</strong></P>
          <P>• 左クリック + ドラッグ: ノード移動</P>
          <P>• 右クリック: コンテキストメニュー（新規ノード追加）</P>
          <P>• ポートをドラッグ: 新しい接続を作成</P>
          <P>• 中央ボタン/スペース + ドラッグ: キャンバスのパン</P>
          <P>• マウスホイール: ズーム</P>
        </Section>
        
        <Section>
          <P><strong>キーボードショートカット:</strong></P>
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