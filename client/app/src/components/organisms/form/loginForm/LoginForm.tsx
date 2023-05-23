import { FC } from "react";
import { LoginFormProps } from "./LoginForm.type";
import styles from "./LoginForm.module.css";
import NormalButton from "components/atoms/button/NormalButton/NormalButton";
import EmailInput from "components/molecules/formItem/emailInput/EmailInput";
import PasswordInput from "components/molecules/formItem/passwordInput/PasswordInput";

const LoginForm: FC<LoginFormProps> = (props) => {
  return (
    <form className={[styles.formContainer].join(" ")} onSubmit={props.onSubmit}>
      <div className={[styles.titleContainer].join(" ")}>
        <h2 className={[styles.title].join(" ")}>Sign in</h2>
      </div>
      <div className={[styles.formBlock].join(" ")}>
        <EmailInput {...props.emailOptions} />
      </div>
      <div className={[styles.formBlock].join(" ")}>
        <PasswordInput {...props.passwordOptions} />
      </div>
      <div className={[styles.buttonContainer].join(" ")}>
        <NormalButton type="submit" children={<p>Submit</p>} size="NORMAL" />
      </div>
    </form>
  );
};

export default LoginForm;
