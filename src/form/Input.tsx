import React, { forwardRef, InputHTMLAttributes, memo, useRef } from "react";
import radioStyle from "./radio.module.css";
import checkboxStyle from "./checkbox.module.css";
import inputStyle from "./input.module.css";
import { MediaInput } from "./custom-inputs/MediaInput";
import { RangeInput } from "./custom-inputs/RangeInput";
import { SwitchInput } from "./custom-inputs/SwitchInput";
import { DateTimeInput } from "./custom-inputs/DateTimeInput";
import { Checkmark, IndeterminateIcon } from "../blocks/Icon";
const classNameRecord: Record<string, string> = {
  text: inputStyle.input,
  password: inputStyle.input,
  checkbox: checkboxStyle.checkbox,
  radio: radioStyle.radio,
};
export type HTMLInputElementProps = React.PropsWithChildren<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    [K in `data-${string}`]?: string;
  } & {
    switch?: "true" | "false";
    indeterminate?: boolean;
  }
>;
export const Input = React.forwardRef<HTMLInputElement, HTMLInputElementProps>(({ children, ...props }, ref) => {
  const errorMessage = props["aria-errormessage"];
  const className = classNameRecord[props.type ?? "text"] ?? inputStyle.input;
  const errorToolTip = errorMessage ? <span className={inputStyle.errorLine}>{errorMessage}</span> : <></>;
  return (
    <>
      <RenderInput {...props} className={className} ref={ref}></RenderInput>
      {errorToolTip}
    </>
  );
});
Input.displayName = "Input";

const RenderInput = forwardRef<HTMLInputElement, HTMLInputElementProps>(({ children, className, ...props }, ref) => {
  const variant = props["data-variant"];

  if (props.type === "file") {
    return <MediaInput {...props} variant={variant as "preview" | "files"} ref={ref}></MediaInput>;
  }
  if (props.type === "checkbox" && (variant === "switch" || props.switch === "true")) {
    return <SwitchInput {...props} switch={"false"} ref={ref}></SwitchInput>;
  }
  if (props.type === "range") {
    return <RangeInput {...props} ref={ref}></RangeInput>;
  }
  if (props.type === "datetime-local") {
    return (
      <DateTimeInput type={props.type ?? "text"} {...props} ref={ref} className={className}>
        {children}
      </DateTimeInput>
    );
  }
  if (props.type === "checkbox") {
    return <CheckboxInput {...props} ref={ref}></CheckboxInput>;
  }
  return (
    <input type={props.type ?? "text"} {...props} ref={ref} className={className}>
      {children}
    </input>
  );
});

const CheckboxInput = ({
  indeterminate,
  ...props
}: HTMLInputElementProps & {
  className?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLInputElement>;
  indeterminate?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!ref.current || typeof indeterminate !== "boolean") {
      return;
    }
    const inputElement = ref.current.querySelector("input");
    if (!inputElement) {
      return;
    }
    inputElement.indeterminate = indeterminate;
  }, [indeterminate]);
  const icon = indeterminate ? <IndeterminateIcon /> : <Checkmark />;
  return (
    <div role="checkbox" className={checkboxStyle.base} ref={ref}>
      <input
        type={props.type}
        {...props}
        ref={props.ref}
        className={checkboxStyle.checkbox}
        role="presentation"
        checked={props.checked}
        defaultChecked={props.defaultChecked}
        aria-checked={props.checked}
      >
        {props.children}
      </input>
      <i className={checkboxStyle.mark} role="presentation">
        {icon}
      </i>
    </div>
  );
};
