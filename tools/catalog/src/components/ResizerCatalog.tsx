import React from "react";
import {
  Article,
  Main,
  Section,
  H2,
  H3,
  P,
  Small,
  Pre,
  Code,
  Resizer,
} from "tanuki-ui";
import styles from "./ResizerCatalog.module.css";
import CatalogPageHeader from "./CatalogPageHeader";

const panelCode = `<div style={{ position: 'relative', width, height }}>
  <Resizer originX={1} originY={1} onResize={handleResize} />
</div>`;

const splitCode = `<aside style={{ position: 'relative', width: sidebarWidth }}>
  <Resizer
    originX={0}
    originY={1}
    onResize={({ width }) => {
      setSidebarWidth((prev) => clamp(prev + width, 200, 420));
    }}
  />
</aside>`;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const ResizerCatalog: React.FC = () => {
  const [panelSize, setPanelSize] = React.useState({ width: 320, height: 220 });
  const [sidebarWidth, setSidebarWidth] = React.useState(260);

  const handlePanelResize = React.useCallback((payload: { width: number; height: number }) => {
    setPanelSize((prev) => {
      const width = clamp(prev.width + payload.width, 240, 520);
      const height = clamp(prev.height + payload.height, 160, 420);
      return { width, height };
    });
  }, []);

  const handleSidebarResize = React.useCallback((payload: { width: number }) => {
    setSidebarWidth((prev) => clamp(prev + payload.width, 200, 420));
  }, []);

  return (
    <Article className={styles.page}>
      <CatalogPageHeader
        title="Resizer Catalog"
        lead="Resizer はエッジやコーナーのドラッグで領域サイズを調整する低レベルコンポーネントです。カードの拡縮やレイアウト分割など、実用的なシナリオを確認しましょう。"
        helperText="onResize から取得できる delta を元に幅・高さを自由に更新できます。"
      />

      <Main className={styles.main}>
        <Section className={styles.section}>
          <div className={styles.sectionIntro}>
            <H2>コーナーでカードをリサイズ</H2>
            <P>
              コーナーハンドルを 1 つ設置してカード全体を拡大・縮小します。`originX` / `originY` を 1 に指定すると右下に
              ハンドルが配置されます。
            </P>
          </div>

          <div className={styles.exampleGrid}>
            <div className={styles.exampleCard}>
              <div className={styles.exampleHeader}>
                <H3 className={styles.exampleTitle}>右下のハンドル</H3>
                <P className={styles.exampleDescription}>ドラッグでカードの幅と高さを同時に調整します。</P>
              </div>
              <div className={styles.exampleContent}>
                <div
                  className={styles.resizableCard}
                  style={{ width: `${panelSize.width}px`, height: `${panelSize.height}px` }}
                >
                  <Resizer
                    originX={1}
                    originY={1}
                    onResize={({ width, height }) => handlePanelResize({ width, height })}
                  />
                  <div className={styles.cornerHandle} aria-hidden />
                  <P>
                    レスポンシブなカード。リサイズすると内部レイアウトも再計算される想定で、テキストは折り返されます。
                  </P>
                  <Small className={styles.sizeInfo}>
                    現在のサイズ: {Math.round(panelSize.width)}px × {Math.round(panelSize.height)}px
                  </Small>
                </div>
                <Pre className={styles.codeBlock}>
                  <Code>{panelCode}</Code>
                </Pre>
              </div>
            </div>
          </div>
        </Section>

        <Section className={styles.section}>
          <div className={styles.sectionIntro}>
            <H2>分割レイアウトのリサイズ</H2>
            <P>
              サイドバーの右端にハンドルを設置して、左右レイアウトをドラッグで調整します。`originX=0` / `originY=1` で
              垂直センターにハンドルが配置されます。
            </P>
          </div>

          <div className={styles.exampleCard}>
            <div className={styles.exampleHeader}>
              <H3 className={styles.exampleTitle}>固定ヘッダー付きのワークスペース</H3>
              <P className={styles.exampleDescription}>
                サイドバー幅をドラッグで調整し、残り領域にプレビューを表示する典型的な UI です。
              </P>
            </div>
            <div className={styles.exampleContent}>
              <div className={styles.splitLayout} style={{ gridTemplateColumns: `${sidebarWidth}px 1fr` }}>
                <aside className={styles.sidebar} style={{ width: `${sidebarWidth}px` }}>
                  <Resizer originX={0} originY={1} onResize={({ width }) => handleSidebarResize({ width })} />
                  <div className={styles.splitIndicator} aria-hidden />
                  <Small className={styles.helperText}>幅: {Math.round(sidebarWidth)}px</Small>
                  <P>
                    プロジェクト、フィルター、その他ツールを配置するサイドバー領域です。幅は 200〜420px の範囲で調整できます。
                  </P>
                </aside>
                <div className={styles.content}>
                  <H3>プレビュー</H3>
                  <P>
                    メインコンテンツは残りのスペースを占有します。ハンドルを動かすと即座に再レイアウトされ、フルサイズ表示を
                    維持できます。
                  </P>
                </div>
              </div>
              <Pre className={styles.codeBlock}>
                <Code>{splitCode}</Code>
              </Pre>
            </div>
          </div>
        </Section>
      </Main>
    </Article>
  );
};

export default ResizerCatalog;
