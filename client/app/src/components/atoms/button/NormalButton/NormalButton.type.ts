import { BaseButtonProps } from "../BaseButton.type";

export type NormalButtonProps = BaseButtonProps & {
  size?: "LARGE" | "NORMAL" | "SMALL";
  outline?: boolean;
};
