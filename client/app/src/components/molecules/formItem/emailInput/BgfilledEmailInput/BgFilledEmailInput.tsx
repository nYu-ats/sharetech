import { forwardRef } from "react";
import { BgFilledEmailInputProps } from "./BgFilledEmailInput.type";
import styles from "./BgFilledEmailInput.module.css";
import NormalTextInput from "components/atoms/textInput/NormalTextInput/NormalTextInput";
import { emailMax } from "shared/constants/inputOptions";

const BgFilledEmailInput = forwardRef<HTMLInputElement, BgFilledEmailInputProps>(
  (props, ref) => {
    return (
      <div className={[styles.input].join(" ")}>
        <NormalTextInput
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
  }
);

export default BgFilledEmailInput;
