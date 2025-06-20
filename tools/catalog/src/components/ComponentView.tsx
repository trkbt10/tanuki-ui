import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { components } from "../catalog/components";
import { H1, H2, H3, H4, P, Section, Article, Button, Select, Option, Div, Aside, Toolbar } from "tanuki-ui";
import { HeaderMainLayout } from "tanuki-ui/layouts";

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
      <Section>
        {/* 基本例 */}
        <Section>
          <H4>基本例</H4>
          <>{component.examples.basic}</>
        </Section>

        {/* バリエーション */}
        {component.examples.variations && (
          <Section>
            <H4>バリエーション</H4>
            <Section>
              {component.examples.variations.map((variation, index) => (
                <Section key={index}>
                  <>{variation}</>
                </Section>
              ))}
            </Section>
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
      <div
        style={{
          padding: "0 2em",
          boxSizing: "border-box",
        }}
      >
        <Article>
          {/* プレビュー */}
          <Section>
            <H2>プレビュー</H2>
            <Section>{renderComponentDemo()}</Section>
          </Section>

          {/* コード例 */}
          <Section>
            <H3>使用例</H3>
            <pre>
              <code>
                {`import { ${name} } from 'tanuki-ui';

function MyComponent() {
  return (
    <${name}>サンプル</${name}>
  );
}`}
              </code>
            </pre>
          </Section>

          {/* Props情報 */}
          {component.props && component.props.length > 0 && (
            <Section>
              <H2>Props</H2>
              <table>
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
                      <td>{prop.type}</td>
                      <td>{prop.description || "-"}</td>
                      <td>{prop.required ? "✓" : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
          )}

          {/* HTML標準との対応 */}
          <Section>
            <H2>HTML 標準要素との対応</H2>
            <P>このコンポーネントは HTML の標準要素をベースとしており、すべての標準属性をサポートしています。</P>
            <pre>
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
