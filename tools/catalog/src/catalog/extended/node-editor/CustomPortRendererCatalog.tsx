import React, { useState } from "react";
import { H2, P, Code, Pre, Button } from "tanuki-ui";
import { NodeEditor } from "tanuki-ui/extended/node-editor";
import { createNodeDefinition, toUntypedDefinition } from "tanuki-ui/extended/node-editor";
import type { NodeEditorData } from "tanuki-ui/extended/node-editor";
import type { PortRenderContext, ConnectionRenderContext } from "tanuki-ui/extended/node-editor";
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
import styles from "./CustomPortRendererCatalog.module.css";

// Custom port renderer example - changes color based on data type
const customPortRenderer = (context: PortRenderContext, defaultRender: () => React.ReactElement) => {
  const { port, isConnected, isHovered, position, handlers } = context;

  // Define colors for different data types
  const colorMap: Record<string, string> = {
    data: "#4CAF50",
    image: "#2196F3",
    audio: "#FF9800",
    video: "#9C27B0",
  };

  const color = colorMap[port.dataType || ""] || "#999";
  const size = isHovered ? 14 : isConnected ? 12 : 10;

  // If position is not available, use default renderer
  if (!position) {
    return defaultRender();
  }

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        transform: position.transform,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor: color,
        border: `2px solid ${isConnected ? color : "#fff"}`,
        boxShadow: isHovered ? `0 0 8px ${color}` : "none",
        transition: "all 0.2s",
        cursor: "crosshair",
        pointerEvents: "all", // IMPORTANT: Required for drag interactions
        zIndex: 10,
      }}
      title={port.label}
      onPointerDown={handlers.onPointerDown}
      onPointerUp={handlers.onPointerUp}
      onPointerEnter={handlers.onPointerEnter}
      onPointerLeave={handlers.onPointerLeave}
      data-port-id={port.id}
      data-port-type={port.type}
      data-node-id={port.nodeId}
    />
  );
};

// Custom connection renderer example - styled based on data type
const customConnectionRenderer = (
  context: ConnectionRenderContext,
  defaultRender: () => React.ReactElement
) => {
  const { fromPort, fromPosition, toPosition, isSelected, isHovered } = context;

  // Define colors for different data types
  const colorMap: Record<string, string> = {
    data: "#4CAF50",
    image: "#2196F3",
    audio: "#FF9800",
    video: "#9C27B0",
  };

  const color = colorMap[fromPort.dataType || ""] || "#999";
  const distance = Math.hypot(toPosition.x - fromPosition.x, toPosition.y - fromPosition.y) || 1;
  const glowStrength = Math.min(distance / 120, 1);
  const pulseRadius = 4 + glowStrength * 4;

  return (
    <g
      style={{ filter: isSelected || isHovered ? `drop-shadow(0 0 ${4 + glowStrength * 4}px ${color})` : "none" }}
    >
      {defaultRender()}
      <circle
        cx={toPosition.x}
        cy={toPosition.y}
        r={pulseRadius}
        fill={color}
        fillOpacity={0.2}
        stroke={color}
        strokeWidth={isSelected || isHovered ? 1.5 : 1}
      />
    </g>
  );
};

// Define custom node types with custom port renderers
const dataSourceNode = toUntypedDefinition(
  createNodeDefinition({
    type: "data-source",
    displayName: "Data Source",
    description: "Provides data output",
    category: "Custom",
    defaultData: {
      title: "Data Source",
    },
    defaultSize: { width: 180, height: 100 },
    ports: [
      {
        id: "output",
        type: "output" as const,
        label: "Data",
        position: "right" as const,
        dataType: "data",
        renderPort: customPortRenderer,
        renderConnection: customConnectionRenderer,
      },
    ],
  })
);

