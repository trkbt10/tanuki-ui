import * as React from "react";

export interface SelectableOption {
  value: string;
  label: string;
}

export interface UseSelectableOptionsProps {
  children: React.ReactNode;
  value?: string | readonly string[];
  defaultValue?: string | readonly string[];
  multiple?: boolean;
}

export interface UseSelectableOptionsReturn {
  options: SelectableOption[];
  selectedValues: string[];
  handleToggleOption: (value: string, checked: boolean) => void;
  handleToggleAll: (checked: boolean) => void;
  isCheckedAll: boolean;
  isCheckedPartially: boolean;
}

const isOptionNode = (
  node: any,
): node is React.ReactElement<{
  value: string;
  children: React.ReactNode;
}> => {
  return React.isValidElement(node) && node.type === "option";
};

const toArray = (source: string | readonly string[] | undefined): string[] => {
  if (source === undefined) {
    return [];
  }
  if (Array.isArray(source)) {
    return [...source];
  }
  return [source as string];
};

export const useSelectableOptions = ({
  children,
  value,
  defaultValue,
  multiple = true
}: UseSelectableOptionsProps): UseSelectableOptionsReturn => {
  const isControlled = value !== undefined;
  const [localValues, setLocalValues] = React.useState<string[]>(() => {
    const source = isControlled ? value : defaultValue;
    return toArray(source);
  });

  const selectedValues = isControlled ? toArray(value) : localValues;

  const options = React.useMemo(() => {
    const childArray = React.Children.toArray(children);
    return childArray
      .filter(isOptionNode)
      .map(option => ({
        value: option.props.value,
        label: option.props.children?.toString() || option.props.value
      }));
  }, [children]);

  const handleToggleOption = React.useCallback((optionValue: string, checked: boolean) => {
    if (!multiple) {
      setLocalValues(checked ? [optionValue] : []);
      return;
    }

    setLocalValues(prev => {
      if (checked) {
        return [...prev, optionValue];
      }
      return prev.filter(v => v !== optionValue);
    });
  }, [multiple]);

  const handleToggleAll = React.useCallback((checked: boolean) => {
    if (checked) {
      setLocalValues(options.map(option => option.value));
    } else {
      setLocalValues([]);
    }
  }, [options]);

  const isCheckedPartially = selectedValues.length > 0 && selectedValues.length < options.length;
  const isCheckedAll = isCheckedPartially ? false : selectedValues.length === options.length;

  return {
    options,
    selectedValues,
    handleToggleOption,
    handleToggleAll,
    isCheckedAll,
    isCheckedPartially
  };
};