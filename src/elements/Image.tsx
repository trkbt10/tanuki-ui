import React, { forwardRef } from "react";
import style from "./elements.module.css";

export const Image = forwardRef<HTMLImageElement, React.JSX.IntrinsicElements["img"]>((props, ref) => {
  return (
    <img className={style.image} {...props} ref={ref}>
      {props.children}
    </img>
  );
});
Image.displayName = "Image";
export const Img = Image;
