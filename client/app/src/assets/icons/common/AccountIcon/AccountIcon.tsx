import { FC } from "react";
import { IconProps } from "../../Icon.type";
import { styling } from "../../Icon.function";

export const AccountIcon: FC<IconProps> = ({ color = "SITECOLOR", size = "SMALL" }) => {
  const style = styling("FILL", { color: color, size: size });

  return (
    <svg
      className={style.join(" ")}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-6 -4 24 24"
    >
      <g transform="translate(-1220.193 -23.875)">
        <path d="M1232.007,39.6V36.618a4.105,4.105,0,0,0-4.093-4.093h-3.628a4.105,4.105,0,0,0-4.093,4.093V39.6Z" />
        <path d="M1226.147,23.875a3.721,3.721,0,1,1-3.721,3.721,3.721,3.721,0,0,1,3.721-3.721" />
      </g>
    </svg>
  );
};
