import { FC } from "react";
import { NormalTextProps } from "./NormalText.type";
import styles from "./NormalText.module.css";

const NormalText: FC<NormalTextProps> = ({ outline = true, ...props }) => {
  let style = [styles.wrapper];
  if (outline) {
    style.push(styles.outline);
  }

  const paragraphs = props.text.split("\n").map((paragraph) => {
    return <p className={[styles.paragraph].join(" ")}>{paragraph}</p>;
  });
  return <div className={style.join(" ")}>{paragraphs}</div>;
};

export default NormalText;
