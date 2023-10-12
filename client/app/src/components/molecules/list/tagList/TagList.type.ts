import { BaseListProps } from "../BaseList.type";

type Tag = {
  name: string;
  searchLink?: string;
};

export type TagListProps = BaseListProps & {
  tags: Array<Tag>;
  isClickable?: boolean;
};
