export type UsePagingProps = {
  numPage: number;
};

export type PagingHandler = {
  setNumPages: (numPages: number) => void;
  goPrevious: () => void;
  goNext: () => void;
  jumpTo: (pageNum: number) => void;
};
