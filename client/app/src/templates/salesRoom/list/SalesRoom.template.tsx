import { FC } from "react";
import { SalesRoomTemplateProps } from "./SalesRoom.type";
import CommonTemplate from "templates/commonTemplate/authorized/Common.template";
import styles from "./SalesRoom.module.css";

const SalesRoomTemplate: FC<SalesRoomTemplateProps> = (props) => {
  return (
    <CommonTemplate hasFooter={false}>
      <div className={[styles.wrapper].join(" ")}>
        <div className={[styles.head].join(" ")}>
          <div className={[styles.actionPanel].join(" ")}>{props.actionPanel}</div>
        </div>
        <div className={[styles.content].join(" ")}>{props.content}</div>
      </div>
    </CommonTemplate>
  );
};

export default SalesRoomTemplate;
