import { useState } from "react";
import { PagingHandler, UsePagingProps } from "./type";

const usePaging = (props: UsePagingProps): [number, number, PagingHandler] => {
  const [numPages, setNumPages] = useState<number>(props.numPage);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const goPrevious = () => {
    if (pageNumber > 1) {
      setPageNumber(() => pageNumber - 1);
    }
  };

  const goNext = () => {
    if (pageNumber < numPages) {
      setPageNumber(() => pageNumber + 1);
    }
  };

  const jumpTo = (pageNum: number) => {
    if (1 <= pageNum && pageNum <= numPages) {
      setPageNumber(pageNum);
    }
  };

  return [
    numPages,
    pageNumber,
    {
      setNumPages: setNumPages,
      goPrevious: goPrevious,
      goNext: goNext,
      jumpTo: jumpTo,
    },
  ];
};

export default usePaging;
