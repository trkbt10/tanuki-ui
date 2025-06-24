import React from 'react';

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