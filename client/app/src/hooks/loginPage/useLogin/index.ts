import { useInfiniteQuery } from "react-query";
import { TechNoteCardProps } from "shared/types";
import { UseLoginProps, LoginHandler, FetchStatus } from "./useLogin.type";
import { getTechNoteList } from "repositories/shareTech/technote";

const useLogin = ({
  chunkSize = 20,
  orderBy = "created",
  ...props
}: UseLoginProps): [Array<TechNoteCardProps>, FetchStatus, LoginHandler] => {
  const { isLoading, isError, hasNextPage, data, fetchNextPage } = useInfiniteQuery(
    "techNoteSummary",
    ({ pageParam = 1 }) =>
      getTechNoteList({
        summary: true,
        _cursor: pageParam,
        _limit: chunkSize,
        _order_by: orderBy,
        ...props,
      }),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    }
  );

  const myTechNote =
    data !== undefined
      ? data.pages
          .map((page) => {
            return page.result;
          })
          .flat()
      : [];

  return [
    myTechNote,
    {
      isLoading,
      isError,
      hasNextPage,
    },
    {
      loadMore: () => fetchNextPage(),
    },
  ];
};

export default useLogin;
