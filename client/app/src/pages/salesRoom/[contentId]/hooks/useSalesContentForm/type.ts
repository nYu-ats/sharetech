import {
  FieldArrayWithId,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { SalesContentProps } from "../../SalesContentEdit.type";

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

export type UseSalesContentProps = {
  contentId: string;
  organization: string | null;
};

export type FormStatus = {
  isLoading: boolean;
  isSuccess: boolean;
  isValid: boolean;
};

export type ArrayFields = {
  tagFields: Array<FieldArrayWithId<SalesContentProps, "tags", "id">>;
  salesContentFields: Array<FieldArrayWithId<SalesContentProps, "salesContents", "id">>;
};

export type FormHandler = {
  register: UseFormRegister<SalesContentProps>;
  watch: UseFormWatch<SalesContentProps>;
  handleSubmit: UseFormHandleSubmit<SalesContentProps>;
  menuChange: (e: React.MouseEvent<HTMLElement>) => void;
  addTagInput: (e: React.MouseEvent<HTMLButtonElement>) => void;
  removeTagInput: (e: React.MouseEvent<HTMLButtonElement>) => void;
  dropFile: (files: Array<File>, index: number) => void;
  removeFile: (
    e: React.MouseEvent,
    targetFile: File | null,
    files: Array<File>
  ) => void;
  preCheck: () => Promise<boolean>;
  submit: (
    contentId: string,
    title: string,
    userId: string,
    tags: Array<string>,
    contents: Array<PdfContent | TextContent | MovieContent>
  ) => void;
};
