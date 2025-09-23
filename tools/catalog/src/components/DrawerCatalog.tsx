import React from "react";
import {
  Article,
  Main,
  Section,
  H2,
  H3,
  P,
  Small,
  Button,
  Pre,
  Code,
  Drawer,
} from "tanuki-ui";
import styles from "./DrawerCatalog.module.css";
import CatalogPageHeader from "./CatalogPageHeader";

const navigationCode = `<Drawer direction="ltr" open={isOpen} onClose={() => setIsOpen(false)}>
  <H3>ワークスペース</H3>
  <nav>
    <ul>
      <li>ダッシュボード</li>
      <li>アクティビティ</li>
      <li>レポート</li>
    </ul>
  </nav>
</Drawer>`;

const settingsCode = `<Drawer direction="rtl" open={open} onClose={close}>
  <H3>クイック設定</H3>
  <Button variant="secondary">ダークモード</Button>
</Drawer>`;

const sheetCode = `<Drawer direction="btt" open={open} onClose={close}>
  <H3>共有</H3>
  <P>リンクを生成して共有できます。</P>
</Drawer>`;

const DrawerCatalog: React.FC = () => {
  const [navOpen, setNavOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);

  return (
    <Article className={styles.page}>
      <CatalogPageHeader
        title="Drawer Catalog"
        lead="Drawer コンポーネントは画面端からスライドするパネルで、ナビゲーションや設定、補助的なアクションを提供します。ターゲットデバイスや操作内容に応じて方向を切り替えましょう。"
        helperText={(
          <>
            direction プロパティで <code>ltr</code> / <code>rtl</code> / <code>ttb</code> / <code>btt</code> を指定すると、それぞれ左・右・上・下から出現します。
          </>
        )}
      />

      <Main className={styles.main}>
        <Section className={styles.section}>
          <div className={styles.sectionIntro}>
            <H2>左側のアプリケーションナビゲーション</H2>
            <P>
              デスクトップ UI でよく使われる側面ドロワー。メインメニューやプロジェクト一覧を配置し、必要な時だけ開閉します。
            </P>
          </div>

          <div className={styles.exampleGrid}>
            <div className={styles.exampleCard}>
              <div className={styles.exampleHeader}>
                <H3 className={styles.exampleTitle}>ワークスペースを素早く切り替える</H3>
                <P className={styles.exampleDescription}>
                  ハンバーガー操作から左側に展開する Drawer を利用して、主要ナビゲーションをまとめて表示します。
                </P>
              </div>
              <div className={styles.exampleContent}>
                <div className={styles.preview}>
                  <div className={styles.triggerRow}>
                    <Button onClick={() => setNavOpen(true)}>ナビゲーションを開く</Button>
                    <Small className={styles.helperText}>現在: {navOpen ? "開いています" : "閉じています"}</Small>
                  </div>
                  {navOpen && (
                    <Drawer direction="ltr" open={navOpen} onClose={() => setNavOpen(false)}>
                      <H3>ワークスペース</H3>
                      <P>最近アクセスしたプロジェクトを素早く切り替えましょう。</P>
                      <div className={styles.drawerBody}>
                        <nav>
                          <ul className={styles.drawerList}>
                            <li className={styles.drawerListItem}>ダッシュボード</li>
                            <li className={styles.drawerListItem}>アクティビティ</li>
                            <li className={styles.drawerListItem}>ドキュメント</li>
                            <li className={styles.drawerListItem}>設定</li>
                          </ul>
                        </nav>
                        <Button variant="secondary" onClick={() => setNavOpen(false)}>
                          閉じる
                        </Button>
                      </div>
                    </Drawer>
                  )}
                </div>
                <Pre className={styles.codeBlock}>
                  <Code>{navigationCode}</Code>
                </Pre>
              </div>
            </div>
          </div>
        </Section>

        <Section className={styles.section}>
          <div className={styles.sectionIntro}>
            <H2>右側のクイック設定</H2>
            <P>
              コンテンツを覆わずに軽量な設定を表示するシナリオ。右端から出すとメインビューとの対比がしやすくなります。
            </P>
          </div>

          <div className={styles.exampleGrid}>
            <div className={styles.exampleCard}>
              <div className={styles.exampleHeader}>
                <H3 className={styles.exampleTitle}>補助アクションを右側にまとめる</H3>
                <P className={styles.exampleDescription}>
                  設定やトグルをコンパクトに配置し、必要な時だけ Drawer で内容を展開します。
                </P>
              </div>
              <div className={styles.exampleContent}>
                <div className={styles.preview}>
                  <div className={styles.triggerRow}>
                    <Button variant="secondary" onClick={() => setSettingsOpen(true)}>
                      クイック設定
                    </Button>
                    <Small className={styles.helperText}>現在: {settingsOpen ? "開いています" : "閉じています"}</Small>
                  </div>
                  {settingsOpen && (
                    <Drawer direction="rtl" open={settingsOpen} onClose={() => setSettingsOpen(false)}>
                      <H3>クイック設定</H3>
                      <div className={styles.drawerBody}>
                        <Button variant="secondary" onClick={() => setSettingsOpen(false)}>
                          ダークモードに切り替え
                        </Button>
                        <Button variant="secondary">通知をミュート</Button>
                        <Button variant="secondary">ショートカットを表示</Button>
                      </div>
                    </Drawer>
                  )}
                </div>
                <Pre className={styles.codeBlock}>
                  <Code>{settingsCode}</Code>
                </Pre>
              </div>
            </div>
          </div>
        </Section>

        <Section className={styles.section}>
          <div className={styles.sectionIntro}>
            <H2>モバイルのボトムシート</H2>
            <P>
              共有やコメントなど、即時アクションを提供するために下部からスライドするドロワーを使います。タップで閉じられる
              軽量な UI として機能します。
            </P>
          </div>

          <div className={styles.exampleGrid}>
            <div className={styles.exampleCard}>
              <div className={styles.exampleHeader}>
                <H3 className={styles.exampleTitle}>共有アクションをボトムシートに集約</H3>
                <P className={styles.exampleDescription}>
                  モバイル想定で画面下から展開する Drawer を使い、共有操作を手早く提供します。
                </P>
              </div>
              <div className={styles.exampleContent}>
                <div className={styles.preview}>
                  <div className={styles.triggerRow}>
                    <Button variant="primary" onClick={() => setSheetOpen(true)}>
                      シェアメニュー
                    </Button>
                    <Small className={styles.helperText}>現在: {sheetOpen ? "開いています" : "閉じています"}</Small>
                  </div>
                  {sheetOpen && (
                    <Drawer direction="btt" open={sheetOpen} onClose={() => setSheetOpen(false)}>
                      <H3>共有</H3>
                      <div className={styles.sheetContent}>
                        <P>リンクを生成してチームメンバーと共有できます。アクセスレベルもここで変更可能です。</P>
                        <Button variant="primary">共有リンクをコピー</Button>
                        <Button variant="secondary" onClick={() => setSheetOpen(false)}>
                          キャンセル
                        </Button>
                      </div>
                    </Drawer>
                  )}
                </div>
                <Pre className={styles.codeBlock}>
                  <Code>{sheetCode}</Code>
                </Pre>
              </div>
            </div>
          </div>
        </Section>
      </Main>
    </Article>
  );
};

export default DrawerCatalog;
