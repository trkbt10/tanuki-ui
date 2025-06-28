import * as React from "react";

function useComputedStyle() {
  const data = React.useMemo(() => {
    const computed = getComputedStyle(document.documentElement, "");
    return computed;
  }, []);
  return data;
}

export const Variables = () => {
  const cs = useComputedStyle();
  return (
    <div>
      <h1>Variables</h1>
      <dl>
        {Array.from(cs).map((key) => {
          const value = cs.getPropertyValue(key);
          return (
            <React.Fragment key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </React.Fragment>
          );
        })}
      </dl>
    </div>
  );
};