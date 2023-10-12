import React from "react";
import { SalesContentTypes } from "shared/constants/enum";

type Tag = {
  value: string;
};

type SalesContent = {
  title: string;
  contentType: SalesContentTypes;
  content: string | File | null;
};

export type SalesContentPreCheckTemplateProps = {
  title: string;
  tags: Array<Tag>;
  salesContents: Array<SalesContent>;
  onReturn?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
