import * as React from "react";
import { usePrevious } from "react-use";
import style from "./NativeSortable.module.css";
type IdentifiedItem<T> = {
  id: string;
  value: T;
};
const uniqueId = () => {
  return Math.random().toString(36).substring(2);
};
const changeEventEmitter = <T extends any[], V extends IdentifiedItem<T[number]>>({
  value,
  onChange,
}: {
  value: T;
  onChange: (value: T) => void;
}): [V[], React.Dispatch<React.SetStateAction<V[]>>] => {
  const [items, setItems] = React.useState<V[]>(() => {
    const source = value ?? [];
    return source.map((value) => ({ value, id: uniqueId() }) as V);
  });
  const prev = usePrevious(items);
  const callback = React.useRef(onChange);
  callback.current = onChange;
  React.useEffect(() => {
    if (!prev) {
      return;
    }
    if (!callback.current) {
      return;
    }
    const nextItems = items.map((item) => item.value);
    callback.current(nextItems as T);
  }, [items]);

  const prevValue = usePrevious(value);
  React.useEffect(() => {
    if (!prevValue || !value) {
      return;
    }
    const nextValue = value;
    setItems((prev) => {
      const current = prev.map((item) => item.value);
      const sameLength = current.length === nextValue.length;
      const areEqual = sameLength && nextValue.every((p, i) => p === current[i]);
      if (areEqual) {
        return prev;
      }
      // もしも同じ長さなら、値は編集されたものとして更新する
      const weakIdMap = new WeakMap(prev.map((p) => [p.value, p]));
      const changedItemIndexes = nextValue.map((p, i) => (weakIdMap.has(p) ? -1 : i)).filter((i) => i !== -1);

      if (sameLength) {
        return prev.map((current, i) => {
          if (changedItemIndexes.includes(i)) {
            return { ...current, value: nextValue[i] };
          }
          return current;
        });
      }
      // もしも長さが違うなら、新しい項目を追加する
      return nextValue.map((after) => {
        const before = weakIdMap.get(after);
        if (before?.value) {
          return before;
        }
        return { value: after, id: uniqueId() } as V;
      });
    });
  }, [value, setItems]);

  return [items, setItems];
};
const arrayMove = <T extends any>(array: T[], from: number, to: number) => {
  const result = [...array];
  const [removed] = result.splice(from, 1);
  result.splice(to, 0, removed);
  return result;
};

export const NativeSortable = <T extends {}>({
  items,
  onChange,
  children,
  controlAs,
}: {
  items: T[];
  onChange: (next: T[]) => void;
  children: React.ReactNode;
  controlAs?: React.ComponentType<SortableItemProps>;
}) => {
  const [itemsWithIds, setItemsWithIds] = changeEventEmitter<T[], IdentifiedItem<T>>({
    value: items,
    onChange,
  });
  const elementRefMap = React.useRef<WeakMap<HTMLElement, string>>(new WeakMap([]));
  const [draggingId, setDraggingId] = React.useState<string>();
  const [draggingOverId, setDraggingOverId] = React.useState<string>();
  const draggingData = {
    draggingId,
    draggingOverId,
  };
  const draggingDataRef = React.useRef<{ draggingId?: string; draggingOverId?: string }>(draggingData);
  draggingDataRef.current = draggingData;

  const onEnd = React.useCallback((source: string) => {
    const { draggingId, draggingOverId } = draggingDataRef.current;
    if (draggingOverId === source) {
      return;
    }
    // Swap two items
    setItemsWithIds((prev) => {
      const sourceIndex = prev.findIndex((item) => item.id === source);
      const targetIndex = prev.findIndex((item) => item.id === draggingOverId);
      const swapped = arrayMove(prev, sourceIndex, targetIndex);
      return swapped;
    });
    // Blur the active item
    setDraggingId(undefined);
    setDraggingOverId(undefined);
  }, []);
  const observe = React.useCallback((id: string, element: HTMLElement) => {
    elementRefMap.current.set(element, id);
    return () => {
      elementRefMap.current.delete(element);
    };
  }, []);
  const itemIds = itemsWithIds.map((item) => item.id);
  const Item = controlAs ?? SortableItem;
  return (
    <SortableContext.Provider
      value={{
        observe,
        items: itemIds,
        draggingId,
        setDraggingId,
        draggingOverId,
        setDraggingOverId,
        end: onEnd,
      }}
    >
      {React.Children.map(children, (child, index) => {
        const id = itemIds[index];
        return (
          <Item key={id} id={id}>
            {child}
          </Item>
        );
      })}
    </SortableContext.Provider>
  );
};
const clx = (...args: any[]) => {
  return args.filter(Boolean).join(" ");
};
export type SortableItemProps = {
  id: string;
  className?: string;
  children: React.ReactNode;
};
const SortableItem: React.FC<SortableItemProps> = ({ id, children, className }) => {
  const { containerRef, listeners } = useSortable<HTMLDivElement, HTMLDivElement>(id);

  return (
    <div className={clx(style.sortableItem, className)} ref={containerRef}>
      <div className={style.sortableItemHandle} {...listeners}></div>
      <div className={style.sortableItemBody}>{children}</div>
    </div>
  );
};
NativeSortable.SortableItem = SortableItem;

