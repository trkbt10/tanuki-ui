import React from 'react';
import type { CatalogMeta } from '../CatalogMeta';

export type CategoryGroup = 'html' | 'custom';

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
  meta?: CatalogMeta;
}

export interface CategoryInfo {
  name: string;
  description: string;
  icon: string;
  group: CategoryGroup;
  components: ComponentDemo[];
}
