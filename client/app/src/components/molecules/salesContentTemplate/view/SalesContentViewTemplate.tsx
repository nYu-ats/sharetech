import { FC } from "react";
import styles from "./SalesContentViewTemplate.module.css";
import { SalesContentViewTemplateProps } from "./SalesContentViewTemplate.type";

const SalesContentsView: FC<SalesContentViewTemplateProps> = (props) => {
  return (
    <div className={[styles.container].join(" ")}>
      {props.contents.map((content) => {
        return (
          <div className={[styles.block].join(" ")}>
            <div className={[styles.title].join(" ")}>{content.title ?? ""}</div>
            <div className={[styles.content].join(" ")}>
              {content.content ?? <div className={[styles.empty].join(" ")}></div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SalesContentsView;
