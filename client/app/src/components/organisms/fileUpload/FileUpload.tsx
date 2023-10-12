import { FC, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./FileUpload.module.css";
import { getIcon } from "assets/icons/Icon.function";
import NormalButton from "components/atoms/button/NormalButton/NormalButton";
import { FileUploadProps } from "./FileUpload.type";
import { SalesContentTypes } from "shared/constants/enum";
import { ProgressBar } from "react-loader-spinner";

const FileUpload: FC<FileUploadProps> = (props) => {
  const getFileAttribute = (fileType: Omit<SalesContentTypes, "TEXT" | "STEP">) => {
    let options = {};
    switch (fileType) {
      case "PDF": {
        options = {
          accept: {
            "application/pdf": [".pdf"],
          },
          maxSize: 5000000,
        };
        break;
      }
      case "MOVIE":
        {
          options = {
            accept: {
              "video/mp4": [".mp4"],
              "video/mpeg": [".mpeg"],
            },
            maxSize: 100000000,
          };
        }
        break;
      default: {
        options = {
          maxSize: 5000000,
        };
      }
    }
    return options;
  };

  const fileAttribute = getFileAttribute(props.fileType);
  const onDrop = props.onDropFile;
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    minSize: 1,
    multiple: false,
    ...fileAttribute,
  });

  const filePreview = useMemo(() => {
    if (props.targetFile === null) {
      return <div></div>;
    }
    if (props.isUploading) {
      return <ProgressBar barColor="#005DFF" borderColor="#666" />;
    }
    const fileName = `${props.targetFile.name} (${
      Math.round((props.targetFile.size / 1000000) * 100) / 100
    } MB)`;

    return (
      <div className={[styles.fileNameWrapper].join(" ")}>
        <div className={[styles.verticalCenter].join(" ")}>
          <p className={[styles.fileName].join(" ")}>{fileName}</p>
        </div>
        <NormalButton
          size="SMALL"
          children={getIcon("TRASH", {
            size: "EXTRASMALL",
            color: "LIGHTGRAY",
          })}
          outline={true}
          onClick={(e) => props.onRemoveFile(e, props.targetFile, acceptedFiles)}
        />
      </div>
    );
  }, [props.targetFile]);

  return (
    <div className={[styles.wrapper].join(" ")} {...getRootProps()}>
      <input className={[styles.input].join(" ")} {...getInputProps()} />
      <div className={[styles.preview].join(" ")}>
        <div className={[styles.verticalCenter].join(" ")}>
          <p className={[styles.description].join(" ")}>ファイルを選択またはドロップ</p>
        </div>
        {filePreview}
      </div>
    </div>
  );
};

export default FileUpload;
