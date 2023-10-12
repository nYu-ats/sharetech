import { FC } from "react";
import { PullDownProps } from "./PullDown.type";
import styles from "./PullDown.module.css";

const PullDown: FC<PullDownProps> = (props) => {
  return (
    <select
      className={[styles.selectBox].join(" ")}
      value={props.selectedValue}
      onChange={props.onChange}
    >
      {props.values.map((value) => (
        <option value={value}>{value}</option>
      ))}
    </select>
  );
};

export default PullDown;
