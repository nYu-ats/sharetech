import { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Content = {
  textOptions: UseFormRegisterReturn<"title">;
  content?: ReactNode;
};

export type SalesContentEditTemplateProps = {
  contents: Array<Content>;
};
