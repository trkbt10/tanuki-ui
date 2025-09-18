export interface SpecialGuideContent {
  summary: string;
  whenToUse: string[];
  bestPractices?: string[];
  pitfalls?: string[];
  codeSnippet?: string;
  references?: Array<{ label: string; href: string }>;
}

export interface CatalogMeta {
  title: string;
  category: string;
  description: string;
  guide?: SpecialGuideContent;
}
