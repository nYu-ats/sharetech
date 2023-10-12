import { forwardRef } from "react";
import { TextAreaInputProps } from "./TextAreaInput.type";
import styles from "./TextAreaInput.module.css";

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  ({ id, required = false, border = true, ...props }, ref) => {
    let style = [styles.textAreaInput];
    if (!border) {
      style.push(styles.noneBorder);
    }

    return (
      <textarea
        id={id}
        name={id}
        className={style.join(" ")}
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

export default TextAreaInput;
