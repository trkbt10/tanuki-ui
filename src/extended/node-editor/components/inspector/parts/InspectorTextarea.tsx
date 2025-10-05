import * as React from 'react';
import { Textarea, type TextareaProps } from '../../elements/Textarea';
import styles from './InspectorTextarea.module.css';

export interface InspectorTextareaProps extends TextareaProps {}

export const InspectorTextarea: React.FC<InspectorTextareaProps> = ({ className = '', ...props }) => {
  const classes = [styles.textarea, className].filter(Boolean).join(' ');
  return <Textarea className={classes} {...props} />;
};

InspectorTextarea.displayName = 'InspectorTextarea';
