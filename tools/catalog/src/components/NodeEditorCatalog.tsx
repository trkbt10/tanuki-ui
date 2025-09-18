import React, { useMemo, useState } from "react";
import {
  Article,
  Header,
  Main,
  Section,
  H1,
  H2,
  H3,
  P,
  Small,
  Button,
  Select,
} from "tanuki-ui";
import { NodeEditor } from "tanuki-ui/extended/node-editor";
import type { NodeEditorData } from "tanuki-ui/extended/node-editor";
import {
  testDataSets,
  scenarioNodeDefinitions,
  MathEvaluatorContext,
} from "../test-scenarios";
import type { FeaturesNodeDataTypeMap } from "../test-scenarios/features/types";
import styles from "./NodeEditorCatalog.module.css";

type ScenarioKey = keyof typeof testDataSets;

const scenarioNames: Record<ScenarioKey, string> = {
  simple: "Simple Flow",
  mathFlow: "Math Flow",
  empty: "Empty",
  complexFlow: "Complex Flow",
  features: "Custom Features",
};

const scenarioDescriptions: Record<ScenarioKey, string> = {
  simple: "基本的なノード間接続のシナリオ。ノードやポートの基本操作を確認します。",
  mathFlow: "演算ノードによる動的計算フロー。数式の再評価などの拡張 API をテストできます。",
  empty: "空のキャンバスを使ってノード作成〜接続までの一連の操作を検証します。",
  complexFlow: "マルチポートや複雑な分岐を含む大規模なデータフローを扱うシナリオです。",
  features: "カスタムレンダラー／インスペクターなど NodeEditor の拡張機能をまとめて確認できます。",
};

const NodeEditorCatalog: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>("features");
  const [editorData, setEditorData] = useState<NodeEditorData>(testDataSets[selectedScenario]);

  const nodeDefinitions = useMemo(() => scenarioNodeDefinitions[selectedScenario], [selectedScenario]);

  const handleScenarioChange = (value: ScenarioKey) => {
    setSelectedScenario(value);
    setEditorData(testDataSets[value]);
  };

  const handleReset = () => {
    setEditorData(testDataSets[selectedScenario]);
  };

  const handleClear = () => {
    setEditorData({ nodes: {}, connections: {} });
  };

  const renderEditor = () => {
    if (selectedScenario === "mathFlow") {
      const mathContextValue = {
        getNodeValue: (nodeId: string) => editorData.nodes[nodeId]?.data?.value || 0,
        triggerEvaluation: () => {
          // placeholder for math evaluation
          console.log("Math evaluation triggered");
        },
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

    if (selectedScenario === "features") {
      return (
        <NodeEditor<FeaturesNodeDataTypeMap>
          data={editorData}
          onDataChange={setEditorData}
          nodeDefinitions={nodeDefinitions}
        />
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
    <Article className={styles.page}>
      <Header className={styles.header}>
        <H1>NodeEditor Catalog</H1>
        <P className={styles.lead}>
          NodeEditor はノードベースのビジュアルプログラミング環境を構築するための拡張コンポーネントです。シナリオ別に操作性や
          API を確認できるよう、代表的なテストデータを用意しています。
        </P>
        <Small className={styles.helperText}>
          シナリオを切り替えると初期データとノード定義が更新されます。必要に応じて初期値へのリセットやキャンバスクリアも可能です。
        </Small>
      </Header>

      <Main className={styles.main}>
        <Section className={styles.section}>
          <div className={styles.sectionIntro}>
            <H2>シナリオ選択</H2>
            <P>
              利用目的に応じてテストシナリオを切り替えられます。演算ノード向けのコンテキストやカスタムレンダラーなど、NodeEditor の
              拡張ポイントを含むケースも用意しています。
            </P>
          </div>

          <div className={styles.layoutRow}>
            <div className={styles.controlPanel}>
              <div className={styles.inlineControls}>
                <Select
                  value={selectedScenario}
                  onChange={(event) => handleScenarioChange(event.target.value as ScenarioKey)}
                  style={{ minWidth: "220px" }}
                >
                  {Object.entries(scenarioNames).map(([key, label]) => (
                    <option value={key} key={key}>
                      {label}
                    </option>
                  ))}
                </Select>
                <Button variant="secondary" onClick={handleReset}>
                  初期状態に戻す
                </Button>
                <Button variant="secondary" onClick={handleClear}>
                  キャンバスをクリア
                </Button>
              </div>
              <Small className={styles.indicator}>{scenarioDescriptions[selectedScenario]}</Small>
            </div>
          </div>

          <div className={styles.editorSurface}>
            <div className={styles.editorSurfaceInner}>{renderEditor()}</div>
          </div>
        </Section>

        <Section className={styles.section}>
          <div className={styles.sectionIntro}>
            <H2>現在のデータ</H2>
            <P>
              編集結果は `NodeEditorData` 形式で管理されます。ノード数や接続数と併せて、中身を確認できるようダンプを表示しています。
            </P>
          </div>

          <div className={styles.dataPanel}>
            <Small className={styles.datasetSummary}>
              ノード数: {Object.keys(editorData.nodes).length} / 接続数: {Object.keys(editorData.connections).length}
            </Small>
            <pre className={styles.dataDump}>{JSON.stringify(editorData, null, 2)}</pre>
          </div>
        </Section>

        <Section className={styles.section}>
          <div className={styles.sectionIntro}>
            <H2>確認ポイント</H2>
            <P>機能・パフォーマンス・API の 3 つの観点からテスト項目を整理しています。</P>
          </div>

          <div className={styles.testGrid}>
            <div className={styles.testCard}>
              <H3 className={styles.testCardTitle}>UI と操作性</H3>
              <P className={styles.testCardBody}>
                ノードのドラッグ＆ドロップ、ポート接続、ホバー時のハイライト、キャンバスのパンやズームなど、操作ごとのフィードバックを確認します。
              </P>
            </div>
            <div className={styles.testCard}>
              <H3 className={styles.testCardTitle}>パフォーマンス</H3>
              <P className={styles.testCardBody}>
                大量ノードでの描画、ズーム・パン操作の滑らかさ、ドラッグ中のフレームレートなど、描画負荷を監視します。
              </P>
            </div>
            <div className={styles.testCard}>
              <H3 className={styles.testCardTitle}>拡張機能と API</H3>
              <P className={styles.testCardBody}>
                Math Flow のような文脈付き評価や、Features シナリオのカスタムコンポーネント、データ入出力 API の動作を確認します。
              </P>
            </div>
          </div>
        </Section>
      </Main>
    </Article>
  );
};

export default NodeEditorCatalog;
