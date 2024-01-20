import React, { ComponentProps } from "react";
import { Time } from "./Time";
export default {
  title: "blocks/Time",
  component: <></>,
};

export const Basic = () => {
  return <Time timestamp={"2021-01-01T00:00:00Z"}></Time>;
};

export const All = () => {
  return (
    <>
      <h4>String</h4>
      <Time timestamp={"2021-01-01T00:00:00Z"}></Time>
      <h4>Numeric</h4>
      <Time timestamp={new Date("2021-01-01T00:00:00Z").valueOf()}></Time>
      <h4>Date</h4>
      <Time timestamp={new Date("2021-01-01T00:00:00Z")}></Time>
      <h4>ULID</h4>
      <Time timestamp={"01g2nx7aw2as0cq8j43b3bv778"} type="ulid"></Time>
      <h4>UnixTime</h4>
      <Time timestamp={Date.now() / 1000} type="unix"></Time>
      <h4>ISO8601</h4>
      <Time timestamp={"2021-01-01T00:00:00Z"} type="ISO8601"></Time>
      <h4>Invalid date</h4>
      <Time timestamp={"aaa"}></Time>
    </>
  );
};
