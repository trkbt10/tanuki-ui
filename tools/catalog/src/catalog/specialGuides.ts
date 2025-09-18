import type { SpecialGuideContent } from "../CatalogMeta";

export const specialGuides: Record<string, SpecialGuideContent> = {
  Toolbar: {
    summary: "多段構成のアクションをまとめるためのフレキシブルなバーコンポーネントです。タイトル、検索、ボタン群などをセクションで組み合わせてレイアウトします。",
    whenToUse: [
      "ページや画面上部に主要な操作を集約したいとき",
      "ツール群をコンテキストに応じて入れ替える必要があるとき",
      "複数行のサブツールバーを持つ高度な UI を構築したいとき",
    ],
    bestPractices: [
      "`Toolbar.Body`、`Toolbar.Title` などのサブコンポーネントで構造化し、役割を明確に保つ",
      "アイコンボタンとテキストラベルを混在させる場合はスペーサーで余白を調整する",
      "複数段構成にする場合は `Toolbar.Toolbar` を重ね、キーボードフォーカスの順序を確認する",
    ],
    pitfalls: [
      "親要素に固定幅を与えずに詰め込みすぎると、スクロールが発生し操作性が低下します",
      "`Toolbar.PushButton` と通常の `Button` を同時に並べると高さが揃わない場合があります",
    ],
    codeSnippet: `import { Toolbar } from 'tanuki-ui';

export function ProjectToolbar() {
  return (
    <Toolbar>
      <Toolbar.Body>
        <Toolbar.BackButton />
        <Toolbar.Title title="Issue" subTitle="#123" />
        <Toolbar.Spacer />
        <Toolbar.SearchField placeholder="検索" />
        <Toolbar.PushButton>新規</Toolbar.PushButton>
      </Toolbar.Body>
    </Toolbar>
  );
}`,
  },
  EditableLabel: {
    summary: "テキストラベルをインラインで編集できる入力 UI です。表示モードと編集モードを内部で切り替え、確定タイミングを制御できます。",
    whenToUse: [
      "テーブルやカード内で項目名を素早く編集させたいとき",
      "別ページに遷移せず軽量に変更できる体験を提供したいとき",
    ],
    bestPractices: [
      "`onSubmit` や `onCancel` を指定して変更結果を確実に処理する",
      "`placeholder` を設定して未入力時の意図を伝える",
      "バリデーションが必要な場合は `validate` コールバックで行い、エラー表示を提供する",
    ],
    pitfalls: [
      "外部から `value` を制御する場合は `onChange` と組み合わせて完全に制御下に置く",
      "フォーム送信とは独立して動作するため、サーバー保存ロジックを忘れない",
    ],
    codeSnippet: `import { EditableLabel } from 'tanuki-ui';

function TitleField() {
  return (
    <EditableLabel
      defaultValue="新しいタイトル"
      onSubmit={(value) => saveTitle(value)}
    />
  );
}`,
  },
  TabNav: {
    summary: "ドラッグで並び替えができるタブ型ナビゲーションです。アイテム配列とアクティブキーを制御して運用します。",
    whenToUse: [
      "ユーザーがタブ順をカスタマイズできるインタフェースを提供したいとき",
      "タブ数が可変であり、状態を外部ストアで保持したいとき",
    ],
    bestPractices: [
      "`items` と `setItems` を同じ状態管理で保持して順序を同期する",
      "タブを閉じる操作を加える場合は `renderItem` でカスタムボタンを仕込む",
    ],
    pitfalls: [
      "`onChange` は選択変更イベントのみを通知するため、ドラッグ結果の保存を忘れない",
      "スクロール可能な幅を超える場合は外側のコンテナにオーバーフロー制御を付与する",
    ],
    codeSnippet: `const [items, setItems] = React.useState([
  { key: 'home', value: 'ホーム' },
  { key: 'tasks', value: 'タスク' },
]);

<TabNav
  items={items}
  value="home"
  onChange={(key) => setActive(key)}
  setItems={setItems}
/>;`,
  },
  TabBar: {
    summary: "モバイルライクなタブバーです。少数のビュー切り替えを強調したいときに用います。",
    whenToUse: [
      "グローバルな画面切り替えを提供する下部ナビゲーションが必要なとき",
      "アイコン付きのラベルで状態を示したいとき",
    ],
    bestPractices: [
      "各タブにユニークな `key` を設定し、`onSelect` でルーティングなどの処理を行う",
      "アクティブ状態を外部で管理する場合は `activeKey` を指定する",
    ],
    pitfalls: [
      "タブ数が多い場合は折り返さずスクロールする設計に切り替える",
    ],
  },
  Modal: {
    summary: "ポータルを利用したオーバーレイモーダルです。`Dialog` をベースに追加の制御を提供します。",
    whenToUse: [
      "画面全体を覆う承認フローや詳細表示を実装したいとき",
      "ブラウザの `<dialog>` をサポートしていない環境へのフォールバックが必要なとき",
    ],
    bestPractices: [
      "閉じる操作は `onClose` を通じて一元管理する",
      "`open` を外部状態で管理し、非表示時はコンテンツをアンマウントする",
      "スクロールが必要な場合は内部に `Section` や `Div` を配置して高さを調整する",
    ],
    pitfalls: [
      "`Modal` 自体はフォーカストラップを提供しないため、フォーカスの戻し先を確認する",
      "モバイルで画面全体を覆う際は背景のスクロール抑止を別途考慮する",
    ],
    codeSnippet: `const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>詳細を見る</Button>
  <Modal open={open} onClose={() => setOpen(false)}>
    <H3>モーダルタイトル</H3>
    <P>ここに詳細を表示します。</P>
  </Modal>
</>;`,
  },
  Alert: {
    summary: "Native の `alert()` を模した軽量な通知ダイアログです。非同期操作の結果や確認メッセージに適しています。",
    whenToUse: [
      "即座にユーザーへフィードバックを返したいが、別画面に遷移したくないとき",
      "確認ダイアログとしてカスタムボタンを並べたいとき",
    ],
    bestPractices: [
      "`useNativeAlertLikeInterface` と併用して Promise ベースの API を提供する",
      "アクセシビリティのため、最初にアクションボタンへフォーカスを移す",
    ],
    pitfalls: [
      "長文テキストを入れる場合はスクロール領域を用意しレイアウト崩れを防ぐ",
    ],
  },
  SidebarList: {
    summary: "セクションと折りたたみ可能なリストを備えたサイドバー UI です。階層化されたナビゲーションを構築できます。",
    whenToUse: [
      "ドキュメントや設定画面など、複数階層のナビゲーションが必要なとき",
      "カテゴリ単位でグループ化し、各項目の選択状態を管理したいとき",
    ],
    bestPractices: [
      "`SidebarList.Container` で開閉状態を制御し、初期表示のセクションを指定する",
      "リンクと組み合わせる際は `<Link>` などでラップしフォーカスリングを保つ",
    ],
    pitfalls: [
      "スクロールコンテナと組み合わせる場合は高さと `overflow` を適切に調整する",
      "アイコンを表示する場合は `label` を視覚的に補完するだけでなくテキストを残す",
    ],
    codeSnippet: `<SidebarList.List>
  <SidebarList.Container title="Projects" open>
    <SidebarList.List>
      <SidebarList.ListItem label="Tanuki UI" selected />
      <SidebarList.ListItem label="Docs" />
    </SidebarList.List>
  </SidebarList.Container>
</SidebarList.List>`,
  },
};
