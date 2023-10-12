export type SalesContentViewProps = {};

export type SalesContentSharedUser = {
  value: string;
};

export type SalesContentShareProps = {
  newUsers: Array<SalesContentSharedUser>;
  deleteUsers: Array<string>;
  password: string;
};
