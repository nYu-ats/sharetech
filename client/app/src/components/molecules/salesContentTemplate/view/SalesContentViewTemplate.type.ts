import { ReactNode } from "react";

type Content = {
  title?: string;
  content?: ReactNode;
};

export type SalesContentViewTemplateProps = {
  contents: Array<Content>;
};
