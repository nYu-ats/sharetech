import { FC } from "react";
import { SalesContentMetaFormProps } from "./SalesContentMetaForm.type";
import styles from "./SalesContentMetaForm.module.css";
import NormalTextInput from "components/atoms/textInput/NormalTextInput/NormalTextInput";
import { generateRandomString } from "features/utilities/stringUtil";
import NormalButton from "components/atoms/button/NormalButton/NormalButton";
import { getIcon } from "assets/icons/Icon.function";

const SalesContentMetaForm: FC<SalesContentMetaFormProps> = (props) => {
  return (
    <div>
      <div className={[styles.title].join(" ")}>
        <NormalTextInput
          id={`text-${generateRandomString()}`}
          placeholder="顧客名など"
          border={false}
          maxLength={50}
          type="text"
          {...props.inputRegister("title", { required: true, maxLength: 50 })}
        />
      </div>
      <div className={[styles.tags].join(" ")}>
        {props.tagFields.map((field, index) => {
          return (
            <div key={field.id} className={[styles.tag].join(" ")}>
              <NormalTextInput
                id={`text-${generateRandomString()}-${String(index)}`}
                placeholder="タグ"
                border={false}
                maxLength={20}
                type="text"
                {...props.inputRegister(`tags.${index}.value`, { maxLength: 20 })}
              />
              <NormalButton
                data-index={String(index)}
                size="SMALL"
                children={getIcon("TRASH", {
                  size: "EXTRASMALL",
                  color: "LIGHTGRAY",
                })}
                outline={true}
                onClick={props.removeTag}
              />
            </div>
          );
        })}
        <div>
          <NormalButton
            size="SMALL"
            children={getIcon("PLUS", { size: "EXTRASMALL", color: "LIGHTGRAY" })}
            outline={true}
            onClick={props.addTag}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesContentMetaForm;
