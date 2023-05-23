import { FC } from "react";
import { MyPageTemplateProps } from "./MyPage.type";
import CommonTemplate from "templates/commonTemplate/unauthorized/Common.template";
import styles from "./MyPage.module.css";

const MyPageTemplate: FC<MyPageTemplateProps> = (props) => {
  return (
    <CommonTemplate hasFooter={false}>
      <div className={[styles.wrapper].join(" ")}>{props.myPageTab}</div>
    </CommonTemplate>
  );
};

export default MyPageTemplate;
