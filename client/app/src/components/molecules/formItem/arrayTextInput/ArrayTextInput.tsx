import { getIcon } from "assets/icons/Icon.function";
import NormalButton from "components/atoms/button/NormalButton/NormalButton";
import NormalTextInput from "components/atoms/textInput/NormalTextInput/NormalTextInput";
import { generateRandomString } from "features/utilities/stringUtil";
import { forwardRef } from "react";
import { ArrayTextInputProps } from "./ArrayTextInput.type";
import styles from "./ArrayTextInput.module.css";

const ArrayTextInput = forwardRef<HTMLInputElement, ArrayTextInputProps>(
  (props, ref) => {
    return (
      <div className={[styles.arrayTextInput].join(" ")}>
        {props.fields.map((field, index) => {
          return (
            <div className={[styles.inputField].join(" ")}>
              <NormalTextInput
                id={`text-${generateRandomString()}-${String(index)}`}
                placeholder={props.placeHolder ?? ""}
                border={false}
                maxLength={props.maxChar}
                type="text"
                ref={ref}
                {...props}
              />
              <NormalButton
                size="SMALL"
                children={getIcon("ACCOUNT", {
                  size: "EXTRASMALL",
                  color: "LIGHTGRAY",
                })}
                outline={true}
              />
            </div>
          );
        })}
        <div>
          <NormalButton
            size="SMALL"
            children={getIcon("PLUS", { size: "EXTRASMALL", color: "LIGHTGRAY" })}
            outline={true}
          />
        </div>
      </div>
    );
  }
);

export default ArrayTextInput;
