import { forwardRef } from "react";
import { EmailInputProps } from "./EmailInput.type";
import styles from "./EmailInput.module.css";
import NormalTextInput from "components/atoms/textInput/NormalTextInput/NormalTextInput";
import { emailMax } from "shared/constants/inputOptions";

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>((props, ref) => {
  return (
    <div className={[styles.input].join(" ")}>
      <label htmlFor="your-email">Email</label>
      <NormalTextInput
        id="your-email"
        placeholder="Your email address"
        border={false}
        maxLength={emailMax}
        type="email"
        onChnage={props.onChange}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default EmailInput;
