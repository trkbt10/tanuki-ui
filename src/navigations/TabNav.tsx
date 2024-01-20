import * as React from "react";
import { Text } from "../blocks/Text";
import style from "./TabNav.module.css";
import { NativeSortable, SortableItemProps, useSortable } from "../controls/NativeSortable";
type Item = { key: string; value: string; icon?: React.ReactNode };
export const TabNav: React.FC<
  React.PropsWithChildren<{
    defaultValue?: string;
    value?: string;
    onChange: (nextKey: string) => void;
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    items: Item[];
    itemWrapper?: React.ComponentType<React.PropsWithChildren<{}>>;
  }>
> = ({ itemWrapper: Wrapper = Text, value, onChange, setItems, items, defaultValue }) => {
  const [selectedTab, selectTab] = React.useState(value ?? defaultValue);
  React.useEffect(() => {
    if (typeof value !== "string") {
      return;
    }
    if (value !== selectedTab) {
      selectTab(value);
    }
  }, [selectedTab, value]);
  const handleClose: React.ComponentProps<typeof SortableItem>["onRequestClose"] = React.useCallback((key: string) => {
    setItems((prev) => {
      return prev.filter(({ key: itemKey }) => itemKey !== key);
    });
  }, []);
  const handleSelect: React.ComponentProps<typeof SortableItem>["onSelect"] = React.useCallback(
    (e) => {
      if (!(e.currentTarget instanceof HTMLDivElement)) {
        return;
      }
      const id = e.currentTarget.dataset.id;
      if (!id) {
        return;
      }
      onChange(id);
    },
    [onChange],
  );
  return (
    <nav className={style.tabnav}>
      <NativeSortable items={items} onChange={setItems} controlAs={SortableItemControl}>
        {items.map((item) => (
          <SortableItem key={item.key} item={item} onSelect={handleSelect} selected={selectedTab} onRequestClose={handleClose}>
            <Wrapper>{item.value}</Wrapper>
          </SortableItem>
        ))}
      </NativeSortable>
    </nav>
  );
};
TabNav.displayName = "TabNav";
const SortableItemControl: React.FC<SortableItemProps> = ({ children, id }) => {
  const { containerRef, listeners } = useSortable<HTMLDivElement, HTMLDivElement>(id);
  const childrenWithListeners = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, listeners);
    }
    return child;
  });
  return (
    <div ref={containerRef} className={style.sortableItemControl}>
      {childrenWithListeners}
    </div>
  );
};
const SortableItem = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{
    item: Item;
    onSelect: React.MouseEventHandler<HTMLDivElement>;
    selected?: string;
    onRequestClose?: (key: string) => void;
    closeMark?: React.ReactNode;
  }>
>(({ selected, item, children, onSelect, onRequestClose, closeMark }, ref) => {
  const handleClose: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
    (e) => {
      e.preventDefault();
      onRequestClose && onRequestClose(item.key);
    },
    [onRequestClose],
  );
  return (
    <div className={style.sortableItem} data-id={item.key} aria-selected={selected === item.key} onClick={onSelect}>
      {onRequestClose ? (
        <button type="button" className={style.deleteButton} value={`close ${item.value} tab`} onClick={handleClose}>
          {closeMark ?? "×"}
        </button>
      ) : (
        <span />
      )}
      <div className={style.sortableItemBody} ref={ref}>
        <div></div>
        {item.icon}
        {children}
      </div>
    </div>
  );
});
