import { FC } from "react";
import { IconProps } from "../../Icon.type";
import { styling } from "../../Icon.function";

export const ResearchIcon: FC<IconProps> = ({
  color = "SITECOLOR",
  size = "SMALL",
}) => {
  const style = styling("STROKE", { color: color, size: size });

  return (
    <svg
      className={style.join(" ")}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40.81 40.736"
    >
      <g transform="translate(-248.125 -725.393)">
        <path
          d="M283.466,742.347a11.426,11.426,0,1,1-11.427-11.426A11.427,11.427,0,0,1,283.466,742.347Z"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.417"
        />
        <path
          d="M265.694,739.617a6.907,6.907,0,0,1,6.345-4.175"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.417"
        />
        <path
          d="M288.227,742.29A16.187,16.187,0,1,1,272.039,726.1,16.188,16.188,0,0,1,288.227,742.29Z"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.417"
        />
        <path
          d="M263.3,755.919l-7.924,8.281a3.77,3.77,0,1,1-5.3-5.339l8.228-8"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.417"
        />
        <line
          x2="5.06"
          y2="5.169"
          transform="translate(255.852 753.247)"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.417"
        />
      </g>
    </svg>
  );
};
