import { FC } from "react";
import { IconProps } from "../../Icon.type";
import { styling } from "../../Icon.function";

export const CloseIcon: FC<IconProps> = ({ color = "SITECOLOR", size = "SMALL" }) => {
  const style = styling("FILL", { color: color, size: size });

  return (
    <svg
      className={style.join(" ")}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
    </svg>
  );
};
