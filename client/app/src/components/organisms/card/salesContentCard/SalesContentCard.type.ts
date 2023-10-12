import { BaseCardProps } from "../BaseCard.type";

export type SalesContentCardProps = BaseCardProps & {
  id: string;
  title: string;
  tags: Array<string>;
};
