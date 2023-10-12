import { DocumentProps } from "react-pdf";

export type PdfViewProps = {
  fileSource: Blob | null;
};

export type LoadCallBack = Required<DocumentProps>["onLoadSuccess"];
