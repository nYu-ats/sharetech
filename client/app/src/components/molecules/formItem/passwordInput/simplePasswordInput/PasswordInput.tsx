import { forwardRef } from "react";
import { PasswordInputProps } from "./PasswordInput.type";
import styles from "./PasswordInput.module.css";
import NormalTextInput from "components/atoms/textInput/NormalTextInput/NormalTextInput";
import { passwordMax } from "shared/constants/inputOptions";

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ hasLabel = true, ...props }, ref) => {
    return (
      <div className={[styles.input].join(" ")}>
        {hasLabel ? <label htmlFor="your-password">Password</label> : null}
        <NormalTextInput
          id="your-password"
          placeholder="Your password"
          border={false}
          maxLength={passwordMax}
          type="password"
          onChnage={props.onChange}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default PasswordInput;
