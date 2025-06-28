import React from 'react';
import './Label.module.css';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({
  required = false,
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  const baseClass = 'ne-label';
  const disabledClass = disabled ? 'ne-label--disabled' : '';
  const classes = [baseClass, disabledClass, className].filter(Boolean).join(' ');

  return (
    <label className={classes} {...props}>
      {children}
      {required && <span className="ne-label__required">*</span>}
    </label>
  );
};