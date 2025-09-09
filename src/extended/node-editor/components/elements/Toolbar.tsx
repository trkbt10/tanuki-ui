import React from 'react';
import styles from './Toolbar.module.css';

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
  const classes = [styles.toolbar, className].filter(Boolean).join(' ');

  return (
    <div 
      className={classes}
      data-orientation={orientation}
      data-variant={variant}
      data-size={size}
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
  const classes = [styles.group, className].filter(Boolean).join(' ');

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
  const classes = [styles.separator, className].filter(Boolean).join(' ');

  return <div className={classes} role="separator" {...props} />;
};
