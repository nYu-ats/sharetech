import { useInfiniteQuery } from "react-query";
import { SalesContentDb } from "repositories/shareTech/model";
import { listSalesContents } from "repositories/shareTech/salesContent";
import { LoadStatus, SalesContentListHandler, UseSalesContentListProps } from "./type";

const useSalesContentList = (
  props: UseSalesContentListProps
): [Array<SalesContentDb>, LoadStatus, SalesContentListHandler] => {
  const { isLoading, isError, hasNextPage, data, fetchNextPage } = useInfiniteQuery(
    "salesContentList",
    ({ pageParam = 0 }) => listSalesContents(props.userId, "created_at", pageParam, 20),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    }
  );

  const salesContentList =
    data !== undefined
      ? data.pages
          .map((page) => {
            return page.result;
          })
          .flat()
      : [];

  return [
    salesContentList,
    {
      isLoading,
      isError,
      hasNextPage,
    },
    {
      loadNext: () => fetchNextPage(),
    },
  ];
};

export default useSalesContentList;
