import { FC } from "react";
import { IconProps } from "../../Icon.type";
import { styling } from "../../Icon.function";

export const ArrowLeftIcon: FC<IconProps> = ({
  color = "SITECOLOR",
  size = "SMALL",
}) => {
  const style = styling("FILL", { color: color, size: size });

  return (
    <svg
      className={style.join(" ")}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
    </svg>
  );
};
