export type UseSalesContentListProps = {
  userId: string;
};

export type LoadStatus = {
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean | undefined;
};

export type SalesContentListHandler = {
  loadNext: () => void;
};
