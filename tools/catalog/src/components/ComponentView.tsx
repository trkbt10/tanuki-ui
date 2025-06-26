import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { components } from "../catalog/components";
import { H1, H2, H3, H4, P, Section, Article, Button, Select, Option, Div, Aside, Toolbar } from "tanuki-ui";
import { HeaderMainLayout } from "tanuki-ui/layouts";
import styles from "./ComponentView.module.css";

const ComponentView: React.FC = () => {
  const { category, name } = useParams<{ category: string; name: string }>();

  if (!category || !name) {
    return <P>Component not found</P>;
  }

  const categoryData = components[category];
  if (!categoryData) {
    return <P>Category not found</P>;
  }

  const component = categoryData.components.find((c) => c.name === name);
  if (!component) {
    return <P>Component not found</P>;
  }

  const renderComponentDemo = () => {
    return (
      <Section className={styles.previewSection}>
        {/* 基本例 */}
        <Section className={styles.basicExample}>
          <H4 className={styles.sectionTitle}>基本例</H4>
          <div className={styles.demoSection}>
            <>{component.examples.basic}</>
          </div>
        </Section>

        {/* バリエーション */}
        {component.examples.variations && (
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
                {component.description} - {categoryData.name}
              </small>
            </Toolbar.Title>
          </Toolbar.Body>
        </Toolbar>
      }
    >
      <div className={styles.container}>
        <Article>
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
              <pre className={styles.codeBlock}>
                <code>
                  {`import { ${name} } from 'tanuki-ui';

function MyComponent() {
  return (
    <${name}>サンプル</${name}>
  );
}`}
                </code>
              </pre>
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
                      <td><span className={styles.propType}>{prop.type}</span></td>
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
            <pre className={styles.htmlCodeBlock}>
              <code>
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
              </code>
            </pre>
          </Section>
        </Article>
      </div>
    </HeaderMainLayout>
  );
};

export default ComponentView;