const imageProcessorNode = toUntypedDefinition(
  createNodeDefinition({
    type: "image-processor",
    displayName: "Image Processor",
    description: "Processes image data",
    category: "Custom",
    defaultData: {
      title: "Image Processor",
    },
    defaultSize: { width: 200, height: 120 },
    ports: [
      {
        id: "input-image",
        type: "input" as const,
        label: "Image In",
        position: "left" as const,
        dataType: "image",
        renderPort: customPortRenderer,
        renderConnection: customConnectionRenderer,
      },
      {
        id: "output-image",
        type: "output" as const,
        label: "Image Out",
        position: "right" as const,
        dataType: "image",
        renderPort: customPortRenderer,
        renderConnection: customConnectionRenderer,
      },
      {
        id: "output-data",
        type: "output" as const,
        label: "Metadata",
        position: "right" as const,
        dataType: "data",
        renderPort: customPortRenderer,
        renderConnection: customConnectionRenderer,
      },
    ],
  })
);

const audioProcessorNode = toUntypedDefinition(
  createNodeDefinition({
    type: "audio-processor",
    displayName: "Audio Processor",
    description: "Processes audio data",
    category: "Custom",
    defaultData: {
      title: "Audio Processor",
    },
    defaultSize: { width: 200, height: 120 },
    ports: [
      {
        id: "input-audio",
        type: "input" as const,
        label: "Audio In",
        position: "left" as const,
        dataType: "audio",
        renderPort: customPortRenderer,
        renderConnection: customConnectionRenderer,
      },
      {
        id: "output-audio",
        type: "output" as const,
        label: "Audio Out",
        position: "right" as const,
        dataType: "audio",
        renderPort: customPortRenderer,
        renderConnection: customConnectionRenderer,
      },
    ],
  })
);

const videoProcessorNode = toUntypedDefinition(
  createNodeDefinition({
    type: "video-processor",
    displayName: "Video Processor",
    description: "Processes video data",
    category: "Custom",
    defaultData: {
      title: "Video Processor",
    },
    defaultSize: { width: 200, height: 120 },
    ports: [
      {
        id: "input-video",
        type: "input" as const,
        label: "Video In",
        position: "left" as const,
        dataType: "video",
        renderPort: customPortRenderer,
        renderConnection: customConnectionRenderer,
      },
      {
        id: "output-video",
        type: "output" as const,
        label: "Video Out",
        position: "right" as const,
        dataType: "video",
        renderPort: customPortRenderer,
        renderConnection: customConnectionRenderer,
      },
    ],
  })
);

// Sample data - arranged to demonstrate different data type connections
const initialData: NodeEditorData = {
  nodes: {
    // Data sources (left side)
    "node-data-1": {
      id: "node-data-1",
      type: "data-source",
      position: { x: 80, y: 100 },
      data: { title: "Data Source 1" },
    },
    "node-data-2": {
      id: "node-data-2",
      type: "data-source",
      position: { x: 80, y: 250 },
      data: { title: "Data Source 2" },
    },

    // Processors (middle)
    "node-image-1": {
      id: "node-image-1",
      type: "image-processor",
      position: { x: 380, y: 50 },
      data: { title: "Image Processor" },
    },
    "node-audio-1": {
      id: "node-audio-1",
      type: "audio-processor",
      position: { x: 380, y: 220 },
      data: { title: "Audio Processor" },
    },
    "node-video-1": {
      id: "node-video-1",
      type: "video-processor",
      position: { x: 380, y: 380 },
      data: { title: "Video Processor" },
    },

    // More processors (right side)
    "node-image-2": {
      id: "node-image-2",
      type: "image-processor",
      position: { x: 700, y: 100 },
      data: { title: "Image Output" },
    },
    "node-audio-2": {
      id: "node-audio-2",
      type: "audio-processor",
      position: { x: 700, y: 280 },
      data: { title: "Audio Output" },
    },
  },
  connections: {
    // Image connection (blue)
    "conn-image-1": {
      id: "conn-image-1",
      fromNodeId: "node-image-1",
      fromPortId: "output-image",
      toNodeId: "node-image-2",
      toPortId: "input-image",
    },
    // Audio connection (orange)
    "conn-audio-1": {
      id: "conn-audio-1",
      fromNodeId: "node-audio-1",
      fromPortId: "output-audio",
      toNodeId: "node-audio-2",
      toPortId: "input-audio",
    },
    // Data connection (green)
    "conn-data-1": {
      id: "conn-data-1",
      fromNodeId: "node-data-1",
      fromPortId: "output",
      toNodeId: "node-image-1",
      toPortId: "input-image",
    },
  },
};

