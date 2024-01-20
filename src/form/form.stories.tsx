import React, { ComponentProps } from "react";

import { Button } from "./Button";
import { Input } from "./Input";
import { Label } from "./Label";
import { Selectbox } from "./Selectbox";
import { Textarea } from "./Textarea";
import { Fieldset } from "./Fieldset";
import { Legend } from "./Legend";
import { DataList } from "./DataList";
import { EditableLabel } from "./EditableLabel";
import { Form } from "./Form";
import { Progress } from "./Progress";
import { Meter } from "./Meter";
import { Output } from "./Output";
import { Optgroup } from "./Optgroup";
import { Option } from "./Option";

export default {
  title: "forms/form",
  component: <></>,
};
export const editableLabel = () => {
  const [value, setValue] = React.useState("hoge");
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };
  return <EditableLabel value={value} onChange={onChange}></EditableLabel>;
};
export const all = () => {
  return (
    <>
      <Fieldset>
        <Legend>legend</Legend>
        <Label>Label</Label>
        <dl>
          <dt>text:</dt>
          <dd>
            <Input type="text" defaultValue="text"></Input>
          </dd>
          <dt>password:</dt>
          <dd>
            <Input type="password" defaultValue="password"></Input>
          </dd>
          <dt>textarea:</dt>
          <dd>
            <Textarea defaultValue="value"></Textarea>
          </dd>
          <dt>Selectbox</dt>
          <dd>
            <Selectbox>
              <option value="a">a</option>
            </Selectbox>
          </dd>
          <dt>checkbox</dt>
          <dd>
            <Input type="checkbox"></Input>
          </dd>
          <dt>radio</dt>
          <dd>
            <Input type="radio"></Input>
          </dd>
          <dt>file</dt>
          <dd>
            <Input type="file"></Input>
          </dd>
          <dt>file multiple</dt>
          <dd>
            <Input type="file" multiple></Input>
          </dd>
          <dt>file capture</dt>
          <dd>
            <Input type="file" capture></Input>
          </dd>
        </dl>
      </Fieldset>
    </>
  );
};
export const button = (args: ComponentProps<typeof Button>) => {
  return (
    <>
      <Button variant="primary">primary</Button>
      <br />
      <Button variant="secondary">secondary</Button>
      <br />
      <Button variant="cta">cta</Button>
      <br />
      <Button variant="danger">Danger</Button>
      <br />
      <Button quiet>quiet</Button>
      <br />
      <Button size="small">small</Button>
    </>
  );
};

export const input = (args: ComponentProps<typeof Input>) => {
  return (
    <>
      <Input type="password" defaultValue="password"></Input>
      <br />
      <Input type="text" defaultValue="text"></Input>
      <br />
      <Input type="number" defaultValue="0"></Input>
      <br />
      <Selectbox>
        <option value="a">a</option>
      </Selectbox>
    </>
  );
};

export const variantions = (args: ComponentProps<typeof Input>) => {
  return (
    <>
      <section>
        <Label>
          <Input type="checkbox"></Input>checkbox
        </Label>
      </section>
      <section>
        <Label>
          <Input type="checkbox" defaultChecked></Input>checkbox:checked
        </Label>
      </section>
      <section>
        <Label>
          <Input type="radio"></Input>radio
        </Label>
      </section>
      <section>
        <Label>
          <Input type="radio" defaultChecked></Input>radio:checked
        </Label>
      </section>
    </>
  );
};

export const label = (args: ComponentProps<typeof Label>) => {
  return <Label {...args}>Label</Label>;
};

// New Form Elements
export const newFormElements = () => {
  const [progressValue, setProgressValue] = React.useState(0.6);
  const [meterValue, setMeterValue] = React.useState(0.8);
  const [outputValue, setOutputValue] = React.useState("計算結果");

  return (
    <Form>
      <Fieldset>
        <Legend>新しいフォーム要素</Legend>

        <div style={{ marginBottom: "1rem" }}>
          <Label>進捗バー</Label>
          <Progress value={progressValue} max={1}>
            {Math.round(progressValue * 100)}%
          </Progress>
          <Button type="button" onClick={() => setProgressValue(Math.min(1, progressValue + 0.1))}>
            +10%
          </Button>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <Label>メーター</Label>
          <Meter value={meterValue} min={0} max={1} low={0.3} high={0.7} optimum={0.9}>
            {Math.round(meterValue * 100)}%
          </Meter>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <Label>セレクト with オプショングループ</Label>
          <Selectbox>
            <Optgroup label="フルーツ">
              <Option value="apple">りんご</Option>
              <Option value="banana">バナナ</Option>
              <Option value="orange">オレンジ</Option>
            </Optgroup>
            <Optgroup label="野菜">
              <Option value="carrot">にんじん</Option>
              <Option value="potato">じゃがいも</Option>
              <Option value="tomato">トマト</Option>
            </Optgroup>
          </Selectbox>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <Label>計算結果</Label>
          <Output htmlFor="calc-input">{outputValue}</Output>
          <Input
            id="calc-input"
            type="number"
            placeholder="数値を入力"
            onChange={(e) => setOutputValue(`結果: ${Number(e.target.value) * 2}`)}
          />
        </div>

        <Button type="submit">送信</Button>
      </Fieldset>
    </Form>
  );
};
