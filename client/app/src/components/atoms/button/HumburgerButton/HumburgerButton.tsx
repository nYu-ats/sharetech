import { FC } from "react";
import { HumbergerButtonProps } from "./HumburgerButton.type";
import styles from "./HumburgerButton.module.css";

const HumbergerButton: FC<HumbergerButtonProps> = ({
  type = "button",
  isOpen = false,
  ...props
}) => {
  return (
    <div className={[styles.btn].join(" ")} onClick={props.onClick}>
      <span className={[styles.humburger].join(" ")} />
    </div>
  );
};

export default HumbergerButton;
