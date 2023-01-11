import { BaseButtonProps } from "../BaseButton.type";

export type CircleButtonProps = BaseButtonProps & {
  size?: "LARGE" | "NORMAL" | "SMALL";
  outline?: boolean;
};
