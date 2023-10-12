import NormalButton from "components/atoms/button/NormalButton/NormalButton";
import { FC } from "react";
import { SalesContentActionPanelProps } from "./SalesContentActionPanel.type";
import styles from "./SalesContentActionPanel.module.css";
import { getIcon } from "assets/icons/Icon.function";
import PullDown from "components/molecules/pullDown/PullDown";
import { useRouter } from "next/router";

const SalesContentActionPanel: FC<SalesContentActionPanelProps> = (props) => {
  const router = useRouter();

  return (
    <div className={[styles.actionPanel].join(" ")}>
      <div className={[styles.left].join(" ")}>
        <div className={[styles.returnBtn].join(" ")}>
          <NormalButton
            children={<p className={[styles.returnBtnText].join(" ")}>＜ 戻る</p>}
            size="SMALL"
            outline={true}
            onClick={() => router.back()}
          />
        </div>
        {!props.isEditMode ? (
          <PullDown selectedValue="Sample" values={["Sample"]} />
        ) : null}
      </div>
      <div className={[styles.right].join(" ")}>
        {!props.isEditMode ? (
          <div className={[styles.btn].join(" ")}>
            <NormalButton
              children={
                <div className={[styles.iconBtn].join(" ")}>
                  {getIcon("LINK", { size: "EXTRASMALL", color: "WHITE" })}
                  <p className={[styles.btnText].join(" ")}>共有</p>
                </div>
              }
              size="SMALL"
              onClick={props.onShareClick}
            />
          </div>
        ) : null}
        <div className={[styles.btn].join(" ")}>
          <NormalButton
            type={!props.isEditMode ? "button" : "submit"}
            children={
              <p className={[styles.btnText].join(" ")}>
                {!props.isEditMode ? "編集" : "保存"}
              </p>
            }
            size="SMALL"
            onClick={props.onEditClick}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesContentActionPanel;
