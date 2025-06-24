# Visual Regression Testing

このディレクトリには、tanuki-uiコンポーネントのビジュアル回帰テストが含まれています。

## セットアップ

```bash
# 依存関係をインストール
npm install

# Playwrightブラウザをインストール
npx playwright install
```

## 使用方法

### スクリーンショットテストの実行

```bash
# 全てのビジュアルテストを実行
npm run test:visual

# UIモードでテストを実行（ブラウザで結果を確認）
npm run test:visual:ui

# スクリーンショットを更新（新しいベースラインを作成）
npm run test:visual:update
```

### テストサーバーの起動

```bash
# テスト用サーバーを手動で起動
npm run test:visual:serve
```

## ファイル構造

```
tests/visual/
├── components/           # 各コンポーネントのテストファイル
│   ├── card.spec.ts     # Cardコンポーネントのテスト
│   ├── button.spec.ts   # Buttonコンポーネントのテスト
│   └── ...
├── utils/               # テストユーティリティ
│   ├── component-test-helper.ts  # テストヘルパー関数
│   └── theme-matrix.ts           # テーマとサイズの定義
├── visual-test-server.ts         # テスト用Express サーバー
├── generate-all-tests.ts         # テストファイル自動生成スクリプト
└── README.md
```

## テスト対象

- **コンポーネント**: 全てのtanuki-uiコンポーネント
- **テーマ**: 主要な7つのテーマ（material-design, apple-liquid-glass, github-dark, windows11, macOS12, ios12, android12）
- **バリアント**: 各コンポーネントの状態（default, disabled, error等）
- **画面サイズ**: 3つのサイズ（small: 400x300, medium: 800x600, large: 1200x800）

## 新しいコンポーネントのテスト追加

1. **自動生成**: `npx tsx tests/visual/generate-all-tests.ts` を実行
2. **手動作成**: `tests/visual/components/` に新しい `.spec.ts` ファイルを作成

### 手動でテストファイルを作成する例

```typescript
import { createComponentTest } from '../utils/component-test-helper';
import { COMMON_THEMES, COMPONENT_SIZES } from '../utils/theme-matrix';

createComponentTest('YourComponent', {
  themes: COMMON_THEMES,
  variants: {
    'default': {},
    'disabled': { disabled: true },
    'custom': { customProp: 'value' }
  },
  sizes: COMPONENT_SIZES
});
```

## スクリーンショット管理

- **場所**: `test-results/` ディレクトリにスクリーンショットが保存されます
- **更新**: デザイン変更後は `npm run test:visual:update` でベースラインを更新
- **比較**: テスト実行時に現在のスクリーンショットとベースラインが比較されます

## CI/CD

このテストは手動実行用として設計されています。CI/CDでの自動実行は現在サポートされていません。

## トラブルシューティング

### テストサーバーが起動しない
- `npm run build` でライブラリをビルドしてから再試行
- ポート3000が使用中でないか確認

### スクリーンショットの差分が検出される
- デザイン変更が意図的な場合: `npm run test:visual:update` でベースラインを更新
- 予期しない変更の場合: コードの変更を確認し、問題を修正

### 特定のテーマでエラーが発生
- `public/styles/` ディレクトリに該当テーマのCSSファイルが存在するか確認
- テーマ名が `theme-matrix.ts` の定義と一致するか確認