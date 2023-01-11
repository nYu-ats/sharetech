import { FC } from "react";
import { MyPageTemplateProps } from "./MyPage.type";
import BaseTemplate from "templates/Base/Base.template";
import styles from "./MyPage.module.css";

const MyPageTemplate: FC<MyPageTemplateProps> = (props) => {
  return (
    <BaseTemplate hasFooter={false}>
      <div className={[styles.wrapper].join(" ")}>{props.myPageTab}</div>
    </BaseTemplate>
  );
};

export default MyPageTemplate;
