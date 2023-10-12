import { FC } from "react";
import { LoginTemplateProps } from "./Login.type";
import CommonTemplate from "templates/commonTemplate/unauthorized/Common.template";
import styles from "./Login.module.css";

const LoginTemplate: FC<LoginTemplateProps> = (props) => {
  return (
    <CommonTemplate hasFooter={false}>
      <div className={[styles.wrapper].join(" ")}>
        <div className={[styles.centerize].join(" ")}>{props.loginForm}</div>
      </div>
    </CommonTemplate>
  );
};

export default LoginTemplate;
