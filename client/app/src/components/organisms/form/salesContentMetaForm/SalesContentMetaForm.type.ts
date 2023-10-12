import { SalesContentProps } from "pages/salesRoom/[contentId]/SalesContentEdit.type";
import React from "react";
import { FieldArrayWithId, UseFormRegister } from "react-hook-form";

export type SalesContentMetaFormProps = {
  inputRegister: UseFormRegister<SalesContentProps>;
  addTag?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  removeTag?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  tagFields: Array<FieldArrayWithId<SalesContentProps, "tags", "id">>;
};
