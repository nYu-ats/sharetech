import { FC } from "react";
import { IconProps } from "../../Icon.type";
import { styling } from "../../Icon.function";

export const HelpIcon: FC<IconProps> = ({ color = "SITECOLOR", size = "SMALL" }) => {
  const style = styling("FILL", { color: color, size: size });

  return (
    <svg
      className={style.join(" ")}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-6 -4 24 24"
    >
      <path
        transform="translate(-1176.49 -23.433)"
        d="M1176.905,28.827a.42.42,0,0,1-.414-.458,5.259,5.259,0,0,1,2.043-3.813,5.8,5.8,0,0,1,4.271-1.068,5.016,5.016,0,0,1,3.813,2.135,4.24,4.24,0,0,1,.686,3.661,4.761,4.761,0,0,1-2.135,2.745l-1.068.763a1.5,1.5,0,0,0-.763,1.22v1.111a.414.414,0,0,1-.414.415h-1.993a.414.414,0,0,1-.414-.415v-.806a3.229,3.229,0,0,1,1.372-2.9l1.907-1.373a2.158,2.158,0,0,0,.839-1.3,2.133,2.133,0,0,0-.229-1.677,2.564,2.564,0,0,0-2.9-1.144,3.017,3.017,0,0,0-2.377,2.559.421.421,0,0,1-.407.339Zm5.137,11.21a1.742,1.742,0,0,1-1.373-.61,1.611,1.611,0,0,1-.381-1.068,1.93,1.93,0,0,1,.381-1.144,1.452,1.452,0,0,1,1.22-.61,1.539,1.539,0,0,1,1.3.458,1.682,1.682,0,0,1,.534,1.22,1.545,1.545,0,0,1-.382,1.22,1.617,1.617,0,0,1-1.3.534"
      />
    </svg>
  );
};
