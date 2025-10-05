import * as React from "react";
import { Button, type ButtonProps } from "../../elements/Button";

export interface InspectorButtonProps extends Omit<ButtonProps, "size"> {
  size?: "small" | "medium";
}

export const InspectorButton: React.FC<InspectorButtonProps> = ({ size = "small", variant = "secondary", ...rest }) => {
  return <Button size={size} variant={variant} {...rest} />;
};

InspectorButton.displayName = "InspectorButton";
