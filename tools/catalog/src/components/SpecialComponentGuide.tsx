import React from "react";
import { Card, Section, H3, H4, P, Ul, Li, Pre, Code, Small, A } from "tanuki-ui";
import type { SpecialGuideContent } from "../CatalogMeta";
import styles from "./SpecialComponentGuide.module.css";

interface SpecialComponentGuideProps {
  componentName: string;
  guide: SpecialGuideContent;
}

const renderList = (title: string, items?: string[]) => {
  if (!items || items.length === 0) return null;

  return (
    <Section>
      <H4 className={styles.sectionTitle}>{title}</H4>
      <Ul className={styles.list}>
        {items.map((item) => (
          <Li key={item}>{item}</Li>
        ))}
      </Ul>
    </Section>
  );
};

const SpecialComponentGuide: React.FC<SpecialComponentGuideProps> = ({ componentName, guide }) => {
  const { summary, whenToUse, bestPractices, pitfalls, codeSnippet, references } = guide;

  return (
    <Card className={styles.card}>
      <Section>
        <H3>{componentName} のガイド</H3>
        <P>{summary}</P>
      </Section>

      {renderList("こんなときに使う", whenToUse)}
      {renderList("ベストプラクティス", bestPractices)}
      {renderList("注意点", pitfalls)}

      {codeSnippet && (
        <Section>
          <H4 className={styles.sectionTitle}>基本的なコード例</H4>
          <Pre className={styles.codeBlock}>
            <Code>{codeSnippet}</Code>
          </Pre>
        </Section>
      )}

      {references && references.length > 0 && (
        <Section>
          <H4 className={styles.sectionTitle}>関連資料</H4>
          <Ul className={styles.referenceList}>
            {references.map((reference) => (
              <Li key={reference.label}>
                <A href={reference.href} target="_blank" rel="noreferrer">
                  <Small>{reference.label}</Small>
                </A>
              </Li>
            ))}
          </Ul>
        </Section>
      )}
    </Card>
  );
};

export default SpecialComponentGuide;
