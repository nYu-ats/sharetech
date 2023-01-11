import { FC } from "react";
import { MyTechNoteProps } from "./MyTechNote.type";
import { getIcon } from "assets/icons/Icon.function";
import styles from "./MyTechNote.module.css";
import NormalLink from "components/atoms/link/NormalLink/NormalLink";
import TechNoteCard from "components/organisms/card/TechNoteCard/TechNoteCard";
import NormalButton from "components/atoms/button/NormalButton/NormalButton";
import { Oval } from "react-loader-spinner";

const MyTechNote: FC<MyTechNoteProps> = (props) => {
  const cardElements = props.cards.map((item, index) => {
    return (
      <div key={index.toString()} className={[styles.card].join(" ")}>
        <TechNoteCard {...item} />
      </div>
    );
  });

  return (
    <div className={[styles.wrapper].join(" ")}>
      <div className={[styles.head].join(" ")}>
        <h1 className={[styles.headText].join(" ")}>My Tech note</h1>
        <div className={[styles.plusButton].join(" ")}>
          <NormalLink
            anchor="#"
            children={getIcon("PLUS", { size: "SMALL", color: "BLACK" })}
          />
        </div>
      </div>
      <div className={[styles.cards].join(" ")}>{cardElements}</div>
      <div className={[styles.showMoreBtn].join(" ")}>
        <NormalButton
          children={
            props.isLoading ? (
              <Oval height={24} width={24} color="#ffffff" />
            ) : (
              <p>さらに表示する</p>
            )
          }
          size="LARGE"
          onClick={props.loadMore}
          disabled={!props.canLoadMore || props.isLoading}
        />
      </div>
    </div>
  );
};

export default MyTechNote;
