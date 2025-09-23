import React from 'react';
import * as TanukiUI from 'tanuki-ui';
import { DemoCard, DemoStack } from '../../components/DemoLayouts';
import { ComponentDemo } from '../types';

// List Elements
export const listElements: ComponentDemo[] = [
  // 順序なしリスト
  {
    name: 'Ul',
    description: '順序なしリスト',
    category: 'lists',
    component: TanukiUI.Ul,
    examples: {
      basic: (
        <TanukiUI.Ul>
          <TanukiUI.Li>最初のアイテム</TanukiUI.Li>
          <TanukiUI.Li>2番目のアイテム</TanukiUI.Li>
          <TanukiUI.Li>3番目のアイテム</TanukiUI.Li>
        </TanukiUI.Ul>
      ),
      variations: [
        (
          <TanukiUI.Ul>
            <TanukiUI.Li>
              ネストされたリスト
              <TanukiUI.Ul>
                <TanukiUI.Li>子アイテム1</TanukiUI.Li>
                <TanukiUI.Li>子アイテム2</TanukiUI.Li>
              </TanukiUI.Ul>
            </TanukiUI.Li>
            <TanukiUI.Li>通常のアイテム</TanukiUI.Li>
          </TanukiUI.Ul>
        )
      ]
    }
  },
  
  // 順序ありリスト
  {
    name: 'Ol',
    description: '順序ありリスト',
    category: 'lists',
    component: TanukiUI.Ol,
    examples: {
      basic: (
        <TanukiUI.Ol>
          <TanukiUI.Li>第1ステップ</TanukiUI.Li>
          <TanukiUI.Li>第2ステップ</TanukiUI.Li>
          <TanukiUI.Li>第3ステップ</TanukiUI.Li>
        </TanukiUI.Ol>
      ),
      variations: [
        (
          <TanukiUI.Ol type="A">
            <TanukiUI.Li>オプションA</TanukiUI.Li>
            <TanukiUI.Li>オプションB</TanukiUI.Li>
            <TanukiUI.Li>オプションC</TanukiUI.Li>
          </TanukiUI.Ol>
        ),
        (
          <TanukiUI.Ol type="i" start={5}>
            <TanukiUI.Li>5番目から開始</TanukiUI.Li>
            <TanukiUI.Li>6番目</TanukiUI.Li>
            <TanukiUI.Li>7番目</TanukiUI.Li>
          </TanukiUI.Ol>
        )
      ]
    }
  },
  
  // 説明リスト要素
  {
    name: 'Dd',
    description: '説明・定義',
    category: 'lists',
    component: TanukiUI.Dd,
    examples: {
      basic: (
        <TanukiUI.Dl>
          <TanukiUI.Dt>HTML</TanukiUI.Dt>
          <TanukiUI.Dd>HyperText Markup Language - Webページを記述するためのマークアップ言語</TanukiUI.Dd>
          <TanukiUI.Dt>CSS</TanukiUI.Dt>
          <TanukiUI.Dd>Cascading Style Sheets - Webページのスタイルを定義する言語</TanukiUI.Dd>
        </TanukiUI.Dl>
      )
    }
  },
  {
    name: 'Dt',
    description: '用語・項目名',
    category: 'lists',
    component: TanukiUI.Dt,
    examples: {
      basic: (
        <TanukiUI.Dl>
          <TanukiUI.Dt>React</TanukiUI.Dt>
          <TanukiUI.Dd>ユーザーインターフェース構築のためのJavaScriptライブラリ</TanukiUI.Dd>
          <TanukiUI.Dt>Vue.js</TanukiUI.Dt>
          <TanukiUI.Dd>プログレッシブフレームワーク</TanukiUI.Dd>
        </TanukiUI.Dl>
      )
    }
  },
  
  // リストアイテム（単体では意味を持たないので親要素と組み合わせ）
  {
    name: 'Li',
    description: 'リストアイテム',
    category: 'lists',
    component: TanukiUI.Li,
    examples: {
      basic: (
        <TanukiUI.Ul>
          <TanukiUI.Li>リストアイテムの例</TanukiUI.Li>
          <TanukiUI.Li>
            リンクを含むアイテム: <TanukiUI.A href="#">リンク</TanukiUI.A>
          </TanukiUI.Li>
          <TanukiUI.Li>
            <TanukiUI.Strong>重要なアイテム</TanukiUI.Strong>
          </TanukiUI.Li>
        </TanukiUI.Ul>
      )
    }
  },
  
  // テーブル要素群
  {
    name: 'Table',
    description: 'テーブル要素',
    category: 'lists',
    component: TanukiUI.Table,
    examples: {
      basic: (
        <TanukiUI.Table>
          <TanukiUI.Caption>サンプルテーブル</TanukiUI.Caption>
          <tr>
            <TanukiUI.Th>名前</TanukiUI.Th>
            <TanukiUI.Th>年齢</TanukiUI.Th>
            <TanukiUI.Th>職業</TanukiUI.Th>
          </tr>
          <tr>
            <TanukiUI.Td>山田太郎</TanukiUI.Td>
            <TanukiUI.Td>30</TanukiUI.Td>
            <TanukiUI.Td>エンジニア</TanukiUI.Td>
          </tr>
          <tr>
            <TanukiUI.Td>佐藤花子</TanukiUI.Td>
            <TanukiUI.Td>25</TanukiUI.Td>
            <TanukiUI.Td>デザイナー</TanukiUI.Td>
          </tr>
        </TanukiUI.Table>
      )
    }
  },
  
  {
    name: 'Th',
    description: 'テーブルヘッダーセル',
    category: 'lists',
    component: TanukiUI.Th,
    examples: {
      basic: (
        <TanukiUI.Table>
          <tr>
            <TanukiUI.Th scope="col">列ヘッダー1</TanukiUI.Th>
            <TanukiUI.Th scope="col">列ヘッダー2</TanukiUI.Th>
          </tr>
          <tr>
            <TanukiUI.Th scope="row">行ヘッダー</TanukiUI.Th>
            <TanukiUI.Td>データ</TanukiUI.Td>
          </tr>
        </TanukiUI.Table>
      )
    }
  },
  
  {
    name: 'Td',
    description: 'テーブルデータセル',
    category: 'lists',
    component: TanukiUI.Td,
    examples: {
      basic: (
        <TanukiUI.Table>
          <tr>
            <TanukiUI.Td>通常のデータ</TanukiUI.Td>
            <TanukiUI.Td>
              <TanukiUI.A href="#">リンク付きデータ</TanukiUI.A>
            </TanukiUI.Td>
            <TanukiUI.Td>
              <TanukiUI.Strong>強調データ</TanukiUI.Strong>
            </TanukiUI.Td>
          </tr>
        </TanukiUI.Table>
      )
    }
  },
  
  {
    name: 'Caption',
    description: 'テーブルキャプション',
    category: 'lists',
    component: TanukiUI.Caption,
    examples: {
      basic: (
        <TanukiUI.Table>
          <TanukiUI.Caption>月次売上データ（2024年）</TanukiUI.Caption>
          <tr>
            <TanukiUI.Th>月</TanukiUI.Th>
            <TanukiUI.Th>売上</TanukiUI.Th>
          </tr>
          <tr>
            <TanukiUI.Td>1月</TanukiUI.Td>
            <TanukiUI.Td>100万円</TanukiUI.Td>
          </tr>
        </TanukiUI.Table>
      )
    }
  },
  
  // データリスト（HTML標準）
  {
    name: 'DataList',
    description: 'データリスト（入力候補）',
    category: 'lists',
    component: TanukiUI.DataList,
    examples: {
      basic: (
        <TanukiUI.Div>
          <TanukiUI.Label htmlFor="browser-choice">ブラウザを選択:</TanukiUI.Label>
          <TanukiUI.Input 
            list="browsers" 
            id="browser-choice"
            placeholder="ブラウザ名を入力または選択"
          />
          <TanukiUI.DataList id="browsers">
            <TanukiUI.Option value="Chrome" />
            <TanukiUI.Option value="Firefox" />
            <TanukiUI.Option value="Safari" />
            <TanukiUI.Option value="Edge" />
          </TanukiUI.DataList>
        </TanukiUI.Div>
      )
    }
  },
  
];
