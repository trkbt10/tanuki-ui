import React, { ComponentProps } from "react";
import { SidebarList } from "./SidebarList";

export default {
  title: "lists/SidebarList",
  component: <></>,
};

export const basic = () => {
  return (
    <>
      <SidebarList.List>
        <SidebarList.ListItem label="Label" />
        <SidebarList.ListItem label="Label" />
      </SidebarList.List>
      <SidebarList.Container open>
        <SidebarList.SectionTitle title="Opened">
          <SidebarList.Button>Button</SidebarList.Button>
        </SidebarList.SectionTitle>
      </SidebarList.Container>
      <SidebarList.Container>
        <SidebarList.SectionTitle title="Closed">
          <SidebarList.Button>Button</SidebarList.Button>
        </SidebarList.SectionTitle>
      </SidebarList.Container>
      <SidebarList.Container open>
        <SidebarList.SectionTitle title="Section Title">
          <SidebarList.Button>Button</SidebarList.Button>
        </SidebarList.SectionTitle>
        <SidebarList.List>
          <SidebarList.ListItem label="Label" icon="file" selected />
          <SidebarList.ListItem label="Label" icon="file">
            <SidebarList.List>
              <SidebarList.ListItem label="Label" />
              <SidebarList.ListItem label="Label" />
            </SidebarList.List>
          </SidebarList.ListItem>
        </SidebarList.List>
      </SidebarList.Container>
    </>
  );
};

export const withReactWindow = () => {
  return (
    <>
      <SidebarList.Container open>
        <SidebarList.SectionTitle title="Section Title">
          <SidebarList.Button>Button</SidebarList.Button>
        </SidebarList.SectionTitle>
        <SidebarList.List></SidebarList.List>
      </SidebarList.Container>
    </>
  );
};
