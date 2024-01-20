import React from "react";
import { H3, Input, H4, Label, Selectbox, H1, H2 } from "../../src";
function useInputValue<T>(defaultValue: T | (() => T)) {
  const [value, setValue] = React.useState<T>(defaultValue);
  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((e.target as any).value);
  }, []);
  return [value, onChange] as const;
}
function TestInput(props: Partial<React.ComponentProps<typeof Input>>) {
  const [value, onChange] = useInputValue(() => props.defaultValue);
  return <Input type="text" value={value} onChange={onChange} {...props}></Input>;
}
export const TestForm = () => {
  const [value, setValue] = React.useState(0.5);
  const [select, setSelect] = React.useState("B");
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelect(e.target.value);
    },
    [setSelect],
  );
  const [color, setColor] = useInputValue("#ff0000");
  const handleRateChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setValue(parseFloat(e.target.value));
  }, []);
  return (
    <div style={{ background: "#ddd" }}>
      <H1>Form</H1>
      <section>
        <H2>Input</H2>
        <section>
          <H3>Basic</H3>
          <Input type="text" placeholder="text"></Input>
          <Input type="text" defaultValue="hoge"></Input>
          <Input type="text" placeholder="placeholder"></Input>
          <Input type="text" defaultValue="hoge" placeholder="placeholder"></Input>
          <Input type="text" defaultValue="hoge" placeholder="placeholder" disabled></Input>
          <Input type="text" defaultValue="hoge" placeholder="placeholder" readOnly></Input>
          <Input type="text" defaultValue="hoge" placeholder="placeholder" required></Input>
        </section>
        <section>
          <H3>Color</H3>
          <section>
            <H4>Controlled</H4>
            <Input type="color" value={color} onChange={setColor}></Input>
          </section>
          <section>
            <H4>Uncontrolled</H4>
            <Input type="color" defaultValue="#ff0000"></Input>
          </section>
        </section>
      </section>

      <H3>Range</H3>
      <Input type="range" value={value} min={0} max={1} step={0.1} onChange={handleRateChange}></Input>
      <H4>Uncontrolled</H4>
      <Input type="range" defaultValue={0.5} min={0} max={1} step={0.1} onChange={handleRateChange}></Input>
      <H3>Unrange</H3>
      <Input type="range" defaultValue={0.5} min={0} max={100} step={0.1}></Input>

      <Label>{value}</Label>
      <H3>Selectbox</H3>
      <Selectbox name={"/aaa"} value={select} onChange={handleChange}>
        <option value="A" key="A">
          a
        </option>
        <option value="B" key="B">
          b
        </option>
        <option value="C" key="C">
          c
        </option>
      </Selectbox>
      <Label>{select}</Label>
    </div>
  );
};
