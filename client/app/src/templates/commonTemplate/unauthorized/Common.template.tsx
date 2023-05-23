import Header from "components/organisms/header/Header/Header";
import { FC } from "react";
import { CommonTemplateProps } from "./Common.type";
import styles from "./Common.module.css";
import { Toaster } from "react-hot-toast";

const CommonTemplate: FC<CommonTemplateProps> = ({ hasFooter = true, ...props }) => {
  return (
    <>
      <Header />
      <Toaster />
      <div className={[styles.main].join(" ")}>{props.children}</div>
    </>
  );
};

export default CommonTemplate;
