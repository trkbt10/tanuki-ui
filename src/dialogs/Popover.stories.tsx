import React, { ComponentProps } from "react";
import { useToggle } from "react-use";
import { Popover } from "./Popover";
import { Button } from "../form/Button";

export default {
  title: "dialogs/Popover",
  component: <></>,
};

export const Basic = (props: ComponentProps<typeof Popover>) => {
  return (
    <>
      <Button popovertarget="mainpopover" popovertargetaction="toggle">
        Menu
      </Button>
      <Popover id="mainpopover">
        <nav>
          <a href="#">Home</a>
          <ul tabIndex={0}>
            <a href="#">
              Pizza <strong>＞</strong>
            </a>
            <Popover id="subpopover">
              <ul>
                <a href="#">Margherita</a>
                <a href="#">Pepperoni</a>
                <a href="#">Ham & Shroom</a>
                <a href="#">Vegan</a>
              </ul>
            </Popover>
          </ul>
          <a href="#">Music</a>
          <a href="#">Wombats</a>
          <a href="#">Finland</a>
        </nav>
      </Popover>
    </>
  );
};
