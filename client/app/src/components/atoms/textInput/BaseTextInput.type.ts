import React, { ForwardedRef } from "react";

export type BaseTextInputProps = {
  placeholder: string;
  maxLength?: number;
  id: string;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  onChnage?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};
