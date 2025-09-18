import React from "react";
import { Link, useParams } from "react-router";
import { components } from "../catalog/components";
import { H1, H2, P, Section, Article, Nav, Header, Main, Card, Small } from "tanuki-ui";
import styles from "./CategoryPage.module.css";

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  
  if (!category || !components[category]) {
    return (
      <Article className={styles.container}>
        <H1>カテゴリが見つかりません</H1>
        <P>指定されたカテゴリは存在しません。</P>
        <Link to="/" className={styles.backLink}>ホームに戻る</Link>
      </Article>
    );
  }

  const categoryData = components[category];
  const componentList = categoryData.components;

  // コンポーネントをベースコンポーネントでグループ化
  const groupedComponents = componentList.reduce((acc, component) => {
    const baseName = component.name.split(' - ')[0];
    if (!acc[baseName]) {
      acc[baseName] = [];
    }
    acc[baseName].push(component);
    return acc;
  }, {} as Record<string, typeof componentList>);

  return (
    <Article className={styles.container}>
      <Header className={styles.header}>
        <H1 className={styles.title}>
          {categoryData.icon} {categoryData.name}
        </H1>
        <P className={styles.description}>
          {categoryData.description}
        </P>
        <Small className={styles.groupBadge}>
          {categoryData.group === 'html' ? 'HTML標準要素グループ' : '拡張コンポーネントグループ'}
        </Small>
      </Header>

      <Main>
        <Section className={styles.section}>
          <div className={styles.componentGrid}>
            {Object.entries(groupedComponents).map(([baseName, components]) => (
              <Link 
                key={baseName} 
                to={`/component/${category}/${components[0].name}`}
                className={styles.componentCardLink}
              >
                <Card className={styles.componentCard}>
                  <H2 className={styles.componentName}>{baseName}</H2>
                  
                  {components[0].meta && (
                    <P className={styles.componentDescription}>
                      {components[0].meta.description}
                    </P>
                  )}

                  <Nav className={styles.variantList} onClick={(e) => e.stopPropagation()}>
                    {components.map((component) => {
                      const variantName = component.name.includes(' - ') 
                        ? component.name.split(' - ')[1] 
                        : 'Basic';
                      return (
                        <Link
                          key={component.name}
                          to={`/component/${category}/${component.name}`}
                          className={styles.variantLink}
                        >
                          {variantName}
                        </Link>
                      );
                    })}
                  </Nav>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      </Main>
    </Article>
  );
};

export default CategoryPage;
