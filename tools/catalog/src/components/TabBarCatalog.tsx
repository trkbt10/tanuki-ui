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
  TabBar,
  Button,
} from "tanuki-ui";
import styles from "./TabBarCatalog.module.css";

const deviceCode = `<TabBar
  items={[
    { key: 'home', value: 'ホーム', icon: '🏠' },
    { key: 'tasks', value: 'タスク', icon: '✅' },
    { key: 'calendar', value: '予定', icon: '📅' },
    { key: 'settings', value: '設定', icon: '⚙️' },
  ]}
  onSelect={(item) => setActive(item.key)}
/>`;

const compactCode = `<TabBar
  items={views}
  defaultSelected={1}
  onSelect={(_, index) => setSelected(index)}
/>`;

const TabBarCatalog: React.FC = () => {
  const navItems = React.useMemo(
    () => [
      { key: "home", value: "ホーム" },
      { key: "tasks", value: "タスク" },
      { key: "calendar", value: "予定" },
      { key: "settings", value: "設定" },
    ],
    [],
  );
  const [activeNav, setActiveNav] = React.useState(navItems[0].key);

  const compactItems = React.useMemo(
    () => [
      { key: "overview", value: "概要" },
      { key: "activity", value: "アクティビティ" },
      { key: "files", value: "ファイル" },
    ],
    [],
  );
  const [compactIndex, setCompactIndex] = React.useState(1);
  const [barSeed, setBarSeed] = React.useState(0);

  const updateCompactIndex = React.useCallback((index: number) => {
    setCompactIndex(index);
    setBarSeed((seed) => seed + 1);
  }, []);

  return (
    <Article className={styles.page}>
      <Header className={styles.header}>
        <H1>TabBar Catalog</H1>
        <P className={styles.lead}>
          TabBar はモバイル UI での主要なナビゲーション手段です。画面下部の固定バーや補助的なセカンダリバーなど、
          よく使うパターンを整理しました。
        </P>
        <Small className={styles.helperText}>items の順序と onSelect の組み合わせで、シンプルな切り替えを実現します。</Small>
      </Header>

      <Main className={styles.main}>
        <Section className={styles.section}>
          <div className={styles.sectionIntro}>
            <H2>モバイルフッターの基本形</H2>
            <P>
              4〜5 項目のトップレベルナビゲーションを配置する最も一般的なスタイル。選択されたタブは内部状態で管理され、
              onSelect からキーやインデックスを取得できます。
            </P>
          </div>

          <div className={styles.exampleGrid}>
            <div className={styles.exampleCard}>
              <H3>アプリケーションのホームタブ</H3>
              <P>デバイスフレーム風のモックで、下部に TabBar を固定した状態を再現します。</P>
              <div className={styles.deviceFrame}>
                <div className={styles.viewport}>
                  <H3>タスク一覧</H3>
                  <P>
                    選択中のタブに応じて表示内容を切り替えます。現在は
                    <strong> {activeNav.toUpperCase()} </strong>
                    タブを開いています。
                  </P>
                  <Small className={styles.activeSummary}>
                    アクティブタブ: {navItems.find((item) => item.key === activeNav)?.value}
                  </Small>
                </div>
                <TabBar
                  items={navItems}
                  defaultSelected={0}
                  onSelect={(item) => setActiveNav(item.key)}
                />
              </div>
              <Pre className={styles.codeBlock}>
                <Code>{deviceCode}</Code>
              </Pre>
            </div>
          </div>
        </Section>

        <Section className={styles.section}>
          <div className={styles.sectionIntro}>
            <H2>セカンダリナビゲーション</H2>
            <P>
              メインビュー内で表示を切り替えるライトウェイトなタブバー。ボタンなど他の操作と組み合わせて簡単なビュー切り替えを
              実装できます。
            </P>
          </div>

          <div className={styles.exampleCard}>
            <H3>プロジェクト詳細の切り替え</H3>
            <div className={styles.compactBar}>
              <TabBar
                key={barSeed}
                items={compactItems}
                defaultSelected={compactIndex}
                onSelect={(_, index) => updateCompactIndex(index)}
              />
              <div className={styles.inlineControls}>
                {compactItems.map((item, index) => (
                  <Button
                    key={item.key}
                    variant={index === compactIndex ? "primary" : "secondary"}
                    onClick={() => updateCompactIndex(index)}
                  >
                    {item.value}
                  </Button>
                ))}
              </div>
              <Small className={styles.helperText}>
                選択中: {compactItems[compactIndex].value} / キー: {compactItems[compactIndex].key}
              </Small>
            </div>
            <Pre className={styles.codeBlock}>
              <Code>{compactCode}</Code>
            </Pre>
          </div>
        </Section>
      </Main>
    </Article>
  );
};

export default TabBarCatalog;
