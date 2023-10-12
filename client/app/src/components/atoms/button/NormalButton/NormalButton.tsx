import { FC } from "react";
import { NormalButtonProps } from "./NormalButton.type";
import styles from "./NormalButton.module.css";
import { Oval } from "react-loader-spinner";

const NormalButton: FC<NormalButtonProps> = ({
  type = "button",
  outline = false,
  ...props
}) => {
  const disabled = props.disabled || props.isLoading;
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

  if (disabled) {
    style.push(styles.disabled);
  }

  return (
    <button type={type} className={style.join(" ")} disabled={disabled} {...props}>
      {props.isLoading ? (
        <Oval height={24} width={24} color="#ffffff" />
      ) : (
        props.children
      )}
    </button>
  );
};

export default NormalButton;
