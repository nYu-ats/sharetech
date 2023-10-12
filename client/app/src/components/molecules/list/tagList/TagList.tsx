import { FC } from "react";
import { TagListProps } from "./TagList.type";
import styles from "./TagList.module.css";
import NormalLink from "components/atoms/link/NormalLink/NormalLink";

const TagList: FC<TagListProps> = ({ isClickable = true, ...props }) => {
  return (
    <div className={[styles.tagContainer].join(" ")}>
      {props.tags.map((tag) => {
        return (
          <div>
            {isClickable ? (
              <div className={[styles.tag, styles.clickable].join(" ")}>
                <NormalLink children={tag.name} anchor={tag.searchLink as string} />
              </div>
            ) : (
              <div className={[styles.tag].join(" ")}>
                <p>{tag.name}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TagList;
