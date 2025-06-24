import React from 'react';
import * as TanukiUI from 'tanuki-ui';
import { ComponentDemo } from '../types';

// Form Elements  
export const formElements: ComponentDemo[] = [
  {
    name: 'Textarea',
    description: '複数行テキスト入力',
    category: 'form',
    component: TanukiUI.Textarea,
    examples: {
      basic: <TanukiUI.Textarea placeholder="複数行のテキストを入力" rows={4} />,
      variations: [
        <TanukiUI.Textarea placeholder="大きなテキストエリア" rows={8} cols={50} />,
        <TanukiUI.Textarea placeholder="文字数制限あり" maxLength={100} />,
      ]
    }
  },
  {
    name: 'Label',
    description: 'ラベル要素',
    category: 'form', 
    component: TanukiUI.Label,
    examples: {
      basic: (
        <TanukiUI.Div>
          <TanukiUI.Label htmlFor="sample-input">ラベル名:</TanukiUI.Label>
          <TanukiUI.Input id="sample-input" placeholder="関連する入力フィールド" />
        </TanukiUI.Div>
      )
    }
  },
  {
    name: 'Fieldset',
    description: 'フィールドセット要素',
    category: 'form',
    component: TanukiUI.Fieldset,
    examples: {
      basic: (
        <TanukiUI.Fieldset>
          <TanukiUI.Legend>ユーザー情報</TanukiUI.Legend>
          <TanukiUI.Label>名前:</TanukiUI.Label>
          <TanukiUI.Input placeholder="山田太郎" />
          <br />
          <TanukiUI.Label>メール:</TanukiUI.Label>
          <TanukiUI.Input type="email" placeholder="yamada@example.com" />
        </TanukiUI.Fieldset>
      )
    }
  },
  {
    name: 'Selectbox',
    description: 'セレクトボックス',
    category: 'form',
    component: TanukiUI.Selectbox,
    examples: {
      basic: (
        <TanukiUI.Selectbox>
          <TanukiUI.Option value="">選択してください</TanukiUI.Option>
          <TanukiUI.Option value="option1">オプション1</TanukiUI.Option>
          <TanukiUI.Option value="option2">オプション2</TanukiUI.Option>
          <TanukiUI.Option value="option3">オプション3</TanukiUI.Option>
        </TanukiUI.Selectbox>
      ),
      variations: [
        (
          <TanukiUI.Selectbox multiple>
            <TanukiUI.Optgroup label="果物">
              <TanukiUI.Option value="apple">りんご</TanukiUI.Option>
              <TanukiUI.Option value="banana">バナナ</TanukiUI.Option>
              <TanukiUI.Option value="orange">オレンジ</TanukiUI.Option>
            </TanukiUI.Optgroup>
            <TanukiUI.Optgroup label="その他">
              <TanukiUI.Option value="grape">ぶどう</TanukiUI.Option>
            </TanukiUI.Optgroup>
          </TanukiUI.Selectbox>
        )
      ]
    }
  },
  {
    name: 'Progress',
    description: 'プログレスバー',
    category: 'form',
    component: TanukiUI.Progress,
    examples: {
      basic: (
        <TanukiUI.Div>
          <TanukiUI.Label>進捗: 70%</TanukiUI.Label>
          <TanukiUI.Progress value={70} max={100} />
        </TanukiUI.Div>
      ),
      variations: [
        (
          <TanukiUI.Div>
            <TanukiUI.Label>読み込み中...</TanukiUI.Label>
            <TanukiUI.Progress />
          </TanukiUI.Div>
        )
      ]
    }
  },
  {
    name: 'Meter',
    description: 'メーター（数値の範囲表示）',
    category: 'form',
    component: TanukiUI.Meter,
    examples: {
      basic: (
        <TanukiUI.Div>
          <TanukiUI.Label>スコア: 6/10</TanukiUI.Label>
          <TanukiUI.Meter value={6} min={0} max={10} />
        </TanukiUI.Div>
      ),
      variations: [
        (
          <TanukiUI.Div>
            <TanukiUI.Label>ディスク使用量: 8GB/10GB</TanukiUI.Label>
            <TanukiUI.Meter value={8} min={0} max={10} high={9} optimum={3} />
          </TanukiUI.Div>
        )
      ]
    }
  },
  {
    name: 'EditableLabel',
    description: '編集可能ラベル（カスタム要素）',
    category: 'form',
    component: TanukiUI.EditableLabel,
    examples: {
      basic: (
        <TanukiUI.EditableLabel 
          defaultValue="編集可能なテキスト（クリックして編集）"
        />
      )
    }
  }
];

// Additional Form Elements
export const additionalFormElements: ComponentDemo[] = [
  {
    name: 'Form',
    description: 'フォーム要素',
    category: 'form-additional',
    component: TanukiUI.Form,
    examples: {
      basic: (
        <TanukiUI.Form 
          onSubmit={(e: React.FormEvent) => { 
            e.preventDefault(); 
            alert('フォームが送信されました'); 
          }}
        >
          <TanukiUI.Label>名前:</TanukiUI.Label>
          <TanukiUI.Input name="name" placeholder="名前を入力" required />
          <br />
          <TanukiUI.Label>メール:</TanukiUI.Label>
          <TanukiUI.Input type="email" name="email" placeholder="email@example.com" />
          <br />
          <TanukiUI.Button type="submit">送信</TanukiUI.Button>
        </TanukiUI.Form>
      )
    }
  },
  {
    name: 'Legend',
    description: 'フィールドセット説明',
    category: 'form-additional',
    component: TanukiUI.Legend,
    examples: {
      basic: (
        <TanukiUI.Fieldset>
          <TanukiUI.Legend>個人情報</TanukiUI.Legend>
          <TanukiUI.Input placeholder="氏名" />
          <br />
          <TanukiUI.Input placeholder="メールアドレス" type="email" />
        </TanukiUI.Fieldset>
      )
    }
  },
  {
    name: 'Optgroup',
    description: 'オプショングループ（標準select使用）',
    category: 'form-additional',
    component: TanukiUI.Optgroup,
    examples: {
      basic: (
        <select>
          <TanukiUI.Optgroup label="果物">
            <TanukiUI.Option value="apple">りんご</TanukiUI.Option>
            <TanukiUI.Option value="banana">バナナ</TanukiUI.Option>
          </TanukiUI.Optgroup>
          <TanukiUI.Optgroup label="野菜">
            <TanukiUI.Option value="carrot">にんじん</TanukiUI.Option>
            <TanukiUI.Option value="lettuce">レタス</TanukiUI.Option>
          </TanukiUI.Optgroup>
        </select>
      )
    }
  },
  {
    name: 'Output',
    description: '出力要素',
    category: 'form-additional',
    component: TanukiUI.Output,
    examples: {
      basic: (
        <div>
          <TanukiUI.Input 
            type="number" 
            id="input1" 
            defaultValue={10}
            onChange={() => {}}
          />
          {' + '}
          <TanukiUI.Input 
            type="number" 
            id="input2" 
            defaultValue={20}
            onChange={() => {}}
          />
          {' = '}
          <TanukiUI.Output 
            name="result" 
            htmlFor="input1 input2"
          >
            30
          </TanukiUI.Output>
        </div>
      )
    }
  }
];