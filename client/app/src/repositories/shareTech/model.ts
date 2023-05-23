import { IconKey, UserRole } from "shared/types";

export type User = {
  id: string;
  email: string;
  role: UserRole;
  organization: string;
};

export type TechNoteSummary = {
  iconKey: IconKey;
  title: string;
  tags: Array<string>;
  created: Date;
  updated: Date;
  author: User;
};

export type AccessToken = {
  token: string;
};
