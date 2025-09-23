import React from 'react';
import * as TanukiUI from 'tanuki-ui';
import { ComponentDemo } from '../types';
import { specialGuides } from '../specialGuides';
import NodeEditorCatalog from '../../components/NodeEditorCatalog';

// Interactive Dialog Components
const InteractiveDialog: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <>
      <TanukiUI.Button onClick={() => setIsOpen(true)}>
        {title}を開く
      </TanukiUI.Button>
      <TanukiUI.Dialog 
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <TanukiUI.H3>{title}</TanukiUI.H3>
        <TanukiUI.P>{content}</TanukiUI.P>
        <TanukiUI.DialogFooter>
          <TanukiUI.Button onClick={() => setIsOpen(false)}>
            閉じる
          </TanukiUI.Button>
        </TanukiUI.DialogFooter>
      </TanukiUI.Dialog>
    </>
  );
};

const InteractiveModal: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <>
      <TanukiUI.Button onClick={() => setIsOpen(true)}>
        {title}を開く
      </TanukiUI.Button>
      <TanukiUI.Modal 
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <TanukiUI.H3>{title}</TanukiUI.H3>
        <TanukiUI.P>{content}</TanukiUI.P>
        <TanukiUI.Button onClick={() => setIsOpen(false)}>
          閉じる
        </TanukiUI.Button>
      </TanukiUI.Modal>
    </>
  );
};

const InteractiveDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <>
      <TanukiUI.Button onClick={() => setIsOpen(true)}>
        ドロワーを開く
      </TanukiUI.Button>
      <TanukiUI.Drawer 
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <TanukiUI.H3>ドロワータイトル</TanukiUI.H3>
        <TanukiUI.P>ドロワーの内容です。</TanukiUI.P>
        <TanukiUI.Button onClick={() => setIsOpen(false)}>
          閉じる
        </TanukiUI.Button>
      </TanukiUI.Drawer>
    </>
  );
};

const AlertDemo: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <TanukiUI.Div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <TanukiUI.Button onClick={() => setOpen(true)}>Alert を表示</TanukiUI.Button>
      <TanukiUI.Alert
        open={open}
        title="Alert"
        description="即時フィードバックを示す軽量なダイアログです。"
        onClose={() => setOpen(false)}
        onSelect={() => setOpen(false)}
        actions={[{ key: 'dismiss', value: '閉じる' }]}
      >
        <TanukiUI.P style={{ margin: 0 }}>Alert 内の説明コンテンツをここに配置します。</TanukiUI.P>
      </TanukiUI.Alert>
    </TanukiUI.Div>
  );
};

