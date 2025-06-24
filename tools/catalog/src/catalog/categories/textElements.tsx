import React from 'react';
import * as TanukiUI from 'tanuki-ui';
import { ComponentDemo } from '../types';

// Text Elements  
export const textElements: ComponentDemo[] = [
  {
    name: 'Blockquote',
    description: '引用ブロック',
    category: 'text',
    component: TanukiUI.Blockquote,
    examples: {
      basic: (
        <TanukiUI.Blockquote>
          <TanukiUI.P>これは重要な引用文です。長い引用や他の文書からの抜粋を表示する際に使用します。</TanukiUI.P>
          <TanukiUI.Cite>— 引用元の著者名</TanukiUI.Cite>
        </TanukiUI.Blockquote>
      ),
      variations: [
        (
          <TanukiUI.Blockquote cite="https://example.com/source">
            <TanukiUI.P>Web技術は日々進歩しており、開発者は常に学び続ける必要があります。</TanukiUI.P>
            <TanukiUI.Footer>
              出典: <TanukiUI.Cite>Web開発ガイド</TanukiUI.Cite>
            </TanukiUI.Footer>
          </TanukiUI.Blockquote>
        )
      ]
    }
  },
  {
    name: 'Pre',
    description: '整形済みテキスト',
    category: 'text',
    component: TanukiUI.Pre,
    examples: {
      basic: (
        <TanukiUI.Pre>
          <TanukiUI.Code>
            {`function hello() {
  console.log("Hello, World!");
}`}
          </TanukiUI.Code>
        </TanukiUI.Pre>
      ),
      variations: [
        (
          <TanukiUI.Pre>
            {`コードではない整形済みテキスト:

    項目1
    項目2
        サブ項目
    項目3`}
          </TanukiUI.Pre>
        ),
        (
          <TanukiUI.Pre style={{ fontSize: '14px', background: '#f5f5f5', padding: '10px' }}>
            <TanukiUI.Code>
              {`const data = {
  name: "太郎",
  age: 30,
  city: "東京"
};`}
            </TanukiUI.Code>
          </TanukiUI.Pre>
        )
      ]
    }
  },
  {
    name: 'Details',
    description: '詳細表示（折りたたみ可能）',
    category: 'text',
    component: TanukiUI.Details,
    examples: {
      basic: (
        <TanukiUI.Details>
          <TanukiUI.Summary>詳細を表示</TanukiUI.Summary>
          <TanukiUI.P>ここに詳細な情報が表示されます。ユーザーがクリックすることで表示/非表示を切り替えられます。</TanukiUI.P>
        </TanukiUI.Details>
      ),
      variations: [
        (
          <TanukiUI.Details open>
            <TanukiUI.Summary>最初から開いている詳細</TanukiUI.Summary>
            <TanukiUI.P>この詳細は最初から展開された状態で表示されます。</TanukiUI.P>
            <TanukiUI.Ul>
              <TanukiUI.Li>項目1</TanukiUI.Li>
              <TanukiUI.Li>項目2</TanukiUI.Li>
              <TanukiUI.Li>項目3</TanukiUI.Li>
            </TanukiUI.Ul>
          </TanukiUI.Details>
        )
      ]
    }
  },
  {
    name: 'Summary',
    description: '詳細要素のサマリー',
    category: 'text',
    component: TanukiUI.Summary,
    examples: {
      basic: (
        <TanukiUI.Details>
          <TanukiUI.Summary>
            <TanukiUI.Strong>FAQ: よくある質問</TanukiUI.Strong>
          </TanukiUI.Summary>
          <TanukiUI.P>Q: このサービスの利用料金はいくらですか？</TanukiUI.P>
          <TanukiUI.P>A: 基本プランは月額1,000円からご利用いただけます。</TanukiUI.P>
        </TanukiUI.Details>
      )
    }
  },
  
  // セマンティックテキスト要素
  {
    name: 'Abbr',
    description: '略語・頭字語',
    category: 'text',
    component: TanukiUI.Abbr,
    examples: {
      basic: (
        <TanukiUI.P>
          <TanukiUI.Abbr title="HyperText Markup Language">HTML</TanukiUI.Abbr>は、Webページを作成するためのマークアップ言語です。
        </TanukiUI.P>
      ),
      variations: [
        (
          <TanukiUI.P>
            <TanukiUI.Abbr title="Cascading Style Sheets">CSS</TanukiUI.Abbr>、
            <TanukiUI.Abbr title="JavaScript">JS</TanukiUI.Abbr>、そして
            <TanukiUI.Abbr title="Application Programming Interface">API</TanukiUI.Abbr>を学ぶことが重要です。
          </TanukiUI.P>
        )
      ]
    }
  },
  {
    name: 'Cite',
    description: '引用元・作品タイトル',
    category: 'text',
    component: TanukiUI.Cite,
    examples: {
      basic: (
        <TanukiUI.P>
          <TanukiUI.Cite>夏目漱石の「こころ」</TanukiUI.Cite>は日本文学の名作の一つです。
        </TanukiUI.P>
      ),
      variations: [
        (
          <TanukiUI.P>
            詳細については<TanukiUI.Cite>Web技術ガイドライン</TanukiUI.Cite>を参照してください。
          </TanukiUI.P>
        )
      ]
    }
  },
  {
    name: 'Dfn',
    description: '定義語',
    category: 'text',
    component: TanukiUI.Dfn,
    examples: {
      basic: (
        <TanukiUI.P>
          <TanukiUI.Dfn>React</TanukiUI.Dfn>は、ユーザーインターフェース構築のためのJavaScriptライブラリです。
        </TanukiUI.P>
      ),
      variations: [
        (
          <TanukiUI.P>
            <TanukiUI.Dfn title="Application Programming Interface">API</TanukiUI.Dfn>とは、ソフトウェア同士が情報をやり取りするためのインターフェースです。
          </TanukiUI.P>
        )
      ]
    }
  },
  {
    name: 'Kbd',
    description: 'キーボード入力',
    category: 'text',
    component: TanukiUI.Kbd,
    examples: {
      basic: (
        <TanukiUI.P>
          ファイルを保存するには <TanukiUI.Kbd>Ctrl</TanukiUI.Kbd> + <TanukiUI.Kbd>S</TanukiUI.Kbd> を押してください。
        </TanukiUI.P>
      ),
      variations: [
        (
          <TanukiUI.P>
            コピー: <TanukiUI.Kbd>Ctrl + C</TanukiUI.Kbd>、ペースト: <TanukiUI.Kbd>Ctrl + V</TanukiUI.Kbd>
          </TanukiUI.P>
        ),
        (
          <TanukiUI.P>
            Macでは <TanukiUI.Kbd>Cmd</TanukiUI.Kbd> + <TanukiUI.Kbd>Space</TanukiUI.Kbd> でSpotlightを開きます。
          </TanukiUI.P>
        )
      ]
    }
  },
  {
    name: 'Samp',
    description: 'サンプル出力',
    category: 'text',
    component: TanukiUI.Samp,
    examples: {
      basic: (
        <TanukiUI.P>
          プログラムの実行結果: <TanukiUI.Samp>Hello, World!</TanukiUI.Samp>
        </TanukiUI.P>
      ),
      variations: [
        (
          <TanukiUI.P>
            エラーメッセージ: <TanukiUI.Samp style={{ color: 'red' }}>Error: File not found</TanukiUI.Samp>
          </TanukiUI.P>
        )
      ]
    }
  },
  {
    name: 'Var',
    description: '変数名',
    category: 'text',
    component: TanukiUI.Var,
    examples: {
      basic: (
        <TanukiUI.P>
          数式: <TanukiUI.Var>x</TanukiUI.Var> + <TanukiUI.Var>y</TanukiUI.Var> = <TanukiUI.Var>z</TanukiUI.Var>
        </TanukiUI.P>
      ),
      variations: [
        (
          <TanukiUI.P>
            プログラムでは変数 <TanukiUI.Var>userName</TanukiUI.Var> にユーザー名を格納します。
          </TanukiUI.P>
        )
      ]
    }
  },
  {
    name: 'Q',
    description: 'インライン引用',
    category: 'text',
    component: TanukiUI.Q,
    examples: {
      basic: (
        <TanukiUI.P>
          彼は<TanukiUI.Q>こんにちは</TanukiUI.Q>と言いました。
        </TanukiUI.P>
      ),
      variations: [
        (
          <TanukiUI.P>
            ことわざに<TanukiUI.Q cite="https://example.com/proverbs">継続は力なり</TanukiUI.Q>とあります。
          </TanukiUI.P>
        )
      ]
    }
  },
  
  // ルビ・読み仮名要素
  {
    name: 'Ruby',
    description: 'ルビ（読み仮名）コンテナ',
    category: 'text',
    component: TanukiUI.Ruby,
    examples: {
      basic: (
        <TanukiUI.Ruby>
          漢字<TanukiUI.Rt>かんじ</TanukiUI.Rt>
        </TanukiUI.Ruby>
      ),
      variations: [
        (
          <TanukiUI.P>
            <TanukiUI.Ruby>東京<TanukiUI.Rt>とうきょう</TanukiUI.Rt></TanukiUI.Ruby>は日本の首都です。
          </TanukiUI.P>
        )
      ]
    }
  },
  {
    name: 'Rt',
    description: 'ルビテキスト（読み仮名）',
    category: 'text',
    component: TanukiUI.Rt,
    examples: {
      basic: (
        <TanukiUI.P>
          今日は<TanukiUI.Ruby>良<TanukiUI.Rt>よ</TanukiUI.Rt></TanukiUI.Ruby>い<TanukiUI.Ruby>天気<TanukiUI.Rt>てんき</TanukiUI.Rt></TanukiUI.Ruby>です。
        </TanukiUI.P>
      )
    }
  },
  
  // その他のテキスト要素
  {
    name: 'Time',
    description: '時間・日付要素',
    category: 'text',
    component: TanukiUI.Time,
    examples: {
      basic: (
        <TanukiUI.P>
          公開日: <TanukiUI.Time timestamp="2024-01-15">2024年1月15日</TanukiUI.Time>
        </TanukiUI.P>
      ),
      variations: [
        (
          <TanukiUI.P>
            会議時間: <TanukiUI.Time timestamp="2024-01-15T14:30:00">2024年1月15日 14:30</TanukiUI.Time>
          </TanukiUI.P>
        ),
        (
          <TanukiUI.P>
            所要時間: <TanukiUI.Time timestamp="PT2H30M">2時間30分</TanukiUI.Time>
          </TanukiUI.P>
        )
      ]
    }
  }
];

// Additional Elements
export const additionalElements: ComponentDemo[] = [
  {
    name: 'Address',
    description: '住所・連絡先要素',
    category: 'elements-additional',
    component: TanukiUI.Address,
    examples: {
      basic: (
        <TanukiUI.Address>
          〒100-0001
          <br />
          東京都千代田区千代田1-1
          <br />
          Tel: 03-1234-5678
        </TanukiUI.Address>
      )
    }
  },
  {
    name: 'Descriptions',
    description: '説明リスト',
    category: 'elements-additional',
    component: TanukiUI.Descriptions,
    examples: {
      basic: (
        <TanukiUI.Descriptions>
          <dt>名前</dt>
          <dd>Tanuki UI</dd>
          <dt>種類</dt>
          <dd>React UIライブラリ</dd>
          <dt>特徴</dt>
          <dd>HTMLの基本要素をそのまま使用可能</dd>
        </TanukiUI.Descriptions>
      )
    }
  }
];