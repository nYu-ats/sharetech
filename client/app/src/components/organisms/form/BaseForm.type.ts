import React from "react";

export type BaseFormProps = {
  isLoading?: boolean;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
};
