import * as React from "react";
export const useComponentDidMount = (callback: React.EffectCallback) => {
  const destroyFunc = React.useRef<ReturnType<React.EffectCallback>>(() => {});
  const calledOnce = React.useRef(false);
  const renderAfterCalled = React.useRef(false);

  if (calledOnce.current) {
    renderAfterCalled.current = true;
  }

  React.useEffect(() => {
    if (calledOnce.current) {
      return;
    }

    calledOnce.current = true;
    destroyFunc.current = callback();

    return () => {
      if (!renderAfterCalled.current) {
        return;
      }

      if (destroyFunc.current) {
        destroyFunc.current();
      }
    };
  });
};
