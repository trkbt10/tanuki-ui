import React from "react";
import {
  H2,
  H3,
  P,
  Small,
  Button,
  Input,
} from "tanuki-ui";
import {
  NodeEditor,
  NodeCanvas,
  InspectorPanel,
  type NodeEditorData,
  type GridLayoutConfig,
  type LayerDefinition,
} from "tanuki-ui/extended/node-editor";
import type { FeaturesNodeDataTypeMap } from "../../../test-scenarios/features/types";
import { featuresTestData, featuresNodeDefinitions } from "../../../test-scenarios";
import {
  PageLayout,
  Main,
  Section,
  SectionIntro,
  ExampleGrid,
  ExampleCard,
  ExampleHeader,
  SingleColumnContent,
  EditorSurface,
  PageHeader,
} from "./parts";
import styles from "./FloatingSidebarNodeEditorCatalog.module.css";

const clampOffset = (value: number) => Math.max(8, Math.min(96, value));

const FloatingSidebarNodeEditorCatalog: React.FC = () => {
  const [data, setData] = React.useState<NodeEditorData>(featuresTestData);
  const [leftMode, setLeftMode] = React.useState<"docked" | "floating">("floating");
  const [rightMode, setRightMode] = React.useState<"docked" | "floating">("floating");
  const [offset, setOffset] = React.useState(24);
  const [selectedPaletteItem, setSelectedPaletteItem] = React.useState<string | null>(null);

  const selectedDisplayName = React.useMemo(() => {
    if (!selectedPaletteItem) return null;
    const definition = featuresNodeDefinitions.find((item) => item.type === selectedPaletteItem);
    return definition?.displayName ?? selectedPaletteItem;
  }, [selectedPaletteItem]);

  const leftSidebar = React.useMemo(() => {
    return (
      <div className={styles.floatingSidebarPanel}>
        <div className={styles.floatingSidebarHeader}>
          <H3 className={styles.floatingSidebarTitle}>ノードライブラリ</H3>
          <Small className={styles.floatingSidebarSubtitle}>
            {selectedDisplayName ? `${selectedDisplayName} を選択中` : "追加したいノードを選択"}
          </Small>
        </div>
        <div className={styles.floatingSidebarList}>
          {featuresNodeDefinitions.map((definition) => (
            <button
              key={definition.type}
              type="button"
              className={`${styles.floatingSidebarItem} ${
                selectedPaletteItem === definition.type ? styles.floatingSidebarItemActive : ""
              }`}
              onClick={() => setSelectedPaletteItem(definition.type)}
            >
              <span className={styles.floatingSidebarIcon}>{definition.icon ?? "🧩"}</span>
              <span className={styles.floatingSidebarItemBody}>
                <span className={styles.floatingSidebarItemTitle}>{definition.displayName ?? definition.type}</span>
                <Small className={styles.floatingSidebarItemMeta}>{definition.category ?? "Node"}</Small>
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }, [selectedPaletteItem]);

  const handleOffsetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numeric = Number(event.target.value);
    if (Number.isNaN(numeric)) return;
    setOffset(clampOffset(numeric));
  };

  const handleResetData = () => setData(featuresTestData);

  // Memoize InspectorPanel component to prevent recreation on every render
  const inspectorPanel = React.useMemo(() => <InspectorPanel />, []);

  // Memoize position objects to prevent recreation on every render
  const leftPosition = React.useMemo(() => ({ left: offset, top: offset }), [offset]);
  const rightPosition = React.useMemo(() => ({ right: offset, top: offset }), [offset]);

  // Memoize gridConfig to prevent recreation on every render
  const gridConfig = React.useMemo((): GridLayoutConfig => ({
    areas: leftMode === "floating" && rightMode === "floating"
      ? [["canvas"]]
      : leftMode === "floating"
      ? [["canvas", "inspector"]]
      : rightMode === "floating"
      ? [["library", "canvas"]]
      : [["library", "canvas", "inspector"]],
    rows: [{ size: "1fr" }],
    columns: leftMode === "floating" && rightMode === "floating"
      ? [{ size: "1fr" }]
      : leftMode === "floating"
      ? [
          { size: "1fr" },
          { size: "340px", resizable: true, minSize: 280, maxSize: 500 },
        ]
      : rightMode === "floating"
      ? [
          { size: "320px", resizable: true, minSize: 260, maxSize: 480 },
          { size: "1fr" },
        ]
      : [
          { size: "320px", resizable: true, minSize: 260, maxSize: 480 },
          { size: "1fr" },
          { size: "340px", resizable: true, minSize: 280, maxSize: 500 },
        ],
    gap: "0",
  }), [leftMode, rightMode]);

  // Memoize gridLayers to prevent recreation on every render
  const gridLayers = React.useMemo((): LayerDefinition[] => {
    const layers: LayerDefinition[] = [
      {
        id: "canvas",
        component: <NodeCanvas />,
        gridArea: "canvas",
        zIndex: 0,
      },
    ];

    if (leftMode === "floating") {
      layers.push({
        id: "library",
        component: leftSidebar,
        positionMode: "absolute" as const,
        position: leftPosition,
        width: 320,
        height: 600,
        zIndex: 10,
      });
    } else {
      layers.push({
        id: "library",
        component: leftSidebar,
        gridArea: "library",
        zIndex: 1,
      });
    }

    if (rightMode === "floating") {
      layers.push({
        id: "inspector",
        component: inspectorPanel,
        positionMode: "absolute" as const,
        position: rightPosition,
        width: 340,
        height: 600,
        zIndex: 10,
      });
    } else {
      layers.push({
        id: "inspector",
        component: inspectorPanel,
        gridArea: "inspector",
        zIndex: 1,
      });
    }

    return layers;
  }, [leftMode, rightMode, leftSidebar, inspectorPanel, leftPosition, rightPosition]);

  return (
    <PageLayout>
      <PageHeader
        title="Floating Sidebar"
        lead="NodeEditor の左右サイドバーをフローティング表示に切り替えるための新しいレイアウトオプションを検証できます。"
        helperText="モード切り替えとオフセットを操作しながら、キャンバスをフルスクリーンに近い状態で利用できる UI を体験してください。"
      />

      <Main>
        <Section>
          <SectionIntro>
            <H2>フローティングレイアウトを試す</H2>
            <P>
              サイドバーをキャンバス上に浮かせることで、従来の 3 カラム分割よりも広い作業領域を確保できます。左右それぞれ個別にモードを切り替えられます。
            </P>
          </SectionIntro>

          <ExampleGrid>
            <ExampleCard>
              <ExampleHeader
                title="レイアウト設定"
                description="左右のサイドバーをフローティング／ドック表示で切り替え、オフセットを調整してキャンバス領域の広さを比較できます。"
              />
              <SingleColumnContent>
                <div className={styles.floatingSidebarControls}>
                  <Button
                    variant="secondary"
                    onClick={() => setLeftMode((mode) => (mode === "floating" ? "docked" : "floating"))}
                  >
                    左サイドバー: {leftMode === "floating" ? "フローティング" : "ドック表示"}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setRightMode((mode) => (mode === "floating" ? "docked" : "floating"))}
                  >
                    右サイドバー: {rightMode === "floating" ? "フローティング" : "ドック表示"}
                  </Button>
                  <label className={styles.offsetInput}>
                    <span>オフセット (px)</span>
                    <Input
                      type="number"
                      min={8}
                      max={96}
                      step={2}
                      value={offset}
                      onChange={handleOffsetChange}
                    />
                  </label>
                  <Button variant="secondary" onClick={handleResetData}>
                    初期データに戻す
                  </Button>
                  <Small className={styles.floatingSidebarStatus}>
                    フローティング時は角丸とシャドウが自動で適用されます。
                  </Small>
                </div>

                <EditorSurface>
                  <NodeEditor<FeaturesNodeDataTypeMap>
                    data={data}
                    onDataChange={setData}
                    nodeDefinitions={featuresNodeDefinitions}
                    gridConfig={gridConfig}
                    gridLayers={gridLayers}
                  />
                </EditorSurface>
              </SingleColumnContent>
            </ExampleCard>
          </ExampleGrid>
        </Section>
      </Main>
    </PageLayout>
  );
};

export default FloatingSidebarNodeEditorCatalog;
