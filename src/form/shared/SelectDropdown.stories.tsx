import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { SelectDropdown } from './SelectDropdown';

const meta: Meta<typeof SelectDropdown> = {
  title: 'Form/Shared/SelectDropdown',
  component: SelectDropdown,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'next', label: 'Next.js' },
  { value: 'nuxt', label: 'Nuxt.js' },
  { value: 'gatsby', label: 'Gatsby' },
  { value: 'remix', label: 'Remix' },
];

const InteractiveTemplate = (args: any) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(['react']);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const handleOptionToggle = (value: string) => {
    setSelectedValues(prev => {
      if (args.multiple) {
        return prev.includes(value) 
          ? prev.filter(v => v !== value)
          : [...prev, value];
      }
      return [value];
    });
  };

  return (
    <div style={{ padding: '2rem', minHeight: '400px' }}>
      <div style={{ position: 'relative', width: '300px', margin: '0 auto' }}>
        <SelectDropdown
          {...args}
          isOpen={isOpen}
          selectedValues={selectedValues}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onOptionToggle={handleOptionToggle}
          onClose={() => setIsOpen(false)}
          dialogPosition={{ top: 100, left: 100, width: 300 }}
        />
      </div>
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close' : 'Open'} Dropdown
        </button>
        <div style={{ marginTop: '1rem' }}>
          <strong>Selected:</strong> {selectedValues.join(', ') || 'None'}
        </div>
      </div>
    </div>
  );
};

export const SingleSelect: Story = {
  render: InteractiveTemplate,
  args: {
    position: 'bottom',
    options: sampleOptions,
    multiple: false,
    searchPlaceholder: 'Search frameworks...',
    noOptionsMessage: 'No frameworks available',
    noMatchingMessage: 'No frameworks match your search',
  },
};

export const MultipleSelect: Story = {
  render: InteractiveTemplate,
  args: {
    position: 'bottom',
    options: sampleOptions,
    multiple: true,
    searchPlaceholder: 'Search frameworks...',
    noOptionsMessage: 'No frameworks available',
    noMatchingMessage: 'No frameworks match your search',
  },
};

export const TopPosition: Story = {
  render: (args: any) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleOptionToggle = (value: string) => {
      setSelectedValues(prev => prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
      );
    };

    return (
      <div style={{ padding: '2rem', paddingTop: '300px', minHeight: '400px' }}>
        <div style={{ position: 'relative', width: '300px', margin: '0 auto' }}>
          <SelectDropdown
            {...args}
            isOpen={true}
            selectedValues={selectedValues}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onOptionToggle={handleOptionToggle}
            onClose={() => {}}
            dialogPosition={{ top: 200, left: 100, width: 300 }}
          />
        </div>
      </div>
    );
  },
  args: {
    position: 'top',
    options: sampleOptions.slice(0, 4),
    multiple: true,
    searchPlaceholder: 'Search...',
  },
};

export const EmptyOptions: Story = {
  render: InteractiveTemplate,
  args: {
    position: 'bottom',
    options: [],
    multiple: false,
    searchPlaceholder: 'Search...',
    noOptionsMessage: 'No options available',
    noMatchingMessage: 'No matching options found',
  },
};