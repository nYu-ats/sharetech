import TextInput from "components/molecules/formItem/textInput/TextInput";
import { FC } from "react";
import styles from "./SalesContentEditTemplate.module.css";
import { SalesContentEditTemplateProps } from "./SalesContentEditTemplate.type";

const SalesContentsEdit: FC<SalesContentEditTemplateProps> = (props) => {
  return (
    <div className={[styles.container].join(" ")}>
      {props.contents.map((content, index) => {
        return (
          <div className={[styles.block].join(" ")}>
            <div className={[styles.title].join(" ")}>
              <TextInput {...content.textOptions} placeHolder="コンテンツタイトル" />
            </div>
            <div className={[styles.content].join(" ")}>
              {content.content ?? <div className={[styles.empty].join(" ")}></div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SalesContentsEdit;
