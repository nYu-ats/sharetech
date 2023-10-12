import { forwardRef } from "react";
import { NormalTextInputProps } from "./NormalTextInput.type";
import styles from "./NormalTextInput.module.css";

const NormalTextInput = forwardRef<HTMLInputElement, NormalTextInputProps>(
  ({ id, required = false, border = true, type = "text", ...props }, ref) => {
    let style = [styles.textInput];
    if (!border) {
      style.push(styles.noneBorder);
    }

    return (
      <input
        id={id}
        name={id}
        className={style.join(" ")}
        type={type}
        required={required}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChnage}
        ref={ref}
        {...props}
      />
    );
  }
);

export default NormalTextInput;
