import * as React from "react";
import { useCallback } from "react";
import { Button } from "../form/Button";
import { Input } from "../form/Input";
import { Label } from "../form/Label";
import style from "./Alert.module.css";
import { PopupLayout } from "./parts/PopupLayout";
export const Prompt = ({
  isLoading,
  onSelect,
  message,
  defaultValue,
  open,
  onClose,
  potal,
  onCancel,
}: React.ComponentPropsWithRef<typeof PopupLayout> & {
  onSelect: (value: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
  message: string;
  defaultValue?: string;
}) => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (!(e.target instanceof HTMLFormElement)) {
        return;
      }
      const element = e.target.querySelector('input[name="value"]');
      if (!(element instanceof HTMLInputElement)) {
        return;
      }
      const value = element.value;
      onSelect(value);
    },
    [onSelect],
  );
  return (
    <PopupLayout open={open} onClose={onClose} potal={potal}>
      <div className={style.content} data-is-loading={isLoading}>
        <form onSubmit={handleSubmit}>
          <Label>{message}</Label>
          <Input defaultValue={defaultValue} name="value"></Input>
          <div className={style.buttonGroup}>
            <Button onClick={onCancel} type="reset" disabled={isLoading} variant={`alert`}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} variant={`alert primary`}>
              OK
            </Button>
          </div>
        </form>
      </div>
    </PopupLayout>
  );
};
Prompt.displayName = "Prompt";
