import { FC } from "react";
import { SalesContentViewTemplateProps } from "./SalesContentView.type";
import CommonTemplate from "templates/commonTemplate/authorized/Common.template";
import styles from "./SalesContentView.module.css";

const SalesContentViewTemplate: FC<SalesContentViewTemplateProps> = (props) => {
  return (
    <CommonTemplate hasFooter={false}>
      <div className={[styles.wrapper].join(" ")}>
        <div className={[styles.head].join(" ")}>
          <div className={[styles.actionPanel].join(" ")}>{props.actionPanel}</div>
        </div>
        <div className={[styles.title].join(" ")}>{props.title}</div>
        <div className={[styles.tags].join(" ")}>{props.tags}</div>
        <div className={[styles.content].join(" ")}>{props.content}</div>
      </div>
    </CommonTemplate>
  );
};

export default SalesContentViewTemplate;
