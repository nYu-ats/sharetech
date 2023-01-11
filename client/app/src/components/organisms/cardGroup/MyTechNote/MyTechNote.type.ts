import React from "react";
import { TechNoteCardProps } from "shared/types";

export type MyTechNoteProps = {
  cards: Array<TechNoteCardProps>;
  isLoading: boolean;
  canLoadMore?: boolean;
  loadMore?: React.MouseEventHandler<HTMLButtonElement>;
};
