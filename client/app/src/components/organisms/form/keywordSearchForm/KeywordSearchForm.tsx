import { FC } from "react";
import styles from "./KeywordSearchForm.module.css";
import NormalButton from "components/atoms/button/NormalButton/NormalButton";
import NormalTextInput from "components/atoms/textInput/NormalTextInput/NormalTextInput";
import { keywordSearchMax } from "shared/constants/inputOptions";
import { getIcon } from "assets/icons/Icon.function";
import { KeywordSearchFormProps } from "./KeywordSearchForm.type";

const KeywordSearchForm: FC<KeywordSearchFormProps> = (props) => {
  return (
    <div className={[styles.formContainer].join(" ")}>
      <div className={[styles.separator, styles.verticalCenter].join(" ")}>
        <NormalButton
          type="submit"
          children={getIcon("SEARCH", { color: "LIGHTGRAY", size: "SMALL" })}
          outline={true}
          size="SMALL"
          onClick={props.onSubmit}
        />
      </div>
      <div className={[styles.verticalCenter].join(" ")}>
        <div className={[styles.inputWrapper].join(" ")}>
          <NormalTextInput
            id="keyword-search"
            placeholder="名前や業務、キーワードで検索"
            border={false}
            maxLength={keywordSearchMax}
            value={props.value}
            onChnage={props.onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default KeywordSearchForm;
