import Header from "components/organisms/header/Header/Header";
import { FC } from "react";
import { CommonTemplateProps } from "./Common.type";
import styles from "./Common.module.css";
import { Toaster } from "react-hot-toast";
import SideBar from "components/organisms/sideBar/SideBar";

const CommonTemplate: FC<CommonTemplateProps> = ({ hasFooter = true, ...props }) => {
  return (
    <>
      <Toaster />
      <div className={[styles.wrapper].join(" ")}>
        <div className={[styles.sideBar].join(" ")}>
          <SideBar />
        </div>
        <div className={[styles.main].join(" ")}>
          <Header />
          <div className={[styles.contents].join(" ")}>{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default CommonTemplate;
