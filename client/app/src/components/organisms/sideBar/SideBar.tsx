import React, { FC } from "react";
import { useRouter } from "next/router";
import { SideBarProps } from "./SideBar.type";
import styles from "./SideBar.module.css";
import NormaImage from "components/atoms/image/NormalImage/NormalImage";
import SiteLogo from "../../../assets/images/siteLogo.png";
import { getIcon } from "assets/icons/Icon.function";
import NormalLink from "components/atoms/link/NormalLink/NormalLink";
import { Pages } from "shared/constants/pages";

const SideBar: FC<SideBarProps> = (props) => {
  const router = useRouter();

  return (
    <div className={[styles.sideBar].join(" ")}>
      <div className={[styles.fixTop].join(" ")}>
        <div className={[styles.top].join(" ")}>
          <div className={[styles.siteLogo, styles.verticalCenterize].join(" ")}>
            <NormaImage src={SiteLogo} alt="Share Tech" width={160} height={56} />
          </div>
        </div>
        <div className={[styles.bottom, styles.verticalCenterize].join(" ")}>
          <NormalLink anchor={Pages.salesRoom.top()}>
            <div className={[styles.link].join(" ")}>
              {getIcon("HOME", { size: "SMALL", color: "WHITE" })}{" "}
              <p className={[styles.linkText].join(" ")}>セールスルーム</p>
            </div>
          </NormalLink>
          <NormalLink anchor="#">
            <div className={[styles.link].join(" ")}>
              {getIcon("RESEARCH", { size: "SMALL", color: "WHITE" })}
              <p className={[styles.linkText].join(" ")}>分析</p>
            </div>
          </NormalLink>
          <NormalLink anchor="#">
            <div className={[styles.link].join(" ")}>
              {getIcon("GEAR", { size: "SMALL", color: "WHITE" })}
              <p className={[styles.linkText].join(" ")}>設定</p>
            </div>
          </NormalLink>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
