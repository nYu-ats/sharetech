import React, { ReactNode } from "react";
import { SalesContentTypes } from "shared/constants/enum";

export type SalesContentMenuProps = {
  isActiveMenu: SalesContentTypes;
  index: number;
  onClick: React.MouseEventHandler<HTMLElement>;
};
