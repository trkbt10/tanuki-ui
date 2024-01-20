import React from "react";
import usePrevious from "react-use/lib/usePrevious";

const hideInputStyle = {
  display: "none",
};
const compareTwoState = (prev: any, next: any) => {
  return prev === next;
};
type InputValue = string | number | readonly string[] | undefined;
export type Converter<T> = {
  encode: (value: InputValue) => T;
  decode: (value: T) => InputValue;
};
const passThroughConverter: Converter<any> = {
  encode: (value) => value,
  decode: (value) => value,
};
const isMutableRefObject = <T extends any>(ref: React.Ref<T>): ref is React.MutableRefObject<T> => {
  if (!ref) {
    return false;
  }
  return "current" in ref;
};
export const useMergedRef = <T extends any>(...refs: (React.ForwardedRef<T> | undefined)[]) => {
  const ref = React.useCallback(
    (node: T) => {
      for (const ref of refs) {
        if (!ref) {
          continue;
        }
        // LegacyRef
        if (typeof ref === "string") {
          throw new Error("LegacyRef is not supported");
        }
        if (typeof ref === "function") {
          ref(node);
          continue;
        }
        if (isMutableRefObject(ref)) {
          ref.current = node;
          continue;
        }
        if (ref && "value" in ref) {
          ref.value = node;
          continue;
        }
      }
    },
    [refs],
  );
  return ref;
};
export const useControlledInputState = <S extends any, C extends Converter<S> = Converter<S>>(
  {
    value,
    defaultValue,
    onChange,
    ref: forwardedRef,
    ...props
  }: React.InputHTMLAttributes<HTMLInputElement> & {
    ref?: React.ForwardedRef<HTMLInputElement>;
  },
  convert: C = passThroughConverter as C,
  areEqual: (a: S, b: S) => boolean = compareTwoState,
) => {
  const [currentValue, setCurrentValue] = React.useState<S>(() => {
    return convert.encode(value || defaultValue);
  });
  const prevValue = usePrevious(value);
  React.useLayoutEffect(() => {
    if (typeof value === "undefined") {
      return;
    }
    if (!prevValue) {
      return;
    }
    const convertedValue = convert.encode(value);
    if (value === prevValue) {
      return;
    }
    if (areEqual(convertedValue, currentValue)) {
      return;
    }
    setCurrentValue(convertedValue);
  }, [value, currentValue]);
  const localRef = React.useRef<HTMLInputElement>(null);
  const convertedCurrentValue = React.useMemo(() => {
    return convert.decode(currentValue);
  }, [currentValue]);
  const convertedPrevValue = usePrevious(convertedCurrentValue);
  React.useEffect(() => {
    const input = localRef.current;
    if (!onChange || !input) {
      return;
    }
    if (convertedPrevValue === convertedCurrentValue || !convertedPrevValue) {
      return;
    }
    const changedValue = convertedCurrentValue?.toString() || "";
    const changeEvent = new Event("change", { bubbles: true });
    input.setAttribute("value", changedValue);
    input.dispatchEvent(changeEvent);
  }, [convertedCurrentValue, localRef]);
  const ref = useMergedRef<any>(forwardedRef, localRef);
  return [
    currentValue,
    setCurrentValue,
    {
      ...props,
      onChange,
      ref,
      style: hideInputStyle,
      readOnly: true,
    },
  ] as const;
};
