import { FC } from "react";
import { NormalLinkProps } from "./NormalLink.type";
import styles from "./NormalLink.module.css";

const NormalLink: FC<NormalLinkProps> = ({ anchor = "#", ...props }) => {
  let style = [styles.link];

  return (
    <a href={anchor} className={style.join(" ")} {...props}>
      {props.children}
    </a>
  );
};

export default NormalLink;
