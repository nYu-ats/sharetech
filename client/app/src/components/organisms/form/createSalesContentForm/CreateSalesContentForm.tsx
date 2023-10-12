import { FC } from "react";
import { CreateSalesContentFormProps } from "./CreateSalesContentForm.type";
import styles from "./CreateSalesContentForm.module.css";
import NormalButton from "components/atoms/button/NormalButton/NormalButton";
import TextInput from "components/molecules/formItem/textInput/TextInput";

const CreateSalesContentForm: FC<CreateSalesContentFormProps> = (props) => {
  return (
    <form className={[styles.formContainer].join(" ")} onSubmit={props.onSubmit}>
      <div className={[styles.titleContainer].join(" ")}>
        <h2 className={[styles.title].join(" ")}>新規作成</h2>
      </div>
      <div className={[styles.formBlock].join(" ")}>
        <TextInput label="" {...props.textOptions} placeHolder="タイトル" />
      </div>
      <div className={[styles.buttonContainer].join(" ")}>
        <div className={[styles.btn].join(" ")}>
          <NormalButton
            type="submit"
            children={<p className={[styles.btnText].join(" ")}>作成</p>}
            size="SMALL"
          />
        </div>
        <div className={[styles.btn].join(" ")}>
          <NormalButton
            type="button"
            children={<p className={[styles.btnText].join(" ")}>キャンセル</p>}
            size="SMALL"
            outline={true}
            onClick={props.onCancelClick}
          />
        </div>
      </div>
    </form>
  );
};

export default CreateSalesContentForm;
