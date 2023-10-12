import NormalTextInput from "components/atoms/textInput/NormalTextInput/NormalTextInput";
import SalesContentMenu from "components/organisms/menu/SalesContentMenu/SalesContentMenu";
import { generateRandomString } from "features/utilities/stringUtil";
import { FC } from "react";
import { SalesContentFormProps } from "./SalesContentForm.type";
import styles from "./SalesContentForm.module.css";
import { SalesContentTypes } from "shared/constants/enum";
import TextAreaInput from "components/atoms/textInput/textAreaInput/TextAreaInput";
import FileUpload from "components/organisms/fileUpload/FileUpload";

const SalesContentForm: FC<SalesContentFormProps> = (props) => {
  const selectFormField = (type: SalesContentTypes, index: number) => {
    switch (type) {
      case "PDF":
        return (
          <div>
            <FileUpload
              fileType="PDF"
              targetFile={
                props.inputWatcher(`salesContents.${index}.content`) as File | null
              }
              onDropFile={(files: Array<File>) => props.onDropFile(files, index)}
              onRemoveFile={props.onRemoveFile}
            />
          </div>
        );
      case "MOVIE":
        return (
          <div>
            <FileUpload
              fileType="MOVIE"
              targetFile={
                props.inputWatcher(`salesContents.${index}.content`) as File | null
              }
              onDropFile={(files: Array<File>) => props.onDropFile(files, index)}
              onRemoveFile={props.onRemoveFile}
            />
          </div>
        );
      case "TEXT":
        return (
          <div>
            <TextAreaInput
              id={`textArea-${generateRandomString()}`}
              placeholder="説明文など"
              maxLength={500}
              {...props.inputRegister(`salesContents.${index}.content`)}
            />
          </div>
        );
      default:
        return <div></div>;
    }
  };

  const displayContentType = (index: number) => {
    let displayName = "";
    switch (props.inputWatcher(`salesContents.${index}.contentType`)) {
      case "PDF":
        displayName = "PDF";
        break;
      case "MOVIE":
        displayName = "動画";
        break;
      case "TEXT":
        displayName = "文章";
        break;
      default:
        displayName = "";
    }
    return (
      <div className={[styles.verticalCenter].join(" ")}>
        <p className={[styles.contentTypeText].join(" ")}>{displayName}</p>
      </div>
    );
  };

  return (
    <div>
      {props.contentFields.map((field, index) => {
        return (
          <div className={[styles.wrapper].join(" ")}>
            <div className={[styles.title].join(" ")}>
              <NormalTextInput
                id={`text-${generateRandomString()}`}
                type="text"
                placeholder="コンテンツタイトル"
                maxLength={50}
                border={false}
                {...props.inputRegister(`salesContents.${index}.title`, {
                  maxLength: 50,
                })}
              />
            </div>
            <div className={[styles.content].join(" ")}>
              <div className={[styles.contentMenu].join(" ")}>
                <SalesContentMenu
                  isActiveMenu={props.inputWatcher(
                    `salesContents.${index}.contentType`
                  )}
                  index={index}
                  onClick={props.onMenuClick}
                />
                {displayContentType(index)}
              </div>
              {selectFormField(
                props.inputWatcher(`salesContents.${index}.contentType`),
                index
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SalesContentForm;
