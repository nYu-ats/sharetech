import { FC } from "react";
import { SalesContentPreCheckTemplateProps } from "./SalesContentPreCheckTemplate.type";
import styles from "./SalesContentPreCheckTemplate.module.css";
import TagList from "components/molecules/list/tagList/TagList";
import { SalesContentTypes } from "shared/constants/enum";
import NormalButton from "components/atoms/button/NormalButton/NormalButton";
import NormalText from "components/atoms/text/normalText/NormalText";

const SalesContentPreCheckTemplate: FC<SalesContentPreCheckTemplateProps> = (props) => {
  const generateSalescontent = (
    contentType: SalesContentTypes,
    content: string | File | null
  ) => {
    switch (contentType) {
      case "PDF":
      case "MOVIE": {
        if (content) {
          const _content = content as File;
          return (
            <div className={[styles.fileNameWrapper].join(" ")}>{_content.name}</div>
          );
        } else {
          return <div>コンテンツがアップロードされていません</div>;
        }
      }
      case "TEXT": {
        const _content = content as string;
        return (
          <div className={[styles.contentText].join(" ")}>
            <NormalText text={_content} outline={false} />
          </div>
        );
      }
      default: {
        return <div></div>;
      }
    }
  };

  // enumから表示名に変換する関数をどっかに共通関数として切り出す
  const displayContentType = (contentType: SalesContentTypes) => {
    let displayName = "";
    switch (contentType) {
      case "PDF":
        displayName = "pdf";
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
    return displayName;
  };

  return (
    <div>
      <div className={[styles.wrapper].join(" ")}>
        <div className={[styles.title].join(" ")}>{props.title}</div>
        <div className={[styles.tags].join(" ")}>
          <TagList
            isClickable={false}
            tags={props.tags.map((tag) => {
              return { name: tag.value };
            })}
          />
        </div>
        <div className={[styles.contentsWrapper].join(" ")}>
          {props.salesContents.map((salesContent) => {
            return (
              <div className={[styles.contentWrapper].join(" ")}>
                <div className={[styles.contentTitle].join(" ")}>
                  {salesContent.title}
                </div>
                <div className={[styles.content].join(" ")}>
                  <div className={[styles.contentType].join(" ")}>
                    タイプ：{displayContentType(salesContent.contentType)}
                  </div>
                  <div>
                    {generateSalescontent(
                      salesContent.contentType,
                      salesContent.content
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={[styles.btnWrapper].join(" ")}>
        <div className={[styles.btn].join(" ")}>
          <NormalButton
            children="修正"
            type="button"
            outline={true}
            onClick={props.onReturn}
          />
        </div>
        <div className={[styles.btn].join(" ")}>
          <NormalButton children="送信" type="submit" onClick={props.onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SalesContentPreCheckTemplate;
