import { FC } from "react";
import { IconProps } from "../../Icon.type";
import { styling } from "../../Icon.function";

export const HomeIcon: FC<IconProps> = ({ color = "SITECOLOR", size = "SMALL" }) => {
  const style = styling("FILL", { color: color, size: size });

  return (
    <svg
      className={style.join(" ")}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-4 -4 24 24"
    >
      <path
        transform="translate(-1130.281 -23.755)"
        d="M1146.215,31.455l-7.691-7.606a.327.327,0,0,0-.458,0l-7.69,7.606a.317.317,0,0,0,.229.542h1.833v7.434a.284.284,0,0,0,.284.284h3.663a.284.284,0,0,0,.284-.284V34.1h3.253v5.33a.284.284,0,0,0,.284.284h3.662a.284.284,0,0,0,.284-.284V32h1.834a.317.317,0,0,0,.229-.542"
      />
    </svg>
  );
};
