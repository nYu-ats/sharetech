import { IconKey } from "shared/types";

export type User = {
  name: string;
};

export type TechNoteSummary = {
  iconKey: IconKey;
  title: string;
  tags: Array<string>;
  created: Date;
  updated: Date;
  author: User;
};
