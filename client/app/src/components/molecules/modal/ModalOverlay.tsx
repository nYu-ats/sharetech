import { FC } from "react";
import { ModalOverlayProps } from "./ModalOverlay.type";
import styles from "./ModalOverlay.module.css";

const ModalOverlay: FC<ModalOverlayProps> = (props) => {
  return (
    <div className={[styles.overlay].join(" ")}>
      <div className={[styles.bg].join(" ")}></div>
      <div className={[styles.content].join(" ")}>{props.children}</div>
    </div>
  );
};

export default ModalOverlay;
