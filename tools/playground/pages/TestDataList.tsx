import React from "react";
import { DataList } from "../../src";

const list = Array(100)
  .fill(0)
  .map((_, i) => {
    return { name: `item${i}`, value: i };
  });
const LazyDataList = React.lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    default: () => (
      <>
        {list.map((item, i) => {
          return (
            <option key={i} value={item.value}>
              {item.name}
            </option>
          );
        })}
      </>
    ),
  };
});
export const TestDataList = () => {
  const onChange = () => {
    console.log("change");
  };

  return (
    <>
      <DataList defaultValue="1" list="testList" onChange={onChange}></DataList>
      <datalist id="testList">
        <LazyDataList></LazyDataList>
      </datalist>
    </>
  );
};
