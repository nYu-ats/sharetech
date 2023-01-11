import { FC } from "react";
import { KeywordSearchProps } from "./KeywordSearch.type";
import styles from "./KeywordSearch.module.css";
import NormalButton from "components/atoms/button/NormalButton/NormalButton";
import NormalTextInput from "components/atoms/textInput/NormalTextInput/NormalTextInput";
import { keywordSearchMax } from "shared/constants/TextLength";
import { getIcon } from "assets/icons/Icon.function";

const KeywordSearch: FC<KeywordSearchProps> = (props) => {
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

export default KeywordSearch;
