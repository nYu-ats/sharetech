import { FC } from "react";
import { LoginPageTemplateProps } from "./LoginPage.type";
import CommonTemplate from "templates/commonTemplate/unauthorized/Common.template";
import styles from "./LoginPage.module.css";

const LoginPageTemplate: FC<LoginPageTemplateProps> = (props) => {
  return (
    <CommonTemplate hasFooter={false}>
      <div className={[styles.wrapper].join(" ")}>
        <div className={[styles.centerize].join(" ")}>{props.loginForm}</div>
      </div>
    </CommonTemplate>
  );
};

export default LoginPageTemplate;
