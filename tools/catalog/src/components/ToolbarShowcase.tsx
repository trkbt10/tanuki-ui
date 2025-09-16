import React from "react";
import { Toolbar, Section, H3, P } from "tanuki-ui";

const containerStyle: React.CSSProperties = {
  display: "grid",
  gap: "32px",
};

const helperTextStyle: React.CSSProperties = {
  marginTop: "12px",
  fontSize: "0.85rem",
  color: "var(--barItemsLabelTextColor, #6b7280)",
};

const sectionDescriptionStyle: React.CSSProperties = {
  marginBottom: "12px",
  color: "var(--textSecondaryColor, inherit)",
};

const segmentedContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: "4px",
  alignItems: "center",
};

const ToolbarShowcase: React.FC = () => {
  const stageLabels = ["準備完了", "進行中", "ブロック中"];
  const overviewTabs = ["概要", "コミット", "パイプライン"];

  const [activeTab, setActiveTab] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [reviewFilter, setReviewFilter] = React.useState("all");
  const [owner, setOwner] = React.useState("anyone");
  const [branch, setBranch] = React.useState("main");
  const [tag, setTag] = React.useState("");
  const [stage, setStage] = React.useState(0);

  return (
    <div style={containerStyle}>
      <Section>
        <H3>プロジェクトのメインツールバー</H3>
        <P style={sectionDescriptionStyle}>
          ナビゲーション、検索、アクションを 1 つのツールバーにまとめた構成例です。
          ほとんどの内蔵コンポーネントを自然な形で組み合わせています。
        </P>
        <Toolbar>
          <Toolbar.Body>
            <Toolbar.BackButton aria-label="前の画面へ戻る" />
            <Toolbar.ForwardButton aria-label="次の画面へ進む" />
            <Toolbar.Title title="Tanuki UI" subTitle="Project overview" />
            <Toolbar.SegmentedControl
              items={overviewTabs}
              onSelect={setActiveTab}
            />
            <Toolbar.Spacer />
            <Toolbar.SearchField
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="ファイルやタスクを検索"
            />
            <Toolbar.Separator />
            <Toolbar.PushButton>
              新規 MR
            </Toolbar.PushButton>
            <Toolbar.PullDown
              value={reviewFilter}
              onChange={(event) => setReviewFilter(event.target.value)}
              aria-label="レビューの絞り込み"
            >
              <option value="all">すべてのレビュー</option>
              <option value="mine">自分のレビュー</option>
              <option value="pending">未対応</option>
            </Toolbar.PullDown>
          </Toolbar.Body>
        </Toolbar>
        <P style={helperTextStyle}>
          選択中のビュー: {overviewTabs[activeTab]} ／ 絞り込み: {reviewFilter} ／ 検索語: {searchQuery || "(なし)"}
        </P>
      </Section>

      <Section>
        <H3>レビューワークフロー向けツールバー</H3>
        <P style={sectionDescriptionStyle}>
          セグメントを手動で構成し、入力欄やコンボボックス、プルダウン型のボタンを組み合わせる例です。
          `Toolbar.Toolbar` エイリアスや `Toolbar.PushButton` のコンボボックス変種も利用しています。
        </P>
        <Toolbar.Toolbar>
          <Toolbar.Body>
            <Toolbar.Title title="レビュー待ち" subTitle="担当者とステージで絞り込み" />
            <div style={segmentedContainerStyle}>
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
            <Toolbar.InputField
              value={tag}
              placeholder="タグを追加"
              onChange={(event) => setTag(event.target.value)}
            />
            <Toolbar.ComboBox
              value={owner}
              onChange={(event) => setOwner(event.target.value)}
              aria-label="担当者で絞り込む"
            >
              <option value="anyone">担当者: すべて</option>
              <option value="me">自分</option>
              <option value="team">チーム</option>
            </Toolbar.ComboBox>
            <Toolbar.PopUpButton
              value={branch}
              onChange={(event) => setBranch(event.target.value)}
              aria-label="対象ブランチ"
            >
              <option value="main">main</option>
              <option value="develop">develop</option>
              <option value="release">release</option>
            </Toolbar.PopUpButton>
            <Toolbar.PushButton variant="combobox">
              その他の操作
            </Toolbar.PushButton>
          </Toolbar.Body>
        </Toolbar.Toolbar>
        <P style={helperTextStyle}>
          ステージ: {stageLabels[stage]} ／ 担当者: {owner} ／ ブランチ: {branch} ／ タグ: {tag || "(未入力)"}
        </P>
      </Section>
    </div>
  );
};

export default ToolbarShowcase;
