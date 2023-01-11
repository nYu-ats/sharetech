import { FC } from "react";
import Image from "next/image";
import { NormalImageProps } from "./NormalImage.type";
import styles from "./NormalImage.module.css";

const NormaImage: FC<NormalImageProps> = ({ ...props }) => {
  let style = [props.width, styles.wrapper];

  return (
    <div
      className={style.join(" ")}
      style={{ width: props.width, height: props.height }}
    >
      <Image className={[styles.img].join(" ")} src={props.src} fill alt={props.alt} />
    </div>
  );
};

export default NormaImage;
