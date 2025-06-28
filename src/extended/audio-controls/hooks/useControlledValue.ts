import { useState } from 'react';

export interface UseControlledValueOptions<T> {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
  onChangeEnd?: (value: T) => void;
}

export function useControlledValue<T>({
  value,
  defaultValue,
  onChange,
  onChangeEnd,
}: UseControlledValueOptions<T>) {
  const [internalValue, setInternalValue] = useState(value ?? defaultValue);
  const currentValue = value ?? internalValue;
  const isControlled = value !== undefined;

  const setValue = (newValue: T) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const setValueEnd = (newValue: T) => {
    onChangeEnd?.(newValue);
  };

  return {
    value: currentValue,
    setValue,
    setValueEnd,
    isControlled,
  };
}