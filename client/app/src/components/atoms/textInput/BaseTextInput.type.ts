import React from "react";

export type BaseTextInputProps = {
  placeholder: string;
  maxLength: number;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  onChnage?: React.ChangeEventHandler<HTMLInputElement>;
};
