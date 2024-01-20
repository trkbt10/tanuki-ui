import React from "react";

export const useDocument = () => {
  const document = React.useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }
    return window.document;
  }, []);
  return document;
};
