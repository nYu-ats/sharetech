import React from "react";
import { BaseFormProps } from "../BaseForm.type";

export type KeywordSearchFormProps = BaseFormProps & {
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};