const CustomPortRendererCatalog: React.FC = () => {
  const [data, setData] = useState<NodeEditorData>(initialData);

  const handleReset = () => {
    setData(initialData);
  };

  return (
    <PageLayout>
      <PageHeader
        title="Custom Port Renderer"
        lead="PortDefinition に renderPort と renderConnection を実装することで、ポートと接続線の見た目を完全にカスタマイズできます。"
        helperText="この例では、データタイプ（data, image, audio, video）に応じてポートの色とサイズを変更し、接続線にも同じ色を適用しています。"
      />

      <Main>
        <Section>
          <SectionIntro>
            <H2>デモ</H2>
            <P>
              各ポートは dataType に基づいて色分けされています。ホバー時にはサイズが大きくなり、接続されると境界線の色が変わります。
            </P>
          </SectionIntro>

          <ExampleGrid>
            <ExampleCard>
              <ExampleHeader
                title="カスタムポートレンダラーのデモ"
                description="データタイプ別に色分けされたポートを試してください。緑（data）、青（image）、オレンジ（audio）、紫（video）の4種類があります。ノードを接続して、ポートと接続線の色が変化することを確認してください。"
              />
              <SingleColumnContent>
                <div className={styles.scenarioPreview}>
                  <div className={styles.scenarioControls}>
                    <Button variant="secondary" onClick={handleReset}>
                      初期状態に戻す
                    </Button>
                  </div>
                  <EditorSurface>
                    <NodeEditor
                      data={data}
                      onDataChange={setData}
                      nodeDefinitions={[dataSourceNode, imageProcessorNode, audioProcessorNode, videoProcessorNode]}
                    />
                  </EditorSurface>
                </div>
              </SingleColumnContent>
            </ExampleCard>
          </ExampleGrid>
        </Section>

        <Section>
          <SectionIntro>
            <H2>実装方法</H2>
            <P>
              PortDefinition に <Code>renderPort</Code> と <Code>renderConnection</Code>{" "}
              関数を追加することで、完全なカスタマイズが可能になります。
            </P>
          </SectionIntro>

          <ExampleGrid>
            <ExampleCard>
              <ExampleHeader
                title="1. カスタムポートレンダラーの実装"
                description="renderPort 関数は、ポートの状態（isConnected, isHovered など）を含む context とデフォルトレンダラーを受け取ります。"
              />
              <SingleColumnContent>
                <Pre>
                  {`const customPortRenderer = (context, defaultRender) => {
  const { port, isConnected, isHovered, position, handlers } = context;

  const colorMap = {
    data: "#4CAF50",
    image: "#2196F3",
    audio: "#FF9800",
    video: "#9C27B0",
  };

  const color = colorMap[port.dataType] || "#999";
  const size = isHovered ? 14 : isConnected ? 12 : 10;

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        transform: position.transform,
        width: \`\${size}px\`,
        height: \`\${size}px\`,
        borderRadius: "50%",
        backgroundColor: color,
        border: \`2px solid \${isConnected ? color : "#fff"}\`,
        boxShadow: isHovered ? \`0 0 8px \${color}\` : "none",
        transition: "all 0.2s",
        cursor: "crosshair",
        pointerEvents: "all", // 重要: ドラッグ操作に必要
        zIndex: 10,
      }}
      onPointerDown={handlers.onPointerDown}
      onPointerUp={handlers.onPointerUp}
      onPointerEnter={handlers.onPointerEnter}
      onPointerLeave={handlers.onPointerLeave}
      data-port-id={port.id}
      data-port-type={port.type}
      data-node-id={port.nodeId}
    />
  );
};`}
                </Pre>
              </SingleColumnContent>
            </ExampleCard>

            <ExampleCard>
              <ExampleHeader
                title="2. カスタム接続線レンダラーの実装"
                description="renderConnection 関数は、接続の状態とデフォルトレンダラーを受け取ります。デフォルトをラップすることも、完全に置き換えることも可能です。"
              />
              <SingleColumnContent>
                <Pre>
                  {`const customConnectionRenderer = (context, defaultRender) => {
  const {
    fromPort,
    fromPosition,
    toPosition,
    isSelected,
    isHovered,
  } = context;

  const colorMap = {
    data: "#4CAF50",
    image: "#2196F3",
    audio: "#FF9800",
    video: "#9C27B0",
  };

  const color = colorMap[fromPort.dataType] || "#999";
  const distance = Math.hypot(
    toPosition.x - fromPosition.x,
    toPosition.y - fromPosition.y,
  ) || 1;
  const glowStrength = Math.min(distance / 120, 1);

  return (
    <g style={{
      filter: isSelected || isHovered
        ? \`drop-shadow(0 0 \${4 + glowStrength * 4}px \${color})\`
        : "none",
    }}>
      {defaultRender()}
      <circle
        cx={toPosition.x}
        cy={toPosition.y}
        r={4 + glowStrength * 4}
        fill={color}
        fillOpacity={0.2}
        stroke={color}
      />
    </g>
  );
};`}
                </Pre>
              </SingleColumnContent>
            </ExampleCard>

            <ExampleCard>
              <ExampleHeader
                title="3. PortDefinition への適用"
                description="作成したレンダラーを PortDefinition の ports 配列に追加します。"
              />
              <SingleColumnContent>
                <Pre>
                  {`const nodeDefinition = createNodeDefinition({
  type: "image-processor",
  displayName: "Image Processor",
  ports: [
    {
      id: "input-image",
      type: "input",
      label: "Image In",
      position: "left",
      dataType: "image",
      renderPort: customPortRenderer,
      renderConnection: customConnectionRenderer,
    },
  ],
});`}
                </Pre>
              </SingleColumnContent>
            </ExampleCard>
          </ExampleGrid>
        </Section>

        <Section>
          <SectionIntro>
            <H2>利用可能なコンテキスト</H2>
            <P>renderPort と renderConnection 関数は、以下の情報を含むコンテキストを受け取ります。</P>
          </SectionIntro>

          <ExampleGrid>
            <ExampleCard>
              <ExampleHeader
                title="PortRenderContext"
                description="ポートレンダラーに渡されるコンテキスト"
              />
              <SingleColumnContent>
                <Pre>
                  {`interface PortRenderContext {
  port: Port;                    // ポート情報
  node: Node;                    // 親ノード
  allNodes: Record<string, Node>; // 全ノード
  allConnections: Record<string, Connection>; // 全接続
  isConnecting: boolean;         // 接続中かどうか
  isConnectable: boolean;        // 接続可能かどうか
  isCandidate: boolean;          // 接続候補かどうか
  isHovered: boolean;            // ホバー中かどうか
  isConnected: boolean;          // 接続されているかどうか
  position?: {                   // ポート位置情報
    x: number;
    y: number;
    transform?: string;
  };
  handlers: {                    // イベントハンドラー
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerUp: (e: React.PointerEvent) => void;
    onPointerEnter: (e: React.PointerEvent) => void;
    onPointerLeave: (e: React.PointerEvent) => void;
  };
}`}
                </Pre>
              </SingleColumnContent>
            </ExampleCard>

            <ExampleCard>
              <ExampleHeader
                title="ConnectionRenderContext"
                description="接続線レンダラーに渡されるコンテキスト"
              />
              <SingleColumnContent>
                <Pre>
                  {`interface ConnectionRenderContext {
  connection: Connection;        // 接続情報
  fromPort: Port;                // 開始ポート
  toPort: Port;                  // 終了ポート
  fromNode: Node;                // 開始ノード
  toNode: Node;                  // 終了ノード
  fromPosition: { x: number; y: number }; // 開始ポート位置
  toPosition: { x: number; y: number };   // 終了ポート位置
  isSelected: boolean;           // 選択中かどうか
  isHovered: boolean;            // ホバー中かどうか
  isAdjacentToSelectedNode: boolean; // 選択ノードに隣接しているか
  isDragging?: boolean;          // ドラッグ中かどうか
  dragProgress?: number;         // ドラッグ進捗 (0-1)
}`}
                </Pre>
              </SingleColumnContent>
            </ExampleCard>
          </ExampleGrid>
        </Section>

        <Section>
          <SectionIntro>
            <H2>カスタマイズの例</H2>
            <P>renderPort と renderConnection を使って実現できるカスタマイズの例です。</P>
          </SectionIntro>

          <TestGrid>
            <TestCard>
              <TestCardHeader title="データタイプ別の色分け" />
              <TestCardBody>
                ポートの dataType プロパティに基づいて、ポートと接続線の色を変更できます（この例で実装）。
              </TestCardBody>
            </TestCard>
            <TestCard>
              <TestCardHeader title="状態に応じた表示変更" />
              <TestCardBody>
                isConnected、isHovered などの状態フラグを使って、ポートのサイズや外観を動的に変更できます。
              </TestCardBody>
            </TestCard>
            <TestCard>
              <TestCardHeader title="カスタムアイコン" />
              <TestCardBody>
                ポートに SVG アイコンやテキストを表示したり、ポートの形状を変更（四角、ダイヤモンド、三角など）できます。
              </TestCardBody>
            </TestCard>
            <TestCard>
              <TestCardHeader title="接続線のスタイリング" />
              <TestCardBody>
                点線、破線、アニメーション、グラデーション、矢印の形状など、接続線の見た目を完全にカスタマイズできます。
              </TestCardBody>
            </TestCard>
            <TestCard>
              <TestCardHeader title="コンテキストベースの制御" />
              <TestCardBody>
                全ノード・接続情報にアクセスできるため、ノード間の距離や接続数に応じた表示制御が可能です。
              </TestCardBody>
            </TestCard>
            <TestCard>
              <TestCardHeader title="デフォルトとの組み合わせ" />
              <TestCardBody>
                defaultRender() を呼び出すことで、デフォルトのレンダリングをラップしたり、条件に応じて切り替えたりできます。
              </TestCardBody>
            </TestCard>
          </TestGrid>
        </Section>

        <Section>
          <SectionIntro>
            <H2>重要な注意事項</H2>
            <P>カスタムポートレンダラーを実装する際は、以下の点に注意してください。</P>
          </SectionIntro>

          <TestGrid>
            <TestCard>
              <TestCardHeader title="pointer-events: all" />
              <TestCardBody>
                ポートのドラッグ操作を可能にするため、<Code>pointerEvents: "all"</Code> を必ず設定してください。これがないと、接続線を引くことができません。
              </TestCardBody>
            </TestCard>
            <TestCard>
              <TestCardHeader title="data-* 属性" />
              <TestCardBody>
                <Code>data-port-id</Code>, <Code>data-port-type</Code>, <Code>data-node-id</Code> の3つの属性は必須です。これらはポートの識別とインタラクションに使用されます。
              </TestCardBody>
            </TestCard>
            <TestCard>
              <TestCardHeader title="イベントハンドラー" />
              <TestCardBody>
                context.handlers から取得したイベントハンドラーをすべて設定してください。これらは接続の作成、ホバー状態の管理などに必要です。
              </TestCardBody>
            </TestCard>
            <TestCard>
              <TestCardHeader title="position 情報" />
              <TestCardBody>
                context.position を使用して、ポートを正しい位置に配置してください。transform プロパティも適用することを忘れないでください。
              </TestCardBody>
            </TestCard>
            <TestCard>
              <TestCardHeader title="z-index とカーソル" />
              <TestCardBody>
                ポートが他の要素の上に表示されるよう <Code>zIndex: 10</Code> を設定し、カーソルは <Code>cursor: "crosshair"</Code> が推奨です。
              </TestCardBody>
            </TestCard>
            <TestCard>
              <TestCardHeader title="position: absolute" />
              <TestCardBody>
                ポートは絶対配置（<Code>position: "absolute"</Code>）である必要があります。context.position の値を left, top に設定してください。
              </TestCardBody>
            </TestCard>
          </TestGrid>
        </Section>
      </Main>
    </PageLayout>
  );
};

export default CustomPortRendererCatalog;
