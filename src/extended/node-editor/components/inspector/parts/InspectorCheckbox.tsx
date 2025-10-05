import * as React from "react";
import styles from "./InspectorCheckbox.module.css";

export interface InspectorCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  name?: string;
}

export const InspectorCheckbox = React.memo<InspectorCheckboxProps>(
  ({ checked, onChange, label, name }) => {
    const onChangeRef = React.useRef(onChange);
    onChangeRef.current = onChange;
    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeRef.current(e.target.checked);
    }, []);
    const id = React.useId();
    return (
      <label htmlFor={id} className={styles.container}>
        <input type="checkbox" checked={checked} onChange={handleChange} id={id} name={name ?? ""} />
        <span className={styles.text}>{label}</span>
      </label>
    );
  }
);

InspectorCheckbox.displayName = "InspectorCheckbox";
