import React from "react";
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
  Pre,
  Code,
  SegmentedControl,
  Button,
} from "tanuki-ui";
import styles from "./SegmentedControlCatalog.module.css";

const basicCode = `<SegmentedControl
  items={["バックログ", "進行中", "完了"]}
  onSelect={(index) => {
    setSelected(index);
  }}
/>`;

const iconCode = `<SegmentedControl
  items={[
    <span key="list">リスト表示</span>,
    <span key="board">ボード表示</span>,
    <span key="calendar">カレンダー表示</span>,
  ]}
  onSelect={setView}
/>`;

const controlledCode = `<SegmentedControl
  controlled
  selectedIndex={selectedIndex}
  onSelect={setSelectedIndex}
/>`;

const SegmentedControlCatalog: React.FC = () => {
  const [basicIndex, setBasicIndex] = React.useState(0);
  const [iconIndex, setIconIndex] = React.useState(0);
  const [controlledIndex, setControlledIndex] = React.useState(1);

  const iconSegments = React.useMemo(
    () => [
      <span key="list">リスト表示</span>,
      <span key="board">ボード表示</span>,
      <span key="calendar">カレンダー表示</span>,
    ],
    [],
  );

  const filters = ["全て", "アクティブ", "アーカイブ"];

  return (
    <Article className={styles.page}>
      <Header className={styles.header}>
        <H1>Segmented Control Catalog</H1>
        <P className={styles.lead}>
          複数のビューやフィルターをスムーズに切り替えるための SegmentedControl コンポーネントを、
          状況に応じたパターンと合わせて紹介します。
        </P>
        <Small className={styles.helperText}>
          SegmentedControl は選択状態やドラッグ操作を制御できる柔軟なトグル UI です。
        </Small>
      </Header>

      <Main className={styles.main}>
        <Section className={styles.section}>
          <div className={styles.sectionIntro}>
            <H2>基本的な切り替え</H2>
            <P>
              3つ前後の選択肢をシンプルに並べるケースです。`onSelect` 経由で選択されたインデックスを受け取り、
              ドキュメントステータスなどの切り替えに利用します。
            </P>
          </div>

          <div className={styles.exampleGrid}>
            <div className={styles.exampleCard}>
              <H3>ステータス切り替え</H3>
              <P>バックログ &gt; 進行中 &gt; 完了の 3状態を切り替える基本形です。</P>
              <div className={styles.surface}>
                <SegmentedControl
                  items={["バックログ", "進行中", "完了"]}
                  selectedIndex={basicIndex}
                  onSelect={setBasicIndex}
                />
                <Small className={styles.snapshot}>現在の状態: {basicIndex === 0 ? "バックログ" : basicIndex === 1 ? "進行中" : "完了"}</Small>
              </div>
              <Pre className={styles.codeBlock}>
                <Code>{basicCode}</Code>
              </Pre>
            </div>

            <div className={styles.exampleCard}>
              <H3>複合ラベルのセグメント</H3>
              <P>`items` には ReactNode を渡せるので、スタイル付きテキストでの切り替えも可能です。</P>
              <div className={styles.surface}>
                <SegmentedControl items={iconSegments} selectedIndex={iconIndex} onSelect={setIconIndex} />
                <Small className={styles.snapshot}>
                  表示モード: {iconIndex === 0 ? "リスト表示" : iconIndex === 1 ? "ボード表示" : "カレンダー表示"}
                </Small>
              </div>
              <Pre className={styles.codeBlock}>
                <Code>{iconCode}</Code>
              </Pre>
            </div>
          </div>
        </Section>

        <Section className={styles.section}>
          <div className={styles.sectionIntro}>
            <H2>制御されたセグメント</H2>
            <P>
              `controlled` プロパティを使用すると外部状態で選択値を管理できます。フォームのフィルターと連動させるなど、
              より高度なシナリオに対応します。
            </P>
          </div>

          <div className={styles.exampleCard}>
            <H3>フィルターと連携</H3>
            <P>外部のアクションから選択状態を更新できる制御モードの例です。</P>
            <div className={styles.surface}>
              <SegmentedControl
                items={filters}
                controlled
                selectedIndex={controlledIndex}
                onSelect={setControlledIndex}
              />
              <div className={styles.inlineControls}>
                {filters.map((label, index) => (
                  <Button
                    key={label}
                    variant={index === controlledIndex ? "primary" : "secondary"}
                    onClick={() => setControlledIndex(index)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
              <Small className={styles.snapshot}>選択中: {filters[controlledIndex]}</Small>
            </div>
            <Pre className={styles.codeBlock}>
              <Code>{controlledCode}</Code>
            </Pre>
          </div>
        </Section>
      </Main>
    </Article>
  );
};

export default SegmentedControlCatalog;
