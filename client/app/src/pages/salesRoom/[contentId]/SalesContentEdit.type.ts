import { SalesContentTypes } from "shared/constants/enum";

export type SalesContentEditProps = {};

type Tag = {
  value: string;
};

type SalesContent = {
  title: string;
  contentType: SalesContentTypes;
  content: string | File | null;
};

export type SalesContentProps = {
  title: string;
  tags: Array<Tag>;
  salesContents: Array<SalesContent>;
};
