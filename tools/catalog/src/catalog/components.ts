// Manual component catalog definition
import React from 'react';
import * as TanukiUI from 'tanuki-ui';
import NodeEditorShowcase from '../components/NodeEditorShowcase';

export interface ComponentDemo {
  name: string;
  description: string;
  category: string;
  component: React.ComponentType<any>;
  examples: {
    basic: React.ReactNode;
    variations?: React.ReactNode[];
  };
  props?: Array<{
    name: string;
    type: string;
    description?: string;
    required?: boolean;
  }>;
}

export interface CategoryInfo {
  name: string;
  description: string;
  icon: string;
  components: ComponentDemo[];
}

// HTML Elements
const htmlElements: ComponentDemo[] = [
  // ヘディング要素
  {
    name: 'H1',
    description: 'メインヘディング要素',
    category: 'elements',
    component: TanukiUI.H1,
    examples: {
      basic: React.createElement(TanukiUI.H1, {}, 'メインタイトル'),
      variations: [
        React.createElement(TanukiUI.H2, {}, 'サブタイトル'),
        React.createElement(TanukiUI.H3, {}, '見出し3'),
        React.createElement(TanukiUI.H4, {}, '見出し4'),
        React.createElement(TanukiUI.H5, {}, '見出し5'),
        React.createElement(TanukiUI.H6, {}, '見出し6'),
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
      basic: React.createElement(TanukiUI.P, {}, 'これは段落テキストです。HTMLの p 要素と同じように使用できます。')
    }
  },
  {
    name: 'Div',
    description: '汎用コンテナ要素',
    category: 'elements',
    component: TanukiUI.Div,
    examples: {
      basic: React.createElement(TanukiUI.Div, {},
        React.createElement(TanukiUI.P, {}, 'Divコンテナ内のコンテンツ'),
        React.createElement(TanukiUI.P, {}, '複数の要素をグループ化できます')
      )
    }
  },
  {
    name: 'Span',
    description: 'インライン汎用要素',
    category: 'elements',
    component: TanukiUI.Span,
    examples: {
      basic: React.createElement(TanukiUI.P, {},
        'これは',
        React.createElement(TanukiUI.Span, { style: { fontWeight: 'bold' } }, '重要な'),
        'テキストです。'
      )
    }
  },
  
  // 改行・区切り要素  
  {
    name: 'Br',
    description: '改行要素',
    category: 'elements',
    component: TanukiUI.Br,
    examples: {
      basic: React.createElement(TanukiUI.P, {},
        '1行目',
        React.createElement(TanukiUI.Br),
        '2行目',
        React.createElement(TanukiUI.Br),
        '3行目'
      )
    }
  },
  {
    name: 'Hr',
    description: '水平区切り線',
    category: 'elements',
    component: TanukiUI.Hr,
    examples: {
      basic: React.createElement(TanukiUI.Div, {},
        React.createElement(TanukiUI.P, {}, '上のセクション'),
        React.createElement(TanukiUI.Hr),
        React.createElement(TanukiUI.P, {}, '下のセクション')
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
      basic: React.createElement(TanukiUI.P, {},
        'これは',
        React.createElement(TanukiUI.Strong, {}, '重要な'),
        'メッセージです。'
      )
    }
  },
  {
    name: 'Em',
    description: '強調テキスト（斜体）',
    category: 'elements',
    component: TanukiUI.Em,
    examples: {
      basic: React.createElement(TanukiUI.P, {},
        'これは',
        React.createElement(TanukiUI.Em, {}, '強調された'),
        'テキストです。'
      )
    }
  },
  {
    name: 'Small',
    description: '小さいテキスト',
    category: 'elements',
    component: TanukiUI.Small,
    examples: {
      basic: React.createElement(TanukiUI.P, {},
        '通常のテキスト ',
        React.createElement(TanukiUI.Small, {}, '(小さな注釈)')
      )
    }
  },
  {
    name: 'Mark',
    description: 'ハイライトされたテキスト',
    category: 'elements',
    component: TanukiUI.Mark,
    examples: {
      basic: React.createElement(TanukiUI.P, {},
        'この',
        React.createElement(TanukiUI.Mark, {}, 'ハイライトされた部分'),
        'に注目してください。'
      )
    }
  },
  {
    name: 'Del',
    description: '削除されたテキスト',
    category: 'elements',
    component: TanukiUI.Del,
    examples: {
      basic: React.createElement(TanukiUI.P, {},
        React.createElement(TanukiUI.Del, {}, '削除されたテキスト'),
        ' 新しいテキスト'
      )
    }
  },
  {
    name: 'Ins',
    description: '挿入されたテキスト',
    category: 'elements',
    component: TanukiUI.Ins,
    examples: {
      basic: React.createElement(TanukiUI.P, {},
        '既存のテキスト ',
        React.createElement(TanukiUI.Ins, {}, '挿入されたテキスト')
      )
    }
  },
  {
    name: 'Sub',
    description: '下付き文字',
    category: 'elements',
    component: TanukiUI.Sub,
    examples: {
      basic: React.createElement(TanukiUI.P, {},
        'H',
        React.createElement(TanukiUI.Sub, {}, '2'),
        'O (水の化学式)'
      )
    }
  },
  {
    name: 'Sup',
    description: '上付き文字',
    category: 'elements',
    component: TanukiUI.Sup,
    examples: {
      basic: React.createElement(TanukiUI.P, {},
        'E = mc',
        React.createElement(TanukiUI.Sup, {}, '2'),
        ' (アインシュタインの方程式)'
      )
    }
  },
  {
    name: 'Code',
    description: 'インラインコード',
    category: 'elements',
    component: TanukiUI.Code,
    examples: {
      basic: React.createElement(TanukiUI.P, {},
        React.createElement(TanukiUI.Code, {}, 'console.log()'),
        ' を使ってログを出力します。'
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
      basic: React.createElement(TanukiUI.A, { href: '#' }, 'リンクテキスト'),
      variations: [
        React.createElement(TanukiUI.A, { href: '#', target: '_blank' }, '外部リンク'),
        React.createElement(TanukiUI.A, { href: 'mailto:test@example.com' }, 'メールリンク'),
        React.createElement(TanukiUI.A, { href: 'tel:+81-3-1234-5678' }, '電話リンク'),
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
      basic: React.createElement(TanukiUI.Article, {}, 
        React.createElement(TanukiUI.H2, {}, '記事タイトル'),
        React.createElement(TanukiUI.P, {}, '記事の内容です。独立したコンテンツとして配布可能な要素です。')
      )
    }
  },
  {
    name: 'Section',
    description: 'セクション要素',
    category: 'elements',
    component: TanukiUI.Section,
    examples: {
      basic: React.createElement(TanukiUI.Section, {},
        React.createElement(TanukiUI.H3, {}, 'セクションタイトル'),
        React.createElement(TanukiUI.P, {}, 'セクションの内容です。テーマ的にグループ化された内容を表します。')
      )
    }
  },
  {
    name: 'Nav',
    description: 'ナビゲーション要素',
    category: 'elements',
    component: TanukiUI.Nav,
    examples: {
      basic: React.createElement(TanukiUI.Nav, {},
        React.createElement(TanukiUI.A, { href: '#' }, 'ホーム'),
        ' | ',
        React.createElement(TanukiUI.A, { href: '#' }, 'サービス'),
        ' | ',
        React.createElement(TanukiUI.A, { href: '#' }, '会社情報')
      )
    }
  },
  {
    name: 'Header',
    description: 'ヘッダー要素',
    category: 'elements',
    component: TanukiUI.Header,
    examples: {
      basic: React.createElement(TanukiUI.Header, {},
        React.createElement(TanukiUI.H1, {}, 'サイトタイトル'),
        React.createElement(TanukiUI.P, {}, 'サイトの説明やキャッチフレーズ')
      )
    }
  },
  {
    name: 'Footer',
    description: 'フッター要素',
    category: 'elements',
    component: TanukiUI.Footer,
    examples: {
      basic: React.createElement(TanukiUI.Footer, {},
        React.createElement(TanukiUI.P, {}, '© 2024 Company Name. All rights reserved.'),
        React.createElement(TanukiUI.P, {}, 'プライバシーポリシー | 利用規約')
      )
    }
  },
  {
    name: 'Main',
    description: 'メイン要素',
    category: 'elements',
    component: TanukiUI.Main,
    examples: {
      basic: React.createElement(TanukiUI.Main, {},
        React.createElement(TanukiUI.H2, {}, 'メインコンテンツ'),
        React.createElement(TanukiUI.P, {}, 'ページの主要なコンテンツエリアです。')
      )
    }
  },
  {
    name: 'Aside',
    description: 'サイドバー要素',
    category: 'elements',
    component: TanukiUI.Aside,
    examples: {
      basic: React.createElement(TanukiUI.Aside, {},
        React.createElement(TanukiUI.H4, {}, 'サイドバー'),
        React.createElement(TanukiUI.P, {}, '補足情報やナビゲーション、広告などを配置します。')
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
      basic: React.createElement(TanukiUI.Button, {}, 'ボタン'),
      variations: [
        React.createElement(TanukiUI.Button, { type: 'submit' }, '送信'),
        React.createElement(TanukiUI.Button, { type: 'reset' }, 'リセット'),
        React.createElement(TanukiUI.Button, { disabled: true }, '無効'),
      ]
    }
  },
  {
    name: 'Input',
    description: '入力要素',
    category: 'form',
    component: TanukiUI.Input,
    examples: {
      basic: React.createElement(TanukiUI.Input, { placeholder: 'テキストを入力' }),
      variations: [
        React.createElement(TanukiUI.Input, { type: 'email', placeholder: 'email@example.com' }),
        React.createElement(TanukiUI.Input, { type: 'password', placeholder: 'パスワード' }),
        React.createElement(TanukiUI.Input, { type: 'number', placeholder: '数値', min: 0, max: 100 }),
        React.createElement(TanukiUI.Input, { type: 'search', placeholder: '検索...' }),
        React.createElement(TanukiUI.Input, { type: 'tel', placeholder: '電話番号' }),
        React.createElement(TanukiUI.Input, { type: 'url', placeholder: 'https://example.com' }),
        React.createElement(TanukiUI.Input, { type: 'date' }),
        React.createElement(TanukiUI.Input, { type: 'time' }),
        React.createElement(TanukiUI.Input, { type: 'color', defaultValue: '#ff0000' }),
        React.createElement(TanukiUI.Input, { type: 'range', min: 0, max: 100, defaultValue: 50 }),
      ]
    }
  }
];

// Form Elements  
const formElements: ComponentDemo[] = [
  {
    name: 'Textarea',
    description: '複数行テキスト入力',
    category: 'form',
    component: TanukiUI.Textarea,
    examples: {
      basic: React.createElement(TanukiUI.Textarea, { placeholder: '複数行のテキストを入力', rows: 4 }),
      variations: [
        React.createElement(TanukiUI.Textarea, { placeholder: '大きなテキストエリア', rows: 8, cols: 50 }),
        React.createElement(TanukiUI.Textarea, { placeholder: '文字数制限あり', maxLength: 100 }),
      ]
    }
  },
  {
    name: 'Label',
    description: 'ラベル要素',
    category: 'form', 
    component: TanukiUI.Label,
    examples: {
      basic: React.createElement(TanukiUI.Div, {},
        React.createElement(TanukiUI.Label, { htmlFor: 'sample-input' }, 'ラベル名:'),
        React.createElement(TanukiUI.Input, { id: 'sample-input', placeholder: '関連する入力フィールド' })
      )
    }
  },
  {
    name: 'Fieldset',
    description: 'フィールドセット要素',
    category: 'form',
    component: TanukiUI.Fieldset,
    examples: {
      basic: React.createElement(TanukiUI.Fieldset, {}, 
        React.createElement(TanukiUI.Legend, {}, 'ユーザー情報'),
        React.createElement(TanukiUI.Label, {}, '名前:'),
        React.createElement(TanukiUI.Input, { placeholder: '山田太郎' }),
        React.createElement(TanukiUI.Br),
        React.createElement(TanukiUI.Label, {}, 'メール:'),
        React.createElement(TanukiUI.Input, { type: 'email', placeholder: 'yamada@example.com' })
      )
    }
  },
  {
    name: 'Select',
    description: 'セレクトボックス',
    category: 'form',
    component: TanukiUI.Select,
    examples: {
      basic: React.createElement(TanukiUI.Select, {},
        React.createElement(TanukiUI.Option, { value: '' }, '選択してください'),
        React.createElement(TanukiUI.Option, { value: 'option1' }, 'オプション1'),
        React.createElement(TanukiUI.Option, { value: 'option2' }, 'オプション2'),
        React.createElement(TanukiUI.Option, { value: 'option3' }, 'オプション3')
      ),
      variations: [
        React.createElement(TanukiUI.Select, { multiple: true, size: 4 },
          React.createElement(TanukiUI.Option, { value: 'apple' }, 'りんご'),
          React.createElement(TanukiUI.Option, { value: 'banana' }, 'バナナ'),
          React.createElement(TanukiUI.Option, { value: 'orange' }, 'オレンジ'),
          React.createElement(TanukiUI.Option, { value: 'grape' }, 'ぶどう')
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
      basic: React.createElement(TanukiUI.Div, {},
        React.createElement(TanukiUI.Label, {}, '進捗: 70%'),
        React.createElement(TanukiUI.Progress, { value: 70, max: 100 })
      ),
      variations: [
        React.createElement(TanukiUI.Div, {},
          React.createElement(TanukiUI.Label, {}, '読み込み中...'),
          React.createElement(TanukiUI.Progress)
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
      basic: React.createElement(TanukiUI.Div, {},
        React.createElement(TanukiUI.Label, {}, 'スコア: 6/10'),
        React.createElement(TanukiUI.Meter, { value: 6, min: 0, max: 10 })
      ),
      variations: [
        React.createElement(TanukiUI.Div, {},
          React.createElement(TanukiUI.Label, {}, 'ディスク使用量: 8GB/10GB'),
          React.createElement(TanukiUI.Meter, { value: 8, min: 0, max: 10, high: 9, optimum: 3 })
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
      basic: React.createElement(TanukiUI.EditableLabel, { 
        defaultValue: '編集可能なテキスト（クリックして編集）'
      })
    }
  }
];

// Layout Elements
const layoutElements: ComponentDemo[] = [
  {
    name: 'Card',
    description: 'カードコンテナ',
    category: 'layouts',
    component: TanukiUI.Card,
    examples: {
      basic: React.createElement(TanukiUI.Card, {},
        React.createElement(TanukiUI.H3, {}, 'カードタイトル'),
        React.createElement(TanukiUI.P, {}, 'カードの内容です。')
      )
    }
  }
];

// Interactive Dialog Components
const InteractiveDialog: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return React.createElement(
    React.Fragment,
    {},
    React.createElement(TanukiUI.Button, 
      { onClick: () => setIsOpen(true) }, 
      `${title}を開く`
    ),
    React.createElement(TanukiUI.Dialog, 
      { 
        open: isOpen,
        onClose: () => setIsOpen(false)
      },
      React.createElement(TanukiUI.H3, {}, title),
      React.createElement(TanukiUI.P, {}, content),
      React.createElement(TanukiUI.DialogFooter, {},
        React.createElement(TanukiUI.Button, 
          { onClick: () => setIsOpen(false) }, 
          '閉じる'
        )
      )
    )
  );
};

const InteractiveModal: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return React.createElement(
    React.Fragment,
    {},
    React.createElement(TanukiUI.Button, 
      { onClick: () => setIsOpen(true) }, 
      `${title}を開く`
    ),
    React.createElement(TanukiUI.Modal, 
      { 
        open: isOpen,
        onClose: () => setIsOpen(false)
      },
      React.createElement(TanukiUI.H3, {}, title),
      React.createElement(TanukiUI.P, {}, content),
      React.createElement(TanukiUI.Button, 
        { onClick: () => setIsOpen(false) }, 
        '閉じる'
      )
    )
  );
};

const InteractiveDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return React.createElement(
    React.Fragment,
    {},
    React.createElement(TanukiUI.Button, 
      { onClick: () => setIsOpen(true) }, 
      'ドロワーを開く'
    ),
    React.createElement(TanukiUI.Drawer, 
      { 
        open: isOpen,
        onClose: () => setIsOpen(false)
      },
      React.createElement(TanukiUI.H3, {}, 'ドロワータイトル'),
      React.createElement(TanukiUI.P, {}, 'ドロワーの内容です。'),
      React.createElement(TanukiUI.Button, 
        { onClick: () => setIsOpen(false) }, 
        '閉じる'
      )
    )
  );
};

// Dialog Elements
const dialogElements: ComponentDemo[] = [
  {
    name: 'Dialog',
    description: 'モーダルダイアログ',
    category: 'dialogs',
    component: TanukiUI.Dialog,
    examples: {
      basic: React.createElement(InteractiveDialog, { 
        title: 'ダイアログタイトル', 
        content: 'ダイアログの内容です。' 
      })
    }
  },
  {
    name: 'Modal',
    description: 'シンプルなモーダル',
    category: 'dialogs',
    component: TanukiUI.Modal,
    examples: {
      basic: React.createElement(InteractiveModal, { 
        title: 'モーダルタイトル', 
        content: 'モーダルの内容です。' 
      })
    }
  },
  {
    name: 'Alert',
    description: 'アラートダイアログ',
    category: 'dialogs',
    component: TanukiUI.Alert,
    examples: {
      basic: React.createElement(
        React.Fragment,
        {},
        React.createElement(TanukiUI.Button, 
          { 
            onClick: () => alert('これはネイティブのアラートです。Tanuki UI Alertコンポーネントとは異なります。')
          }, 
          'アラートを表示'
        ),
        React.createElement(TanukiUI.Alert, {},
          React.createElement(TanukiUI.P, {}, 'これはAlertコンポーネントです')
        )
      )
    }
  }
];

// Navigation Elements
const navigationElements: ComponentDemo[] = [
  {
    name: 'SidebarList',
    description: '階層構造のサイドバーリスト',
    category: 'navigations',
    component: TanukiUI.SidebarList.List,
    examples: {
      basic: React.createElement(TanukiUI.SidebarList.List, {},
        React.createElement(TanukiUI.SidebarList.ListItem, 
          { label: 'メニュー1', selected: true }
        ),
        React.createElement(TanukiUI.SidebarList.ListItem, 
          { label: 'メニュー2' }
        )
      )
    }
  },
  {
    name: 'TabNav',
    description: 'ソート可能なタブナビゲーション',
    category: 'navigations',
    component: TanukiUI.TabNav,
    examples: {
      basic: React.createElement(TanukiUI.TabNav, {
        items: [
          { key: 'tab1', value: 'タブ1' },
          { key: 'tab2', value: 'タブ2' }
        ],
        value: 'tab1',
        onChange: () => {},
        setItems: () => {}
      })
    }
  }
];

// Bar Elements
const barElements: ComponentDemo[] = [
  {
    name: 'TabBar',
    description: 'シンプルなタブバー',
    category: 'bars',
    component: TanukiUI.TabBar,
    examples: {
      basic: React.createElement(TanukiUI.TabBar, {
        items: [
          { key: 'home', value: 'ホーム', icon: '🏠' },
          { key: 'settings', value: '設定', icon: '⚙️' }
        ],
        onSelect: () => {}
      })
    }
  },
  {
    name: 'Toolbar',
    description: '多機能ツールバー',
    category: 'bars',
    component: TanukiUI.Toolbar,
    examples: {
      basic: React.createElement(TanukiUI.Toolbar, {},
        React.createElement(TanukiUI.Toolbar.Title, { title: 'ツールバー' }),
        React.createElement(TanukiUI.Toolbar.Separator),
        React.createElement(TanukiUI.Toolbar.PushButton, {}, '保存')
      )
    }
  }
];

// Block Elements
const blockElements: ComponentDemo[] = [
  {
    name: 'Icon',
    description: 'アイコン表示',
    category: 'blocks',
    component: TanukiUI.Icon,
    examples: {
      basic: React.createElement(TanukiUI.Icon, { src: 'home', size: 24 }),
      variations: [
        React.createElement(TanukiUI.Icon, { src: 'settings', size: 16 }),
        React.createElement(TanukiUI.Icon, { src: 'search', size: 32 }),
      ]
    }
  },
  {
    name: 'Text',
    description: 'ルビ付きテキスト',
    category: 'blocks',
    component: TanukiUI.Text,
    examples: {
      basic: React.createElement(TanukiUI.Text, { ruby: 'とうきょう' }, '東京'),
      variations: [
        React.createElement(TanukiUI.Text, { ruby: 'にほん' }, '日本'),
      ]
    }
  },
  {
    name: 'Time',
    description: '時間表示',
    category: 'blocks',
    component: TanukiUI.Time,
    examples: {
      basic: React.createElement(TanukiUI.Time, { timestamp: '2024-01-01' }, '2024年1月1日')
    }
  }
];

// Control Elements
const controlElements: ComponentDemo[] = [
  {
    name: 'SegmentedControl',
    description: 'セグメント化コントロール',
    category: 'controls',
    component: TanukiUI.SegmentedControl,
    examples: {
      basic: React.createElement(TanukiUI.SegmentedControl, {
        items: ['オプション1', 'オプション2', 'オプション3'],
        onSelect: () => {}
      })
    }
  },
  {
    name: 'Resizer',
    description: 'リサイザー',
    category: 'controls',
    component: TanukiUI.Resizer,
    examples: {
      basic: React.createElement(TanukiUI.Resizer, {
        onResize: () => {}
      })
    }
  }
];

// List Elements
const listElements: ComponentDemo[] = [
  // 順序なしリスト
  {
    name: 'Ul',
    description: '順序なしリスト',
    category: 'lists',
    component: TanukiUI.Ul,
    examples: {
      basic: React.createElement(TanukiUI.Ul, {},
        React.createElement(TanukiUI.Li, {}, '最初のアイテム'),
        React.createElement(TanukiUI.Li, {}, '2番目のアイテム'),
        React.createElement(TanukiUI.Li, {}, '3番目のアイテム')
      ),
      variations: [
        React.createElement(TanukiUI.Ul, {},
          React.createElement(TanukiUI.Li, {}, 
            'ネストされたリスト',
            React.createElement(TanukiUI.Ul, {},
              React.createElement(TanukiUI.Li, {}, '子アイテム1'),
              React.createElement(TanukiUI.Li, {}, '子アイテム2')
            )
          ),
          React.createElement(TanukiUI.Li, {}, '通常のアイテム')
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
      basic: React.createElement(TanukiUI.Ol, {},
        React.createElement(TanukiUI.Li, {}, '第1ステップ'),
        React.createElement(TanukiUI.Li, {}, '第2ステップ'),
        React.createElement(TanukiUI.Li, {}, '第3ステップ')
      ),
      variations: [
        React.createElement(TanukiUI.Ol, { type: 'A' },
          React.createElement(TanukiUI.Li, {}, 'オプションA'),
          React.createElement(TanukiUI.Li, {}, 'オプションB'),
          React.createElement(TanukiUI.Li, {}, 'オプションC')
        ),
        React.createElement(TanukiUI.Ol, { type: 'i', start: 5 },
          React.createElement(TanukiUI.Li, {}, '5番目から開始'),
          React.createElement(TanukiUI.Li, {}, '6番目'),
          React.createElement(TanukiUI.Li, {}, '7番目')
        )
      ]
    }
  },
  
  // リストアイテム（単体では意味を持たないので親要素と組み合わせ）
  {
    name: 'Li',
    description: 'リストアイテム',
    category: 'lists',
    component: TanukiUI.Li,
    examples: {
      basic: React.createElement(TanukiUI.Ul, {},
        React.createElement(TanukiUI.Li, {}, 'リストアイテムの例'),
        React.createElement(TanukiUI.Li, {}, 
          'リンクを含むアイテム: ',
          React.createElement(TanukiUI.A, { href: '#' }, 'リンク')
        ),
        React.createElement(TanukiUI.Li, {}, 
          React.createElement(TanukiUI.Strong, {}, '重要なアイテム')
        )
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
      basic: React.createElement(TanukiUI.Table, {},
        React.createElement(TanukiUI.Caption, {}, 'サンプルテーブル'),
        React.createElement(TanukiUI.Thead, {},
          React.createElement(TanukiUI.Tr, {},
            React.createElement(TanukiUI.Th, {}, '名前'),
            React.createElement(TanukiUI.Th, {}, '年齢'),
            React.createElement(TanukiUI.Th, {}, '職業')
          )
        ),
        React.createElement(TanukiUI.Tbody, {},
          React.createElement(TanukiUI.Tr, {},
            React.createElement(TanukiUI.Td, {}, '山田太郎'),
            React.createElement(TanukiUI.Td, {}, '30'),
            React.createElement(TanukiUI.Td, {}, 'エンジニア')
          ),
          React.createElement(TanukiUI.Tr, {},
            React.createElement(TanukiUI.Td, {}, '佐藤花子'),
            React.createElement(TanukiUI.Td, {}, '25'),
            React.createElement(TanukiUI.Td, {}, 'デザイナー')
          )
        )
      ),
      variations: [
        React.createElement(TanukiUI.Table, {},
          React.createElement(TanukiUI.Thead, {},
            React.createElement(TanukiUI.Tr, {},
              React.createElement(TanukiUI.Th, { rowSpan: 2 }, '項目'),
              React.createElement(TanukiUI.Th, { colSpan: 2 }, '詳細')
            ),
            React.createElement(TanukiUI.Tr, {},
              React.createElement(TanukiUI.Th, {}, '値'),
              React.createElement(TanukiUI.Th, {}, '単位')
            )
          ),
          React.createElement(TanukiUI.Tbody, {},
            React.createElement(TanukiUI.Tr, {},
              React.createElement(TanukiUI.Td, {}, '重量'),
              React.createElement(TanukiUI.Td, {}, '10'),
              React.createElement(TanukiUI.Td, {}, 'kg')
            )
          )
        )
      ]
    }
  },
  
  // テーブル関連要素
  {
    name: 'Thead',
    description: 'テーブルヘッダーグループ',
    category: 'lists',
    component: TanukiUI.Thead,
    examples: {
      basic: React.createElement(TanukiUI.Table, {},
        React.createElement(TanukiUI.Thead, {},
          React.createElement(TanukiUI.Tr, {},
            React.createElement(TanukiUI.Th, {}, 'ヘッダー1'),
            React.createElement(TanukiUI.Th, {}, 'ヘッダー2')
          )
        ),
        React.createElement(TanukiUI.Tbody, {},
          React.createElement(TanukiUI.Tr, {},
            React.createElement(TanukiUI.Td, {}, 'データ1'),
            React.createElement(TanukiUI.Td, {}, 'データ2')
          )
        )
      )
    }
  },
  
  {
    name: 'Tbody',
    description: 'テーブルボディグループ',
    category: 'lists',
    component: TanukiUI.Tbody,
    examples: {
      basic: React.createElement(TanukiUI.Table, {},
        React.createElement(TanukiUI.Thead, {},
          React.createElement(TanukiUI.Tr, {},
            React.createElement(TanukiUI.Th, {}, 'ID'),
            React.createElement(TanukiUI.Th, {}, '商品名')
          )
        ),
        React.createElement(TanukiUI.Tbody, {},
          React.createElement(TanukiUI.Tr, {},
            React.createElement(TanukiUI.Td, {}, '001'),
            React.createElement(TanukiUI.Td, {}, 'ノートPC')
          ),
          React.createElement(TanukiUI.Tr, {},
            React.createElement(TanukiUI.Td, {}, '002'),
            React.createElement(TanukiUI.Td, {}, 'マウス')
          )
        )
      )
    }
  },
  
  {
    name: 'Tfoot',
    description: 'テーブルフッターグループ',
    category: 'lists',
    component: TanukiUI.Tfoot,
    examples: {
      basic: React.createElement(TanukiUI.Table, {},
        React.createElement(TanukiUI.Thead, {},
          React.createElement(TanukiUI.Tr, {},
            React.createElement(TanukiUI.Th, {}, '商品'),
            React.createElement(TanukiUI.Th, {}, '価格')
          )
        ),
        React.createElement(TanukiUI.Tbody, {},
          React.createElement(TanukiUI.Tr, {},
            React.createElement(TanukiUI.Td, {}, '商品A'),
            React.createElement(TanukiUI.Td, {}, '1,000円')
          ),
          React.createElement(TanukiUI.Tr, {},
            React.createElement(TanukiUI.Td, {}, '商品B'),
            React.createElement(TanukiUI.Td, {}, '2,000円')
          )
        ),
        React.createElement(TanukiUI.Tfoot, {},
          React.createElement(TanukiUI.Tr, {},
            React.createElement(TanukiUI.Td, {}, React.createElement(TanukiUI.Strong, {}, '合計')),
            React.createElement(TanukiUI.Td, {}, React.createElement(TanukiUI.Strong, {}, '3,000円'))
          )
        )
      )
    }
  },
  
  {
    name: 'Tr',
    description: 'テーブル行',
    category: 'lists',
    component: TanukiUI.Tr,
    examples: {
      basic: React.createElement(TanukiUI.Table, {},
        React.createElement(TanukiUI.Tbody, {},
          React.createElement(TanukiUI.Tr, {},
            React.createElement(TanukiUI.Td, {}, 'セル1'),
            React.createElement(TanukiUI.Td, {}, 'セル2')
          ),
          React.createElement(TanukiUI.Tr, {},
            React.createElement(TanukiUI.Td, {}, 'セル3'),
            React.createElement(TanukiUI.Td, {}, 'セル4')
          )
        )
      )
    }
  },
  
  {
    name: 'Th',
    description: 'テーブルヘッダーセル',
    category: 'lists',
    component: TanukiUI.Th,
    examples: {
      basic: React.createElement(TanukiUI.Table, {},
        React.createElement(TanukiUI.Thead, {},
          React.createElement(TanukiUI.Tr, {},
            React.createElement(TanukiUI.Th, { scope: 'col' }, '列ヘッダー1'),
            React.createElement(TanukiUI.Th, { scope: 'col' }, '列ヘッダー2')
          )
        ),
        React.createElement(TanukiUI.Tbody, {},
          React.createElement(TanukiUI.Tr, {},
            React.createElement(TanukiUI.Th, { scope: 'row' }, '行ヘッダー'),
            React.createElement(TanukiUI.Td, {}, 'データ')
          )
        )
      )
    }
  },
  
  {
    name: 'Td',
    description: 'テーブルデータセル',
    category: 'lists',
    component: TanukiUI.Td,
    examples: {
      basic: React.createElement(TanukiUI.Table, {},
        React.createElement(TanukiUI.Tbody, {},
          React.createElement(TanukiUI.Tr, {},
            React.createElement(TanukiUI.Td, {}, '通常のデータ'),
            React.createElement(TanukiUI.Td, {}, 
              React.createElement(TanukiUI.A, { href: '#' }, 'リンク付きデータ')
            ),
            React.createElement(TanukiUI.Td, {}, 
              React.createElement(TanukiUI.Strong, {}, '強調データ')
            )
          )
        )
      )
    }
  },
  
  {
    name: 'Caption',
    description: 'テーブルキャプション',
    category: 'lists',
    component: TanukiUI.Caption,
    examples: {
      basic: React.createElement(TanukiUI.Table, {},
        React.createElement(TanukiUI.Caption, {}, '月次売上データ（2024年）'),
        React.createElement(TanukiUI.Thead, {},
          React.createElement(TanukiUI.Tr, {},
            React.createElement(TanukiUI.Th, {}, '月'),
            React.createElement(TanukiUI.Th, {}, '売上')
          )
        ),
        React.createElement(TanukiUI.Tbody, {},
          React.createElement(TanukiUI.Tr, {},
            React.createElement(TanukiUI.Td, {}, '1月'),
            React.createElement(TanukiUI.Td, {}, '100万円')
          )
        )
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
      basic: React.createElement(TanukiUI.Div, {},
        React.createElement(TanukiUI.Label, { htmlFor: 'browser-choice' }, 'ブラウザを選択:'),
        React.createElement(TanukiUI.Input, { 
          list: 'browsers', 
          id: 'browser-choice',
          placeholder: 'ブラウザ名を入力または選択'
        }),
        React.createElement(TanukiUI.DataList, { id: 'browsers' },
          React.createElement(TanukiUI.Option, { value: 'Chrome' }),
          React.createElement(TanukiUI.Option, { value: 'Firefox' }),
          React.createElement(TanukiUI.Option, { value: 'Safari' }),
          React.createElement(TanukiUI.Option, { value: 'Edge' })
        )
      )
    }
  },
  
  // カスタムコンポーネント
  {
    name: 'SortableList',
    description: 'ソート可能リスト（カスタム要素）',
    category: 'lists',
    component: TanukiUI.SortableList,
    examples: {
      basic: React.createElement(TanukiUI.Div, {},
        React.createElement(TanukiUI.H4, {}, 'ソート可能リスト'),
        React.createElement(TanukiUI.P, {}, 'ドラッグ&ドロップで並び替え可能なリストです（カスタム実装）'),
        React.createElement(TanukiUI.Ul, {},
          React.createElement(TanukiUI.Li, { key: '1' }, 'アイテム 1'),
          React.createElement(TanukiUI.Li, { key: '2' }, 'アイテム 2'),
          React.createElement(TanukiUI.Li, { key: '3' }, 'アイテム 3')
        )
      )
    }
  }
];

// Media Elements
const mediaElements: ComponentDemo[] = [
  {
    name: 'Img',
    description: '画像要素',
    category: 'media',
    component: TanukiUI.Img,
    examples: {
      basic: React.createElement(TanukiUI.Img, { 
        src: 'https://via.placeholder.com/150x100', 
        alt: 'プレースホルダー画像',
        width: 150,
        height: 100
      }),
      variations: [
        React.createElement(TanukiUI.Img, { 
          src: 'https://via.placeholder.com/300x200', 
          alt: '大きな画像',
          style: { maxWidth: '100%', height: 'auto' }
        }),
        React.createElement(TanukiUI.Img, { 
          src: 'https://via.placeholder.com/100x100', 
          alt: '正方形画像',
          style: { borderRadius: '50%' }
        })
      ]
    }
  },
  {
    name: 'Figure',
    description: '図表要素',
    category: 'media',
    component: TanukiUI.Figure,
    examples: {
      basic: React.createElement(TanukiUI.Figure, {},
        React.createElement(TanukiUI.Img, { 
          src: 'https://via.placeholder.com/200x150', 
          alt: 'サンプル図表',
          width: 200,
          height: 150
        }),
        React.createElement(TanukiUI.Figcaption, {}, '図1: サンプル図表のキャプション')
      ),
      variations: [
        React.createElement(TanukiUI.Figure, {},
          React.createElement(TanukiUI.Pre, {},
            React.createElement(TanukiUI.Code, {}, 
              'function hello() {\n  console.log("Hello, World!");\n}'
            )
          ),
          React.createElement(TanukiUI.Figcaption, {}, 'リスト1: Hello World関数の例')
        )
      ]
    }
  },
  {
    name: 'Figcaption',
    description: '図表キャプション',
    category: 'media',
    component: TanukiUI.Figcaption,
    examples: {
      basic: React.createElement(TanukiUI.Figure, {},
        React.createElement(TanukiUI.Img, { 
          src: 'https://via.placeholder.com/180x120', 
          alt: 'グラフ画像',
          width: 180,
          height: 120
        }),
        React.createElement(TanukiUI.Figcaption, {}, 
          React.createElement(TanukiUI.Strong, {}, '図2: '),
          '月間アクセス数の推移（2024年）'
        )
      )
    }
  },
  {
    name: 'Video',
    description: '動画要素',
    category: 'media',
    component: TanukiUI.Video,
    examples: {
      basic: React.createElement(TanukiUI.Video, { 
        controls: true,
        width: 320,
        height: 240,
        poster: 'https://via.placeholder.com/320x240'
      },
        React.createElement(TanukiUI.Source, { 
          src: 'https://www.w3schools.com/html/mov_bbb.mp4', 
          type: 'video/mp4' 
        }),
        'お使いのブラウザは動画タグをサポートしていません。'
      ),
      variations: [
        React.createElement(TanukiUI.Video, { 
          autoPlay: true,
          muted: true,
          loop: true,
          width: 200,
          height: 150
        },
          React.createElement(TanukiUI.Source, { 
            src: 'https://www.w3schools.com/html/mov_bbb.mp4', 
            type: 'video/mp4' 
          })
        )
      ]
    }
  },
  {
    name: 'Audio',
    description: '音声要素',
    category: 'media',
    component: TanukiUI.Audio,
    examples: {
      basic: React.createElement(TanukiUI.Audio, { controls: true },
        React.createElement(TanukiUI.Source, { 
          src: 'https://www.w3schools.com/html/horse.ogg', 
          type: 'audio/ogg' 
        }),
        React.createElement(TanukiUI.Source, { 
          src: 'https://www.w3schools.com/html/horse.mp3', 
          type: 'audio/mpeg' 
        }),
        'お使いのブラウザは音声タグをサポートしていません。'
      ),
      variations: [
        React.createElement(TanukiUI.Audio, { 
          controls: true,
          preload: 'metadata'
        },
          React.createElement(TanukiUI.Source, { 
            src: 'https://www.w3schools.com/html/horse.mp3', 
            type: 'audio/mpeg' 
          })
        )
      ]
    }
  },
  {
    name: 'Source',
    description: 'メディアソース要素',
    category: 'media',
    component: TanukiUI.Source,
    examples: {
      basic: React.createElement(TanukiUI.Video, { controls: true, width: 300, height: 200 },
        React.createElement(TanukiUI.Source, { 
          src: 'https://www.w3schools.com/html/mov_bbb.mp4', 
          type: 'video/mp4' 
        }),
        React.createElement(TanukiUI.Source, { 
          src: 'https://www.w3schools.com/html/mov_bbb.ogg', 
          type: 'video/ogg' 
        }),
        'ブラウザが動画をサポートしていません。'
      )
    }
  },
  {
    name: 'Track',
    description: 'メディアトラック要素（字幕など）',
    category: 'media',
    component: TanukiUI.Track,
    examples: {
      basic: React.createElement(TanukiUI.Video, { controls: true, width: 300, height: 200 },
        React.createElement(TanukiUI.Source, { 
          src: 'https://www.w3schools.com/html/mov_bbb.mp4', 
          type: 'video/mp4' 
        }),
        React.createElement(TanukiUI.Track, {
          kind: 'subtitles',
          src: '/subtitles_ja.vtt',
          srcLang: 'ja',
          label: '日本語字幕'
        }),
        React.createElement(TanukiUI.Track, {
          kind: 'subtitles', 
          src: '/subtitles_en.vtt',
          srcLang: 'en',
          label: 'English subtitles'
        })
      )
    }
  },
  {
    name: 'Embed',
    description: '埋め込み要素',
    category: 'media',
    component: TanukiUI.Embed,
    examples: {
      basic: React.createElement(TanukiUI.Embed, {
        src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        width: 560,
        height: 315,
        type: 'text/html'
      })
    }
  },
  {
    name: 'Object',
    description: 'オブジェクト要素',
    category: 'media',
    component: TanukiUI.Object,
    examples: {
      basic: React.createElement(TanukiUI.Object, {
        data: 'https://www.w3schools.com/html/pic_trulli.jpg',
        width: 300,
        height: 200,
        type: 'image/jpeg'
      },
        React.createElement(TanukiUI.Param, { name: 'autoplay', value: 'false' }),
        '画像を表示できません。'
      )
    }
  },
  {
    name: 'Param',
    description: 'オブジェクトパラメータ要素',
    category: 'media',
    component: TanukiUI.Param,
    examples: {
      basic: React.createElement(TanukiUI.Object, {
        data: '/sample.swf',
        width: 400,
        height: 300,
        type: 'application/x-shockwave-flash'
      },
        React.createElement(TanukiUI.Param, { name: 'movie', value: '/sample.swf' }),
        React.createElement(TanukiUI.Param, { name: 'quality', value: 'high' }),
        React.createElement(TanukiUI.Param, { name: 'bgcolor', value: '#ffffff' }),
        'Flashコンテンツを表示できません。'
      )
    }
  },
  {
    name: 'Iframe',
    description: 'インラインフレーム要素',
    category: 'media',
    component: TanukiUI.Iframe,
    examples: {
      basic: React.createElement(TanukiUI.Iframe, {
        src: 'https://www.example.com',
        width: 400,
        height: 300,
        title: 'サンプルページ',
        frameBorder: 0
      }),
      variations: [
        React.createElement(TanukiUI.Iframe, {
          src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          width: 560,
          height: 315,
          title: 'YouTube動画',
          allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
          allowFullScreen: true
        }),
        React.createElement(TanukiUI.Iframe, {
          src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.0273739937375!2d139.76493121525834!3d35.68122398019441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bfbd89f700b%3A0x277c49ba34ed38!2z5p2x5Lqs6aeF!5e0!3m2!1sja!2sjp!4v1234567890123',
          width: 400,
          height: 300,
          title: 'Google Maps',
          loading: 'lazy'
        })
      ]
    }
  }
];

// Text Elements  
const textElements: ComponentDemo[] = [
  {
    name: 'Blockquote',
    description: '引用ブロック',
    category: 'text',
    component: TanukiUI.Blockquote,
    examples: {
      basic: React.createElement(TanukiUI.Blockquote, {},
        React.createElement(TanukiUI.P, {}, 'これは重要な引用文です。長い引用や他の文書からの抜粋を表示する際に使用します。'),
        React.createElement(TanukiUI.Cite, {}, '— 引用元の著者名')
      ),
      variations: [
        React.createElement(TanukiUI.Blockquote, { cite: 'https://example.com/source' },
          React.createElement(TanukiUI.P, {}, 'Web技術は日々進歩しており、開発者は常に学び続ける必要があります。'),
          React.createElement(TanukiUI.Footer, {},
            '出典: ',
            React.createElement(TanukiUI.Cite, {}, 'Web開発ガイド')
          )
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
      basic: React.createElement(TanukiUI.Pre, {},
        React.createElement(TanukiUI.Code, {}, 
          'function hello() {\n  console.log("Hello, World!");\n}'
        )
      ),
      variations: [
        React.createElement(TanukiUI.Pre, {},
          'コードではない整形済みテキスト:\n\n    項目1\n    項目2\n        サブ項目\n    項目3'
        ),
        React.createElement(TanukiUI.Pre, { style: { fontSize: '14px', background: '#f5f5f5', padding: '10px' }},
          React.createElement(TanukiUI.Code, {}, 
            'const data = {\n  name: "太郎",\n  age: 30,\n  city: "東京"\n};'
          )
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
      basic: React.createElement(TanukiUI.Details, {},
        React.createElement(TanukiUI.Summary, {}, '詳細を表示'),
        React.createElement(TanukiUI.P, {}, 'ここに詳細な情報が表示されます。ユーザーがクリックすることで表示/非表示を切り替えられます。')
      ),
      variations: [
        React.createElement(TanukiUI.Details, { open: true },
          React.createElement(TanukiUI.Summary, {}, '最初から開いている詳細'),
          React.createElement(TanukiUI.P, {}, 'この詳細は最初から展開された状態で表示されます。'),
          React.createElement(TanukiUI.Ul, {},
            React.createElement(TanukiUI.Li, {}, '項目1'),
            React.createElement(TanukiUI.Li, {}, '項目2'),
            React.createElement(TanukiUI.Li, {}, '項目3')
          )
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
      basic: React.createElement(TanukiUI.Details, {},
        React.createElement(TanukiUI.Summary, {}, 
          React.createElement(TanukiUI.Strong, {}, 'FAQ: よくある質問')
        ),
        React.createElement(TanukiUI.P, {}, 'Q: このサービスの利用料金はいくらですか？'),
        React.createElement(TanukiUI.P, {}, 'A: 基本プランは月額1,000円からご利用いただけます。')
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
      basic: React.createElement(TanukiUI.P, {},
        React.createElement(TanukiUI.Abbr, { title: 'HyperText Markup Language' }, 'HTML'),
        'は、Webページを作成するためのマークアップ言語です。'
      ),
      variations: [
        React.createElement(TanukiUI.P, {},
          React.createElement(TanukiUI.Abbr, { title: 'Cascading Style Sheets' }, 'CSS'),
          '、',
          React.createElement(TanukiUI.Abbr, { title: 'JavaScript' }, 'JS'),
          '、そして',
          React.createElement(TanukiUI.Abbr, { title: 'Application Programming Interface' }, 'API'),
          'を学ぶことが重要です。'
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
      basic: React.createElement(TanukiUI.P, {},
        React.createElement(TanukiUI.Cite, {}, '夏目漱石の「こころ」'),
        'は日本文学の名作の一つです。'
      ),
      variations: [
        React.createElement(TanukiUI.P, {},
          '詳細については',
          React.createElement(TanukiUI.Cite, {}, 'Web技術ガイドライン'),
          'を参照してください。'
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
      basic: React.createElement(TanukiUI.P, {},
        React.createElement(TanukiUI.Dfn, {}, 'React'),
        'は、ユーザーインターフェース構築のためのJavaScriptライブラリです。'
      ),
      variations: [
        React.createElement(TanukiUI.P, {},
          React.createElement(TanukiUI.Dfn, { title: 'Application Programming Interface' }, 'API'),
          'とは、ソフトウェア同士が情報をやり取りするためのインターフェースです。'
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
      basic: React.createElement(TanukiUI.P, {},
        'ファイルを保存するには ',
        React.createElement(TanukiUI.Kbd, {}, 'Ctrl'),
        ' + ',
        React.createElement(TanukiUI.Kbd, {}, 'S'),
        ' を押してください。'
      ),
      variations: [
        React.createElement(TanukiUI.P, {},
          'コピー: ',
          React.createElement(TanukiUI.Kbd, {}, 'Ctrl + C'),
          '、ペースト: ',
          React.createElement(TanukiUI.Kbd, {}, 'Ctrl + V')
        ),
        React.createElement(TanukiUI.P, {},
          'Macでは ',
          React.createElement(TanukiUI.Kbd, {}, 'Cmd'),
          ' + ',
          React.createElement(TanukiUI.Kbd, {}, 'Space'),
          ' でSpotlightを開きます。'
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
      basic: React.createElement(TanukiUI.P, {},
        'プログラムの実行結果: ',
        React.createElement(TanukiUI.Samp, {}, 'Hello, World!')
      ),
      variations: [
        React.createElement(TanukiUI.P, {},
          'エラーメッセージ: ',
          React.createElement(TanukiUI.Samp, { style: { color: 'red' }}, 'Error: File not found')
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
      basic: React.createElement(TanukiUI.P, {},
        '数式: ',
        React.createElement(TanukiUI.Var, {}, 'x'),
        ' + ',
        React.createElement(TanukiUI.Var, {}, 'y'),
        ' = ',
        React.createElement(TanukiUI.Var, {}, 'z')
      ),
      variations: [
        React.createElement(TanukiUI.P, {},
          'プログラムでは変数 ',
          React.createElement(TanukiUI.Var, {}, 'userName'),
          ' にユーザー名を格納します。'
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
      basic: React.createElement(TanukiUI.P, {},
        '彼は',
        React.createElement(TanukiUI.Q, {}, 'こんにちは'),
        'と言いました。'
      ),
      variations: [
        React.createElement(TanukiUI.P, {},
          'ことわざに',
          React.createElement(TanukiUI.Q, { cite: 'https://example.com/proverbs' }, '継続は力なり'),
          'とあります。'
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
      basic: React.createElement(TanukiUI.Ruby, {},
        '漢字',
        React.createElement(TanukiUI.Rt, {}, 'かんじ')
      ),
      variations: [
        React.createElement(TanukiUI.P, {},
          React.createElement(TanukiUI.Ruby, {},
            '東京',
            React.createElement(TanukiUI.Rp, {}, '（'),
            React.createElement(TanukiUI.Rt, {}, 'とうきょう'),
            React.createElement(TanukiUI.Rp, {}, '）')
          ),
          'は日本の首都です。'
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
      basic: React.createElement(TanukiUI.P, {},
        '今日は',
        React.createElement(TanukiUI.Ruby, {},
          '良',
          React.createElement(TanukiUI.Rt, {}, 'よ')
        ),
        'い',
        React.createElement(TanukiUI.Ruby, {},
          '天気',
          React.createElement(TanukiUI.Rt, {}, 'てんき')
        ),
        'です。'
      )
    }
  },
  {
    name: 'Rp',
    description: 'ルビ非対応時の括弧',
    category: 'text',
    component: TanukiUI.Rp,
    examples: {
      basic: React.createElement(TanukiUI.P, {},
        React.createElement(TanukiUI.Ruby, {},
          '日本',
          React.createElement(TanukiUI.Rp, {}, '（'),
          React.createElement(TanukiUI.Rt, {}, 'にほん'),
          React.createElement(TanukiUI.Rp, {}, '）')
        ),
        'の文化は豊かです。'
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
      basic: React.createElement(TanukiUI.P, {},
        '公開日: ',
        React.createElement(TanukiUI.Time, { dateTime: '2024-01-15' }, '2024年1月15日')
      ),
      variations: [
        React.createElement(TanukiUI.P, {},
          '会議時間: ',
          React.createElement(TanukiUI.Time, { dateTime: '2024-01-15T14:30:00' }, '2024年1月15日 14:30')
        ),
        React.createElement(TanukiUI.P, {},
          '所要時間: ',
          React.createElement(TanukiUI.Time, { dateTime: 'PT2H30M' }, '2時間30分')
        )
      ]
    }
  }
];

// Custom Input Elements
const customInputElements: ComponentDemo[] = [
  {
    name: 'MediaInput',
    description: 'メディアファイル入力',
    category: 'custom-inputs',
    component: TanukiUI.MediaInput,
    examples: {
      basic: React.createElement(TanukiUI.MediaInput, { 
        accept: 'image/*',
        multiple: false
      })
    }
  },
  {
    name: 'MediaPreview',
    description: 'メディアプレビュー',
    category: 'custom-inputs',
    component: TanukiUI.MediaPreview,
    examples: {
      basic: React.createElement(TanukiUI.MediaPreview, {
        src: 'https://via.placeholder.com/200x150',
        alt: 'プレビュー画像'
      })
    }
  }
];

// Other Useful Components
const otherElements: ComponentDemo[] = [
  {
    name: 'CloseButton',
    description: '閉じるボタン',
    category: 'other',
    component: TanukiUI.CloseButton,
    examples: {
      basic: React.createElement(TanukiUI.CloseButton, { 
        onClick: () => alert('閉じるボタンがクリックされました')
      })
    }
  },
  {
    name: 'Drawer',
    description: 'ドロワー',
    category: 'other',
    component: TanukiUI.Drawer,
    examples: {
      basic: React.createElement(InteractiveDrawer)
    }
  }
];

// Check if components exist before using
const hasPopover = 'Popover' in TanukiUI;
const hasContextualMenu = 'ContextualMenu' in TanukiUI;

// Interactive Popover Component (if available)
const InteractivePopover: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  if (!hasPopover) {
    return React.createElement(TanukiUI.P, {}, 'Popoverコンポーネントは現在利用できません');
  }
  
  return React.createElement(
    React.Fragment,
    {},
    React.createElement(TanukiUI.Button, 
      { onClick: () => setIsOpen(true) }, 
      'ポップオーバーを表示'
    ),
    React.createElement('div', 
      { style: { position: 'relative' }},
      isOpen && React.createElement('div', 
        { 
          style: { 
            position: 'absolute', 
            top: '100%', 
            left: 0, 
            background: 'white', 
            border: '1px solid #ccc', 
            padding: '16px',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            zIndex: 1000
          }
        },
        React.createElement(TanukiUI.H4, {}, 'ポップオーバー'),
        React.createElement(TanukiUI.P, {}, 'これはポップオーバーの内容です。'),
        React.createElement(TanukiUI.Button, 
          { onClick: () => setIsOpen(false) }, 
          '閉じる'
        )
      )
    )
  );
};

// Additional Form Elements
const additionalFormElements: ComponentDemo[] = [
  {
    name: 'Form',
    description: 'フォーム要素',
    category: 'form-additional',
    component: TanukiUI.Form,
    examples: {
      basic: React.createElement(TanukiUI.Form, 
        { onSubmit: (e: React.FormEvent) => { e.preventDefault(); alert('フォームが送信されました'); } },
        React.createElement(TanukiUI.Label, {}, '名前:'),
        React.createElement(TanukiUI.Input, { name: 'name', placeholder: '名前を入力', required: true }),
        React.createElement('br'),
        React.createElement(TanukiUI.Label, {}, 'メール:'),
        React.createElement(TanukiUI.Input, { type: 'email', name: 'email', placeholder: 'email@example.com' }),
        React.createElement('br'),
        React.createElement(TanukiUI.Button, { type: 'submit' }, '送信')
      )
    }
  },
  {
    name: 'Legend',
    description: 'フィールドセット説明',
    category: 'form-additional',
    component: TanukiUI.Legend,
    examples: {
      basic: React.createElement(TanukiUI.Fieldset, {},
        React.createElement(TanukiUI.Legend, {}, '個人情報'),
        React.createElement(TanukiUI.Input, { placeholder: '氏名' }),
        React.createElement('br'),
        React.createElement(TanukiUI.Input, { placeholder: 'メールアドレス', type: 'email' })
      )
    }
  },
  {
    name: 'Optgroup',
    description: 'オプショングループ',
    category: 'form-additional',
    component: TanukiUI.Optgroup,
    examples: {
      basic: React.createElement(TanukiUI.Select, {},
        React.createElement(TanukiUI.Optgroup, { label: '果物' },
          React.createElement(TanukiUI.Option, { value: 'apple' }, 'りんご'),
          React.createElement(TanukiUI.Option, { value: 'banana' }, 'バナナ')
        ),
        React.createElement(TanukiUI.Optgroup, { label: '野菜' },
          React.createElement(TanukiUI.Option, { value: 'carrot' }, 'にんじん'),
          React.createElement(TanukiUI.Option, { value: 'lettuce' }, 'レタス')
        )
      )
    }
  },
  {
    name: 'Output',
    description: '出力要素',
    category: 'form-additional',
    component: TanukiUI.Output,
    examples: {
      basic: React.createElement('div', {},
        React.createElement(TanukiUI.Input, { 
          type: 'number', 
          id: 'input1', 
          defaultValue: 10,
          onChange: () => {}
        }),
        ' + ',
        React.createElement(TanukiUI.Input, { 
          type: 'number', 
          id: 'input2', 
          defaultValue: 20,
          onChange: () => {}
        }),
        ' = ',
        React.createElement(TanukiUI.Output, { 
          name: 'result', 
          htmlFor: 'input1 input2' 
        }, '30')
      )
    }
  }
];

// Additional Elements
const additionalElements: ComponentDemo[] = [
  {
    name: 'Address',
    description: '住所・連絡先要素',
    category: 'elements-additional',
    component: TanukiUI.Address,
    examples: {
      basic: React.createElement(TanukiUI.Address, {},
        '〒100-0001',
        React.createElement('br'),
        '東京都千代田区千代田1-1',
        React.createElement('br'),
        'Tel: 03-1234-5678'
      )
    }
  },
  {
    name: 'Descriptions',
    description: '説明リスト',
    category: 'elements-additional',
    component: TanukiUI.Descriptions,
    examples: {
      basic: React.createElement(TanukiUI.Descriptions, {},
        React.createElement('dt', {}, '名前'),
        React.createElement('dd', {}, 'Tanuki UI'),
        React.createElement('dt', {}, '種類'),
        React.createElement('dd', {}, 'React UIライブラリ'),
        React.createElement('dt', {}, '特徴'),
        React.createElement('dd', {}, 'HTMLの基本要素をそのまま使用可能')
      )
    }
  }
];

// Interactive Components
const interactiveElements: ComponentDemo[] = [
  ...(hasPopover ? [{
    name: 'Popover',
    description: 'ポップオーバーダイアログ',
    category: 'interactive',
    component: (TanukiUI as any).Popover,
    examples: {
      basic: React.createElement(InteractivePopover)
    }
  }] : []),
  ...(hasContextualMenu ? [{
    name: 'ContextualMenu',
    description: 'コンテキストメニュー',
    category: 'interactive',
    component: (TanukiUI as any).ContextualMenu,
    examples: {
      basic: React.createElement(
        'div',
        {},
        React.createElement(TanukiUI.P, {}, 'コンテキストメニューのサンプルです'),
        React.createElement(TanukiUI.Button, 
          { 
            onClick: () => alert('コンテキストメニューが選択されました')
          }, 
          'コンテキストメニューテスト'
        )
      )
    }
  }] : [])
];

// Extended Components
const extendedElements: ComponentDemo[] = [
  {
    name: 'NodeEditor',
    description: 'ビジュアルプログラミング用ノードエディター',
    category: 'extended',
    component: NodeEditorShowcase,
    examples: {
      basic: React.createElement(NodeEditorShowcase)
    }
  }
];

// カテゴリ定義
export const components: Record<string, CategoryInfo> = {
  // HTML標準要素
  elements: {
    name: '🌐 HTML Elements',
    description: 'HTML標準の基本要素のスタイル付きコンポーネント',
    icon: '📄',
    components: htmlElements.filter(c => c.category === 'elements')
  },
  form: {
    name: '🌐 Form Controls', 
    description: 'HTML標準のフォーム入力とコントロール要素',
    icon: '📝',
    components: [...htmlElements.filter(c => c.category === 'form'), ...formElements]
  },
  'form-additional': {
    name: '🌐 Additional Form Elements',
    description: 'HTML標準の追加フォーム要素',
    icon: '📋',
    components: additionalFormElements
  },
  lists: {
    name: '🌐 List Components',
    description: 'HTML標準のリスト・テーブル関連コンポーネント',
    icon: '📋',
    components: listElements
  },
  media: {
    name: '🌐 Media Components',
    description: 'HTML標準の画像・メディア関連コンポーネント',
    icon: '🖼️',
    components: mediaElements
  },
  text: {
    name: '🌐 Text Components',
    description: 'HTML標準のテキスト・引用関連コンポーネント',
    icon: '📝',
    components: textElements
  },
  'elements-additional': {
    name: '🌐 Additional Elements',
    description: 'HTML標準の追加要素',
    icon: '🏷️',
    components: additionalElements
  },
  
  // 非標準/カスタム要素
  layouts: {
    name: '🎨 Layout Components',
    description: 'カスタムレイアウト構築用コンポーネント',
    icon: '🏗️',
    components: layoutElements
  },
  dialogs: {
    name: '🎨 Dialog Components',
    description: 'カスタムダイアログ・モーダル関連コンポーネント',
    icon: '💬',
    components: dialogElements
  },
  navigations: {
    name: '🎨 Navigation Components',
    description: 'カスタムナビゲーション関連コンポーネント',
    icon: '🧭',
    components: navigationElements
  },
  bars: {
    name: '🎨 Bar Components',
    description: 'カスタムツールバー・タブバー関連コンポーネント',
    icon: '📊',
    components: barElements
  },
  blocks: {
    name: '🎨 Block Components',
    description: 'カスタムアイコン・テキストなどの基本ブロック',
    icon: '🧱',
    components: blockElements
  },
  controls: {
    name: '🎨 Control Components', 
    description: 'カスタムコントロール・操作要素',
    icon: '🎛️',
    components: controlElements
  },
  'custom-inputs': {
    name: '🎨 Custom Input Components',
    description: 'カスタム入力コンポーネント',
    icon: '🎨',
    components: customInputElements
  },
  other: {
    name: '🎨 Other Components',
    description: 'その他のカスタムコンポーネント',
    icon: '🔧',
    components: otherElements
  },
  extended: {
    name: '🎨 Extended Components',
    description: '高度な機能を持つ拡張コンポーネント',
    icon: '🚀',
    components: extendedElements
  },
  interactive: {
    name: '🎨 Interactive Components',
    description: 'カスタムインタラクティブなUI要素',
    icon: '⚡',
    components: interactiveElements
  }
};