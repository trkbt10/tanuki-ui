import React from "react";
import { Link } from "react-router";
import { components } from "../catalog/components";
import { H1, H2, H3, P, Section, Article, Nav, Header, Main, Card } from "tanuki-ui";

const HomePage: React.FC = () => {
  const totalComponents = Object.values(components).reduce((sum, category) => sum + category.components.length, 0);

  // カテゴリをグリッド表示用に整理
  const categoryEntries = Object.entries(components);

  return (
    <Article>
      {/* ヘロセクション */}
      <Header
        style={{
          padding: "48px 0",
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(0,123,255,0.1), rgba(102,51,153,0.1))",
          borderRadius: "12px",
          marginBottom: "32px",
        }}
      >
        <H1 style={{ fontSize: "3rem", marginBottom: "16px" }}>🦝 Tanuki UI</H1>
        <P style={{ fontSize: "1.25rem", color: "#666", marginBottom: "24px" }}>
          HTMLの基本要素をそのまま使える React UI ライブラリ
        </P>
        <Section
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            flexWrap: "wrap",
            marginTop: "24px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <H3 style={{ margin: 0, color: "#007bff" }}>{Object.keys(components).length}</H3>
            <P style={{ margin: 0, fontSize: "0.9rem" }}>カテゴリ</P>
          </div>
          <div style={{ textAlign: "center" }}>
            <H3 style={{ margin: 0, color: "#28a745" }}>{totalComponents}+</H3>
            <P style={{ margin: 0, fontSize: "0.9rem" }}>コンポーネント</P>
          </div>
          <div style={{ textAlign: "center" }}>
            <H3 style={{ margin: 0, color: "#fd7e14" }}>11</H3>
            <P style={{ margin: 0, fontSize: "0.9rem" }}>テーマ</P>
          </div>
        </Section>
      </Header>

      <Main>
        {/* 特殊ページセクション */}
        <Section style={{ marginBottom: "48px" }}>
          <H2 style={{ marginBottom: "24px" }}>🌟 特殊ページ</H2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            <Card>
              <H3 style={{ margin: "0 0 12px 0" }}>
                <Link
                  to="/form-catalog"
                  style={{
                    textDecoration: "none",
                    color: "#007bff",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  📝 Form Elements Catalog
                </Link>
              </H3>
              <P style={{ margin: "0 0 12px 0" }}>フォーム要素を実際に動作する統合フォームで体験できる特殊ページです。</P>
              <P style={{ margin: 0, fontSize: "0.9rem", color: "#666" }}>
                全てのフォームコンポーネントの動作確認とベストプラクティスを学べます。
              </P>
            </Card>
          </div>
        </Section>

        {/* カテゴリ一覧セクション */}
        <Section style={{ marginBottom: "48px" }}>
          <H2 style={{ marginBottom: "24px" }}>📚 コンポーネントカテゴリ</H2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            {categoryEntries.map(([categoryKey, category]) => (
              <Card key={categoryKey}>
                <header
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                  }}
                >
                  <H3 style={{ margin: 0, fontSize: "1.25rem" }}>
                    {category.icon} {category.name}
                  </H3>
                  <div
                    style={{
                      background: "#f8f9fa",
                      padding: "4px 12px",
                      borderRadius: "16px",
                      fontSize: "0.8rem",
                      color: "#666",
                    }}
                  >
                    {category.components.length} 個
                  </div>
                </header>

                <P
                  style={{
                    margin: "0 0 16px 0",
                    color: "#666",
                    fontSize: "0.95rem",
                    lineHeight: "1.5",
                  }}
                >
                  {category.description}
                </P>

                <Nav
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {category.components.slice(0, 6).map((component) => (
                    <Link
                      key={component.name}
                      to={`/component/${categoryKey}/${component.name}`}
                      style={{
                        textDecoration: "none",
                        background: "#e3f2fd",
                        color: "#1976d2",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = "#bbdefb";
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = "#e3f2fd";
                      }}
                    >
                      {component.name}
                    </Link>
                  ))}
                  {category.components.length > 6 && (
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        color: "#999",
                        fontStyle: "italic",
                      }}
                    >
                      +{category.components.length - 6} more
                    </span>
                  )}
                </Nav>
              </Card>
            ))}
          </div>
        </Section>

        {/* はじめ方セクション */}
        <Section>
          <H2 style={{ marginBottom: "24px" }}>🚀 はじめ方</H2>
          <Card>
            <pre
              style={{
                margin: 0,
                fontFamily: '"Courier New", monospace',
                fontSize: "0.9rem",
                lineHeight: "1.6",
                overflow: "auto",
              }}
            >
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
          </Card>
        </Section>
      </Main>
    </Article>
  );
};

export default HomePage;
