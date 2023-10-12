import React from "react";
import { SalesContentCardProps } from "shared/types";

export type SalesContentCardGroupProps = {
  cardProps: Array<SalesContentCardProps>;
  isLoading: boolean;
  canLoadMore?: boolean;
  loadMore?: React.MouseEventHandler<HTMLButtonElement>;
};
