import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Paragraph } from './Paragraph';
import { Heading } from './Heading';
import { Button } from '../form/Button';
import React from 'react';

const meta = {
  title: 'Elements/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['elevated', 'outlined', 'filled'],
      description: 'Visual variant of the card',
      defaultValue: 'elevated',
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the card is interactive/clickable',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the card is disabled',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Card
export const Default: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <Heading level={3}>Card Title</Heading>
        <Paragraph>
          This is a basic card component with some content. Cards are surfaces that display content and actions
          on a single topic.
        </Paragraph>
      </>
    ),
  },
};

// Card Variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Card variant="elevated">
        <Heading level={4}>Elevated Card</Heading>
        <Paragraph>
          This card has a shadow to appear elevated above the surface. It's the default card style.
        </Paragraph>
      </Card>
      
      <Card variant="outlined">
        <Heading level={4}>Outlined Card</Heading>
        <Paragraph>
          This card has a border instead of a shadow. Good for when you need less visual hierarchy.
        </Paragraph>
      </Card>
      
      <Card variant="filled">
        <Heading level={4}>Filled Card</Heading>
        <Paragraph>
          This card has a filled background with no shadow. Best for embedded content.
        </Paragraph>
      </Card>
    </div>
  ),
};

// Interactive Cards
export const Interactive: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Card clickable>
        <Heading level={4}>Clickable Card</Heading>
        <Paragraph>
          This entire card is clickable. Notice the hover effect and cursor change.
        </Paragraph>
      </Card>
      
      <Card clickable disabled>
        <Heading level={4}>Disabled Clickable Card</Heading>
        <Paragraph>
          This card is clickable but currently disabled. It won't respond to interactions.
        </Paragraph>
      </Card>
    </div>
  ),
};

// Card with Actions
export const WithActions: Story = {
  render: () => (
    <Card>
      <Heading level={3}>Card with Actions</Heading>
      <Paragraph>
        Cards can contain multiple elements including text, images, and actions. This card demonstrates
        how buttons can be integrated into a card layout.
      </Paragraph>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Confirm</Button>
      </div>
    </Card>
  ),
};

// Card Grid
export const CardGrid: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
      gap: '16px' 
    }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} clickable>
          <Heading level={4}>Card {i}</Heading>
          <Paragraph>
            This is card number {i} in a responsive grid layout. The cards will reflow based on
            the available space.
          </Paragraph>
        </Card>
      ))}
    </div>
  ),
};

// Complex Card
export const ComplexCard: Story = {
  render: () => (
    <Card style={{ maxWidth: '400px' }}>
      <div style={{ margin: '-16px -16px 16px -16px', height: '200px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '8px 8px 0 0' }} />
      <Heading level={3}>Beautiful Gradient Card</Heading>
      <Paragraph style={{ marginBottom: '8px' }}>
        <small style={{ opacity: 0.7 }}>Published on December 25, 2023</small>
      </Paragraph>
      <Paragraph>
        This card demonstrates a more complex layout with a header image, title, metadata, and body content.
        Cards are versatile containers that can adapt to many different content types.
      </Paragraph>
      <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--dividerColor)' }}>
        <Button variant="primary" style={{ width: '100%' }}>Read More</Button>
      </div>
    </Card>
  ),
};

// Card States
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Card>
        <Heading level={4}>Default State</Heading>
        <Paragraph>This is the default card state.</Paragraph>
      </Card>
      
      <Card style={{ background: 'var(--cardHoverBackground, var(--cardBackground))' }}>
        <Heading level={4}>Hover State</Heading>
        <Paragraph>This shows how the card looks on hover.</Paragraph>
      </Card>
      
      <Card style={{ background: 'var(--cardActiveBackground, var(--cardBackground))' }}>
        <Heading level={4}>Active State</Heading>
        <Paragraph>This shows how the card looks when pressed.</Paragraph>
      </Card>
      
      <Card disabled>
        <Heading level={4}>Disabled State</Heading>
        <Paragraph>This shows how the card looks when disabled.</Paragraph>
      </Card>
    </div>
  ),
};