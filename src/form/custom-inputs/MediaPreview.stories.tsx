import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { MediaPreview } from "./MediaPreview";

const meta: Meta<typeof MediaPreview> = {
  title: "Form/Custom Inputs/MediaPreview",
  component: MediaPreview,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Responsive media preview component with aspect ratio constraints and adaptive sizing."
      }
    }
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "Image source URL"
    },
    maxWidth: {
      control: { type: "range", min: 64, max: 512, step: 16 },
      description: "Maximum width in pixels"
    },
    maxHeight: {
      control: { type: "range", min: 64, max: 512, step: 16 },
      description: "Maximum height in pixels"
    },
    minWidth: {
      control: { type: "range", min: 32, max: 128, step: 8 },
      description: "Minimum width in pixels"
    },
    minHeight: {
      control: { type: "range", min: 32, max: 128, step: 8 },
      description: "Minimum height in pixels"
    },
    aspectRatioRange: {
      control: "object",
      description: "Aspect ratio constraints { min, max }"
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://picsum.photos/300/200",
    alt: "Sample image",
    maxWidth: 128,
    maxHeight: 128
  }
};

export const SquareImage: Story = {
  args: {
    src: "https://picsum.photos/300/300",
    alt: "Square image",
    maxWidth: 150,
    maxHeight: 150
  }
};

export const WideImage: Story = {
  args: {
    src: "https://picsum.photos/400/150",
    alt: "Wide panoramic image",
    maxWidth: 200,
    maxHeight: 100,
    aspectRatioRange: { min: 0.5, max: 4 }
  }
};

export const TallImage: Story = {
  args: {
    src: "https://picsum.photos/150/400",
    alt: "Tall portrait image",
    maxWidth: 100,
    maxHeight: 200,
    aspectRatioRange: { min: 0.25, max: 2 }
  }
};

export const ExtremeAspectRatio: Story = {
  args: {
    src: "https://picsum.photos/800/100",
    alt: "Very wide banner image",
    maxWidth: 300,
    maxHeight: 80,
    aspectRatioRange: { min: 1, max: 6 }
  }
};

export const ConstrainedDimensions: Story = {
  args: {
    src: "https://picsum.photos/200/300",
    alt: "Constrained image",
    maxWidth: 120,
    maxHeight: 120,
    minWidth: 80,
    minHeight: 80,
    aspectRatioRange: { min: 0.8, max: 1.2 } // Nearly square
  }
};

export const LargePreview: Story = {
  args: {
    src: "https://picsum.photos/600/400",
    alt: "Large preview",
    maxWidth: 256,
    maxHeight: 256,
    minWidth: 128,
    minHeight: 128
  }
};

export const SmallThumbnail: Story = {
  args: {
    src: "https://picsum.photos/100/100",
    alt: "Small thumbnail",
    maxWidth: 64,
    maxHeight: 64,
    minWidth: 48,
    minHeight: 48
  }
};

export const AspectRatioComparison: Story = {
  render: () => {
    const images = [
      { src: "https://picsum.photos/400/300", label: "4:3 Landscape" },
      { src: "https://picsum.photos/300/400", label: "3:4 Portrait" },
      { src: "https://picsum.photos/500/200", label: "5:2 Wide" },
      { src: "https://picsum.photos/200/500", label: "2:5 Tall" },
      { src: "https://picsum.photos/300/300", label: "1:1 Square" }
    ];

    return (
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "1rem",
        padding: "1rem",
        maxWidth: "800px"
      }}>
        {images.map((img, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <MediaPreview
              src={img.src}
              alt={img.label}
              maxWidth={120}
              maxHeight={120}
              minWidth={60}
              minHeight={60}
              aspectRatioRange={{ min: 0.25, max: 4 }}
            />
            <p style={{ margin: "0.5rem 0", fontSize: "0.75rem", color: "#666" }}>
              {img.label}
            </p>
          </div>
        ))}
      </div>
    );
  }
};

export const ResponsiveGrid: Story = {
  render: () => {
    const imageUrls = Array.from({ length: 12 }, (_, i) => 
      `https://picsum.photos/${200 + (i * 50)}/${150 + (i * 30)}?random=${i}`
    );

    return (
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
        gap: "0.75rem",
        padding: "1rem",
        maxWidth: "600px"
      }}>
        {imageUrls.map((url, i) => (
          <MediaPreview
            key={i}
            src={url}
            alt={`Random image ${i + 1}`}
            maxWidth={96}
            maxHeight={96}
            minWidth={64}
            minHeight={64}
            aspectRatioRange={{ min: 0.5, max: 2 }}
          />
        ))}
      </div>
    );
  }
};

export const LoadingStates: Story = {
  render: () => {
    const [loadStates, setLoadStates] = React.useState<Record<number, 'loading' | 'loaded' | 'error'>>({});

    const handleLoad = (index: number) => {
      setLoadStates(prev => ({ ...prev, [index]: 'loaded' }));
    };

    const handleError = (index: number) => {
      setLoadStates(prev => ({ ...prev, [index]: 'error' }));
    };

    const testImages = [
      { src: "https://picsum.photos/200/150", label: "Valid image" },
      { src: "https://invalid-url-example.com/image.jpg", label: "Broken URL" },
      { src: "https://picsum.photos/300/200?random=test", label: "Slow loading" }
    ];

    return (
      <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
        {testImages.map((img, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <MediaPreview
              src={img.src}
              alt={img.label}
              maxWidth={120}
              maxHeight={120}
              onLoad={() => handleLoad(i)}
              onError={() => handleError(i)}
            />
            <p style={{ 
              margin: "0.5rem 0", 
              fontSize: "0.75rem", 
              color: loadStates[i] === 'error' ? '#d32f2f' : '#666'
            }}>
              {img.label}
              <br />
              <em>{loadStates[i] || 'loading...'}</em>
            </p>
          </div>
        ))}
      </div>
    );
  }
};