import * as React from "react";

export interface UseSelectDropdownProps {
  onClose?: () => void;
}

export interface UseSelectDropdownReturn {
  isOpen: boolean;
  searchTerm: string;
  dropdownPosition: 'bottom' | 'top';
  dialogPosition: { top: number; left: number; width: number };
  containerRef: React.RefObject<HTMLDivElement | null>;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  openDialog: () => void;
  closeDialog: () => void;
  setSearchTerm: (term: string) => void;
}

export const useSelectDropdown = ({
  onClose
}: UseSelectDropdownProps = {}): UseSelectDropdownReturn => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [dropdownPosition, setDropdownPosition] = React.useState<'bottom' | 'top'>('bottom');
  const [dialogPosition, setDialogPosition] = React.useState({ top: 0, left: 0, width: 0 });
  
  const containerRef = React.useRef<HTMLDivElement>(null);
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  // Calculate dialog position for modal context menu
  const calculateDialogPosition = React.useCallback((): { position: 'bottom' | 'top'; dialogPos: { top: number; left: number; width: number } } => {
    if (!containerRef.current) return { position: 'bottom' as const, dialogPos: { top: 0, left: 0, width: 0 } };
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownMaxHeight = 200; // 12.5em in pixels (assuming 16px base)
    const spaceBelow = viewportHeight - containerRect.bottom;
    const spaceAbove = containerRect.top;
    
    // Calculate position for dialog element
    const dialogPos = {
      top: spaceBelow < dropdownMaxHeight && spaceAbove >= dropdownMaxHeight 
        ? containerRect.top - dropdownMaxHeight - 8  // Position above
        : containerRect.bottom + 4,  // Position below
      left: containerRect.left,
      width: containerRect.width
    };
    
    const position = spaceBelow < dropdownMaxHeight && spaceAbove >= dropdownMaxHeight ? 'top' : 'bottom';
    
    return { position, dialogPos };
  }, []);

  // Open dialog modal
  const openDialog = React.useCallback(() => {
    const { position, dialogPos } = calculateDialogPosition();
    setDropdownPosition(position);
    setDialogPosition(dialogPos);
    setIsOpen(true);
    
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [calculateDialogPosition]);

  // Close dialog modal
  const closeDialog = React.useCallback(() => {
    if (dialogRef.current && dialogRef.current.open) {
      dialogRef.current.close();
    }
  }, []);

  // Handle dialog close event
  const handleDialogClose = React.useCallback(() => {
    setIsOpen(false);
    setSearchTerm('');
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  // Handle resize and scroll events
  React.useEffect(() => {
    const handleResize = () => {
      if (isOpen && containerRef.current) {
        const { position, dialogPos } = calculateDialogPosition();
        setDropdownPosition(position);
        setDialogPosition(dialogPos);
      }
    };

    const dialog = dialogRef.current;
    if (dialog) {
      dialog.addEventListener('close', handleDialogClose);
    }
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);
    
    return () => {
      if (dialog) {
        dialog.removeEventListener('close', handleDialogClose);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, [isOpen, calculateDialogPosition, handleDialogClose]);

  return {
    isOpen,
    searchTerm,
    dropdownPosition,
    dialogPosition,
    containerRef,
    dialogRef,
    openDialog,
    closeDialog,
    setSearchTerm
  };
};