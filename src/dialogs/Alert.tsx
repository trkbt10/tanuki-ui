import type { PropsWithChildren } from "react";
import React, { useCallback } from "react";
import { Heading } from "../elements/Heading";
import { Button } from "../form/Button";
import style from "./Alert.module.css";
import { PopupLayout, PopupLayoutProps } from "./parts/PopupLayout";
export type AlertAction = {
  key: string;
  value: string;
  variant?: string;
};
export const Alert = ({
  actions,
  onSelect,
  isLoading,
  children,
  title,
  error,
  description,
  direction,
  ...props
}: PopupLayoutProps &
  PropsWithChildren<{
    title?: string;
    description?: string;
    onSelect?: (actionType: string) => void;
    mark?: string;
    isLoading?: boolean;
    aspectRatio?: string;
    error?: Error;
    direction?: string;
    actions?: AlertAction[];
  }>) => {
  const handleAction: React.MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    const action = e.currentTarget.getAttribute("data-action");
    if (!action || !onSelect) {
      return;
    }
    onSelect(action);
  }, []);
  return (
    <PopupLayout {...props} variant="alert">
      <div className={style.content} data-is-loading={isLoading}>
        {title && <Heading level={3}>{title}</Heading>}
        {description && <p className={style.description}>{description}</p>}
        {error && (
          <p>
            <strong>{error.name}</strong>
            {error.message}
            {hasErrorCause(error) && <>Caused by: {error.cause.message}</>}
          </p>
        )}
        {children}
        <div className={style.buttonGroup} data-direction={direction}>
          {actions?.map((action, i) => {
            return (
              <Button
                onClick={handleAction}
                data-action={action.key}
                type="button"
                key={i}
                disabled={isLoading}
                variant={`alert ${action.variant ?? ""}`.trim()}
              >
                {action.value}
              </Button>
            );
          })}
        </div>
      </div>
    </PopupLayout>
  );
};
Alert.displayName = "Alert";
const hasErrorCause = (error: Error): error is Error & { cause: Error } => {
  if (!(error instanceof Error)) {
    return false;
  }
  return error.hasOwnProperty("cause");
};
