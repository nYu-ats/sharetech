import NormalButton from "components/atoms/button/NormalButton/NormalButton";
import { FC } from "react";
import { SalesRoomActionPanelProps } from "./SalesRoomActionPanel.type";
import styles from "./SalesRoomActionPanel.module.css";

const SalesRoomActionPanel: FC<SalesRoomActionPanelProps> = (props) => {
  return (
    <div className={[styles.actionPanel].join(" ")}>
      <div></div>
      <div className={[styles.btn].join(" ")}>
        <NormalButton
          children={<p className={[styles.btnText].join(" ")}>＋ 新規作成</p>}
          size="SMALL"
          onClick={props.onCreateClick}
        />
      </div>
    </div>
  );
};

export default SalesRoomActionPanel;
