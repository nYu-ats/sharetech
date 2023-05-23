import { FC, ReactNode } from "react";
import { NormalTabProps } from "./NormalTab.type";
import styles from "./NormalTab.module.css";
import { ContentsLoadFailed, ContentsPreparing } from "shared/constants/messages";

const NormalTab: FC<NormalTabProps> = (props) => {
  let content = (
    <div className={[styles.contentsloadFailed, styles.tabContent].join(" ")}>
      {ContentsLoadFailed}
    </div>
  ) as ReactNode;

  const tabNameElements = props.tabs.map((item, index) => {
    let tabNameStyle = "";
    if (index === props.active) {
      tabNameStyle = [styles.tabName, styles.tabNameActive].join(" ");
      content =
        item.content !== undefined ? (
          item.content
        ) : (
          <div
            key={index.toString()}
            className={[styles.contentsloadFailed, styles.tabContent].join(" ")}
          >
            {ContentsPreparing}
          </div>
        );
    } else {
      tabNameStyle = [styles.tabName].join(" ");
    }
    return (
      <div
        key={index.toString()}
        className={tabNameStyle}
        onClick={(e) => props.switchTab(index)}
      >
        <p>{item.tabName}</p>
      </div>
    );
  });

  return (
    <div className={[styles.tab].join(" ")}>
      <div className={[styles.tabNames].join(" ")}>{tabNameElements}</div>
      <div className={[styles.tabContent].join(" ")}>{content}</div>
    </div>
  );
};

export default NormalTab;
