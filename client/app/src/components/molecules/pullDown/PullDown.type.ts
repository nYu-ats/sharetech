import React from "react";

export type PullDownProps = {
  selectedValue?: string;
  values: Array<string>;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
};
