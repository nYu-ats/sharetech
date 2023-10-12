import { getIcon } from "assets/icons/Icon.function";
import NormalButton from "components/atoms/button/NormalButton/NormalButton";
import { FC } from "react";
import { UserAddProps } from "./UserAdd.type";
import styles from "./UserAdd.module.css";
import { generateRandomString } from "features/utilities/stringUtil";
import BgFilledEmailInput from "components/molecules/formItem/emailInput/BgfilledEmailInput/BgFilledEmailInput";

const SharedUserControlForm: FC<UserAddProps> = (props) => {
  return (
    <form className={[styles.form].join(" ")}>
      <div className={[].join(" ")}>
        {props.sharedUserFields.map((field, index) => {
          return (
            <div className={[styles.wrapper].join(" ")} key={field.id}>
              <BgFilledEmailInput
                id={`email-${generateRandomString()}-${String(index)}`}
                maxLength={10}
                {...props.inputRegister(`newUsers.${index}.value`)}
              />
              <NormalButton
                data-index={String(index)}
                size="SMALL"
                children={getIcon("TRASH", {
                  size: "EXTRASMALL",
                  color: "LIGHTGRAY",
                })}
                outline={true}
                onClick={props.removeUser}
              />
            </div>
          );
        })}
        <div>
          <NormalButton
            size="SMALL"
            children={getIcon("PLUS", { size: "EXTRASMALL", color: "LIGHTGRAY" })}
            outline={true}
            onClick={props.addUser}
          />
        </div>
      </div>
      <div className={[styles.submitBtn].join(" ")}>
        <NormalButton
          type="submit"
          children={<p>追加</p>}
          size="SMALL"
          onClick={props.submit}
        />
      </div>
    </form>
  );
};

export default SharedUserControlForm;
