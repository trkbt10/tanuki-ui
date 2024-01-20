import * as React from "react";
export const dateToLocaleString = (isoString: string) => {
  const date = new Date(isoString);
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60 * 1000).toISOString().replace("Z", "");
};

export const DateTimeInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ children, ...props }, ref) => {
    const value = props.value && dateToLocaleString(props.value.toString());
    const defaultValue = props.defaultValue && dateToLocaleString(props.defaultValue.toString());
    return (
      <input type={props.type ?? "text"} {...props} value={value} defaultValue={defaultValue} ref={ref}>
        {children}
      </input>
    );
  },
);
DateTimeInput.displayName = "DateTimeInput";
