import { FC } from "react";
import { TechNoteCardProps } from "./TechNoteCard.type";
import styles from "./TechNoteCard.module.css";
import { getIcon } from "assets/icons/Icon.function";
import NormalLink from "components/atoms/link/NormalLink/NormalLink";

const TechNoteCard: FC<TechNoteCardProps> = (props) => {
  const tagElements = props.tags.map((item, index) => {
    return (
      <div key={index.toString()} className={[styles.tag].join(" ")}>
        {
          <NormalLink
            children={<p className={[styles.tagText].join(" ")}>{item}</p>}
            anchor="#"
          />
        }
      </div>
    );
  });

  return (
    <div className={[styles.wrapper].join(" ")}>
      <NormalLink
        anchor="#"
        children={
          <div className={[styles.content].join(" ")}>
            <div className={[styles.left].join(" ")}>
              {getIcon(props.iconKey, { size: "LARGE", color: "BLACK" })}
            </div>
            <div className={[styles.right].join(" ")}>
              <div className={[styles.title].join(" ")}>
                <h2 className={[styles.titleText].join(" ")}>{props.title}</h2>
              </div>
              <div className={[styles.tags].join(" ")}>{tagElements}</div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default TechNoteCard;
