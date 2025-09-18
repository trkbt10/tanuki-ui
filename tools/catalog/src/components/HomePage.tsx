import React from "react";
import { Link } from "react-router";
import { components } from "../catalog/components";
import { H1, H2, H3, P, Section, Article, Nav, Header, Main, Card, Pre, Code, Small } from "tanuki-ui";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  const totalComponents = Object.values(components).reduce((sum, category) => sum + category.components.length, 0);

  // カテゴリをグリッド表示用に整理
  const categoryEntries = Object.entries(components);
  const htmlCategories = categoryEntries.filter(([, info]) => info.group === "html");
  const customCategories = categoryEntries.filter(([, info]) => info.group === "custom");

  const renderCategoryCards = (entries: typeof categoryEntries) => (
    <div className={styles.categoryGrid}>
      {entries.map(([categoryKey, category]) => (
        <Card key={categoryKey} className={styles.card}>
          <header className={styles.cardHeader}>
            <H3 className={styles.cardTitle}>{category.name}</H3>
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
              <Small className={styles.moreCount}>
                +{category.components.length - 6} more
              </Small>
            )}
          </Nav>
        </Card>
      ))}
    </div>
  );

  return (
    <Article className={styles.container}>
      <Header className={styles.heroSection}>
        <H1 className={styles.heroTitle}>Tanuki UI Catalog</H1>
        <P className={styles.heroSubtitle}>
          HTMLの基本要素をそのまま使える React UI ライブラリのダイジェスト
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
          <H2 className={styles.sectionTitle}>特殊ページ</H2>
          <div className={styles.grid}>
            <Card className={styles.card}>
              <H3 className={styles.formLinkTitle}>
                <Link to="/form-catalog" className={styles.formLink}>
                  Form Elements Catalog
                </Link>
              </H3>
              <P className={styles.formDescription}>
                フォーム要素を実際に動作する統合フォームで体験できる特殊ページです。
              </P>
              <P className={styles.formSubDescription}>
                全てのフォームコンポーネントの動作確認とベストプラクティスを学べます。
              </P>
            </Card>
          </div>
        </Section>

        <Section className={styles.section}>
          <H2 className={styles.sectionTitle}>HTML ベースコンポーネント</H2>
          {renderCategoryCards(htmlCategories)}
        </Section>

        <Section className={styles.section}>
          <H2 className={styles.sectionTitle}>拡張コンポーネント</H2>
          {renderCategoryCards(customCategories)}
        </Section>

        <Section>
          <H2 className={styles.sectionTitle}>はじめ方</H2>
          <Card className={styles.card}>
            <Pre className={styles.codeBlock}>
              <Code>
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
              </Code>
            </Pre>
          </Card>
        </Section>
      </Main>
    </Article>
  );
};

export default HomePage;
