import * as React from "react";
import classes from "./SelectTags.module.css";

export interface SelectTagsProps {
  selectedValues: string[];
  getOptionLabel: (value: string) => string;
  onRemoveTag?: (value: string, event: React.MouseEvent) => void;
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  renderSelected?: (value: string) => React.ReactNode;
}

export const SelectTags: React.FC<SelectTagsProps> = ({
  selectedValues,
  getOptionLabel,
  onRemoveTag,
  placeholder = "Select option...",
  multiple = false,
  disabled = false,
  renderSelected
}) => {
  if (selectedValues.length === 0) {
    return <span className={classes.placeholder}>{placeholder}</span>;
  }

  if (!multiple && selectedValues.length > 0) {
    const value = selectedValues[0];
    return (
      <span className={classes.singleValue}>
        {renderSelected ? renderSelected(value) : getOptionLabel(value)}
      </span>
    );
  }

  return (
    <>
      {selectedValues.map((selectedValue, index) => (
        <span key={index} className={classes.tagSegment}>
          <span className={classes.tagText}>
            {getOptionLabel(selectedValue)}
          </span>
          {!disabled && onRemoveTag && (
            <button
              type="button"
              className={classes.tagRemove}
              onClick={(e) => onRemoveTag(selectedValue, e)}
              aria-label={`Remove ${getOptionLabel(selectedValue)}`}
            >
              ×
            </button>
          )}
        </span>
      ))}
    </>
  );
};

SelectTags.displayName = "SelectTags";