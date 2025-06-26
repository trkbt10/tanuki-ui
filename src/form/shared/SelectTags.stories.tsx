import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectTags } from './SelectTags';

const meta: Meta<typeof SelectTags> = {
  title: 'Form/Shared/SelectTags',
  component: SelectTags,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onRemoveTag: { action: 'tag removed' },
    multiple: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockGetOptionLabel = (value: string) => {
  const labels: Record<string, string> = {
    'react': 'React',
    'vue': 'Vue.js',
    'angular': 'Angular',
    'svelte': 'Svelte',
    'typescript': 'TypeScript',
    'javascript': 'JavaScript',
  };
  return labels[value] || value;
};

export const EmptyState: Story = {
  args: {
    selectedValues: [],
    getOptionLabel: mockGetOptionLabel,
    placeholder: 'Select options...',
    multiple: true,
    disabled: false,
  },
};

export const MultipleSelected: Story = {
  args: {
    selectedValues: ['react', 'typescript', 'vue'],
    getOptionLabel: mockGetOptionLabel,
    multiple: true,
    disabled: false,
  },
};

export const SingleSelected: Story = {
  args: {
    selectedValues: ['react'],
    getOptionLabel: mockGetOptionLabel,
    multiple: false,
    disabled: false,
  },
};

export const DisabledWithTags: Story = {
  args: {
    selectedValues: ['react', 'typescript'],
    getOptionLabel: mockGetOptionLabel,
    multiple: true,
    disabled: true,
  },
};

export const ManyTags: Story = {
  args: {
    selectedValues: ['react', 'vue', 'angular', 'svelte', 'typescript', 'javascript'],
    getOptionLabel: mockGetOptionLabel,
    multiple: true,
    disabled: false,
  },
};

export const CustomRenderer: Story = {
  args: {
    selectedValues: ['react'],
    getOptionLabel: mockGetOptionLabel,
    multiple: false,
    disabled: false,
    renderSelected: (value: string) => (
      <span style={{ fontWeight: 'bold', color: '#007acc' }}>
        🚀 {mockGetOptionLabel(value)}
      </span>
    ),
  },
};