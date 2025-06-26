import React, { useState } from "react";
import { NodeEditor } from "tanuki-ui/extended/node-editor";
import type { NodeEditorData } from "tanuki-ui/extended/node-editor";
import { H2, H3, P, Section, Article, Button, Select } from "tanuki-ui";
import {
  testDataSets,
  scenarioNodeDefinitions,
  MathEvaluatorContext,
} from "../test-scenarios";

type ScenarioKey = keyof typeof testDataSets;

const scenarioNames: Record<ScenarioKey, string> = {
  simple: "Simple Flow",
  mathFlow: "Math Flow",
  empty: "Empty",
  complexFlow: "Complex Flow",
  features: "Custom Features",
};

const scenarioDescriptions: Record<ScenarioKey, string> = {
  simple: "基本的なノード間接続のテストシナリオ",
  mathFlow: "数学計算ノードによる動的計算フローのテスト",
  empty: "空のキャンバスでのノード作成テスト",
  complexFlow: "複雑なデータフローとマルチポート接続のテスト",
  features: "カスタムレンダラーとインスペクターを使った高度な機能テスト",
};

const NodeEditorTestPage: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>("features");
  const [editorData, setEditorData] = useState<NodeEditorData>(testDataSets[selectedScenario]);

  const handleScenarioChange = (newScenario: ScenarioKey) => {
    setSelectedScenario(newScenario);
    setEditorData(testDataSets[newScenario]);
  };

  const resetToInitial = () => {
    setEditorData(testDataSets[selectedScenario]);
  };

  const clearCanvas = () => {
    setEditorData({ nodes: {}, connections: {} });
  };

  const renderNodeEditor = () => {
    const nodeDefinitions = scenarioNodeDefinitions[selectedScenario];
    
    if (selectedScenario === "mathFlow") {
      const mathContextValue = {
        getNodeValue: (nodeId: string) => {
          const node = editorData.nodes[nodeId];
          return node?.data?.value || 0;
        },
        triggerEvaluation: () => {
          // Trigger re-evaluation of math nodes
          console.log("Math evaluation triggered");
        }
      };
      
      return (
        <MathEvaluatorContext.Provider value={mathContextValue}>
          <NodeEditor
            data={editorData}
            onDataChange={setEditorData}
            nodeDefinitions={nodeDefinitions}
          />
        </MathEvaluatorContext.Provider>
      );
    }

    return (
      <NodeEditor
        data={editorData}
        onDataChange={setEditorData}
        nodeDefinitions={nodeDefinitions}
      />
    );
  };

  return (
    <Article>
      <Section style={{ marginBottom: "24px" }}>
        <H2>🧪 NodeEditor Test Scenarios</H2>
        <P>
          各テストシナリオを個別に確認できるテストページです。
          シナリオを選択してNodeEditorの動作を確認してください。
        </P>
      </Section>

      <Section style={{ marginBottom: "24px" }}>
        <H3>🎯 シナリオ選択</H3>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
          <Select
            value={selectedScenario}
            onChange={(e) => handleScenarioChange(e.target.value as ScenarioKey)}
            style={{ minWidth: "200px" }}
          >
            {Object.entries(scenarioNames).map(([key, name]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </Select>
          
          <Button onClick={resetToInitial} style={{ fontSize: "12px", padding: "6px 12px" }}>
            🔄 初期状態に戻す
          </Button>
          
          <Button onClick={clearCanvas} style={{ fontSize: "12px", padding: "6px 12px" }}>
            🗑️ クリア
          </Button>
        </div>

        <div style={{
          background: "#f8f9fa",
          padding: "12px",
          borderRadius: "6px",
          border: "1px solid #dee2e6",
          marginBottom: "16px"
        }}>
          <P style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>
            {scenarioNames[selectedScenario]}
          </P>
          <P style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#666" }}>
            {scenarioDescriptions[selectedScenario]}
          </P>
        </div>
      </Section>

      <Section style={{ marginBottom: "24px" }}>
        <H3>🎮 テストエディター</H3>
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
            {renderNodeEditor()}
          </div>
        </Section>
      </Section>

      <Section style={{ marginBottom: "24px" }}>
        <H3>📊 現在のデータ構造</H3>
        <details style={{ marginTop: "12px" }}>
          <summary style={{ cursor: "pointer", fontWeight: "bold", padding: "8px 0" }}>
            ノード数: {Object.keys(editorData.nodes).length}, 接続数: {Object.keys(editorData.connections).length}
          </summary>
          <pre style={{
            background: "#f8f9fa",
            padding: "12px",
            borderRadius: "6px",
            fontSize: "12px",
            overflow: "auto",
            maxHeight: "300px",
            border: "1px solid #dee2e6"
          }}>
            {JSON.stringify(editorData, null, 2)}
          </pre>
        </details>
      </Section>

      <Section>
        <H3>🎯 テストポイント</H3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
          <div style={{ padding: "16px", background: "#f8f9fa", borderRadius: "8px", border: "1px solid #dee2e6" }}>
            <H3 style={{ fontSize: "16px", margin: "0 0 8px 0" }}>🎨 UI/UX テスト</H3>
            <P style={{ fontSize: "14px", margin: 0 }}>
              • ノードの移動とリサイズ<br/>
              • ポート間の接続作成<br/>
              • コンテキストメニューの動作<br/>
              • インスペクターパネルの表示
            </P>
          </div>
          
          <div style={{ padding: "16px", background: "#f8f9fa", borderRadius: "8px", border: "1px solid #dee2e6" }}>
            <H3 style={{ fontSize: "16px", margin: "0 0 8px 0" }}>⚡ パフォーマンステスト</H3>
            <P style={{ fontSize: "14px", margin: 0 }}>
              • 大量ノードでの動作確認<br/>
              • ズーム・パン操作の滑らかさ<br/>
              • レンダリング速度<br/>
              • メモリ使用量の確認
            </P>
          </div>
          
          <div style={{ padding: "16px", background: "#f8f9fa", borderRadius: "8px", border: "1px solid #dee2e6" }}>
            <H3 style={{ fontSize: "16px", margin: "0 0 8px 0" }}>🔧 機能テスト</H3>
            <P style={{ fontSize: "14px", margin: 0 }}>
              • アンドゥ/リドゥ機能<br/>
              • キーボードショートカット<br/>
              • データの保存/読み込み<br/>
              • カスタムノード定義の動作
            </P>
          </div>
        </div>
      </Section>
    </Article>
  );
};

export default NodeEditorTestPage;