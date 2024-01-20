import * as React from "react";
import { SearchIcon } from "../../blocks/SearchIcon";
import classes from "./SelectDropdown.module.css";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectDropdownProps {
  isOpen: boolean;
  position: 'top' | 'bottom';
  dialogPosition: { top: number; left: number; width: number };
  options: SelectOption[];
  selectedValues: string[];
  multiple?: boolean;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onOptionToggle: (value: string) => void;
  onClose: () => void;
  searchPlaceholder?: string;
  noOptionsMessage?: string;
  noMatchingMessage?: string;
}

export const SelectDropdown = React.forwardRef<HTMLDialogElement | null, SelectDropdownProps>(({
  isOpen,
  position,
  dialogPosition,
  options,
  selectedValues,
  multiple = false,
  searchTerm,
  onSearchChange,
  onOptionToggle,
  onClose,
  searchPlaceholder = "Search options...",
  noOptionsMessage = "No options available",
  noMatchingMessage = "No matching options found"
}, ref) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Handle keyboard events
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const dialog = ref && 'current' in ref ? ref.current : null;
    const handleDialogClick = (event: MouseEvent) => {
      if (event.target === dialog) {
        onClose();
      }
    };

    if (dialog) {
      dialog.addEventListener('click', handleDialogClick);
    }
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      if (dialog) {
        dialog.removeEventListener('click', handleDialogClick);
      }
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, ref]);

  // Focus search input when dialog opens
  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 50);
    }
  }, [isOpen]);

  const filteredOptions = React.useMemo(() => {
    if (!searchTerm) return options;
    return options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  return (
    <dialog 
      ref={ref}
      className={classes.contextDialog}
      style={{
        top: `${dialogPosition.top}px`,
        left: `${dialogPosition.left}px`,
        width: `${dialogPosition.width}px`,
      }}
    >
      <div 
        className={`${classes.dropdown} ${classes[`dropdown${position === 'top' ? 'Top' : 'Bottom'}`]}`}
      >
        <div className={classes.searchHeader}>
          <div className={classes.searchInputContainer}>
            <SearchIcon size={14} className={classes.searchIcon} />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              placeholder={searchPlaceholder}
              onChange={(e) => onSearchChange(e.target.value)}
              className={classes.contextSearchInput}
              autoComplete="off"
              autoFocus
            />
          </div>
        </div>
        {filteredOptions.length === 0 ? (
          <div className={classes.noOptions}>
            {searchTerm ? noMatchingMessage : noOptionsMessage}
          </div>
        ) : (
          <ul className={classes.options}>
            {filteredOptions.map((option, index) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <li key={index} className={classes.option}>
                  <button
                    type="button"
                    className={classes.optionButton}
                    onClick={() => onOptionToggle(option.value)}
                  >
                    {multiple && (
                      <span className={classes.optionCheckbox}>
                        {isSelected ? (
                          <span>✓</span>
                        ) : (
                          <span className={classes.checkboxEmpty} />
                        )}
                      </span>
                    )}
                    <span className={classes.optionLabel}>
                      {option.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </dialog>
  );
});

SelectDropdown.displayName = "SelectDropdown";