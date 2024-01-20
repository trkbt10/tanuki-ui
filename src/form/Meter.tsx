import React, { forwardRef, MeterHTMLAttributes, memo } from "react";
import style from "./form.module.css";

export const Meter = memo(
  forwardRef<HTMLMeterElement, MeterHTMLAttributes<HTMLMeterElement>>((props, ref) => {
    return <meter className={style.meter} {...props} ref={ref} />;
  }),
);
Meter.displayName = "Meter";
