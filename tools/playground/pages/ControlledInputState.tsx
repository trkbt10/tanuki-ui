import * as React from "react";
import { Input } from "../../src";
import { Converter, useControlledInputState, useMergedRef } from "../../src/hooks/useControlledInputState";
const targetAttributeNames = ["value", "defaultValue", "readOnly"];

function generateCombinations<T>(array: T[]): T[][] {
  const n = array.length;
  const allCombinations: T[][] = [];

  for (let i = 0; i < 1 << n; i++) {
    const combinations: T[] = [];
    let c = 0;
    for (let j = 0; j < n; j++) {
      if (i & (1 << j)) {
        combinations[c++] = array[j];
      }
    }
    allCombinations[i] = combinations;
  }

  return allCombinations;
}
const inputArray = targetAttributeNames;
const combinations = generateCombinations(inputArray);
export const ControlledInputState = (props: React.PropsWithChildren<{}>) => {
  return (
    <div>
      {combinations.map((combination, i) => {
        const props = combination.reduce((prev, current) => {
          return {
            ...prev,
            [current]: current,
          };
        }, {});
        return (
          <div key={i}>
            <h2>{combination.join("&")}</h2>
            <ControlledInputTest {...props}></ControlledInputTest>
          </div>
        );
      })}
    </div>
  );
};
type HTMLInputElementProps = React.PropsWithChildren<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    [K in `data-${string}`]?: string;
  }
>;
import Select from "react-select";
const options = [
  { value: "a", label: "a" },
  { value: "b", label: "b" },
  { value: "c", label: "c" },
];
type SelectValue = {
  value: string;
  label: string;
};
const reactSelectConverter: Converter<SelectValue | undefined> = {
  encode: (value) => {
    if (!value) {
      return undefined;
    }
    const valueString = value.toString();
    return {
      value: valueString,
      label: valueString,
    };
  },
  decode: (value) => {
    return value?.value;
  },
};
const ControlledInput = React.forwardRef<HTMLInputElement, HTMLInputElementProps>(({ ...props }, ref) => {
  const [currentValue, setCurrentValue, bind] = useControlledInputState<
    | undefined
    | {
        value: string;
        label: string;
      }
  >(
    {
      ...props,
      ref,
    },
    reactSelectConverter,
  );
  return (
    <dl>
      <dt>
        <label>Custom input</label>
      </dt>
      <dd>
        <Select
          options={options}
          value={currentValue}
          onChange={(value) => {
            setCurrentValue(value || undefined);
          }}
        ></Select>
      </dd>
      <dt>
        <label>Hidden input</label>
      </dt>
      <dd>
        <input {...bind}></input>
      </dd>
      <dt>currentValue</dt>
      <dd>
        <output>
          {typeof currentValue}: {JSON.stringify(currentValue)}
        </output>
      </dd>
      <dt>control</dt>
      <dd>
        <button
          type="reset"
          onClick={(e) => {
            e.preventDefault();
            setCurrentValue({
              value: "a",
              label: "a",
            });
          }}
        >
          reset
        </button>
      </dd>
    </dl>
  );
});
Input.displayName = "Input";
const ControlledInputTest = ({ ref, ...props }: HTMLInputElementProps) => {
  const [value, setValue] = React.useState("changed");
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log("handleChange", e.target.value);
      setValue(e.target.value);
    },
    [setValue],
  );
  const controlled = typeof props.defaultValue === "undefined" && typeof props.value !== "undefined";

  return (
    <div>
      <ControlledInput {...props} onChange={handleChange}></ControlledInput>
      {controlled ? "controlled" : "uncontrolled"} {value}
    </div>
  );
};
