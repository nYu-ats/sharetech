import { FC } from "react";
import { NormalTextInputProps } from "./NormalTextInput.type";
import styles from "./NormalTextInput.module.css";

const NormalTextInput: FC<NormalTextInputProps> = ({
  required = false,
  border = true,
  ...props
}) => {
  let style = [styles.textInput];
  if (!border) {
    style.push(styles.noneBorder);
  }

  return (
    <input
      className={style.join(" ")}
      type="text"
      required={required}
      value={props.value}
      defaultValue={props.defaultValue}
      onChange={props.onChnage}
      {...props}
    />
  );
};

export default NormalTextInput;
