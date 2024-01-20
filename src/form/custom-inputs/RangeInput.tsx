import * as React from "react";
import classes from "./RangeInput.module.css";
import { HTMLInputElementProps } from "../Input";
import { ObservePointerCallback, useObservePointer } from "../../hooks/usePointerObserver";
import { useMeasure } from "../../hooks/useMeasure";
const safeParseFloat = (value: string | number | null | undefined | string[] | readonly string[], fallback: number) => {
  if (Array.isArray(value)) {
    return fallback;
  }
  if (value === null || value === undefined) {
    return fallback;
  }
  if (typeof value === "number") {
    return value;
  }
  if (typeof value !== "string") {
    return fallback;
  }
  return parseFloat(value);
};
export const RangeInput = React.forwardRef<HTMLInputElement, HTMLInputElementProps>(
  ({ value, defaultValue, ...props }, ref) => {
    const base = React.useRef<HTMLDivElement>(null);
    const { min, max, step } = React.useMemo(() => {
      return {
        min: safeParseFloat(props.min, Number.MIN_SAFE_INTEGER),
        max: safeParseFloat(props.max, Number.MAX_SAFE_INTEGER),
        step: typeof props.step === "undefined" ? undefined : safeParseFloat(props.step, 1),
      };
    }, [props.min, props.max, props.step]);
    const [localValue, setLocalValue] = React.useState<number>(() => safeParseFloat(defaultValue, min));
    const currentValue = React.useMemo(() => {
      if (value !== undefined) {
        return safeParseFloat(value, min);
      }
      return localValue;
    }, [value, localValue]);
    const [bound] = useMeasure(base);
    const cursor = React.useMemo(() => {
      return (currentValue - min) / (max - min);
    }, [currentValue, min, max]);
    const handlePointer: ObservePointerCallback = React.useCallback(
      (e) => {
        const bound = base.current?.getBoundingClientRect();
        if (!bound) {
          return;
        }
        const actualX = e.pageX - bound.left;
        const seekDelta = actualX / bound.width;
        const seekValue = min + (max - min) * seekDelta;
        const seekStep = typeof step === "number" ? Math.round(seekValue / step) * step : seekValue;
        const seekClamped = Math.min(Math.max(seekStep, min), max);
        const input = base.current?.querySelector("input");
        if (!input || !(input instanceof HTMLInputElement)) {
          return;
        }
        input.setAttribute("value", seekClamped.toString());
        const changeEvent = new Event("change", { bubbles: true });
        input.dispatchEvent(changeEvent);
        setLocalValue(seekClamped);
      },
      [base, min, max, step, setLocalValue, bound],
    );
    useObservePointer<HTMLDivElement>(base, handlePointer);
    React.useEffect(() => {
      if (!base.current) {
        return;
      }
      // Set the initial value
      const input = base.current?.querySelector("input");
      if (!input || !(input instanceof HTMLInputElement)) {
        return;
      }
      input.setAttribute("value", currentValue.toString());
    }, [currentValue]);
    React.useEffect(() => {
      if (!base.current) {
        return;
      }
      base.current.style.setProperty("--progress", `${cursor}`);
    }, [cursor]);
    const variant = React.useMemo(() => {
      const stepperCount = Math.round((max - min) / (step ?? 1));
      return stepperCount < 100 ? "stepped" : "linear";
    }, [min, max, step]);
    return (
      <div className={classes.base} ref={base} data-variant={variant}>
        <input type="range" className={classes.input} {...props} ref={ref} />
      </div>
    );
  },
);
RangeInput.displayName = "RangeInput";
