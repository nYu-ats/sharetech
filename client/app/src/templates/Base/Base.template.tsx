import Header from "components/organisms/header/Header/Header";
import { FC } from "react";
import { BaseTemplateProps } from "./Base.type";
import styles from "./Base.module.css";
import { Toaster } from "react-hot-toast";

const BaseTemplate: FC<BaseTemplateProps> = ({ hasFooter = true, ...props }) => {
  return (
    <>
      <Header />
      <Toaster />
      <div className={[styles.main].join(" ")}>{props.children}</div>
    </>
  );
};

export default BaseTemplate;
