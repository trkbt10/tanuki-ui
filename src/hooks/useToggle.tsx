import React, { useState, useCallback } from "react";

export const useToggle = (defaultOpen: boolean = false) => {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return [open, toggle, setOpen] as const;
};
