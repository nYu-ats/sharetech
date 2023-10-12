import { forwardRef } from "react";
import { SelectInputProps } from "./SelectInput.type";
import styles from "./SelectInput.module.css";

const SelectInput = forwardRef<HTMLInputElement, SelectInputProps>(
  ({ defaultChecked = false, ...props }, ref) => {
    return (
      <div className={[styles.input].join(" ")}>
        <div className={[styles.verticalCenter].join(" ")}>
          <input
            className={[].join(" ")}
            type="checkbox"
            defaultChecked={defaultChecked}
            onChange={props.onChnage}
            ref={ref}
            {...props}
          />
        </div>
        <div className={[styles.verticalCenter].join(" ")}>
          <label className={[styles.label].join(" ")} htmlFor={props.id}>
            {props.label}
          </label>
        </div>
      </div>
    );
  }
);

export default SelectInput;
