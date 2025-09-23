import React from "react";
import {
  Article,
  Main,
  Section,
  H2,
  H3,
  P,
  Small,
  Pre,
  Code,
  Table,
  Caption,
  Th,
  Td,
} from "tanuki-ui";
import styles from "./TableCatalog.module.css";
import CatalogPageHeader from "./CatalogPageHeader";

const largeDataset = Array.from({ length: 28 }, (_, index) => {
  const owners = ["山田", "佐藤", "田中", "高橋", "鈴木", "伊藤"];
  const statuses = ["進行中", "レビュー待ち", "完了", "保留"];
  const categories = ["Core", "UI", "API", "Infra"];

  return {
    sprint: `Sprint ${index + 1}`,
    owner: owners[index % owners.length],
    status: statuses[index % statuses.length],
    stories: 24 + (index % 7) * 3,
    bugs: 4 + (index % 5),
    category: categories[index % categories.length],
    updated: `2024-${String((index % 12) + 1).padStart(2, "0")}-${String((index * 3) % 28 + 1).padStart(2, "0")}`,
  };
});

const completeTableCode = `<Table>
  <Caption>月次売上サマリー</Caption>
  <thead>
    <tr>
      <Th scope="col">月</Th>
      <Th scope="col">新規顧客</Th>
      <Th scope="col">MRR</Th>
      <Th scope="col">解約率</Th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <Th scope="row">1月</Th>
      <Td>32</Td>
      <Td>¥1,200,000</Td>
      <Td>2.1%</Td>
    </tr>
    <tr>
      <Th scope="row">2月</Th>
      <Td>41</Td>
      <Td>¥1,360,000</Td>
      <Td>1.8%</Td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <Th scope="row">合計 / 平均</Th>
      <Td>73社</Td>
      <Td>¥2,560,000</Td>
      <Td>平均 1.95%</Td>
    </tr>
  </tfoot>
</Table>`;

const withoutCaptionCode = `<Table>
  <thead>
    <tr>
      <Th scope="col">チーム</Th>
      <Th scope="col">担当領域</Th>
      <Th scope="col">担当者</Th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <Th scope="row">Alpha</Th>
      <Td>デザインシステム</Td>
      <Td>たぬき 太郎</Td>
    </tr>
    <tr>
      <Th scope="row">Bravo</Th>
      <Td>アプリケーション UI</Td>
      <Td>ねこ 花子</Td>
    </tr>
  </tbody>
</Table>`;

const bodyOnlyCode = `<Table>
  <tbody>
    <tr>
      <Th scope="col">時間</Th>
      <Th scope="col">イベント</Th>
      <Th scope="col">担当</Th>
    </tr>
    <tr>
      <Th scope="row">10:00</Th>
      <Td>キックオフ</Td>
      <Td>PM チーム</Td>
    </tr>
    <tr>
      <Th scope="row">11:30</Th>
      <Td>デザインレビュー</Td>
      <Td>Design Guild</Td>
    </tr>
  </tbody>
</Table>`;

const footSummaryCode = `<Table>
  <Caption>キャンペーン別成果</Caption>
  <thead>
    <tr>
      <Th scope="col">キャンペーン</Th>
      <Th scope="col">表示回数</Th>
      <Th scope="col">クリック</Th>
      <Th scope="col">CV</Th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <Th scope="row">Spring Launch</Th>
      <Td>128,450</Td>
      <Td>5,624</Td>
      <Td>842</Td>
    </tr>
    <tr>
      <Th scope="row">Referral Boost</Th>
      <Td>89,310</Td>
      <Td>4,812</Td>
      <Td>655</Td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <Th scope="row">合計</Th>
      <Td>217,760</Td>
      <Td>10,436</Td>
      <Td>1,497</Td>
    </tr>
  </tfoot>
</Table>`;

