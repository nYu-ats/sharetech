import React, { ReactNode } from "react";

export type BaseButtonProps = {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
