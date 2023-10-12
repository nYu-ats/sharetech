import { SalesContentProps } from "pages/salesRoom/[contentId]/SalesContentEdit.type";
import React from "react";
import { FieldArrayWithId, UseFormRegister, UseFormWatch } from "react-hook-form";
import { SalesContentTypes } from "shared/constants/enum";

export type SalesContentFormProps = {
  inputRegister: UseFormRegister<SalesContentProps>;
  inputWatcher: UseFormWatch<SalesContentProps>;
  onDropFile: (files: File[], index: number) => void;
  onRemoveFile: (
    e: React.MouseEvent,
    targetFile: File | null,
    files: Array<File>
  ) => void;
  onMenuClick: React.MouseEventHandler<HTMLElement>;
  contentFields: Array<FieldArrayWithId<SalesContentProps, "salesContents", "id">>;
};
