import React, { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  H2,
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
} from "../../../test-scenarios";
import type { FeaturesNodeDataTypeMap } from "../../../test-scenarios/features/types";
import {
  PageLayout,
  Main,
  Section,
  SectionIntro,
  ExampleGrid,
  ExampleCard,
  ExampleHeader,
  SingleColumnContent,
  TestGrid,
  TestCard,
  TestCardHeader,
  TestCardBody,
  EditorSurface,
  PageHeader,
} from "./parts";
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

  const mathContextValue = React.useMemo(() => {
    if (selectedScenario === "mathFlow") {
      return {
        getNodeValue: (nodeId: string) => editorData.nodes[nodeId]?.data?.value ?? 0,
        triggerEvaluation: () => {
          // placeholder for math evaluation
          console.log("Math evaluation triggered");
        },
      };
    }

    return {
      getNodeValue: () => undefined,
      triggerEvaluation: () => {},
    };
  }, [editorData, selectedScenario]);

  const renderEditor = () => {
    if (selectedScenario === "features") {
      return (
        <MathEvaluatorContext.Provider value={mathContextValue}>
          <NodeEditor<FeaturesNodeDataTypeMap>
            data={editorData}
            onDataChange={setEditorData}
            nodeDefinitions={nodeDefinitions}
          />
        </MathEvaluatorContext.Provider>
      );
    }

    return (
      <MathEvaluatorContext.Provider value={mathContextValue}>
        <NodeEditor
          data={editorData}
          onDataChange={setEditorData}
          nodeDefinitions={nodeDefinitions}
        />
      </MathEvaluatorContext.Provider>
    );
  };

  return (
    <PageLayout>
      <PageHeader
        title="NodeEditor Overview"
        lead="NodeEditor はノードベースのビジュアルプログラミング環境を構築するための拡張コンポーネントです。シナリオ別に操作性や API を確認できるよう、代表的なテストデータを用意しています。"
        helperText="シナリオを切り替えると初期データとノード定義が更新されます。必要に応じて初期値へのリセットやキャンバスクリアも可能です。"
      />

      <Main>
        <Section>
          <SectionIntro>
            <H2>シナリオ選択</H2>
            <P>
              利用目的に応じてテストシナリオを切り替えられます。演算ノード向けのコンテキストやカスタムレンダラーなど、NodeEditor の
              拡張ポイントを含むケースも用意しています。
            </P>
          </SectionIntro>

          <ExampleGrid>
            <ExampleCard>
              <ExampleHeader
                title="テストデータをダイナミックに入れ替える"
                description="シナリオを切り替えるとノード定義と初期データが同時に更新され、異なるユースケースを素早く検証できます。"
              />
              <SingleColumnContent>
                <div className={styles.scenarioPreview}>
                  <div className={styles.scenarioControls}>
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
                  <EditorSurface>{renderEditor()}</EditorSurface>
                </div>
              </SingleColumnContent>
            </ExampleCard>
          </ExampleGrid>
        </Section>

        <Section>
          <SectionIntro>
            <H2>現在のデータ</H2>
            <P>
              編集結果は `NodeEditorData` 形式で管理されます。ノード数や接続数と併せて、中身を確認できるようダンプを表示しています。
            </P>
          </SectionIntro>

          <ExampleGrid>
            <ExampleCard>
              <ExampleHeader
                title="NodeEditorData のスナップショット"
                description="現在のノードと接続を確認しながら、シナリオの差分や API 連携をテストできます。"
              />
              <SingleColumnContent>
                <div className={styles.dataPreview}>
                  <Small className={styles.datasetSummary}>
                    ノード数: {Object.keys(editorData.nodes).length} / 接続数: {Object.keys(editorData.connections).length}
                  </Small>
                  <pre className={styles.dataDump}>{JSON.stringify(editorData, null, 2)}</pre>
                </div>
              </SingleColumnContent>
            </ExampleCard>
          </ExampleGrid>
        </Section>

        <Section>
          <SectionIntro>
            <H2>詳細なデモとドキュメント</H2>
            <P>特定の機能に焦点を当てた詳細なデモページも用意しています。</P>
          </SectionIntro>

          <TestGrid>
            <TestCard>
              <TestCardHeader title="カスタムポートレンダラー" />
              <TestCardBody>
                PortDefinition の renderPort と renderConnection を使って、ポートと接続線の見た目を完全にカスタマイズする方法を詳しく解説しています。
              </TestCardBody>
              <div style={{ marginTop: "12px" }}>
                <Link to="/component/extended/NodeEditor/custom-port">
                  <Button variant="primary" size="small">
                    デモを見る →
                  </Button>
                </Link>
              </div>
            </TestCard>
            <TestCard>
              <TestCardHeader title="フローティングサイドバー" />
              <TestCardBody>
                サイドバーをキャンバス上にオーバーレイ表示させるフローティングモードを試し、幅やオフセットのカスタマイズ方法を確認できます。
              </TestCardBody>
              <div style={{ marginTop: "12px" }}>
                <Link to="/component/extended/NodeEditor/floating-sidebar">
                  <Button variant="primary" size="small">
                    デモを見る →
                  </Button>
                </Link>
              </div>
            </TestCard>
          </TestGrid>
        </Section>

        <Section>
          <SectionIntro>
            <H2>確認ポイント</H2>
            <P>機能・パフォーマンス・API の 3 つの観点からテスト項目を整理しています。</P>
          </SectionIntro>

          <TestGrid>
            <TestCard>
              <TestCardHeader title="UI と操作性" />
              <TestCardBody>
                ノードのドラッグ＆ドロップ、ポート接続、ホバー時のハイライト、キャンバスのパンやズームなど、操作ごとのフィードバックを確認します。
              </TestCardBody>
            </TestCard>
            <TestCard>
              <TestCardHeader title="パフォーマンス" />
              <TestCardBody>
                大量ノードでの描画、ズーム・パン操作の滑らかさ、ドラッグ中のフレームレートなど、描画負荷を監視します。
              </TestCardBody>
            </TestCard>
            <TestCard>
              <TestCardHeader title="拡張機能と API" />
              <TestCardBody>
                Math Flow のような文脈付き評価や、Features シナリオのカスタムコンポーネント、データ入出力 API の動作を確認します。
              </TestCardBody>
            </TestCard>
          </TestGrid>
        </Section>
      </Main>
    </PageLayout>
  );
};

export default NodeEditorCatalog;
