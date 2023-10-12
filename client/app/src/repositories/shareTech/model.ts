import { AllowedStorageMethod } from "shared/constants/enum";
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

export type Step = {
  index: number;
  text: string;
  is_proceeded: boolean | undefined;
};

export type PdfContent = {
  index: number;
  title: string;
  content_type: "PDF";
  name: string;
};

export type TextContent = {
  index: number;
  title: string;
  content_type: "TEXT";
  text: string;
};

export type MovieContent = {
  index: number;
  title: string;
  content_type: "MOVIE";
  name: string;
};

export type StepContent = {
  index: number;
  title: string;
  content_type: "MOVIE";
  steps: Array<Step>;
};

export type SalesContent = {
  title: string;
  owner_id: string;
  tags: Array<string>;
  contents: Array<PdfContent | TextContent | MovieContent>;
};

export type SalesContentDb = {
  id: string;
  title: string;
  owner_id: string;
  tags: Array<string>;
  contents: Array<PdfContent | TextContent | MovieContent>;
};

type SignedUrl = {
  key: string;
  value: string;
};

export type StorageSignedUrl = {
  allowd_method: AllowedStorageMethod;
  urls: Array<SignedUrl>;
  expiration: string;
};

export type FileExist = {
  exist: boolean;
};

type SalesContentSharedUser = {
  user_id: string;
  is_active: boolean;
};

export type SalesContentSharedUsers = {
  users: Array<SalesContentSharedUser>;
};

export type SalesContentSharingPassword = {
  password: string;
};
