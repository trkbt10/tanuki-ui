import { ComponentProps } from "react";
import { Input } from "./Input";
import React from "react";
import { dateToLocaleString } from "./custom-inputs/DateTimeInput";

export default {
  title: "forms/input",
  component: Input,
  argTypes: {
    type: {
      name: "Type",
      options: [
        "text",
        "password",
        "checkbox",
        "radio",
        "file",
        "range",
        "email",
        "number",
        "tel",
        "url",
        "datetime-local",
        "date",
        "month",
        "time",
        "week",
        "search",
        "color",
      ],
      control: { type: "radio" },
    },
  },
  args: {
    placeholder: "input",
  },
};
export const Basic = (args: ComponentProps<typeof Input>) => <Input {...args} />;

const datetimeLocalValueExamples = [
  "2020-01-01T09:00",
  "2020-01-01T09:00:00+09:00",
  "2020-01-01T00:00:00Z",
  "2019-12-31T15:00:00-09:00",
];
export const DatetimeLocal = (args: ComponentProps<typeof Input>) => {
  return (
    <section>
      {datetimeLocalValueExamples.map((value, i) => {
        return (
          <div key={i}>
            <Input {...args} type="datetime-local" defaultValue={value} key={i} />
            <time>{dateToLocaleString(value)}</time>
          </div>
        );
      })}
    </section>
  );
};
import A from "./mocks/150x150.png?inline";
import B from "./mocks/150x150.png";
const images = [A, B];
export const MediaInput = (args: ComponentProps<typeof Input>) => {
  return (
    <section>
      <Input value={images} type="file" data-variant="media" multiple />
    </section>
  );
};
