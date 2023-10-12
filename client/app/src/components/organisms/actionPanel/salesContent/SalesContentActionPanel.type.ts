import React from "react";

export type SalesContentActionPanelProps = {
  isEditMode: boolean;
  onEditClick?: React.MouseEventHandler<HTMLButtonElement>;
  onShareClick?: React.MouseEventHandler<HTMLButtonElement>;
};
