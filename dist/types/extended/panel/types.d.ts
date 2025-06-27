import { DragEvent } from 'react';
export type PanelID = string;
export type TabID = string;
export type Orientation = 'horizontal' | 'vertical';
export type SplitDirection = 'left' | 'right' | 'top' | 'bottom';
export interface TabMeta {
    id: TabID;
    title: string;
    icon?: React.ReactNode;
    tooltip?: string;
    isDirty?: boolean;
    isClosable?: boolean;
    isPinned?: boolean;
    data?: Record<string, any>;
}
export interface SplitNode {
    id: PanelID;
    type: 'split';
    orientation: Orientation;
    children: PanelNode[];
    sizes: number[];
}
export interface LeafNode {
    id: PanelID;
    type: 'leaf';
    tabs: TabMeta[];
    activeTabId: TabID;
    pinnedTabIds?: TabID[];
}
export type PanelNode = SplitNode | LeafNode;
export interface PanelState {
    root: PanelNode;
    pruneEmptyPanel?: boolean;
    focusedLeafId?: PanelID;
    recentlyClosedTabs?: TabMeta[];
}
export interface PanelOptions {
    pruneEmptyGroups?: boolean;
    enableTabDrag?: boolean;
    enablePanelSplit?: boolean;
    enableTabReorder?: boolean;
    minPanelSize?: number;
    splitterSize?: number;
    showCloseButton?: boolean;
    maxTabWidth?: number;
    minTabWidth?: number;
    enableKeyboardShortcuts?: boolean;
    keyBindings?: Partial<KeyBindingMap>;
}
export interface KeyBindingMap {
    closeTab: string[];
    newTab: string[];
    nextTab: string[];
    prevTab: string[];
    splitRight: string[];
    splitDown: string[];
    focusGroup: string[];
    moveTabRight: string[];
    moveTabLeft: string[];
}
export interface TabBarRenderProps {
    leafId: PanelID;
    tabs: TabMeta[];
    activeTabId: TabID;
    onTabClick: (tabId: TabID) => void;
    onTabClose: (tabId: TabID) => void;
    onTabDragStart: (tabId: TabID, event: DragEvent) => void;
    onTabDrop: (tabId: TabID, index: number) => void;
    isDropTarget: boolean;
}
export interface SplitterRenderProps {
    orientation: Orientation;
    onResize: (delta: number) => void;
    onResizeStart: () => void;
    onResizeEnd: () => void;
    isResizing: boolean;
}
export interface DropZoneRenderProps {
    direction: SplitDirection;
    isActive: boolean;
    isVisible: boolean;
    onDrop: (tabId: TabID) => void;
}
export interface PanelProps {
    value?: PanelState;
    defaultValue?: PanelState;
    onChange?: (value: PanelState) => void;
    style?: React.CSSProperties;
    className?: string;
    children: (tab: TabMeta) => React.JSX.Element;
    onRequestTabCreate?: (leafId: PanelID) => TabMeta | undefined;
    onTabClose?: (tabId: TabID, leafId: PanelID) => boolean | void;
    onTabMove?: (tabId: TabID, sourceLeafId: PanelID, targetLeafId: PanelID, targetIndex?: number) => boolean | void;
    onPanelSplit?: (leafId: PanelID, orientation: Orientation, ratio?: number) => boolean | void;
    onPanelClose?: (panelId: PanelID) => boolean | void;
    renderTabBar?: (props: TabBarRenderProps) => React.JSX.Element;
    renderSplitter?: (props: SplitterRenderProps) => React.JSX.Element;
    renderDropZone?: (props: DropZoneRenderProps) => React.JSX.Element;
    options?: PanelOptions;
}
export interface DragState {
    isDragging: boolean;
    draggedTabId?: TabID;
    sourceLeafId?: PanelID;
    dropTargetLeafId?: PanelID;
    dropDirection?: SplitDirection;
    insertIndex?: number;
}
export interface PanelContextValue {
    state: PanelState;
    dragState: DragState;
    actions: PanelActions;
    options: Required<PanelOptions>;
}
export interface PanelActions {
    activateTab: (leafId: PanelID, tabId: TabID) => void;
    closeTab: (leafId: PanelID, tabId: TabID) => void;
    createTab: (leafId: PanelID, tab?: TabMeta) => void;
    moveTab: (sourceLeafId: PanelID, targetLeafId: PanelID, tabId: TabID, targetIndex?: number) => void;
    reorderTab: (leafId: PanelID, tabId: TabID, newIndex: number) => void;
    splitPanel: (leafId: PanelID, orientation: Orientation, ratio?: number) => void;
    closePanel: (panelId: PanelID) => void;
    resizePanel: (panelId: PanelID, sizes: number[]) => void;
    focusPanel: (leafId: PanelID) => void;
    startDrag: (tabId: TabID, sourceLeafId: PanelID) => void;
    setDropTarget: (leafId?: PanelID, direction?: SplitDirection, insertIndex?: number) => void;
    endDrag: () => void;
    executeDrop: () => void;
    pruneEmptyNodes: () => void;
    restoreTab: () => void;
}