const SortableListDemo: React.FC = () => {
  const [items, setItems] = React.useState(() => [
    { id: 'item-1', label: 'アイテム 1' },
    { id: 'item-2', label: 'アイテム 2' },
    { id: 'item-3', label: 'アイテム 3' },
  ]);

  return (
    <TanukiUI.Div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <TanukiUI.P style={{ margin: 0 }}>ドラッグ&ドロップで並び替えできます。</TanukiUI.P>
      <TanukiUI.SortableList
        items={items}
        setItems={setItems}
        element={(item) => (
          <TanukiUI.Div
            style={{
              padding: '0.75rem 1rem',
              border: '1px solid var(--borderColor)',
              borderRadius: '0.5rem',
              background: 'var(--surfaceColor)',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {item.label}
          </TanukiUI.Div>
        )}
      />
    </TanukiUI.Div>
  );
};

// Dialog Elements
export const dialogElements: ComponentDemo[] = [
  {
    name: 'Dialog',
    description: 'モーダルダイアログ',
    category: 'dialogs',
    component: TanukiUI.Dialog,
    meta: {
      title: 'Dialog',
      category: 'dialogs',
      description: 'ネイティブ <dialog> を拡張したモーダルコンポーネント',
    },
    examples: {
      basic: <InteractiveDialog title="ダイアログタイトル" content="ダイアログの内容です。" />
    }
  },
  {
    name: 'Modal',
    description: 'シンプルなモーダル',
    category: 'dialogs',
    component: TanukiUI.Modal,
    meta: {
      title: 'Modal',
      category: 'dialogs',
      description: 'オーバーレイ表示のためのモーダルコンポーネント',
      guide: specialGuides.Modal,
    },
    examples: {
      basic: <InteractiveModal title="モーダルタイトル" content="モーダルの内容です。" />
    }
  },
  {
    name: 'Alert',
    description: 'アラートダイアログ',
    category: 'dialogs',
    component: TanukiUI.Alert,
    meta: {
      title: 'Alert',
      category: 'dialogs',
      description: '即時フィードバックに適した Alert コンポーネント',
      guide: specialGuides.Alert,
    },
    examples: {
      basic: <AlertDemo />
    }
  }
];

// Navigation Elements
export const navigationElements: ComponentDemo[] = [
  {
    name: 'SidebarList',
    description: '階層構造のサイドバーリスト',
    category: 'navigations',
    component: TanukiUI.SidebarList.List,
     meta: {
       title: 'SidebarList',
       category: 'navigations',
       description: '階層的なサイドナビゲーションを提供するコンポーネント',
       guide: specialGuides.SidebarList,
     },
    examples: {
      basic: (
        <TanukiUI.SidebarList.List>
          <TanukiUI.SidebarList.ListItem label="メニュー1" selected />
          <TanukiUI.SidebarList.ListItem label="メニュー2" />
        </TanukiUI.SidebarList.List>
      )
    }
  },
  {
    name: 'TabNav',
    description: 'ソート可能なタブナビゲーション',
    category: 'navigations',
    component: TanukiUI.TabNav,
    meta: {
      title: 'TabNav',
      category: 'navigations',
      description: 'ドラッグ並び替え可能なタブナビゲーション',
      guide: specialGuides.TabNav,
    },
    examples: {
      basic: (
        <TanukiUI.TabNav
          items={[
            { key: 'tab1', value: 'タブ1' },
            { key: 'tab2', value: 'タブ2' }
          ]}
          value="tab1"
          onChange={() => {}}
          setItems={() => {}}
        />
      )
    }
  }
];

// Bar Elements
export const barElements: ComponentDemo[] = [
  {
    name: 'TabBar',
    description: 'シンプルなタブバー',
    category: 'bars',
    component: TanukiUI.TabBar,
    meta: {
      title: 'TabBar',
      category: 'bars',
      description: '画面下部の切り替え用タブバー',
      guide: specialGuides.TabBar,
    },
    examples: {
      basic: (
        <TanukiUI.TabBar
          items={[
            { key: 'home', value: 'ホーム', icon: '🏠' },
            { key: 'settings', value: '設定', icon: '⚙️' }
          ]}
          onSelect={() => {}}
        />
      )
    }
  },
  {
    name: 'Toolbar',
    description: '多機能ツールバー',
    category: 'bars',
    component: TanukiUI.Toolbar,
    meta: {
      title: 'Toolbar',
      category: 'bars',
      description: '複数の操作を束ねるフレキシブルなツールバー',
      guide: specialGuides.Toolbar,
    },
    examples: {
      basic: (
        <TanukiUI.Toolbar>
          <TanukiUI.Toolbar.Title title="ツールバー" />
          <TanukiUI.Toolbar.Separator />
          <TanukiUI.Toolbar.PushButton>保存</TanukiUI.Toolbar.PushButton>
        </TanukiUI.Toolbar>
      )
    }
  }
];

// Extended Components
export const extendedElements: ComponentDemo[] = [
  {
    name: 'NodeEditor',
    description: 'ビジュアルノードエディタ',
    category: 'extended',
    component: NodeEditorCatalog,
  },
];

// Other Elements
export const otherElements: ComponentDemo[] = [
  {
    name: 'CloseButton',
    description: '閉じるボタン',
    category: 'other',
    component: TanukiUI.CloseButton,
    examples: {
      basic: (
        <TanukiUI.CloseButton 
          onClick={() => alert('閉じるボタンがクリックされました')}
        />
      )
    }
  },
  {
    name: 'Drawer',
    description: 'ドロワー',
    category: 'other',
    component: TanukiUI.Drawer,
    examples: {
      basic: <InteractiveDrawer />
    }
  }
];

// Block Elements
export const blockElements: ComponentDemo[] = [
  {
    name: 'Icon',
    description: 'アイコン表示',
    category: 'blocks',
    component: TanukiUI.Icon,
    examples: {
      basic: <TanukiUI.Icon src="home" size={24} />,
      variations: [
        <TanukiUI.Icon src="settings" size={16} />,
        <TanukiUI.Icon src="search" size={32} />,
      ]
    }
  },
  {
    name: 'Text',
    description: 'ルビ付きテキスト',
    category: 'blocks',
    component: TanukiUI.Text,
    examples: {
      basic: <TanukiUI.Text ruby="とうきょう">東京</TanukiUI.Text>,
      variations: [
        <TanukiUI.Text ruby="にほん">日本</TanukiUI.Text>,
      ]
    }
  },
  {
    name: 'Time',
    description: '時間表示',
    category: 'blocks',
    component: TanukiUI.Time,
    examples: {
      basic: <TanukiUI.Time timestamp="2024-01-01">2024年1月1日</TanukiUI.Time>
    }
  }
];

// Control Elements
export const controlElements: ComponentDemo[] = [
  {
    name: 'SortableList',
    description: 'ドラッグ&ドロップで並び替え可能なリスト',
    category: 'controls',
    component: SortableListDemo,
    examples: {
      basic: <SortableListDemo />,
    },
  },
  {
    name: 'SegmentedControl',
    description: 'セグメント化コントロール',
    category: 'controls',
    component: TanukiUI.SegmentedControl,
    examples: {
      basic: (
        <TanukiUI.SegmentedControl
          items={['オプション1', 'オプション2', 'オプション3']}
          onSelect={() => {}}
        />
      )
    }
  },
  {
    name: 'Resizer',
    description: 'リサイザー',
    category: 'controls',
    component: TanukiUI.Resizer,
    examples: {
      basic: <TanukiUI.Resizer onResize={() => {}} />
    }
  }
];

// Custom Input Elements
export const customInputElements: ComponentDemo[] = [
  {
    name: 'MediaInput',
    description: 'メディアファイル入力',
    category: 'custom-inputs',
    component: TanukiUI.MediaInput,
    examples: {
      basic: (
        <TanukiUI.MediaInput 
          accept="image/*"
          multiple={false}
        />
      )
    }
  },
  {
    name: 'MediaPreview',
    description: 'メディアプレビュー',
    category: 'custom-inputs',
    component: TanukiUI.MediaPreview,
    examples: {
      basic: (
        <TanukiUI.MediaPreview
          src="https://via.placeholder.com/200x150"
          alt="プレビュー画像"
        />
      )
    }
  }
];
