import React, { forwardRef, HTMLAttributes, memo } from "react";
import style from "./Time.module.css";
import { Text } from "./Text";
const isValid = (date: Date | string | number | undefined | null): date is Date => {
  if (date === null || date === undefined) {
    return false;
  }
  if (typeof date === "number") {
    return true;
  }
  if (typeof date === "string") {
    return !isNaN(Date.parse(date));
  }
  return date instanceof Date && !isNaN(date.getTime());
};
export const Time = memo(
  forwardRef<
    HTMLTimeElement,
    HTMLAttributes<HTMLTimeElement> & {
      type?: "unix" | "unixtime" | "ISO8601" | "ulid" | string;
      timestamp: Date | number | string | undefined;
      format?: string;
    }
  >((props, ref) => {
    const normalizedDate = React.useMemo(() => {
      if (props.type === "ulid") {
        if (typeof props.timestamp !== "string") {
          return;
        }
        return dateFromUlid(props.timestamp);
      }
      if (!props.timestamp) {
        return;
      }
      if (props.type === "unix" || props.type === "unixtime") {
        const timestamp = typeof props.timestamp === "number" ? props.timestamp : +props.timestamp;
        return new Date(timestamp * 1000);
      }
      const validDate = isValid(props.timestamp);
      if (validDate && props.timestamp instanceof Date) {
        return props.timestamp;
      }
      return new Date(props.timestamp);
    }, [props.timestamp, props.type]);

    const formatedDate = React.useMemo(() => {
      if (!isValid(normalizedDate)) {
        return;
      }
      if (normalizedDate instanceof Date) {
        if (!props.format) {
          return normalizedDate.toLocaleString();
        }
        const templates: {
          [key: string]: number;
        } = {
          y: normalizedDate.getFullYear(),
          M: normalizedDate.getMonth() + 1,
          d: normalizedDate.getDate(),
          H: normalizedDate.getHours(),
          m: normalizedDate.getMinutes(),
          s: normalizedDate.getSeconds(),
        };
        return props.format.replace(/yyyy|MM|dd|HH|mm|ss|yy/g, (match) => {
          const padSize = match.length;
          const first = match.charAt(0);

          const value = templates[first as keyof typeof templates];
          if (typeof value === "undefined") {
            return match;
          }
          return value.toString().padStart(padSize, "0");
        });
      }
      return;
    }, [normalizedDate, props.format]);
    return (
      <time className={style.time} {...props} ref={ref}>
        <Text>{formatedDate}</Text>
      </time>
    );
  }),
);
Time.displayName = "Time";

const alphabet = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

// Reference https://github.com/ulid/spec
const dateFromUlid = (ulid: string) => {
  let timestamp = 0;
  const decodedTimestamp = ulid.substring(0, 10).toUpperCase();

  for (let i = 0; i < decodedTimestamp.length; i++) {
    const char = decodedTimestamp.charAt(i);
    const multiplier = alphabet.indexOf(char);
    const exponent = 9 - i;

    timestamp += Math.pow(32, exponent) * multiplier;
  }

  return new Date(timestamp);
};
