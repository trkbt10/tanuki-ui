import { useEffect, useState } from "react";
import { useCallback } from "react";

const readMetaTags = <T extends {}>(): T => {
  if (!window?.document?.head) {
    return {} as T;
  }
  const metaElements = Array.from(window.document.head.getElementsByTagName("meta"));
  const records = metaElements.reduce<{ [key: string]: string }>((acc, metaElement) => {
    const name = metaElement.getAttribute("name");
    if (!name) {
      return acc;
    }
    acc[name] = metaElement.getAttribute("content") ?? "";
    return acc;
  }, {} as T);
  return records as T;
};
export const useMetaTags = <T extends { [K in keyof T]: string }>() => {
  const [meta, setMeta] = useState<T>(() => readMetaTags<T>());
  const updateMeta = useCallback(() => {
    setMeta(readMetaTags());
  }, []);
  useEffect(() => {
    if (!window?.document?.head) {
      return;
    }
    const observer = new MutationObserver((entries) => {
      updateMeta();
    });

    observer.observe(window.document.head, {
      subtree: true,
      attributes: true,
    });
    return () => {
      observer.disconnect();
    };
  }, [updateMeta]);
  return meta;
};
