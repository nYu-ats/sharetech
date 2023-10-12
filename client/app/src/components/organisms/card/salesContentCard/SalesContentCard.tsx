import { FC } from "react";
import { SalesContentCardProps } from "./SalesContentCard.type";
import styles from "./SalesContentCard.module.css";
import NormalLink from "components/atoms/link/NormalLink/NormalLink";
import { Pages } from "shared/constants/pages";

const SalesContentCard: FC<SalesContentCardProps> = (props) => {
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
        anchor={Pages.salesRoom.view(props.id)}
        children={
          <div className={[styles.content].join(" ")}>
            <div className={[styles.title].join(" ")}>
              <h2 className={[styles.titleText].join(" ")}>{props.title}</h2>
            </div>
            <div className={[styles.tags].join(" ")}>{tagElements}</div>
          </div>
        }
      />
    </div>
  );
};

export default SalesContentCard;
