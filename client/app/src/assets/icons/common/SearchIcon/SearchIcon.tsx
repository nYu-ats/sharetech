import { FC } from "react";
import { IconProps } from "../../Icon.type";
import { styling } from "../../Icon.function";

export const SearchIcon: FC<IconProps> = ({ color = "SITECOLOR", size = "SMALL" }) => {
  const style = styling("FILL", { color: color, size: size });

  return (
    <svg
      className={style.join(" ")}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-4 -4 24 24"
    >
      <g transform="translate(-262.495 -27.245)">
        <path d="M272.922,36.291l4.9,4.97-1.243,1.314-4.976-5.034.439-.81Z" />
        <path d="M268.233,27.245a5.738,5.738,0,1,0,5.738,5.737,5.738,5.738,0,0,0-5.738-5.737m0,10.467a4.73,4.73,0,1,1,4.73-4.73,4.73,4.73,0,0,1-4.73,4.73" />
      </g>
    </svg>
  );
};
