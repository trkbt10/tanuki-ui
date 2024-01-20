import * as React from "react";
import { Text } from "../blocks/Text";
import { Input } from "./Input";
import style from "./input.module.css";
export const EditableLabel: React.FC<React.ComponentPropsWithoutRef<typeof Input>> = ({ ...props }) => {
  const [active, setActive] = React.useState(false);
  const focus = React.useCallback(() => {
    setActive(true);
  }, []);
  const blur = React.useCallback(() => {
    setActive(false);
  }, []);
  const refCallback: React.RefCallback<HTMLInputElement> = (ref) => {
    if (ref instanceof HTMLInputElement) {
      ref.focus();
    }
  };
  return (
    <>
      <input
        {...props}
        className={style.editablelabel}
        autoFocus
        ref={refCallback}
        onBlur={blur}
        type={"text"}
        style={{ display: active ? "block" : "none" }}
      />
      {!active && (
        <span onClick={focus}>
          <Text>{props.value ?? props.defaultValue}</Text>
        </span>
      )}
    </>
  );
};
EditableLabel.displayName = "EditableLabel";
