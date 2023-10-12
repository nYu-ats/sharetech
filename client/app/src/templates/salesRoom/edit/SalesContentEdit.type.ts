import React, { ReactNode } from "react";

export type SalesContentEditTemplateProps = {
  contentMetaForm: ReactNode;
  contentForm: ReactNode;
  actionPanel: ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
};
