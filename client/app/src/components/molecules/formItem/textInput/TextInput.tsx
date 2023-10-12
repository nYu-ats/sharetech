import { forwardRef } from "react";
import { TextInputProps } from "./TextInput.type";
import styles from "./TextInput.module.css";
import NormalTextInput from "components/atoms/textInput/NormalTextInput/NormalTextInput";
import { passwordMax } from "shared/constants/inputOptions";
import { generateRandomString } from "features/utilities/stringUtil";

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const elementId = "text-" + generateRandomString();

  return (
    <div className={[styles.input].join(" ")}>
      {<label htmlFor={elementId}>{props.label}</label> ? props.label : null}
      <NormalTextInput
        id={elementId}
        placeholder={props.placeHolder ?? ""}
        border={false}
        maxLength={passwordMax}
        type="text"
        onChnage={props.onChange}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default TextInput;
