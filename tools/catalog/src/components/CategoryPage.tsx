import React from "react";
import { Link, useParams } from "react-router";
import { components } from "../catalog/components";
import { Article, H1, H2, H3, P, Section, Ul, Li } from "tanuki-ui";
import styles from "./CategoryPage.module.css";

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  if (!category || !components[category]) {
    return (
      <Article>
        <Section>
          <H1>カテゴリが見つかりません</H1>
          <P>指定されたカテゴリは存在しません。</P>
          <Link to="/">ホームに戻る</Link>
        </Section>
      </Article>
    );
  }

  const categoryData = components[category];
  const componentList = categoryData.components;

  const displayName = categoryData.name.replace(/^[^\p{L}\p{N}]+\s*/u, '');

  return (
    <Article>
      <Section>
        <H1>{displayName}</H1>
        <P>{categoryData.description}</P>
      </Section>

      <Section>
        <Ul className={styles.list}>
          {componentList.map((component) => (
            <Li key={component.name}>
              <Link to={`/component/${category}/${component.name}`} className={styles.link}>
                <div className={styles.linkHeader}>
                  <H3 className={styles.linkTitle}>{component.name}</H3>
                  {(component.meta?.description || component.description) && (
                    <P className={styles.linkDescription}>{component.meta?.description || component.description}</P>
                  )}
                </div>
              </Link>
            </Li>
          ))}
        </Ul>
      </Section>
    </Article>
  );
};

export default CategoryPage;
