import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { MediaInput } from "./MediaInput";

const meta: Meta<typeof MediaInput> = {
  title: "Form/Custom Inputs/MediaInput",
  component: MediaInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "High-performance media input component with Object URL-based previews, aspect ratio constraints, and responsive sizing."
      }
    }
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["preview", "files"],
      description: "Input display mode - preview shows image previews, files shows standard file input"
    },
    accept: {
      control: "text",
      description: "File type constraints (MIME types)",
      table: {
        defaultValue: { summary: "image/*" }
      }
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple file selection"
    },
    maxPreviewWidth: {
      control: { type: "range", min: 64, max: 512, step: 16 },
      description: "Maximum preview width in pixels"
    },
    maxPreviewHeight: {
      control: { type: "range", min: 64, max: 512, step: 16 },
      description: "Maximum preview height in pixels"
    },
    minPreviewWidth: {
      control: { type: "range", min: 32, max: 128, step: 8 },
      description: "Minimum preview width in pixels"
    },
    minPreviewHeight: {
      control: { type: "range", min: 32, max: 128, step: 8 },
      description: "Minimum preview height in pixels"
    },
    aspectRatioRange: {
      control: "object",
      description: "Aspect ratio constraints (min/max)"
    },
    locale: {
      control: "select",
      options: ["en", "ja", "es", "fr", "de", "ko", "zh-CN", "zh-TW"],
      description: "Language locale for UI text"
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    accept: "image/*",
    name: "media",
    variant: "preview"
  }
};

export const FilesMode: Story = {
  args: {
    accept: "image/*",
    name: "media",
    variant: "files",
    multiple: true
  }
};

export const MultipleFiles: Story = {
  args: {
    accept: "image/*",
    multiple: true,
    name: "media",
    maxPreviewWidth: 96,
    maxPreviewHeight: 96
  }
};

export const LargePreviews: Story = {
  args: {
    accept: "image/*",
    name: "media",
    maxPreviewWidth: 256,
    maxPreviewHeight: 256,
    minPreviewWidth: 128,
    minPreviewHeight: 128
  }
};

export const ConstrainedAspectRatio: Story = {
  args: {
    accept: "image/*",
    name: "media",
    maxPreviewWidth: 200,
    maxPreviewHeight: 150,
    aspectRatioRange: { min: 0.5, max: 2 } // 1:2 to 2:1
  }
};

export const VideoFiles: Story = {
  args: {
    accept: "video/*",
    name: "media",
    multiple: true,
    maxPreviewWidth: 160,
    maxPreviewHeight: 90
  }
};

export const AllMediaTypes: Story = {
  args: {
    accept: "image/*,video/*,audio/*",
    multiple: true,
    name: "media",
    maxPreviewWidth: 128,
    maxPreviewHeight: 128
  }
};

export const WithInitialValue: Story = {
  args: {
    accept: "image/*",
    name: "media",
    defaultValue: "https://picsum.photos/300/200",
    maxPreviewWidth: 150,
    maxPreviewHeight: 100
  }
};

export const LocaleComparison: Story = {
  render: () => {
    const locales = ["en", "ja", "es", "fr", "de", "ko", "zh-CN", "zh-TW"];
    
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem" }}>
        <h3>Language Support Comparison</h3>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem"
        }}>
          {locales.map(locale => (
            <div key={locale} style={{ textAlign: "center" }}>
              <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "0.875rem", color: "#666" }}>
                {locale.toUpperCase()}
              </h4>
              <MediaInput
                accept="image/*"
                name={`media-${locale}`}
                variant="preview"
                locale={locale}
                maxPreviewWidth={80}
                maxPreviewHeight={80}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export const Interactive: Story = {
  render: () => {
    const [files, setFiles] = useState<FileList | null>(null);
    const [previewSettings, setPreviewSettings] = useState({
      maxWidth: 128,
      maxHeight: 128,
      aspectRatio: { min: 0.25, max: 4 },
      locale: "en"
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem" }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          <label>
            Max Width: 
            <input 
              type="range" 
              min="64" 
              max="300" 
              value={previewSettings.maxWidth}
              onChange={(e) => setPreviewSettings(prev => ({ ...prev, maxWidth: parseInt(e.target.value) }))}
            />
            {previewSettings.maxWidth}px
          </label>
          <label>
            Max Height: 
            <input 
              type="range" 
              min="64" 
              max="300" 
              value={previewSettings.maxHeight}
              onChange={(e) => setPreviewSettings(prev => ({ ...prev, maxHeight: parseInt(e.target.value) }))}
            />
            {previewSettings.maxHeight}px
          </label>
          <label>
            Language: 
            <select 
              value={previewSettings.locale}
              onChange={(e) => setPreviewSettings(prev => ({ ...prev, locale: e.target.value }))}
            >
              <option value="en">English</option>
              <option value="ja">日本語</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ko">한국어</option>
              <option value="zh-CN">中文(简体)</option>
              <option value="zh-TW">中文(繁體)</option>
            </select>
          </label>
        </div>
        
        <MediaInput
          accept="image/*"
          multiple
          name="interactive-media"
          maxPreviewWidth={previewSettings.maxWidth}
          maxPreviewHeight={previewSettings.maxHeight}
          aspectRatioRange={previewSettings.aspectRatio}
          locale={previewSettings.locale}
          onChange={(e) => setFiles(e.target.files)}
        />
        
        {files && (
          <div style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#666" }}>
            Selected: {files.length} file(s)
            <ul style={{ margin: "0.5rem 0", paddingLeft: "1rem" }}>
              {Array.from(files).map((file, i) => (
                <li key={i}>
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
};

export const Performance: Story = {
  render: () => {
    const [renderTime, setRenderTime] = useState<number | null>(null);
    const [fileCount, setFileCount] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const start = performance.now();
      setFileCount(e.target.files?.length || 0);
      // Simulate render completion
      setTimeout(() => {
        const end = performance.now();
        setRenderTime(end - start);
      }, 0);
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem" }}>
        <h3>Performance Test</h3>
        <p>Select multiple large images to test Object URL performance</p>
        
        <MediaInput
          accept="image/*"
          multiple
          name="performance-test"
          maxPreviewWidth={96}
          maxPreviewHeight={96}
          onChange={handleChange}
        />
        
        {renderTime !== null && (
          <div style={{ 
            padding: "0.75rem", 
            background: "#f0f8ff", 
            border: "1px solid #b0d4f1", 
            borderRadius: "4px",
            fontSize: "0.875rem"
          }}>
            <strong>Performance:</strong> Rendered {fileCount} previews in {renderTime.toFixed(2)}ms
            <br />
            <em>Using Object URLs for optimal memory efficiency</em>
          </div>
        )}
      </div>
    );
  }
};