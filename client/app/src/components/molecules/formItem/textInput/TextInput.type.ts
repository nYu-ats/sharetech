import React from "react";

export type TextInputProps = {
  label?: string;
  placeHolder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};
