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
      ]
    }
  },
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
    name: 'A',
    description: 'アンカー（リンク）要素',
    category: 'elements',
    component: TanukiUI.A,
    examples: {
      basic: React.createElement(TanukiUI.A, { href: '#' }, 'リンクテキスト'),
      variations: [
        React.createElement(TanukiUI.A, { href: '#', target: '_blank' }, '外部リンク'),
      ]
    }
  },
  {
    name: 'Article',
    description: '記事要素',
    category: 'elements',
    component: TanukiUI.Article,
    examples: {
      basic: React.createElement(TanukiUI.Article, {}, 
        React.createElement(TanukiUI.H2, {}, '記事タイトル'),
        React.createElement(TanukiUI.P, {}, '記事の内容です。')
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
        React.createElement(TanukiUI.P, {}, 'セクションの内容です。')
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
        React.createElement(TanukiUI.P, {}, 'サイトの説明')
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
        React.createElement(TanukiUI.P, {}, '© 2024 Company Name. All rights reserved.')
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
        React.createElement(TanukiUI.P, {}, 'メインコンテンツエリアです。')
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
        React.createElement(TanukiUI.P, {}, '補足情報やナビゲーション')
      )
    }
  },
  {
    name: 'Button',
    description: 'ボタン要素',
    category: 'form',
    component: TanukiUI.Button,
    examples: {
      basic: React.createElement(TanukiUI.Button, {}, 'ボタン'),
      variations: [
        React.createElement(TanukiUI.Button, { disabled: true }, '無効'),
        React.createElement(TanukiUI.Button, { variant: 'primary' }, 'プライマリ'),
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
      basic: React.createElement(TanukiUI.Textarea, { placeholder: '複数行のテキストを入力', rows: 4 })
    }
  },
  {
    name: 'Label',
    description: 'ラベル要素',
    category: 'form', 
    component: TanukiUI.Label,
    examples: {
      basic: React.createElement(TanukiUI.Label, {}, 'ラベル名')
    }
  },
  {
    name: 'Fieldset',
    description: 'フィールドセット要素',
    category: 'form',
    component: TanukiUI.Fieldset,
    examples: {
      basic: React.createElement(TanukiUI.Fieldset, {}, 
        React.createElement(TanukiUI.Legend, {}, 'フィールドセット'),
        React.createElement(TanukiUI.Input, { placeholder: '入力フィールド' })
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
        React.createElement(TanukiUI.Option, { value: 'option1' }, 'オプション1'),
        React.createElement(TanukiUI.Option, { value: 'option2' }, 'オプション2'),
        React.createElement(TanukiUI.Option, { value: 'option3' }, 'オプション3')
      )
    }
  },
  {
    name: 'Progress',
    description: 'プログレスバー',
    category: 'form',
    component: TanukiUI.Progress,
    examples: {
      basic: React.createElement(TanukiUI.Progress, { value: 70, max: 100 })
    }
  },
  {
    name: 'Meter',
    description: 'メーター',
    category: 'form',
    component: TanukiUI.Meter,
    examples: {
      basic: React.createElement(TanukiUI.Meter, { value: 6, min: 0, max: 10 })
    }
  },
  {
    name: 'EditableLabel',
    description: '編集可能ラベル',
    category: 'form',
    component: TanukiUI.EditableLabel,
    examples: {
      basic: React.createElement(TanukiUI.EditableLabel, { 
        defaultValue: '編集可能なテキスト'
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
  {
    name: 'List',
    description: 'リスト要素',
    category: 'lists',
    component: TanukiUI.List,
    examples: {
      basic: React.createElement(TanukiUI.List, {},
        React.createElement(TanukiUI.ListItem, {}, 'アイテム1'),
        React.createElement(TanukiUI.ListItem, {}, 'アイテム2'),
        React.createElement(TanukiUI.ListItem, {}, 'アイテム3')
      )
    }
  },
  {
    name: 'Table',
    description: 'テーブル要素',
    category: 'lists',
    component: TanukiUI.Table,
    examples: {
      basic: React.createElement(TanukiUI.Table, {},
        React.createElement('thead', {},
          React.createElement('tr', {},
            React.createElement('th', {}, 'ヘッダー1'),
            React.createElement('th', {}, 'ヘッダー2')
          )
        ),
        React.createElement('tbody', {},
          React.createElement('tr', {},
            React.createElement('td', {}, 'データ1'),
            React.createElement('td', {}, 'データ2')
          )
        )
      )
    }
  },
  {
    name: 'SortableList',
    description: 'ソート可能リスト',
    category: 'lists',
    component: TanukiUI.SortableList,
    examples: {
      basic: React.createElement('div', {},
        React.createElement(TanukiUI.H4, {}, 'ソート可能リスト'),
        React.createElement(TanukiUI.P, {}, 'ドラッグ&ドロップで並び替え可能なリストです'),
        React.createElement('ul', {},
          React.createElement('li', { key: '1' }, 'アイテム 1'),
          React.createElement('li', { key: '2' }, 'アイテム 2'),
          React.createElement('li', { key: '3' }, 'アイテム 3')
        )
      )
    }
  },
  {
    name: 'DataList',
    description: 'データリスト',
    category: 'lists',
    component: TanukiUI.DataList,
    examples: {
      basic: React.createElement(TanukiUI.DataList, { id: 'suggestions' },
        React.createElement('option', { value: 'オプション1' }),
        React.createElement('option', { value: 'オプション2' })
      )
    }
  }
];

// Media Elements
const mediaElements: ComponentDemo[] = [
  {
    name: 'Image',
    description: '画像要素',
    category: 'media',
    component: TanukiUI.Image,
    examples: {
      basic: React.createElement(TanukiUI.Image, { 
        src: 'https://via.placeholder.com/150x100', 
        alt: 'プレースホルダー画像',
        width: 150,
        height: 100
      })
    }
  },
  {
    name: 'Figure',
    description: '図表要素',
    category: 'media',
    component: TanukiUI.Figure,
    examples: {
      basic: React.createElement(TanukiUI.Figure, {},
        React.createElement(TanukiUI.Image, { 
          src: 'https://via.placeholder.com/200x150', 
          alt: 'サンプル図表',
          width: 200,
          height: 150
        }),
        React.createElement(TanukiUI.Figcaption, {}, '図表のキャプション')
      )
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
        React.createElement(TanukiUI.P, {}, 'これは重要な引用文です。'),
        React.createElement('cite', {}, '- 引用元')
      )
    }
  },
  {
    name: 'Pre',
    description: '整形済みテキスト',
    category: 'text',
    component: TanukiUI.Pre,
    examples: {
      basic: React.createElement(TanukiUI.Pre, {},
        React.createElement('code', {}, 
          'function hello() {\n  console.log("Hello, World!");\n}'
        )
      )
    }
  },
  {
    name: 'Details',
    description: '詳細表示',
    category: 'text',
    component: TanukiUI.Details,
    examples: {
      basic: React.createElement(TanukiUI.Details, {},
        React.createElement(TanukiUI.Summary, {}, '詳細を表示'),
        React.createElement(TanukiUI.P, {}, 'ここに詳細な情報が表示されます。')
      )
    }
  },
  {
    name: 'HorizontalRule',
    description: '水平線',
    category: 'text',
    component: TanukiUI.HorizontalRule,
    examples: {
      basic: React.createElement(TanukiUI.HorizontalRule)
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
  elements: {
    name: 'HTML Elements',
    description: 'HTML基本要素のスタイル付きコンポーネント',
    icon: '📄',
    components: htmlElements.filter(c => c.category === 'elements')
  },
  form: {
    name: 'Form Controls', 
    description: 'フォーム入力とコントロール要素',
    icon: '📝',
    components: [...htmlElements.filter(c => c.category === 'form'), ...formElements]
  },
  layouts: {
    name: 'Layout Components',
    description: 'レイアウト構築用コンポーネント',
    icon: '🏗️',
    components: layoutElements
  },
  dialogs: {
    name: 'Dialog Components',
    description: 'ダイアログ・モーダル関連コンポーネント',
    icon: '💬',
    components: dialogElements
  },
  navigations: {
    name: 'Navigation Components',
    description: 'ナビゲーション関連コンポーネント',
    icon: '🧭',
    components: navigationElements
  },
  bars: {
    name: 'Bar Components',
    description: 'ツールバー・タブバー関連コンポーネント',
    icon: '📊',
    components: barElements
  },
  blocks: {
    name: 'Block Components',
    description: 'アイコン・テキストなどの基本ブロック',
    icon: '🧱',
    components: blockElements
  },
  controls: {
    name: 'Control Components', 
    description: 'コントロール・操作要素',
    icon: '🎛️',
    components: controlElements
  },
  lists: {
    name: 'List Components',
    description: 'リスト・テーブル関連コンポーネント',
    icon: '📋',
    components: listElements
  },
  media: {
    name: 'Media Components',
    description: '画像・メディア関連コンポーネント',
    icon: '🖼️',
    components: mediaElements
  },
  text: {
    name: 'Text Components',
    description: 'テキスト・引用関連コンポーネント',
    icon: '📝',
    components: textElements
  },
  'custom-inputs': {
    name: 'Custom Input Components',
    description: 'カスタム入力コンポーネント',
    icon: '🎨',
    components: customInputElements
  },
  other: {
    name: 'Other Components',
    description: 'その他の便利なコンポーネント',
    icon: '🔧',
    components: otherElements
  },
  extended: {
    name: 'Extended Components',
    description: '高度な機能を持つ拡張コンポーネント',
    icon: '🚀',
    components: extendedElements
  },
  'form-additional': {
    name: 'Additional Form Elements',
    description: '追加のフォーム要素',
    icon: '📋',
    components: additionalFormElements
  },
  'elements-additional': {
    name: 'Additional Elements',
    description: '追加のHTML要素',
    icon: '🏷️',
    components: additionalElements
  },
  interactive: {
    name: 'Interactive Components',
    description: 'インタラクティブなUI要素',
    icon: '⚡',
    components: interactiveElements
  }
};