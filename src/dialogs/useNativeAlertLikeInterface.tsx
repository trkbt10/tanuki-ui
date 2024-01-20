import * as React from "react";
import { Alert } from "./Alert";
import { Prompt } from "./Prompt";
type IPrompt = {
  id: Symbol;
  type: string;
  message?: string;
  title?: string;
  defaultValue?: string;
  resolve: (id: Symbol, value?: any) => void;
  reject: (id: Symbol, reason?: any) => void;
};
export const useNativeAlertLikeInterface = () => {
  const [activePrompts, setActivePrompts] = React.useState<IPrompt[]>([]);
  const closePrompt = React.useCallback(
    (id: Symbol) => {
      setActivePrompts((prev) => prev.filter((p) => p.id !== id));
    },
    [setActivePrompts],
  );

  const alert = React.useCallback(
    async (message?: any) => {
      return new Promise<undefined>((resolve, reject) => {
        setActivePrompts((prev) => [
          ...prev,
          {
            type: "alert",
            id: Symbol("alert"),
            message,
            resolve: (id: Symbol) => {
              closePrompt(id);
              resolve(undefined);
            },
            reject: (id: Symbol) => {
              closePrompt(id);
              reject();
            },
          },
        ]);
      });
    },
    [closePrompt],
  );
  const confirm = React.useCallback(async (message?: string) => {
    return new Promise<any>((resolve, reject) => {
      setActivePrompts((prev) => [
        ...prev,
        {
          type: "confirm",
          id: Symbol("alert"),
          message,
          resolve: (id: Symbol) => {
            closePrompt(id);
            resolve(id);
          },
          reject: (id: Symbol) => {
            closePrompt(id);
            reject();
          },
        },
      ]);
    });
  }, []);
  const prompt = React.useCallback(async (message?: string, defaultValue?: string): Promise<string | null> => {
    return new Promise<string | null>((resolve, reject) => {
      setActivePrompts((prev) => [
        ...prev,
        {
          type: "prompt",
          id: Symbol("alert"),
          defaultValue,
          message,
          resolve: (id: Symbol, value: string) => {
            closePrompt(id);
            resolve(value);
          },
          reject: (id: Symbol) => {
            closePrompt(id);
            reject();
          },
        },
      ]);
    });
  }, []);
  const ProvidedOutlet = React.Fragment;
  const Outlet = () => {
    return (
      <ProvidedOutlet>
        {activePrompts.map(({ id, type, title, message, defaultValue, resolve, reject }, i) => {
          switch (type) {
            case "alert": {
              return (
                <Alert
                  open={true}
                  key={i}
                  mark="alert"
                  title={title}
                  description={message}
                  onSelect={(e) => resolve(id)}
                  onClose={() => resolve(id)}
                  actions={[{ key: "confirm", value: "ok", variant: "primary" }]}
                ></Alert>
              );
            }
            case "confirm": {
              return (
                <Alert
                  open={true}
                  key={i}
                  mark="alert"
                  title={title}
                  description={message}
                  onSelect={(e) => {
                    if (e === "confirm") {
                      resolve(id);
                    } else {
                      reject(id);
                    }
                  }}
                  onClose={() => reject(id)}
                  actions={[
                    { key: "confirm", value: "ok", variant: "primary" },
                    { key: "dismiss", value: "Cancel" },
                  ]}
                ></Alert>
              );
            }
            case "prompt": {
              return (
                <Prompt
                  open={true}
                  key={i}
                  message={message ?? ""}
                  onSelect={(value) => {
                    resolve(id, value);
                  }}
                  defaultValue={defaultValue}
                  onClose={() => reject(id)}
                  onCancel={() => reject(id)}
                ></Prompt>
              );
            }
          }
          return <></>;
        })}
      </ProvidedOutlet>
    );
  };
  return {
    confirm,
    alert,
    prompt,
    Outlet,
  };
};
