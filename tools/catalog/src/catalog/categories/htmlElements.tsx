import React from 'react';
import * as TanukiUI from 'tanuki-ui';
import { ComponentDemo } from '../types';

// HTML Elements
export const htmlElements: ComponentDemo[] = [
  // ヘディング要素
  {
    name: 'H1',
    description: 'メインヘディング要素',
    category: 'elements',
    component: TanukiUI.H1,
    examples: {
      basic: <TanukiUI.H1>メインタイトル</TanukiUI.H1>,
      variations: [
        <TanukiUI.H2>サブタイトル</TanukiUI.H2>,
        <TanukiUI.H3>見出し3</TanukiUI.H3>,
        <TanukiUI.H4>見出し4</TanukiUI.H4>,
        <TanukiUI.H5>見出し5</TanukiUI.H5>,
        <TanukiUI.H6>見出し6</TanukiUI.H6>,
      ]
    }
  },
  
  // 基本テキスト要素
  {
    name: 'P',
    description: '段落要素',
    category: 'elements',
    component: TanukiUI.P,
    examples: {
      basic: <TanukiUI.P>これは段落テキストです。HTMLの p 要素と同じように使用できます。</TanukiUI.P>
    }
  },
  {
    name: 'Div',
    description: '汎用コンテナ要素',
    category: 'elements',
    component: TanukiUI.Div,
    examples: {
      basic: (
        <TanukiUI.Div>
          <TanukiUI.P>Divコンテナ内のコンテンツ</TanukiUI.P>
          <TanukiUI.P>複数の要素をグループ化できます</TanukiUI.P>
        </TanukiUI.Div>
      )
    }
  },
  {
    name: 'Span',
    description: 'インライン汎用要素',
    category: 'elements',
    component: TanukiUI.Span,
    examples: {
      basic: (
        <TanukiUI.P>
          インラインの<TanukiUI.Span style={{ color: 'var(--linkColor)' }}>一部だけを装飾</TanukiUI.Span>するときに利用します。
        </TanukiUI.P>
      )
    }
  },
  
  // 区切り要素  
  {
    name: 'Hr',
    description: '水平区切り線',
    category: 'elements',
    component: TanukiUI.Hr,
    examples: {
      basic: (
        <TanukiUI.Div>
          <TanukiUI.P>上のセクション</TanukiUI.P>
          <TanukiUI.Hr />
          <TanukiUI.P>下のセクション</TanukiUI.P>
        </TanukiUI.Div>
      )
    }
  },
  {
    name: 'Br',
    description: '改行要素',
    category: 'elements',
    component: TanukiUI.Br,
    examples: {
      basic: (
        <TanukiUI.P>
          一行目 <TanukiUI.Br /> 二行目
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'Wbr',
    description: '部分改行ヒント',
    category: 'elements',
    component: TanukiUI.Wbr,
    examples: {
      basic: (
        <TanukiUI.P style={{ maxWidth: '220px' }}>
          非常に長い単語の中で<TanukiUI.Wbr />適切に改行されます
        </TanukiUI.P>
      )
    }
  },
  
  // テキスト装飾要素
  {
    name: 'Strong',
    description: '重要なテキスト（太字）',
    category: 'elements',
    component: TanukiUI.Strong,
    examples: {
      basic: (
        <TanukiUI.P>
          これは<TanukiUI.Strong>重要な</TanukiUI.Strong>メッセージです。
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'B',
    description: '太字テキスト (物理的強調)',
    category: 'elements',
    component: TanukiUI.B,
    examples: {
      basic: (
        <TanukiUI.P>
          <TanukiUI.B>強調したい語</TanukiUI.B>を視覚的に太字にします。
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'Em',
    description: '強調テキスト（斜体）',
    category: 'elements',
    component: TanukiUI.Em,
    examples: {
      basic: (
        <TanukiUI.P>
          これは<TanukiUI.Em>強調された</TanukiUI.Em>テキストです。
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'I',
    description: '斜体テキスト (物理的強調)',
    category: 'elements',
    component: TanukiUI.I,
    examples: {
      basic: (
        <TanukiUI.P>
          書籍名などに<TanukiUI.I>イタリック体</TanukiUI.I>を用いるケースに適しています。
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'U',
    description: '下線付きテキスト',
    category: 'elements',
    component: TanukiUI.U,
    examples: {
      basic: (
        <TanukiUI.P>
          手書きの<TanukiUI.U>署名風</TanukiUI.U>など特定の表現に使用します。
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'S',
    description: '取り消し線付きテキスト',
    category: 'elements',
    component: TanukiUI.S,
    examples: {
      basic: (
        <TanukiUI.P>
          <TanukiUI.S>旧価格</TanukiUI.S> 新価格 2,480円
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'Small',
    description: '小さいテキスト',
    category: 'elements',
    component: TanukiUI.Small,
    examples: {
      basic: (
        <TanukiUI.P>
          通常のテキスト <TanukiUI.Small>(小さな注釈)</TanukiUI.Small>
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'Mark',
    description: 'ハイライトされたテキスト',
    category: 'elements',
    component: TanukiUI.Mark,
    examples: {
      basic: (
        <TanukiUI.P>
          この<TanukiUI.Mark>ハイライトされた部分</TanukiUI.Mark>に注目してください。
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'Del',
    description: '削除されたテキスト',
    category: 'elements',
    component: TanukiUI.Del,
    examples: {
      basic: (
        <TanukiUI.P>
          <TanukiUI.Del>削除されたテキスト</TanukiUI.Del> 新しいテキスト
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'Ins',
    description: '挿入されたテキスト',
    category: 'elements',
    component: TanukiUI.Ins,
    examples: {
      basic: (
        <TanukiUI.P>
          既存のテキスト <TanukiUI.Ins>挿入されたテキスト</TanukiUI.Ins>
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'Sub',
    description: '下付き文字',
    category: 'elements',
    component: TanukiUI.Sub,
    examples: {
      basic: (
        <TanukiUI.P>
          H<TanukiUI.Sub>2</TanukiUI.Sub>O (水の化学式)
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'Sup',
    description: '上付き文字',
    category: 'elements',
    component: TanukiUI.Sup,
    examples: {
      basic: (
        <TanukiUI.P>
          E = mc<TanukiUI.Sup>2</TanukiUI.Sup> (アインシュタインの方程式)
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'Code',
    description: 'インラインコード',
    category: 'elements',
    component: TanukiUI.Code,
    examples: {
      basic: (
        <TanukiUI.P>
          <TanukiUI.Code>console.log()</TanukiUI.Code> を使ってログを出力します。
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'Kbd',
    description: 'キーボード入力',
    category: 'elements',
    component: TanukiUI.Kbd,
    examples: {
      basic: (
        <TanukiUI.P>
          ファイルを保存するには <TanukiUI.Kbd>Ctrl</TanukiUI.Kbd> + <TanukiUI.Kbd>S</TanukiUI.Kbd> を押してください。
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'Samp',
    description: 'サンプル出力',
    category: 'elements',
    component: TanukiUI.Samp,
    examples: {
      basic: (
        <TanukiUI.P>
          プログラムの実行結果: <TanukiUI.Samp>Hello, World!</TanukiUI.Samp>
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'Var',
    description: '変数名',
    category: 'elements',
    component: TanukiUI.Var,
    examples: {
      basic: (
        <TanukiUI.P>
          数式: <TanukiUI.Var>x</TanukiUI.Var> + <TanukiUI.Var>y</TanukiUI.Var> = <TanukiUI.Var>z</TanukiUI.Var>
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'Abbr',
    description: '略語・頭字語',
    category: 'elements',
    component: TanukiUI.Abbr,
    examples: {
      basic: (
        <TanukiUI.P>
          <TanukiUI.Abbr title="HyperText Markup Language">HTML</TanukiUI.Abbr>は、Webページを作成するためのマークアップ言語です。
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'Cite',
    description: '引用元・作品タイトル',
    category: 'elements',
    component: TanukiUI.Cite,
    examples: {
      basic: (
        <TanukiUI.P>
          <TanukiUI.Cite>夏目漱石の「こころ」</TanukiUI.Cite>は日本文学の名作の一つです。
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'Dfn',
    description: '定義語',
    category: 'elements',
    component: TanukiUI.Dfn,
    examples: {
      basic: (
        <TanukiUI.P>
          <TanukiUI.Dfn>React</TanukiUI.Dfn>は、ユーザーインターフェース構築のためのJavaScriptライブラリです。
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'Q',
    description: 'インライン引用',
    category: 'elements',
    component: TanukiUI.Q,
    examples: {
      basic: (
        <TanukiUI.P>
          彼は<TanukiUI.Q>こんにちは</TanukiUI.Q>と言いました。
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'Ruby',
    description: 'ルビ（読み仮名）コンテナ',
    category: 'elements',
    component: TanukiUI.Ruby,
    examples: {
      basic: (
        <TanukiUI.Ruby>
          漢字<TanukiUI.Rt>かんじ</TanukiUI.Rt>
        </TanukiUI.Ruby>
      )
    }
  },
  {
    name: 'Rt',
    description: 'ルビテキスト（読み仮名）',
    category: 'elements',
    component: TanukiUI.Rt,
    examples: {
      basic: (
        <TanukiUI.P>
          この<TanukiUI.Ruby>漢字<TanukiUI.Rt>かんじ</TanukiUI.Rt></TanukiUI.Ruby>にはルビがついています。
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'Bdi',
    description: '双方向テキスト分離要素',
    category: 'elements',
    component: TanukiUI.Bdi,
    examples: {
      basic: (
        <TanukiUI.P>
          ユーザー名: <TanukiUI.Bdi dir="auto">مثال</TanukiUI.Bdi>
        </TanukiUI.P>
      )
    }
  },
  {
    name: 'Bdo',
    description: 'テキストの書字方向を指定',
    category: 'elements',
    component: TanukiUI.Bdo,
    examples: {
      basic: (
        <TanukiUI.P>
          標準: مثال / 強制: <TanukiUI.Bdo dir="rtl">مثال</TanukiUI.Bdo>
        </TanukiUI.P>
      )
    }
  },
  
  // リンク要素
  {
    name: 'A',
    description: 'アンカー（リンク）要素',
    category: 'elements',
    component: TanukiUI.A,
    examples: {
      basic: <TanukiUI.A href="#">リンクテキスト</TanukiUI.A>,
      variations: [
        <TanukiUI.A href="#" target="_blank">外部リンク</TanukiUI.A>,
        <TanukiUI.A href="mailto:test@example.com">メールリンク</TanukiUI.A>,
        <TanukiUI.A href="tel:+81-3-1234-5678">電話リンク</TanukiUI.A>,
      ]
    }
  },
  
  // セマンティック要素
  {
    name: 'Article',
    description: '記事要素',
    category: 'elements',
    component: TanukiUI.Article,
    examples: {
      basic: (
        <TanukiUI.Article>
          <TanukiUI.H2>記事タイトル</TanukiUI.H2>
          <TanukiUI.P>記事の内容です。独立したコンテンツとして配布可能な要素です。</TanukiUI.P>
        </TanukiUI.Article>
      )
    }
  },
  {
    name: 'Section',
    description: 'セクション要素',
    category: 'elements',
    component: TanukiUI.Section,
    examples: {
      basic: (
        <TanukiUI.Section>
          <TanukiUI.H3>セクションタイトル</TanukiUI.H3>
          <TanukiUI.P>セクションの内容です。テーマ的にグループ化された内容を表します。</TanukiUI.P>
        </TanukiUI.Section>
      )
    }
  },
  {
    name: 'Nav',
    description: 'ナビゲーション要素',
    category: 'elements',
    component: TanukiUI.Nav,
    examples: {
      basic: (
        <TanukiUI.Nav>
          <TanukiUI.A href="#">ホーム</TanukiUI.A> | <TanukiUI.A href="#">サービス</TanukiUI.A> | <TanukiUI.A href="#">会社情報</TanukiUI.A>
        </TanukiUI.Nav>
      )
    }
  },
  {
    name: 'Header',
    description: 'ヘッダー要素',
    category: 'elements',
    component: TanukiUI.Header,
    examples: {
      basic: (
        <TanukiUI.Header>
          <TanukiUI.H1>サイトタイトル</TanukiUI.H1>
          <TanukiUI.P>サイトの説明やキャッチフレーズ</TanukiUI.P>
        </TanukiUI.Header>
      )
    }
  },
  {
    name: 'Footer',
    description: 'フッター要素',
    category: 'elements',
    component: TanukiUI.Footer,
    examples: {
      basic: (
        <TanukiUI.Footer>
          <TanukiUI.P>© 2024 Company Name. All rights reserved.</TanukiUI.P>
          <TanukiUI.P>プライバシーポリシー | 利用規約</TanukiUI.P>
        </TanukiUI.Footer>
      )
    }
  },
  {
    name: 'Main',
    description: 'メイン要素',
    category: 'elements',
    component: TanukiUI.Main,
    examples: {
      basic: (
        <TanukiUI.Main>
          <TanukiUI.H2>メインコンテンツ</TanukiUI.H2>
          <TanukiUI.P>ページの主要なコンテンツエリアです。</TanukiUI.P>
        </TanukiUI.Main>
      )
    }
  },
  {
    name: 'Aside',
    description: 'サイドバー要素',
    category: 'elements',
    component: TanukiUI.Aside,
    examples: {
      basic: (
        <TanukiUI.Aside>
          <TanukiUI.H4>サイドバー</TanukiUI.H4>
          <TanukiUI.P>補足情報やナビゲーション、広告などを配置します。</TanukiUI.P>
        </TanukiUI.Aside>
      )
    }
  },
  
  // フォーム要素（基本）
  {
    name: 'Button',
    description: 'ボタン要素',
    category: 'form',
    component: TanukiUI.Button,
    examples: {
      basic: <TanukiUI.Button>ボタン</TanukiUI.Button>,
      variations: [
        <TanukiUI.Button type="submit">送信</TanukiUI.Button>,
        <TanukiUI.Button type="reset">リセット</TanukiUI.Button>,
        <TanukiUI.Button disabled>無効</TanukiUI.Button>,
      ]
    }
  },
  {
    name: 'Input',
    description: '入力要素',
    category: 'form',
    component: TanukiUI.Input,
    examples: {
      basic: <TanukiUI.Input placeholder="テキストを入力" />,
      variations: [
        <TanukiUI.Input type="email" placeholder="email@example.com" />,
        <TanukiUI.Input type="password" placeholder="パスワード" />,
        <TanukiUI.Input type="number" placeholder="数値" min={0} max={100} />,
        <TanukiUI.Input type="search" placeholder="検索..." />,
        <TanukiUI.Input type="tel" placeholder="電話番号" />,
        <TanukiUI.Input type="url" placeholder="https://example.com" />,
        <TanukiUI.Input type="date" />,
        <TanukiUI.Input type="time" />,
        <TanukiUI.Input type="color" defaultValue="#ff0000" />,
        <TanukiUI.Input type="range" min={0} max={100} defaultValue={50} />,
      ]
    }
  }
];
