import * as React from "react";
import { AllHTMLAttributes, forwardRef, SelectHTMLAttributes } from "react";
import { ChevronMark } from "../blocks/ChevronMark";
import classes from "./Selectbox.module.css";
import { Input } from "./Input";
import { Label } from "./Label";
import { Table } from "../elements/Table";
import { useSelectableOptions } from "./shared/useSelectableOptions";

export const Selectbox = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & {
    "data-variant"?: string;
    switch?: "true" | "false" | undefined;
  }
>((props, ref) => {
  if (props["data-variant"] === "selectable") {
    return <SelectableView switch={props.switch}>{props.children}</SelectableView>;
  }
  return (
    <View hidden={props.hidden}>
      <select {...props} ref={ref}>
        {props.children}
      </select>
    </View>
  );
});
Selectbox.displayName = "Selectbox";
const isOptionNode = (
  node: any,
): node is React.ReactElement<{
  value: string;
  children: React.ReactNode;
}> => {
  return React.isValidElement(node) && node.type === "option";
};
const isReadonlyStringArray = (value: any): value is readonly string[] => {
  return Array.isArray(value);
};
const toArray = (source: string | readonly string[] | undefined): string[] => {
  if (source === undefined) {
    return [];
  }
  if (isReadonlyStringArray(source)) {
    return [...source];
  }
  return [source];
};
const SelectableView = ({
  children,
  hidden,
  ...props
}: React.PropsWithChildren<
  AllHTMLAttributes<HTMLElement> & {
    switch?: "true" | "false" | undefined;
    value?: string | readonly string[];
    defaultValue?: string | readonly string[];
  }
>) => {
  const selectRef = React.useRef<HTMLSelectElement>(null);
  const {
    options,
    selectedValues,
    handleToggleOption,
    handleToggleAll,
    isCheckedAll,
    isCheckedPartially
  } = useSelectableOptions({
    children,
    value: props.value,
    defaultValue: props.defaultValue,
    multiple: true
  });

  const handleChange = React.useCallback(
    (value: string, checked: boolean) => {
      const select = selectRef.current;
      if (!select) {
        return;
      }
      const targetOption = select.querySelector(`option[value="${value}"]`);
      if (!targetOption) {
        return;
      }
      
      handleToggleOption(value, checked);
      
      targetOption.setAttribute("checked", checked.toString());
      const changeEvent = new Event("change", { bubbles: true });
      select.dispatchEvent(changeEvent);
    },
    [handleToggleOption],
  );

  const handleAllChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    (e) => {
      const checked = e.target.checked;
      const indeterminate = e.target.indeterminate;
      
      if (indeterminate || checked) {
        handleToggleAll(true);
      } else {
        handleToggleAll(false);
      }
      
      const allOptions = selectRef.current?.querySelectorAll("option");
      if (allOptions) {
        Array.from(allOptions).forEach(option => {
          option.setAttribute("checked", (indeterminate || checked).toString());
        });
        const changeEvent = new Event("change", { bubbles: true });
        selectRef.current?.dispatchEvent(changeEvent);
      }
    },
    [handleToggleAll],
  );

  return (
    <div className={classes.selectable} data-hidden={hidden} {...props}>
      <select
        {...props}
        multiple
        ref={selectRef}
        style={{
          display: "none",
        }}
      >
        {children}
      </select>
      <Table>
        <thead>
          <tr>
            <th className={classes.selectableAll}>
              <Input
                type="checkbox"
                data-size="small"
                checked={isCheckedAll}
                onChange={handleAllChange}
                id={props.id}
                indeterminate={isCheckedPartially}
              />
            </th>
            <th>{props["aria-label"]}</th>
          </tr>
        </thead>
        <tbody>
          {options.map((option, index) => {
            return (
              <SelectableViewOption 
                values={selectedValues} 
                value={option.value} 
                onChange={handleChange} 
                key={option.value}
                switch={props.switch}
              >
                {option.label}
              </SelectableViewOption>
            );
          })}
        </tbody>
      </Table>
      <div className={classes.mark} role="presentation">
        <ChevronMark></ChevronMark>
      </div>
    </div>
  );
};
const SelectableViewOption = ({
  values,
  value,
  onChange,
  children,
  ...props
}: {
  values: string[];
  value: string;
  onChange: (value: string, checked: boolean) => void;
  children?: React.ReactNode;
  switch?: "true" | "false" | undefined;
}) => {
  const checked = values.includes(value);
  const id = React.useId();
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(value, e.target.checked);
    },
    [value, onChange],
  );
  return (
    <tr>
      <th>
        <Input type="checkbox" switch={props.switch} data-size="small" checked={checked} onChange={handleChange} id={id} />
      </th>
      <td>{children}</td>
    </tr>
  );
};
export const View: React.FC<React.PropsWithChildren<AllHTMLAttributes<HTMLElement>>> = ({ children, hidden, ...props }) => {
  return (
    <div className={classes.selectbox} data-hidden={hidden} {...props}>
      {children}
      <div className={classes.mark} role="presentation">
        <ChevronMark></ChevronMark>
      </div>
    </div>
  );
};
View.displayName = "View";
