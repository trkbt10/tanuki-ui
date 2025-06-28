import React from 'react';
import './Toolbar.module.css';

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'subtle' | 'elevated';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  orientation = 'horizontal',
  variant = 'default',
  size = 'medium',
  className = '',
  children,
  ...props
}) => {
  const baseClass = 'ne-toolbar';
  const orientationClass = `ne-toolbar--${orientation}`;
  const variantClass = `ne-toolbar--${variant}`;
  const sizeClass = `ne-toolbar--${size}`;
  
  const classes = [baseClass, orientationClass, variantClass, sizeClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div 
      className={classes} 
      role="toolbar"
      {...props}
    >
      {children}
    </div>
  );
};

export interface ToolbarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ToolbarGroup: React.FC<ToolbarGroupProps> = ({
  className = '',
  children,
  ...props
}) => {
  const classes = ['ne-toolbar__group', className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export interface ToolbarSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ToolbarSeparator: React.FC<ToolbarSeparatorProps> = ({
  className = '',
  ...props
}) => {
  const classes = ['ne-toolbar__separator', className].filter(Boolean).join(' ');

  return <div className={classes} role="separator" {...props} />;
};