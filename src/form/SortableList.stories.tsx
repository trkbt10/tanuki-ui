import React, { ComponentProps } from "react";
import { SidebarList } from "../navigations/SidebarList";
import { SortableList } from "./SortableList";
const { List, ListItem } = SidebarList;
export default {
  title: "forms/sortableList",
  component: SortableList,
};

export const Basic = (args: ComponentProps<typeof SortableList>) => {
  const [items, setItems] = React.useState(() => {
    return [
      {
        id: "a",
        name: "a",
      },
      {
        id: "b",
        name: "b",
      },
      {
        id: "c",
        name: "c",
      },
    ];
  });
  const [isDragging, setIsDragging] = React.useState(false);
  return (
    <List style={{ overflowX: isDragging ? "hidden" : "auto" }}>
      <SortableList items={items} setItems={setItems} element={ListItemRenderer}></SortableList>
    </List>
  );
};
const ListItemRenderer: React.FC<{ id: string; name: string }> = ({ id, name }) => {
  return (
    <ListItem label={name}>
      {id}:{name}
    </ListItem>
  );
};
