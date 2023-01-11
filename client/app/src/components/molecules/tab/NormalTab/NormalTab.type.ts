import { ReactNode } from "react";

export type NormalTabProps = {
  tabs: Array<TabSet>;
  active: number;
  switchTab: (index: number) => void;
};

type TabSet = {
  tabName: string;
  content?: ReactNode;
};
