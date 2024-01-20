import * as React from "react";
import { 
  SelectDropdown, 
  SelectInput, 
  SelectTags, 
  useSelectBehavior, 
  useSelectDropdown,
  type SelectOption,
  type ValueType 
} from "./shared";
import classes from "./DataList.module.css";

export type DataListProps = {
  value?: ValueType;
  defaultValue?: ValueType;
  name?: string;
  list?: string;
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  renderSelected?: (value: string, option?: HTMLOptionElement) => React.ReactNode;
  onChange?: (value: ValueType) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'name' | 'list' | 'placeholder' | 'multiple' | 'disabled' | 'onChange'>;

export const DataList = ({
  value,
  defaultValue,
  name,
  list,
  renderSelected,
  placeholder = 'Select option...',
  multiple = false,
  disabled = false,
  onChange,
  ...props
}: DataListProps) => {
  const {
    currentValue,
    selectedValues,
    handleToggleOption,
    handleRemoveTag
  } = useSelectBehavior({ value, defaultValue, multiple, disabled, onChange });

  const {
    isOpen,
    searchTerm,
    dropdownPosition,
    dialogPosition,
    containerRef,
    dialogRef,
    openDialog,
    closeDialog,
    setSearchTerm
  } = useSelectDropdown();



  const handleContainerClick = React.useCallback(() => {
    if (!isOpen && !disabled) {
      openDialog()
    }
  }, [isOpen, disabled, openDialog]);

  const handleOptionToggle = React.useCallback((optionValue: string) => {
    handleToggleOption(optionValue)
    if (!multiple) {
      closeDialog()
    }
  }, [handleToggleOption, multiple, closeDialog]);

  const { dataListElement, options } = useDataListElement({ list });

  const getOptionLabel = React.useCallback((optionValue: string) => {
    return options?.find(option => option.value === optionValue)?.label || optionValue
  }, [options]);

  return (
    <div className={classes.container} ref={containerRef}>
      <SelectInput 
        onClick={handleContainerClick}
        disabled={disabled}
        isOpen={isOpen}
      >
        <SelectTags
          selectedValues={selectedValues}
          getOptionLabel={getOptionLabel}
          onRemoveTag={handleRemoveTag}
          placeholder={placeholder}
          multiple={multiple}
          disabled={disabled}
          renderSelected={renderSelected ? (value) => renderSelected(value, dataListElement?.querySelector(`option[value="${value}"]`) as HTMLOptionElement) : undefined}
        />
      </SelectInput>

      <SelectDropdown
        ref={dialogRef}
        isOpen={isOpen}
        position={dropdownPosition}
        dialogPosition={dialogPosition}
        options={options || []}
        selectedValues={selectedValues}
        multiple={multiple}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onOptionToggle={handleOptionToggle}
        onClose={closeDialog}
      />
      
      {/* Hidden input for form submission */}
      <input
        type="hidden"
        name={name}
        value={multiple ? JSON.stringify(selectedValues) : String(selectedValues[0] || '')}
      />
    </div>
  );
};

const useDataListElement = ({ list }: { list?: string }) => {
  const [dataListElement, setDataListElement] = React.useState<HTMLDataListElement>();
  const [options, setOptions] = React.useState<SelectOption[]>([]);
  
  React.useEffect(() => {
    if (!window?.document || !list) {
      return;
    }
    
    const dataListElement = document.getElementById(list);
    if (!dataListElement || !(dataListElement instanceof HTMLDataListElement)) {
      return;
    }
    
    setDataListElement(dataListElement);
    
    // Extract options from datalist
    const optionElements = Array.from(dataListElement.options);
    const optionsData = optionElements.map(option => ({
      value: option.value,
      label: option.label || option.textContent || option.value
    }));
    
    setOptions(optionsData);
  }, [list]);
  
  return { dataListElement, options };
};