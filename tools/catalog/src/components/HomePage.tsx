import React from "react";
import { Link } from "react-router";
import { components } from "../catalog/components";
import { H1, H2, H3, P, Section, Article, Nav, Header, Main, Div } from "tanuki-ui";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  const totalComponents = Object.values(components).reduce((sum, category) => sum + category.components.length, 0);

  // カテゴリをグリッド表示用に整理
  const categoryEntries = Object.entries(components);

  return (
    <Article className={styles.container}>
      <Header className={styles.heroSection}>
        <H1 className={styles.heroTitle}>🦝 Tanuki UI</H1>
        <P className={styles.heroSubtitle}>
          HTMLの基本要素をそのまま使える React UI ライブラリ
        </P>
        <Section className={styles.statsGrid}>
          <div className={styles.statItem}>
            <H3 className={`${styles.statNumber} ${styles.statNumberPrimary}`}>
              {Object.keys(components).length}
            </H3>
            <P className={styles.statLabel}>カテゴリ</P>
          </div>
          <div className={styles.statItem}>
            <H3 className={`${styles.statNumber} ${styles.statNumberSuccess}`}>
              {totalComponents}+
            </H3>
            <P className={styles.statLabel}>コンポーネント</P>
          </div>
          <div className={styles.statItem}>
            <H3 className={`${styles.statNumber} ${styles.statNumberWarning}`}>11</H3>
            <P className={styles.statLabel}>テーマ</P>
          </div>
        </Section>
      </Header>

      <Main>
        <Section className={styles.section}>
          <H2 className={styles.sectionTitle}>🌟 特殊ページ</H2>
          <div className={styles.grid}>
            <Div className={styles.card}>
              <H3 className={styles.formLinkTitle}>
                <Link to="/form-catalog" className={styles.formLink}>
                  📝 Form Elements Catalog
                </Link>
              </H3>
              <P className={styles.formDescription}>
                フォーム要素を実際に動作する統合フォームで体験できる特殊ページです。
              </P>
              <P className={styles.formSubDescription}>
                全てのフォームコンポーネントの動作確認とベストプラクティスを学べます。
              </P>
            </Div>
          </div>
        </Section>

        <Section className={styles.section}>
          <H2 className={styles.sectionTitle}>📚 コンポーネントカテゴリ</H2>
          <div className={styles.categoryGrid}>
            {categoryEntries.map(([categoryKey, category]) => (
              <Div key={categoryKey} className={styles.card}>
                <header className={styles.cardHeader}>
                  <H3 className={styles.cardTitle}>
                    {category.icon} {category.name}
                  </H3>
                  <div className={styles.badge}>
                    {category.components.length} 個
                  </div>
                </header>

                <P className={styles.cardDescription}>
                  {category.description}
                </P>

                <Nav className={styles.componentTags}>
                  {category.components.slice(0, 6).map((component) => (
                    <Link
                      key={component.name}
                      to={`/component/${categoryKey}/${component.name}`}
                      className={styles.tag}
                    >
                      {component.name}
                    </Link>
                  ))}
                  {category.components.length > 6 && (
                    <span className={styles.moreCount}>
                      +{category.components.length - 6} more
                    </span>
                  )}
                </Nav>
              </Div>
            ))}
          </div>
        </Section>

        <Section>
          <H2 className={styles.sectionTitle}>🚀 はじめ方</H2>
          <Div className={styles.card}>
            <pre className={styles.codeBlock}>
              {`# インストール
npm install tanuki-ui

# 使用例
import { H1, P, Button } from 'tanuki-ui';
import 'tanuki-ui/style.css';

function App() {
  return (
    <>
      <H1>Hello, Tanuki UI!</H1>
      <P>HTMLの基本要素がそのまま使えます</P>
      <Button>クリック</Button>
    </>
  );
}`}
            </pre>
          </Div>
        </Section>
      </Main>
    </Article>
  );
};

export default HomePage;