const TableCatalog: React.FC = () => {
  return (
    <Article className={styles.page}>
      <CatalogPageHeader
        title="Table Catalog"
        lead="テーブル要素を活用した様々なレイアウトパターンをまとめました。キャプションやフッターの有無、大量データを扱うケースなど、実用的な構成を確認できます。"
        helperText="Table / Caption / Thead / Tbody / Tfoot を自由に組み合わせて柔軟なテーブルを構築できます。"
      />

      <Main className={styles.main}>
        <Section className={styles.section}>
          <div className={styles.sectionIntro}>
            <H2>基本構造</H2>
            <P>
              Table 要素と関連セクション要素を組み合わせた基本パターンです。ヘッダー・ボディ・フッターを揃えると
              情報量の多いデータでも読みやすく整理できます。
            </P>
          </div>

          <div className={styles.exampleGrid}>
            <div className={styles.exampleCard}>
              <div className={styles.exampleHeader}>
                <H3 className={styles.exampleTitle}>フルセットのテーブル</H3>
                <P className={styles.exampleDescription}>caption / thead / tbody / tfoot を全て使った構成。</P>
              </div>
              <div className={styles.exampleContent}>
                <div className={styles.tableContainer}>
                  <Table>
                    <Caption>月次売上サマリー</Caption>
                    <thead>
                      <tr>
                        <Th scope="col">月</Th>
                        <Th scope="col">新規顧客</Th>
                        <Th scope="col">MRR</Th>
                        <Th scope="col">解約率</Th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <Th scope="row">1月</Th>
                        <Td>32</Td>
                        <Td>¥1,200,000</Td>
                        <Td>2.1%</Td>
                      </tr>
                      <tr>
                        <Th scope="row">2月</Th>
                        <Td>41</Td>
                        <Td>¥1,360,000</Td>
                        <Td>1.8%</Td>
                      </tr>
                      <tr>
                        <Th scope="row">3月</Th>
                        <Td>50</Td>
                        <Td>¥1,540,000</Td>
                        <Td>1.5%</Td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <Th scope="row">合計 / 平均</Th>
                        <Td>123社</Td>
                        <Td>¥4,100,000</Td>
                        <Td>平均 1.8%</Td>
                      </tr>
                    </tfoot>
                  </Table>
                </div>
                <Pre className={styles.codeBlock}>
                  <Code>{completeTableCode}</Code>
                </Pre>
              </div>
            </div>

            <div className={styles.exampleCard}>
              <div className={styles.exampleHeader}>
                <H3 className={styles.exampleTitle}>キャプションなしのテーブル</H3>
                <P className={styles.exampleDescription}>ヘッダーとボディのみで構成されたシンプルな一覧。</P>
              </div>
              <div className={styles.exampleContent}>
                <div className={styles.tableContainer}>
                  <Table>
                    <thead>
                      <tr>
                        <Th scope="col">チーム</Th>
                        <Th scope="col">担当領域</Th>
                        <Th scope="col">担当者</Th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <Th scope="row">Alpha</Th>
                        <Td>デザインシステム</Td>
                        <Td>たぬき 太郎</Td>
                      </tr>
                      <tr>
                        <Th scope="row">Bravo</Th>
                        <Td>アプリケーション UI</Td>
                        <Td>ねこ 花子</Td>
                      </tr>
                      <tr>
                        <Th scope="row">Charlie</Th>
                        <Td>アクセシビリティ</Td>
                        <Td>きつね 三郎</Td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <Pre className={styles.codeBlock}>
                  <Code>{withoutCaptionCode}</Code>
                </Pre>
              </div>
            </div>
          </div>
        </Section>

        <Section className={styles.section}>
          <div className={styles.sectionIntro}>
            <H2>セクションの有無で変化を付ける</H2>
            <P>
              thead や tfoot を省略しても Table は機能します。用途に応じて必要なセクションだけを使い、
              軽量な一覧やイベントログを作成できます。
            </P>
          </div>

          <div className={styles.exampleGrid}>
            <div className={styles.exampleCard}>
              <div className={styles.exampleHeader}>
                <H3 className={styles.exampleTitle}>tbody のみのテーブル</H3>
                <P className={styles.exampleDescription}>時系列ログなど、ヘッダーを個別に持たないリストで便利です。</P>
              </div>
              <div className={styles.exampleContent}>
                <div className={styles.tableContainer}>
                  <Table>
                    <tbody>
                      <tr>
                        <Th scope="col">時間</Th>
                        <Th scope="col">イベント</Th>
                        <Th scope="col">担当</Th>
                      </tr>
                      <tr>
                        <Th scope="row">10:00</Th>
                        <Td>キックオフ</Td>
                        <Td>PM チーム</Td>
                      </tr>
                      <tr>
                        <Th scope="row">11:30</Th>
                        <Td>デザインレビュー</Td>
                        <Td>Design Guild</Td>
                      </tr>
                      <tr>
                        <Th scope="row">13:00</Th>
                        <Td>ランチセッション</Td>
                        <Td>DevRel</Td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <Pre className={styles.codeBlock}>
                  <Code>{bodyOnlyCode}</Code>
                </Pre>
              </div>
            </div>

            <div className={styles.exampleCard}>
              <div className={styles.exampleHeader}>
                <H3 className={styles.exampleTitle}>tfoot を使ったサマリー</H3>
                <P className={styles.exampleDescription}>フッターで集計値を示し、テーブル全体の概要を補足します。</P>
              </div>
              <div className={styles.exampleContent}>
                <div className={styles.tableContainer}>
                  <Table>
                    <Caption>キャンペーン別成果</Caption>
                    <thead>
                      <tr>
                        <Th scope="col">キャンペーン</Th>
                        <Th scope="col">表示回数</Th>
                        <Th scope="col">クリック</Th>
                        <Th scope="col">CV</Th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <Th scope="row">Spring Launch</Th>
                        <Td>128,450</Td>
                        <Td>5,624</Td>
                        <Td>842</Td>
                      </tr>
                      <tr>
                        <Th scope="row">Referral Boost</Th>
                        <Td>89,310</Td>
                        <Td>4,812</Td>
                        <Td>655</Td>
                      </tr>
                      <tr>
                        <Th scope="row">New Region</Th>
                        <Td>22,940</Td>
                        <Td>1,188</Td>
                        <Td>215</Td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <Th scope="row">合計</Th>
                        <Td>240,700</Td>
                        <Td>11,624</Td>
                        <Td>1,712</Td>
                      </tr>
                    </tfoot>
                  </Table>
                </div>
                <Pre className={styles.codeBlock}>
                  <Code>{footSummaryCode}</Code>
                </Pre>
              </div>
            </div>
          </div>
        </Section>

        <Section className={styles.section}>
          <div className={styles.sectionIntro}>
            <H2>大量データを扱う</H2>
            <P>
              行数の多いデータはスクロール可能なコンテナに収めたり、列幅を固定することで読みやすくなります。
              sticky ヘッダーと組み合わせればスクロール中も見出しが追従します。
            </P>
          </div>

          <div className={styles.exampleCard}>
            <div className={styles.exampleHeader}>
              <H3 className={styles.exampleTitle}>スプリントの活動ログ</H3>
              <P className={styles.exampleDescription}>
                30行近いデータをスクロール領域に収めた例。ヘッダーは自動で固定されます。
              </P>
            </div>
            <div className={styles.exampleContent}>
              <div className={styles.denseTable}>
                <Table>
                  <Caption>2024年 スプリント実績</Caption>
                  <thead>
                    <tr>
                      <Th scope="col">スプリント</Th>
                      <Th scope="col">カテゴリ</Th>
                      <Th scope="col">担当</Th>
                      <Th scope="col">ストーリー数</Th>
                      <Th scope="col">バグ修正</Th>
                      <Th scope="col">状態</Th>
                      <Th scope="col">最終更新</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {largeDataset.map((row) => (
                      <tr key={row.sprint}>
                        <Th scope="row">{row.sprint}</Th>
                        <Td>{row.category}</Td>
                        <Td>{row.owner}</Td>
                        <Td>{row.stories}</Td>
                        <Td>{row.bugs}</Td>
                        <Td>{row.status}</Td>
                        <Td>{row.updated}</Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className={styles.exampleAside}>
                <Pre className={styles.codeBlock}>
                  <Code>{`<div style={{ maxHeight: 320, overflow: 'auto' }}>
  <Table>
    <Caption>2024年 スプリント実績</Caption>
    <thead>...</thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row.id}>
          <Th scope="row">{row.sprint}</Th>
          <Td>{row.category}</Td>
          <Td>{row.owner}</Td>
          <Td>{row.stories}</Td>
          <Td>{row.bugs}</Td>
          <Td>{row.status}</Td>
          <Td>{row.updated}</Td>
        </tr>
      ))}
    </tbody>
  </Table>
</div>`}</Code>
                </Pre>
                <Small className={`${styles.helperText} ${styles.exampleHint}`}>
                  `max-height` と `overflow: auto` を組み合わせてスクロール領域を作成。sticky ヘッダーが生きる構成です。
                </Small>
              </div>
            </div>
          </div>
        </Section>
      </Main>
    </Article>
  );
};

export default TableCatalog;
