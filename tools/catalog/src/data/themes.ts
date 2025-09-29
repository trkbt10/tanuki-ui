// Auto-generated theme catalog
// Run: node scripts/generate-theme-catalog.js

export interface ThemeMetadata {
  value: string;
  label: string;
  file: string;
  description: string;
  category: string;
}

export const themes: ThemeMetadata[] = [
  {
    "value": "monotone",
    "label": "Monotone (Default)",
    "file": "/tanuki-ui/styles/monotone.css",
    "description": "High contrast accessibility-focused design with clear visual hierarchy and enhanced readability",
    "category": "Accessibility"
  },
  {
    "value": "8bit-gameconsole-rpg",
    "label": "8-bit Game Console RPG",
    "file": "/tanuki-ui/styles/8bit-gameconsole-rpg.css",
    "description": "Authentic retro 8-bit console experience with pixel-perfect design, monochrome palette, chunky borders, and classic RPG aesthetics",
    "category": "Retro"
  },
  {
    "value": "android12",
    "label": "Android 12",
    "file": "/tanuki-ui/styles/android12.css",
    "description": "Based on Material You design system with dynamic color, large touch targets, and smooth animations",
    "category": "Google"
  },
  {
    "value": "apple-liquid-glass",
    "label": "Apple Liquid Glass",
    "file": "/tanuki-ui/styles/apple-liquid-glass.css",
    "description": "Premium glass morphism design with translucent effects and blur",
    "category": "Modern"
  },
  {
    "value": "aws",
    "label": "AWS",
    "file": "/tanuki-ui/styles/aws.css",
    "description": "Amazon Web Services console-inspired design with professional cloud interface aesthetics",
    "category": "Enterprise"
  },
  {
    "value": "figma",
    "label": "Figma",
    "file": "/tanuki-ui/styles/figma.css",
    "description": "Recreates Figma's modern design system with clean typography, subtle shadows, and professional aesthetics",
    "category": "Design"
  },
  {
    "value": "github-dark",
    "label": "GitHub Dark",
    "file": "/tanuki-ui/styles/github-dark.css",
    "description": "GitHub's dark theme with professional developer-focused aesthetics",
    "category": "Developer"
  },
  {
    "value": "handheld-console",
    "label": "Handheld Console",
    "file": "/tanuki-ui/styles/handheld-console.css",
    "description": "Nintendo Switch and handheld gaming aesthetics with rounded corners and vibrant colors",
    "category": "Gaming"
  },
  {
    "value": "ios12",
    "label": "iOS 12",
    "file": "/tanuki-ui/styles/ios12.css",
    "description": "Implements Apple's Human Interface Guidelines with authentic iOS styling and dynamic color system",
    "category": "Apple"
  },
  {
    "value": "linear",
    "label": "Linear",
    "file": "/tanuki-ui/styles/linear.css",
    "description": "Linear app-inspired modern design with clean typography and minimal interface elements",
    "category": "Productivity"
  },
  {
    "value": "macOS12",
    "label": "macOS 12",
    "file": "/tanuki-ui/styles/macOS12.css",
    "description": "Apple's design system with translucent effects and refined interface elements",
    "category": "Apple"
  },
  {
    "value": "material-design",
    "label": "Material Design",
    "file": "/tanuki-ui/styles/material-design.css",
    "description": "Google's Material Design system with elevation layers and dynamic color palette",
    "category": "Google"
  },
  {
    "value": "naver-line",
    "label": "Naver LINE",
    "file": "/tanuki-ui/styles/naver-line.css",
    "description": "Inspired by LY Corporation's LINE brand with crisp white surfaces, bright green accents, and friendly messaging vibes",
    "category": "Communication"
  },
  {
    "value": "openai",
    "label": "OpenAI",
    "file": "/tanuki-ui/styles/openai.css",
    "description": "OpenAI's clean interface styling with thoughtful typography and modern color palette",
    "category": "AI"
  },
  {
    "value": "vercel",
    "label": "Vercel",
    "file": "/tanuki-ui/styles/vercel.css",
    "description": "Geist-based palette with official neutral/brand tokens and typography updates",
    "category": "Developer"
  },
  {
    "value": "windows11",
    "label": "Windows 11",
    "file": "/tanuki-ui/styles/windows11.css",
    "description": "Modern, clean design with subtle shadows, rounded corners, and Fluent Design principles",
    "category": "Microsoft"
  },
  {
    "value": "windows98",
    "label": "Windows 98",
    "file": "/tanuki-ui/styles/windows98.css",
    "description": "Recreates the classic Windows 98 interface with 3D beveled controls, retro typography, and nostalgic aesthetics",
    "category": "Retro"
  },
  {
    "value": "windows-xp",
    "label": "Windows XP",
    "file": "/tanuki-ui/styles/windows-xp.css",
    "description": "Recreates the iconic Luna Blue interface with gradient buttons, rounded corners, and the classic XP aesthetic",
    "category": "Retro"
  },
  {
    "value": "youtube",
    "label": "YouTube",
    "file": "/tanuki-ui/styles/youtube.css",
    "description": "Modern, clean design inspired by YouTube's interface with rounded corners, subtle shadows, and video-centric aesthetics",
    "category": "Media"
  }
];

// Group themes by category
export function groupThemesByCategory(themes: ThemeMetadata[]): Record<string, ThemeMetadata[]> {
  const grouped: Record<string, ThemeMetadata[]> = {};
  
  for (const theme of themes) {
    const category = theme.category || 'Other';
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(theme);
  }
  
  return grouped;
}
