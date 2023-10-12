import React, { FC } from "react";
import { useRouter } from "next/router";
import { HeaderProps } from "./Header.type";
import styles from "./Header.module.css";
import CircleButton from "components/atoms/button/CircleButton/CircleButton";
import { getIcon } from "assets/icons/Icon.function";

const Header: FC<HeaderProps> = (props) => {
  const router = useRouter();

  return (
    <div className={[styles.header].join(" ")}>
      <div className={[styles.left].join(" ")}></div>
      <div className={[styles.right].join(" ")}>
        <div className={[styles.icons].join(" ")}>
          <div className={[styles.icon, styles.verticalCenterize].join(" ")}>
            <CircleButton
              children={getIcon("HOME", { size: "SMALL" })}
              size="SMALL"
              outline={true}
            />
          </div>
          <div className={[styles.icon, styles.verticalCenterize].join(" ")}>
            <CircleButton
              children={getIcon("HELP", { size: "SMALL" })}
              size="SMALL"
              outline={true}
            />
          </div>
          <div className={[styles.icon, styles.verticalCenterize].join(" ")}>
            <CircleButton
              children={getIcon("ACCOUNT", { size: "SMALL" })}
              size="SMALL"
              outline={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
