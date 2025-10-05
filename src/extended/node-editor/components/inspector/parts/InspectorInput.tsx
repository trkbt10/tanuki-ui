import * as React from 'react';
import { Input, type InputProps } from '../../elements/Input';
import styles from '../InspectorPanel.module.css';

export interface InspectorInputProps extends InputProps {}

export const InspectorInput = React.forwardRef<HTMLInputElement, InspectorInputProps>(
  ({ className = '', ...props }, ref) => {
    const classes = [styles.inspectorInput, className].filter(Boolean).join(' ');
    return <Input ref={ref} className={classes} {...props} />;
  }
);

InspectorInput.displayName = 'InspectorInput';
