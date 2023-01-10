import React, { ReactNode } from "react";

export type BaseButtonProps = {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
