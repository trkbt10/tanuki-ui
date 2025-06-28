import React, { useState } from "react";
import { Input } from "@/form/Input";
import { List, ListItem } from "@/elements/List";
import { NativeSortable } from "@/controls/NativeSortable";

export const TestNativeSortable = () => {
  const [items, setItems] = useState<{ name: string }[]>(() => {
    return [{ name: "a" }, { name: "b" }, { name: "c" }];
  });
  return (
    <>
      <List>
        <NativeSortable<{ name: string }> items={items} onChange={setItems}>
          {items.map((item, i) => {
            return (
              <ListItem
                key={i}
                label={
                  <Input
                    value={item.name}
                    onChange={(e) =>
                      setItems((prev) => {
                        prev[i] = { ...item, name: e.target.value };
                        return [...prev];
                      })
                    }
                  />
                }
              ></ListItem>
            );
          })}
        </NativeSortable>
      </List>
    </>
  );
};
