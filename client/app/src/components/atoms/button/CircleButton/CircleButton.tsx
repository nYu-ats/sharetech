import { FC } from "react";
import { CircleButtonProps } from "./CircleButton.type";
import styles from "./CircleButton.module.css";

const CircleButton: FC<CircleButtonProps> = ({
  type = "button",
  outline = false,
  ...props
}) => {
  let style = [styles.btn];
  if (outline) {
    style.push(styles.outline);
  }
  switch (props.size) {
    case "LARGE":
      style.push(styles.large);
      break;
    case "SMALL":
      style.push(styles.small);
      break;
    default:
      break;
  }

  if (props.disabled) {
    style.push(styles.disabled);
  }

  return (
    <button type={type} className={style.join(" ")} {...props}>
      {props.children}
    </button>
  );
};

export default CircleButton;
