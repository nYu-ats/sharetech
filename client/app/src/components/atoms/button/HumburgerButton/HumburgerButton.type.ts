import React from "react";
import { BaseButtonProps } from "../BaseButton.type";

export type HumbergerButtonProps = BaseButtonProps & {
  isOpen: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};
