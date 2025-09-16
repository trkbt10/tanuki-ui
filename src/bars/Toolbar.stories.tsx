import React, { ComponentProps } from "react";
import { BarItems } from "./Toolbar";

export default {
  title: "bars/Toolbar",
  component: <></>,
};

export const Basic = () => {
  return (
    <BarItems.Body>
      <BarItems.Title subTitle="subTitle" title="Title"></BarItems.Title>
      <BarItems.Separator></BarItems.Separator>
      <BarItems.Body>
        <BarItems.PushButton>Done</BarItems.PushButton>
        <BarItems.ComboBox>
          <option value="B">B</option>
        </BarItems.ComboBox>
        <BarItems.PullDown>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </BarItems.PullDown>
        <BarItems.PopUpButton>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </BarItems.PopUpButton>
        <BarItems.BackButton />
        <BarItems.ForwardButton />
        <BarItems.SearchField></BarItems.SearchField>
      </BarItems.Body>
    </BarItems.Body>
  );
};

export const Win11 = () => {
  return (
    <BarItems.Body>
      <BarItems.Title subTitle="subTitle" title="Title"></BarItems.Title>
      <BarItems.Body>
        <BarItems.SegmentedControl items={["a", "b", "c"]}></BarItems.SegmentedControl>
        <BarItems.PushButton>Done</BarItems.PushButton>
        <BarItems.ComboBox>
          <option value="B">B</option>
        </BarItems.ComboBox>
        <BarItems.PullDown>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </BarItems.PullDown>
        <BarItems.PopUpButton>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </BarItems.PopUpButton>
        <BarItems.SearchField></BarItems.SearchField>
      </BarItems.Body>
    </BarItems.Body>
  );
};
export const PushButton = () => {
  return <BarItems.PushButton>Done</BarItems.PushButton>;
};

export const PullDown = () => {
  return (
    <BarItems.PullDown name="down">
      <option value="A">A</option>
    </BarItems.PullDown>
  );
};

export const Title = () => {
  return <BarItems.Title title="title"></BarItems.Title>;
};

export const Separator = () => {
  return <BarItems.Separator></BarItems.Separator>;
};

export const NavigationButtons = () => {
  return (
    <BarItems.Body>
      <BarItems.BackButton />
      <BarItems.ForwardButton />
      <BarItems.BackButton label="Back" />
      <BarItems.ForwardButton label="Forward" />
    </BarItems.Body>
  );
};
