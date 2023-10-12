import { FC } from "react";
import styles from "./SalesContent.module.css";
import NormalButton from "components/atoms/button/NormalButton/NormalButton";
import { Oval } from "react-loader-spinner";
import { SalesContentCardGroupProps } from "./SalesContent.type";
import SalesContentCard from "components/organisms/card/salesContentCard/SalesContentCard";

const SalesContentCardGroup: FC<SalesContentCardGroupProps> = (props) => {
  const cards = props.cardProps.map((item, index) => {
    return (
      <div key={index.toString()} className={[styles.card].join(" ")}>
        <SalesContentCard id={item.id} title={item.title} tags={item.tags} />
      </div>
    );
  });

  return (
    <div className={[styles.wrapper].join(" ")}>
      <div className={[styles.head].join(" ")}></div>
      <div className={[styles.cards].join(" ")}>{cards}</div>
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

export default SalesContentCardGroup;
