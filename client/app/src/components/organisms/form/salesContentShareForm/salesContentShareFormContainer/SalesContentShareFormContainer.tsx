import { FC } from "react";
import PasswordUpdate from "../passwordUpdate/PasswordUpdate";
import UserAdd from "../userAdd/UserAdd";
import UserDelete from "../userDelete/UserDelete";
import { SalesContentShareFormContainerProps } from "./SalesContentShareFormContainer.type";
import styles from "./SalesContentShareFormContainer.module.css";
import NormalButton from "components/atoms/button/NormalButton/NormalButton";
import { getIcon } from "assets/icons/Icon.function";

const SalesContentShareFormContainer: FC<SalesContentShareFormContainerProps> = (
  props
) => {
  return (
    <div className={[styles.container].join(" ")}>
      <div className={[styles.closeBtn].join(" ")}>
        <NormalButton
          type="button"
          children={getIcon("CLOSE", {
            size: "EXTRASMALL",
            color: "LIGHTGRAY",
          })}
          size="SMALL"
          outline={true}
          onClick={props.closeForm}
        />
      </div>
      <div className={[styles.head].join(" ")}>
        <h3>コンテンツ共有</h3>
        <div className={[styles.copies].join(" ")}>
          <div className={[styles.copy].join(" ")}>
            <NormalButton
              type="button"
              children={
                <div className={[styles.copy].join(" ")}>
                  {getIcon("CLIPBOARD", {
                    size: "EXTRASMALL",
                    color: "LIGHTGRAY",
                  })}
                  <p className={[styles.copyText].join(" ")}>URL</p>
                </div>
              }
              size="SMALL"
              outline={true}
              onClick={props.copyUrl}
            />
          </div>
          <div className={[styles.copy].join(" ")}>
            <NormalButton
              type="button"
              children={
                <div className={[styles.copy].join(" ")}>
                  {getIcon("CLIPBOARD", {
                    size: "EXTRASMALL",
                    color: "LIGHTGRAY",
                  })}
                  <p className={[styles.copyText].join(" ")}>パスワード</p>
                </div>
              }
              size="SMALL"
              outline={true}
              onClick={props.copyPassword}
            />
          </div>
        </div>
      </div>
      <div className={[styles.userAdd].join(" ")}>
        <h3 className={[styles.title].join(" ")}>ユーザー追加</h3>
        <UserAdd
          sharedUserFields={props.sharedUserFields}
          inputRegister={props.inputRegister}
          addUser={props.addUser}
          removeUser={props.removeUser}
          submit={props.addUserSubmit}
        />
      </div>
      <div className={[styles.userDelete].join(" ")}>
        <h3 className={[styles.title].join(" ")}>ユーザー削除</h3>
        <UserDelete
          currentUsers={props.currentUsers}
          inputRegister={props.inputRegister}
          submit={props.deleteUserSubmit}
        />
      </div>
      <div className={[styles.passwordUpdate].join(" ")}>
        <h3 className={[styles.title].join(" ")}>パスワード変更</h3>
        <PasswordUpdate
          inputRegister={props.inputRegister}
          submit={props.updatePasswordSubmit}
        />
      </div>
    </div>
  );
};

export default SalesContentShareFormContainer;
