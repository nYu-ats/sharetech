import React from "react";
import { BaseFormProps } from "../BaseForm.type";

export type KeywordSearchProps = BaseFormProps & {
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};
