import React from "react";

export type BaseButtonProps = {
  type?: "button" | "submit" | "reset";
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
