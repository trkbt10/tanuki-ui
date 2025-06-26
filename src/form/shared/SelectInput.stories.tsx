import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectInput } from './SelectInput';
import { SelectTags } from './SelectTags';

const meta: Meta<typeof SelectInput> = {
  title: 'Form/Shared/SelectInput',
  component: SelectInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: {
      control: 'boolean',
    },
    isOpen: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
    isOpen: false,
    children: 'Select an option...',
  },
};

export const WithTags: Story = {
  args: {
    disabled: false,
    isOpen: false,
    children: (
      <SelectTags
        selectedValues={['option1', 'option2']}
        getOptionLabel={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
        multiple={true}
        onRemoveTag={(value) => console.log('Remove:', value)}
      />
    ),
  },
};

export const SingleValue: Story = {
  args: {
    disabled: false,
    isOpen: false,
    children: (
      <SelectTags
        selectedValues={['selected-option']}
        getOptionLabel={(value) => 'Selected Option'}
        multiple={false}
      />
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    isOpen: false,
    children: 'Disabled input',
  },
};

export const OpenState: Story = {
  args: {
    disabled: false,
    isOpen: true,
    children: 'Open dropdown',
  },
};