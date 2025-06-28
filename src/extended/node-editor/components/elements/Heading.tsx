import React from 'react';
import './Heading.module.css';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'muted';
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  size,
  weight = 'semibold',
  color = 'primary',
  className = '',
  children,
  ...props
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const baseClass = 'ne-heading';
  const levelClass = `ne-heading--h${level}`;
  const sizeClass = size ? `ne-heading--${size}` : '';
  const weightClass = `ne-heading--${weight}`;
  const colorClass = `ne-heading--${color}`;
  
  const classes = [baseClass, levelClass, sizeClass, weightClass, colorClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
};

// Convenience components
export const H1: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level={1} {...props} />
);

export const H2: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level={2} {...props} />
);

export const H3: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level={3} {...props} />
);

export const H4: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level={4} {...props} />
);

export const H5: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level={5} {...props} />
);

export const H6: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level={6} {...props} />
);