type SortableContextValue = {
  items: string[];
  draggingId?: string;
  setDraggingId: React.Dispatch<React.SetStateAction<string | undefined>>;
  draggingOverId?: string;
  setDraggingOverId: React.Dispatch<React.SetStateAction<string | undefined>>;
  end: (itemId: string) => void;
  observe: (id: string, element: HTMLElement) => () => void;
};
const SortableContext = React.createContext<SortableContextValue>({
  items: [],
  setDraggingId: () => {},
  setDraggingOverId: () => {},
  end: () => {},
  observe: () => () => {},
});
export const useSortable = <CE extends HTMLElement, HE extends HTMLElement>(itemId: string) => {
  const containerRef = React.useRef<CE>(null);
  const handleRef = React.useRef<HE>(null);
  const { setDraggingId, setDraggingOverId, end, observe } = React.useContext(SortableContext);
  React.useEffect(() => {
    const current = containerRef.current;
    const handle = handleRef.current;
    if (!current || !handle) {
      return;
    }
    const disconnect = observe(itemId, current);
    current.setAttribute("draggable", "true");
    current.setAttribute("data-draggable-id", itemId);
    const onDragEnter = () => {
      setDraggingOverId(itemId);
    };
    let draggingOverId: string | undefined;
    const onDragStart = (event: DragEvent) => {
      if (draggingOverId) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
      }
      setDraggingId(itemId);
    };
    const onDragEnd = (e: DragEvent) => {
      end(itemId);
      return false;
    };
    const onDragOver = (e: DragEvent) => {
      if (e.preventDefault) {
        e.preventDefault();
      }
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = "move";
      }
      return false;
    };
    const handleDrop = (e: DragEvent) => {
      e.stopPropagation();
      e.preventDefault();
      return false;
    };
    const captureTarget = (e: PointerEvent) => {
      if (e.target === handle) {
        draggingOverId = itemId;
        return;
      }
      return false;
    };
    current.addEventListener("pointerdown", captureTarget);
    current.addEventListener("dragstart", onDragStart);
    current.addEventListener("dragover", onDragOver);
    current.addEventListener("dragend", onDragEnd);
    current.addEventListener("dragenter", onDragEnter);
    current.addEventListener("drop", handleDrop, false);
    return () => {
      current.removeEventListener("pointerdown", captureTarget);
      current.removeEventListener("dragenter", onDragEnter);
      current.removeEventListener("dragover", onDragOver);
      current.removeEventListener("dragstart", onDragStart);
      current.removeEventListener("dragend", onDragEnd);
      current.removeEventListener("drop", handleDrop);
      disconnect();
    };
  }, [itemId]);
  return {
    containerRef,
    listeners: {
      ref: handleRef,
    },
  };
};

NativeSortable.useSortable = useSortable;
