export type UseTechNoteSummaryProps = {
  tags?: Array<string>;
  author?: Array<string>;
  keyword?: Array<string>;
  orderBy?: string;
  chunkSize?: number;
};

export type FetchStatus = {
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean | undefined;
};

export type TechNoteSummaryHandler = {
  loadMore: () => void;
};
