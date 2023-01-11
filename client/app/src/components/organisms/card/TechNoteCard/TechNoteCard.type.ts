import { BaseCardProps } from "../BaseCard.type";
import { IconKey } from "shared/types";

export type TechNoteCardProps = BaseCardProps & {
  iconKey: IconKey;
  title: string;
  tags: Array<string>;
};
