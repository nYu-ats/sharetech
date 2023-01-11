import { FC } from "react";
import { IconProps } from "../../Icon.type";
import { styling } from "../../Icon.function";

export const PlusIcon: FC<IconProps> = ({ color = "SITECOLOR", size = "SMALL" }) => {
  const style = styling("FILL", { color: color, size: size });

  return (
    <svg
      className={style.join(" ")}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-4 -4 24 24"
    >
      <path
        transform="translate(-437.114 -160.963)"
        d="M446.708,170.557v7.183H444.3v-7.183h-7.184v-2.41H444.3v-7.184h2.41v7.184h7.184v2.41Z"
      />
    </svg>
  );
};
