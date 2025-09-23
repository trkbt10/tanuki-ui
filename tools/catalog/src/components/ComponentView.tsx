import React from "react";
import { useParams } from "react-router";
import { components } from "../catalog/components";
import { Article, Code, Div, H1, H2, H3, P, Section, Table, Td, Th, Toolbar } from "tanuki-ui";
import { HeaderMainLayout } from "tanuki-ui/layouts";
import styles from "./ComponentView.module.css";

const ComponentView: React.FC = () => {
  const { category, name } = useParams<{ category: string; name: string }>();

  if (!category || !name || name === category) {
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

  const preview = component.component ? <component.component /> : component.examples?.basic ?? null;
  const variations = component.examples?.variations ?? [];
  const description = component.meta?.description || component.description;

  return (
    <HeaderMainLayout
      header={
        <Toolbar>
          <Toolbar.Body>
            <Toolbar.Title>
              <strong>
                {categoryData.icon} {name}
              </strong>
            </Toolbar.Title>
          </Toolbar.Body>
        </Toolbar>
      }
    >
      <Article>
        <Section>
          <H1>{name}</H1>
          {description && <P>{description}</P>}
        </Section>

        <Section>
          <H2>プレビュー</H2>
          <Div className={styles.previewCard}>
            <Div className={styles.previewContent}>{preview}</Div>
          </Div>
        </Section>

        {variations.length > 0 && (
          <Section>
            <H3>バリエーション</H3>
            <Div className={styles.variationList}>
              {variations.map((variation, index) => (
                <Div key={index} className={styles.variationCard}>
                  <Div className={styles.variationContent}>{variation}</Div>
                </Div>
              ))}
            </Div>
          </Section>
        )}

        {component.props && component.props.length > 0 && (
          <Section>
            <H3>Props</H3>
            <Table>
              <thead>
                <tr>
                  <Th scope="col">名前</Th>
                  <Th scope="col">型</Th>
                  <Th scope="col">説明</Th>
                  <Th scope="col">必須</Th>
                </tr>
              </thead>
              <tbody>
                {component.props.map((prop, index) => (
                  <tr key={index}>
                    <Td>{prop.name}</Td>
                    <Td>
                      <Code>{prop.type}</Code>
                    </Td>
                    <Td>{prop.description || "-"}</Td>
                    <Td>{prop.required ? "✓" : "-"}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>
        )}
      </Article>
    </HeaderMainLayout>
  );
};

export default ComponentView;
