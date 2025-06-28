// Component catalog definition - refactored into separate files
import { CategoryInfo } from "./types";
import { htmlElements } from "./categories/htmlElements";
import { formElements, additionalFormElements } from "./categories/formElements";
import { listElements } from "./categories/listElements";
import { mediaElements } from "./categories/mediaElements";
import { textElements, additionalElements } from "./categories/textElements";
import {
  dialogElements,
  navigationElements,
  barElements,
  extendedElements,
  otherElements,
  blockElements,
  controlElements,
  customInputElements,
} from "./categories/interactiveElements";
import * as audioControls from "./categories/audio-controls";

// カテゴリ定義
export const components: Record<string, CategoryInfo> = {
  // HTML標準要素
  elements: {
    name: "🌐 HTML Elements",
    description: "HTML標準の基本要素のスタイル付きコンポーネント",
    icon: "📄",
    components: htmlElements.filter((c) => c.category === "elements"),
  },
  form: {
    name: "🌐 Form Controls",
    description: "HTML標準のフォーム入力とコントロール要素",
    icon: "📝",
    components: [...htmlElements.filter((c) => c.category === "form"), ...formElements],
  },
  "form-additional": {
    name: "🌐 Additional Form Elements",
    description: "HTML標準の追加フォーム要素",
    icon: "📋",
    components: additionalFormElements,
  },
  lists: {
    name: "🌐 List Components",
    description: "HTML標準のリスト・テーブル関連コンポーネント",
    icon: "📋",
    components: listElements,
  },
  media: {
    name: "🌐 Media Components",
    description: "HTML標準の画像・メディア関連コンポーネント",
    icon: "🖼️",
    components: mediaElements,
  },
  text: {
    name: "🌐 Text Components",
    description: "HTML標準のテキスト・引用関連コンポーネント",
    icon: "📝",
    components: textElements,
  },
  "elements-additional": {
    name: "🌐 Additional Elements",
    description: "HTML標準の追加要素",
    icon: "🏷️",
    components: additionalElements,
  },

  // 非標準/カスタム要素
  dialogs: {
    name: "🎨 Dialog Components",
    description: "カスタムダイアログ・モーダル関連コンポーネント",
    icon: "💬",
    components: dialogElements,
  },
  navigations: {
    name: "🎨 Navigation Components",
    description: "カスタムナビゲーション関連コンポーネント",
    icon: "🧭",
    components: navigationElements,
  },
  bars: {
    name: "🎨 Bar Components",
    description: "カスタムツールバー・タブバー関連コンポーネント",
    icon: "📊",
    components: barElements,
  },
  blocks: {
    name: "🎨 Block Components",
    description: "カスタムアイコン・テキストなどの基本ブロック",
    icon: "🧱",
    components: blockElements,
  },
  controls: {
    name: "🎨 Control Components",
    description: "カスタムコントロール・操作要素",
    icon: "🎛️",
    components: controlElements,
  },
  "custom-inputs": {
    name: "🎨 Custom Input Components",
    description: "カスタム入力コンポーネント",
    icon: "🎨",
    components: customInputElements,
  },
  other: {
    name: "🎨 Other Components",
    description: "その他のカスタムコンポーネント",
    icon: "🔧",
    components: otherElements,
  },
  extended: {
    name: "🎨 Extended Components",
    description: "高度な機能を持つ拡張コンポーネント",
    icon: "🚀",
    components: extendedElements,
  },
  "audio-controls": {
    name: "🎵 Audio Controls",
    description: "オーディオ制作・再生向けの専用コントロール",
    icon: "🎵",
    components: [
      // Transport Controls
      {
        name: "LoopToggle",
        category: "audio-controls",
        component: audioControls.LoopToggleBasic,
        meta: audioControls.LoopToggleMeta,
      },
      {
        name: "LoopToggle - Sizes",
        category: "audio-controls",
        component: audioControls.LoopToggleSizes,
        meta: audioControls.LoopToggleMeta,
      },

      // Timing Controls
      {
        name: "MetronomeToggle",
        category: "audio-controls",
        component: audioControls.MetronomeToggleBasic,
        meta: audioControls.MetronomeToggleMeta,
      },
      {
        name: "MetronomeToggle - Sizes",
        category: "audio-controls",
        component: audioControls.MetronomeToggleSizes,
        meta: audioControls.MetronomeToggleMeta,
      },

      // Navigation Controls
      {
        name: "TimelineRuler",
        category: "audio-controls",
        component: audioControls.TimelineRulerBasic,
        meta: audioControls.TimelineRulerMeta,
      },
      {
        name: "TimelineRuler - With Zoom",
        category: "audio-controls",
        component: audioControls.TimelineRulerWithZoom,
        meta: audioControls.TimelineRulerMeta,
      },

      // Mixing Controls
      {
        name: "VolumeFader",
        category: "audio-controls",
        component: audioControls.VolumeFaderBasic,
        meta: audioControls.VolumeFaderMeta,
      },
      {
        name: "VolumeFader - Horizontal",
        category: "audio-controls",
        component: audioControls.VolumeFaderHorizontal,
        meta: audioControls.VolumeFaderMeta,
      },
      {
        name: "VolumeFader - Custom Range",
        category: "audio-controls",
        component: audioControls.VolumeFaderCustomRange,
        meta: audioControls.VolumeFaderMeta,
      },
      { name: "PanKnob", category: "audio-controls", component: audioControls.PanKnobBasic, meta: audioControls.PanKnobMeta },
      {
        name: "PanKnob - Sizes",
        category: "audio-controls",
        component: audioControls.PanKnobSizes,
        meta: audioControls.PanKnobMeta,
      },
      {
        name: "PanKnob - Custom Range",
        category: "audio-controls",
        component: audioControls.PanKnobCustomRange,
        meta: audioControls.PanKnobMeta,
      },

      // Editing Controls
      {
        name: "StepSequencer",
        category: "audio-controls",
        component: audioControls.StepSequencerBasic,
        meta: audioControls.StepSequencerMeta,
      },
      {
        name: "StepSequencer - 32 Steps",
        category: "audio-controls",
        component: audioControls.StepSequencer32Steps,
        meta: audioControls.StepSequencerMeta,
      },

      // Modulation Controls
      { name: "XyPad", category: "audio-controls", component: audioControls.XyPadBasic, meta: audioControls.XyPadMeta },
      {
        name: "XyPad - Custom Labels",
        category: "audio-controls",
        component: audioControls.XyPadCustomLabels,
        meta: audioControls.XyPadMeta,
      },
      {
        name: "XyPad - Custom Range",
        category: "audio-controls",
        component: audioControls.XyPadCustomRange,
        meta: audioControls.XyPadMeta,
      },

      // Unified Button
      {
        name: "AudioButton",
        category: "audio-controls",
        component: audioControls.AudioButtonBasic,
        meta: audioControls.AudioButtonMeta,
      },
      {
        name: "AudioButton - Sizes",
        category: "audio-controls",
        component: audioControls.AudioButtonSizes,
        meta: audioControls.AudioButtonMeta,
      },
      {
        name: "AudioButton - Shapes",
        category: "audio-controls",
        component: audioControls.AudioButtonShapes,
        meta: audioControls.AudioButtonMeta,
      },
    ],
  },
};

// Re-export types for convenience
export type { ComponentDemo, CategoryInfo } from "./types";
