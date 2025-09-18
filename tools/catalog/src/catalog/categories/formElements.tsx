import React from 'react';
import * as TanukiUI from 'tanuki-ui';
import { DemoRow, DemoStack, DemoCard } from '../../components/DemoLayouts';
import { ComponentDemo } from '../types';
import { specialGuides } from '../specialGuides';

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
        <DemoCard>
          <TanukiUI.Fieldset>
            <TanukiUI.Legend>ユーザー情報</TanukiUI.Legend>
            <DemoStack>
              <DemoRow>
                <TanukiUI.Label htmlFor="fieldset-name">名前:</TanukiUI.Label>
                <TanukiUI.Input id="fieldset-name" placeholder="山田太郎" />
              </DemoRow>
              <DemoRow>
                <TanukiUI.Label htmlFor="fieldset-email">メール:</TanukiUI.Label>
                <TanukiUI.Input id="fieldset-email" type="email" placeholder="yamada@example.com" />
              </DemoRow>
            </DemoStack>
          </TanukiUI.Fieldset>
        </DemoCard>
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
        <DemoStack>
          <TanukiUI.Label>進捗: 70%</TanukiUI.Label>
          <TanukiUI.Progress value={70} max={100} />
        </DemoStack>
      ),
      variations: [
        (
          <DemoStack>
            <TanukiUI.Label>読み込み中...</TanukiUI.Label>
            <TanukiUI.Progress />
          </DemoStack>
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
        <DemoStack>
          <TanukiUI.Label>スコア: 6/10</TanukiUI.Label>
          <TanukiUI.Meter value={6} min={0} max={10} />
        </DemoStack>
      ),
      variations: [
        (
          <DemoStack>
            <TanukiUI.Label>ディスク使用量: 8GB/10GB</TanukiUI.Label>
            <TanukiUI.Meter value={8} min={0} max={10} high={9} optimum={3} />
          </DemoStack>
        )
      ]
    }
  },
  {
    name: 'EditableLabel',
    description: '編集可能ラベル（カスタム要素）',
    category: 'form',
    component: TanukiUI.EditableLabel,
    meta: {
      title: 'EditableLabel',
      category: 'form',
      description: 'その場でテキストを書き換えられるラベルコンポーネント',
      guide: specialGuides.EditableLabel,
    },
    examples: {
      basic: (
        <DemoCard>
          <TanukiUI.P>ダブルクリックまたは Enter で確定できます。</TanukiUI.P>
          <TanukiUI.EditableLabel 
            defaultValue="編集可能なテキスト（クリックして編集）"
          />
        </DemoCard>
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
        <DemoCard>
          <TanukiUI.Form 
            onSubmit={(e: React.FormEvent) => { 
              e.preventDefault(); 
              alert('フォームが送信されました'); 
            }}
          >
            <DemoStack>
              <DemoRow>
                <TanukiUI.Label htmlFor="form-name">名前:</TanukiUI.Label>
                <TanukiUI.Input id="form-name" name="name" placeholder="名前を入力" required />
              </DemoRow>
              <DemoRow>
                <TanukiUI.Label htmlFor="form-email">メール:</TanukiUI.Label>
                <TanukiUI.Input id="form-email" type="email" name="email" placeholder="email@example.com" />
              </DemoRow>
              <DemoRow>
                <TanukiUI.Button type="submit">送信</TanukiUI.Button>
              </DemoRow>
            </DemoStack>
          </TanukiUI.Form>
        </DemoCard>
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
        <DemoCard>
          <TanukiUI.Fieldset>
            <TanukiUI.Legend>個人情報</TanukiUI.Legend>
            <DemoStack>
              <TanukiUI.Input placeholder="氏名" />
              <TanukiUI.Input placeholder="メールアドレス" type="email" />
            </DemoStack>
          </TanukiUI.Fieldset>
        </DemoCard>
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
        <DemoRow>
          <TanukiUI.Selectbox>
            <TanukiUI.Optgroup label="果物">
              <TanukiUI.Option value="apple">りんご</TanukiUI.Option>
              <TanukiUI.Option value="banana">バナナ</TanukiUI.Option>
            </TanukiUI.Optgroup>
            <TanukiUI.Optgroup label="野菜">
              <TanukiUI.Option value="carrot">にんじん</TanukiUI.Option>
              <TanukiUI.Option value="lettuce">レタス</TanukiUI.Option>
            </TanukiUI.Optgroup>
          </TanukiUI.Selectbox>
        </DemoRow>
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
        <DemoRow>
          <TanukiUI.Input 
            type="number" 
            id="output-input1" 
            defaultValue={10}
            onChange={() => {}}
          />
          {' + '}
          <TanukiUI.Input 
            type="number" 
            id="output-input2" 
            defaultValue={20}
            onChange={() => {}}
          />
          {' = '}
          <TanukiUI.Output 
            name="result" 
            htmlFor="output-input1 output-input2"
          >
            30
          </TanukiUI.Output>
        </DemoRow>
      )
    }
  }
];
