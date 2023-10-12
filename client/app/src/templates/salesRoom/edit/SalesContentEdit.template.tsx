import { FC } from "react";
import { SalesContentEditTemplateProps } from "./SalesContentEdit.type";
import CommonTemplate from "templates/commonTemplate/authorized/Common.template";
import styles from "./SalesContentEdit.module.css";

const SalesContentEditTemplate: FC<SalesContentEditTemplateProps> = (props) => {
  return (
    <CommonTemplate hasFooter={false}>
      <form className={[styles.wrapper].join(" ")} onSubmit={props.onSubmit}>
        <div className={[styles.head].join(" ")}>
          <div className={[styles.actionPanel].join(" ")}>{props.actionPanel}</div>
        </div>
        <div className={[styles.contentMetaForm].join(" ")}>
          {props.contentMetaForm}
        </div>
        <div className={[styles.contentForm].join(" ")}>{props.contentForm}</div>
      </form>
    </CommonTemplate>
  );
};

export default SalesContentEditTemplate;
