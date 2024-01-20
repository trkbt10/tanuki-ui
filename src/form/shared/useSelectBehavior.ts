import * as React from "react";

export type ValueType = string | readonly string[] | number | undefined;

export interface UseSelectBehaviorProps {
  value?: ValueType;
  defaultValue?: ValueType;
  multiple?: boolean;
  disabled?: boolean;
  onChange?: (value: ValueType) => void;
}

export interface UseSelectBehaviorReturn {
  currentValue: ValueType;
  selectedValues: string[];
  handleToggleOption: (optionValue: string) => void;
  handleRemoveTag: (optionValue: string, event: React.MouseEvent) => void;
}

export const useSelectBehavior = ({
  value,
  defaultValue,
  multiple = false,
  disabled = false,
  onChange
}: UseSelectBehaviorProps): UseSelectBehaviorReturn => {
  const [localValue, setLocalValue] = React.useState<ValueType>(() => defaultValue);

  const currentValue = React.useMemo(() => {
    if (value !== undefined) {
      return value;
    }
    return localValue;
  }, [value, localValue]);

  const selectedValues = React.useMemo(() => {
    if (multiple) {
      return Array.isArray(currentValue) ? currentValue.map(String) : (currentValue ? [String(currentValue)] : []);
    }
    return currentValue ? [String(currentValue)] : [];
  }, [currentValue, multiple]);

  const handleToggleOption = React.useCallback((optionValue: string) => {
    if (disabled) return;

    let newValue: ValueType;
    if (multiple) {
      const currentArray = Array.isArray(currentValue) ? currentValue.map(String) : (currentValue ? [String(currentValue)] : []);
      if (currentArray.includes(optionValue)) {
        newValue = currentArray.filter(v => v !== optionValue);
      } else {
        newValue = [...currentArray, optionValue];
      }
    } else {
      newValue = optionValue;
    }
    
    setLocalValue(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
  }, [disabled, multiple, currentValue, onChange]);

  const handleRemoveTag = React.useCallback((optionValue: string, event: React.MouseEvent) => {
    if (disabled) return;
    
    event.stopPropagation();
    
    const currentArray = Array.isArray(currentValue) ? currentValue.map(String) : (currentValue ? [String(currentValue)] : []);
    const newValue = currentArray.filter(v => v !== optionValue);
    setLocalValue(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
  }, [disabled, currentValue, onChange]);

  return {
    currentValue,
    selectedValues,
    handleToggleOption,
    handleRemoveTag
  };
};