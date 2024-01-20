import * as React from "react";
import { NativeSortable } from "../controls/NativeSortable";
export const SortableList = <T extends { id: string }>({
  items,
  setItems,
  element,
}: React.PropsWithChildren<{
  items: T[];
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  element: (item: T, index: number) => React.ReactNode;
}>) => {
  return (
    <NativeSortable items={items} onChange={setItems}>
      {items.map((item, i) => {
        return <React.Fragment key={item.id}>{element(item, i)}</React.Fragment>;
      })}
    </NativeSortable>
  );
};
SortableList.displayName = "SortableList";
