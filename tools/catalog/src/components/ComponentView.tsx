import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { components } from "../catalog/components";
import { H1, H2, H3, H4, P, Section, Article, Button, Select, Option, Aside, Toolbar, Pre, Code } from "tanuki-ui";
import { HeaderMainLayout } from "tanuki-ui/layouts";
import styles from "./ComponentView.module.css";
import ToolbarShowcase from "./ToolbarShowcase";
import SpecialComponentGuide from "./SpecialComponentGuide";

const ComponentView: React.FC = () => {
  const { category, name } = useParams<{ category: string; name: string }>();

  if (!category || !name) {
    return <P>Component not found</P>;
  }

  // カテゴリ専用ルートへのアクセスを防ぐ
  if (!name || name === category) {
    return <P>Invalid component path</P>;
  }

  const categoryData = components[category];
  if (!categoryData) {
    return <P>Category not found</P>;
  }

  const component = categoryData.components.find((c) => c.name === name);
  if (!component) {
    return <P>Component not found</P>;
  }

  const isToolbarShowcase = category === "bars" && name === "Toolbar";
  const guide = component.meta?.guide;

  const renderComponentDemo = () => {
    if (isToolbarShowcase) {
      return (
        <Section className={styles.previewSection}>
          <Section className={styles.basicExample}>
            <H4 className={styles.sectionTitle}>包括的なツールバーの例</H4>
            <div className={styles.demoSection}>
              <ToolbarShowcase />
            </div>
          </Section>
        </Section>
      );
    }

    // 新しい形式（3d-controlsなど）の場合
    if (component.component) {
      return (
        <Section className={styles.previewSection}>
          <Section className={styles.basicExample}>
            <H4 className={styles.sectionTitle}>デモ</H4>
            <div className={styles.demoSection}>
              <component.component />
            </div>
          </Section>
        </Section>
      );
    }

    // 従来の形式の場合
    return (
      <Section className={styles.previewSection}>
        {/* 基本例 */}
        <Section className={styles.basicExample}>
          <H4 className={styles.sectionTitle}>基本例</H4>
          <div className={styles.demoSection}>
            <>{component.examples?.basic}</>
          </div>
        </Section>

        {/* バリエーション */}
        {component.examples?.variations && (
          <Section>
            <H4 className={styles.sectionTitle}>バリエーション</H4>
            <div className={styles.variationContainer}>
              {component.examples.variations.map((variation, index) => (
                <div key={index} className={styles.variationItem}>
                  <>{variation}</>
                </div>
              ))}
            </div>
          </Section>
        )}
      </Section>
    );
  };

  const usageSnippet = isToolbarShowcase
    ? `import React from "react";
import { Toolbar } from "tanuki-ui";

export function ProjectToolbar() {
  const stageLabels = ["準備完了", "進行中", "ブロック中"];
  const [stage, setStage] = React.useState(0);
  const [filter, setFilter] = React.useState("all");
  const [branch, setBranch] = React.useState("main");
  const [sortOrder, setSortOrder] = React.useState("latest");

  return (
    <>
      <Toolbar>
        <Toolbar.Body>
          <Toolbar.BackButton aria-label="戻る" />
          <Toolbar.ForwardButton aria-label="進む" />
          <Toolbar.Title title="Tanuki UI" subTitle="Project overview" />
          <Toolbar.SegmentedControl
            items={["概要", "コミット", "パイプライン"]}
            onSelect={(index) => console.log("Segment", index)}
          />
          <Toolbar.Spacer />
          <Toolbar.SearchField placeholder="検索" />
          <Toolbar.Separator />
          <Toolbar.PushButton>新規 MR</Toolbar.PushButton>
          <Toolbar.PullDown
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="all">すべて</option>
            <option value="mine">自分</option>
          </Toolbar.PullDown>
        </Toolbar.Body>
      </Toolbar>

      <Toolbar.Toolbar>
        <Toolbar.Body>
          <Toolbar.Title title="レビュー待ち" />
          <div style={{ display: "flex", gap: "4px" }}>
            {stageLabels.map((label, index) => (
              <Toolbar.Segment
                key={label}
                index={index}
                onClick={setStage}
                isActive={stage === index}
              >
                {label}
              </Toolbar.Segment>
            ))}
          </div>
          <Toolbar.ComboBox
            value={branch}
            onChange={(event) => setBranch(event.target.value)}
          >
            <option value="main">main</option>
            <option value="develop">develop</option>
            <option value="release">release</option>
          </Toolbar.ComboBox>
          <Toolbar.PopUpButton
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="latest">最新</option>
            <option value="oldest">古い順</option>
          </Toolbar.PopUpButton>
          <Toolbar.PushButton variant="combobox">
            その他の操作
          </Toolbar.PushButton>
        </Toolbar.Body>
      </Toolbar.Toolbar>
    </>
  );
}`
    : `import { ${name} } from 'tanuki-ui';

function MyComponent() {
  return (
    <${name}>サンプル</${name}>
  );
}`;

  return (
    <HeaderMainLayout
      header={
        <Toolbar>
          <Toolbar.Body>
            <Toolbar.Title>
              <strong>
                {categoryData.icon} {name}
              </strong>
              <small>
                {component.meta?.description || component.description} - {categoryData.name} / {categoryData.group === 'html' ? 'HTML標準要素' : '拡張コンポーネント'}
              </small>
            </Toolbar.Title>
          </Toolbar.Body>
        </Toolbar>
      }
    >
      <div className={styles.container}>
        <Article>
          {guide && (
            <Section>
              <H3 className={styles.sectionTitle}>設計ガイド</H3>
              <SpecialComponentGuide componentName={name} guide={guide} />
            </Section>
          )}

          {/* プレビュー */}
          <Section>
            <H2>プレビュー</H2>
            <Section>{renderComponentDemo()}</Section>
          </Section>

          {/* コード例 */}
          <Section>
            <H3 className={styles.sectionTitle}>使用例</H3>
            <div className={styles.codeSection}>
              <div className={styles.codeHeader}>
                使用例
              </div>
              <Pre className={styles.codeBlock}>
                <Code>
                  {usageSnippet}
                </Code>
              </Pre>
            </div>
          </Section>

          {/* Props情報 */}
          {component.props && component.props.length > 0 && (
            <Section>
              <H2 className={styles.sectionTitle}>Props</H2>
              <table className={styles.propsTable}>
                <thead>
                  <tr>
                    <th>名前</th>
                    <th>型</th>
                    <th>説明</th>
                    <th>必須</th>
                  </tr>
                </thead>
                <tbody>
                  {component.props.map((prop, index) => (
                    <tr key={index}>
                      <td>{prop.name}</td>
                      <td>
                        <Code>{prop.type}</Code>
                      </td>
                      <td>{prop.description || "-"}</td>
                      <td className={prop.required ? styles.propRequired : ""}>{prop.required ? "✓" : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
          )}

          {/* HTML標準との対応 */}
          <Section className={styles.htmlCorrespondenceSection}>
            <H2 className={styles.sectionTitle}>HTML 標準要素との対応</H2>
            <P className={styles.htmlDescription}>
              このコンポーネントは HTML の標準要素をベースとしており、すべての標準属性をサポートしています。
              従来の HTML 要素と同じように使用できるため、既存のスタイルやスクリプトとの互換性を保ちます。
            </P>
            <Pre className={styles.htmlCodeBlock}>
              <Code>
{`// 標準のHTML属性が使用可能
<${name}
  className="my-class"
  id="my-id"
  data-testid="test"
  onClick={handleClick}
  {...otherProps}
>
  コンテンツ
</${name}>`}
              </Code>
            </Pre>
          </Section>
        </Article>
      </div>
    </HeaderMainLayout>
  );
};

export default ComponentView;
