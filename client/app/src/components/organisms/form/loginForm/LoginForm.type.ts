import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { BaseFormProps } from "../BaseForm.type";

export type LoginFormProps = BaseFormProps & {
  emailOptions: UseFormRegisterReturn<"email">;
  passwordOptions: UseFormRegisterReturn<"password">;
};
