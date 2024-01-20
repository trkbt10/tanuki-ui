import { useMemo } from "react";

interface MediaInputMessages {
  clickToSelect: string;
  orDragAndDrop: string;
  dropFilesHere: string;
}

const messages: Record<string, MediaInputMessages> = {
  en: {
    clickToSelect: "Click to select files",
    orDragAndDrop: "or drag and drop",
    dropFilesHere: "Drop files here"
  },
  ja: {
    clickToSelect: "ファイルを選択",
    orDragAndDrop: "またはドラッグ&ドロップ",
    dropFilesHere: "ファイルをここにドロップ"
  },
  es: {
    clickToSelect: "Haz clic para seleccionar archivos",
    orDragAndDrop: "o arrastra y suelta",
    dropFilesHere: "Suelta los archivos aquí"
  },
  fr: {
    clickToSelect: "Cliquez pour sélectionner des fichiers",
    orDragAndDrop: "ou glissez-déposez",
    dropFilesHere: "Déposez les fichiers ici"
  },
  de: {
    clickToSelect: "Klicken Sie, um Dateien auszuwählen",
    orDragAndDrop: "oder ziehen und ablegen",
    dropFilesHere: "Dateien hier ablegen"
  },
  ko: {
    clickToSelect: "파일 선택하기",
    orDragAndDrop: "또는 드래그 앤 드롭",
    dropFilesHere: "파일을 여기에 드롭하세요"
  },
  "zh-CN": {
    clickToSelect: "点击选择文件",
    orDragAndDrop: "或拖拽上传",
    dropFilesHere: "将文件拖拽到这里"
  },
  "zh-TW": {
    clickToSelect: "點擊選擇檔案",
    orDragAndDrop: "或拖曳上傳",
    dropFilesHere: "將檔案拖曳到這裡"
  }
};

/**
 * Hook for MediaInput internationalization
 * Automatically detects browser language and provides appropriate messages
 */
export const useMediaInputI18n = (customLocale?: string) => {
  const locale = useMemo(() => {
    if (customLocale) return customLocale;
    
    if (typeof window === "undefined") return "en";
    
    // Get browser language
    const browserLang = navigator.language;
    
    // Try exact match first (e.g., "zh-CN")
    if (messages[browserLang]) {
      return browserLang;
    }
    
    // Try language code only (e.g., "zh" from "zh-CN")
    const langCode = browserLang.split("-")[0];
    if (messages[langCode]) {
      return langCode;
    }
    
    // Fallback to English
    return "en";
  }, [customLocale]);

  const currentMessages = messages[locale] || messages.en;

  return {
    locale,
    messages: currentMessages,
    getSelectText: (isDragActive: boolean) => {
      if (isDragActive) {
        return currentMessages.dropFilesHere;
      }
      return `${currentMessages.clickToSelect} ${currentMessages.orDragAndDrop}`;
    }
  };
};