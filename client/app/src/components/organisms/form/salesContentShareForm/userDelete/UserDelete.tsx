import { FC } from "react";
import { UserDeleteProps } from "./UserDelete.type";
import styles from "./UserDelete.module.css";
import SelectInput from "components/atoms/selectInput/SelectInput";
import { generateRandomString } from "features/utilities/stringUtil";
import NormalButton from "components/atoms/button/NormalButton/NormalButton";
import { getIcon } from "assets/icons/Icon.function";

const UserDelete: FC<UserDeleteProps> = (props) => {
  return (
    <form className={[styles.form].join(" ")}>
      <div>
        {props.currentUsers.map((user, index) => {
          return (
            <div className={[styles.selection].join(" ")}>
              <SelectInput
                id={`select-${generateRandomString()}-${String(index)}`}
                value={user}
                label={user}
                {...props.inputRegister("deleteUsers")}
              />
            </div>
          );
        })}
      </div>
      <div className={[styles.submitBtn].join(" ")}>
        <NormalButton
          type="submit"
          children={<p>削除</p>}
          size="SMALL"
          onClick={props.submit}
        />
      </div>
    </form>
  );
};

export default UserDelete;
