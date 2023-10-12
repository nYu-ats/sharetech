import { AllowedStorageMethod } from "shared/constants/enum";

export type PdfContent = {
  index: number;
  title: string;
  contentType: "PDF";
  name: string;
};

export type TextContent = {
  index: number;
  title: string;
  contentType: "TEXT";
  text: string;
};

export type MovieContent = {
  index: number;
  title: string;
  contentType: "MOVIE";
  name: string;
};

export type SalesContent = {
  id: string;
  title: string;
  ownerId: string;
  tags: Array<string>;
  contents: Array<PdfContent | TextContent | MovieContent>;
};

export type UseSalesContentProps = {
  contentId: string;
  organization: string | null;
};

export type SalesContentStatus = {
  isLoading: boolean;
  isError: boolean;
};

type SignedUrl = {
  key: string;
  value: string;
};

export type GcsSignedUrl = {
  url: string;
};
