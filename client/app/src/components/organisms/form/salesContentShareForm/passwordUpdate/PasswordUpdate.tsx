import { FC } from "react";
import { PasswordUpdateProps } from "./PasswordUpdate.type";
import styles from "./PasswordUpdate.module.css";
import PasswordInput from "components/molecules/formItem/passwordInput/simplePasswordInput/PasswordInput";
import NormalButton from "components/atoms/button/NormalButton/NormalButton";

const PasswordUpdate: FC<PasswordUpdateProps> = (props) => {
  return (
    <form className={[styles.form].join(" ")}>
      <div className={[].join(" ")}>
        <PasswordInput {...props.inputRegister("password")} hasLabel={false} />
      </div>
      <div className={[styles.submitBtn].join(" ")}>
        <NormalButton
          type="submit"
          children={<p>変更</p>}
          size="SMALL"
          onClick={props.submit}
        />
      </div>
    </form>
  );
};

export default PasswordUpdate;
