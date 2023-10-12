import {
  MovieContent,
  PdfContent,
  SalesContent,
  SalesContentStatus,
  TextContent,
  UseSalesContentProps,
} from "./type";
import { retrieveSalesContent } from "repositories/shareTech/salesContent";
import { useQuery } from "react-query";
import { SalesContentTypes } from "shared/constants/enum";
import useSalesContentFiles from "../useSalesContentFiles";
import { useCallback } from "react";

const initialSalesContent = {
  id: "",
  title: "",
  tags: [],
  ownerId: "",
  contents: [
    { index: 0, title: "", contentType: "PDF" as SalesContentTypes, name: "" },
    { index: 1, title: "", contentType: "PDF" as SalesContentTypes, name: "" },
    { index: 2, title: "", contentType: "PDF" as SalesContentTypes, name: "" },
  ] as Array<PdfContent | TextContent | MovieContent>,
};

const useSalesContent = (
  props: UseSalesContentProps
): [SalesContent, Array<Blob | null>, SalesContentStatus] => {
  const fetchData = useCallback(() => {
    return retrieveSalesContent(props.contentId, props.organization);
  }, []);

  // TODO アクセス履歴を正常に記録するためには、staleTime: Infinityにし余分なAPI呼び出しが発生
  // しないようにする必要がある。
  // この時、ページ遷移でもdata再取得が行われなくなるため、このhookを使用するコンポーネント上で
  // 初回レンダリング時にrefetchする必要がある。
  const { isLoading, isError, data } = useQuery(
    ["salesContent", props.contentId],
    fetchData,
    {
      onSuccess: async (data) => {
        data.result.contents.map((content, index) => {
          if (content.content_type === "PDF" || content.content_type === "MOVIE") {
            if (!blobs[index] && content.name) {
              fileHandler.download(index, content.content_type, content.name);
            }
          }
        });
      },
      notifyOnChangeProps: ["data"],
    }
  );
  const [getSignedGcsUrlStatus, uploadFileStatus, blobs, fileHandler] =
    useSalesContentFiles({
      contentId: props.contentId,
      storageType: "DISTRIBUTION",
      method: "GET",
      targetCount: initialSalesContent.contents.length,
      organization: props.organization,
    });

  const salesContents =
    data !== undefined
      ? {
          id: data.result.id,
          title: data.result.title,
          tags: data.result.tags,
          ownerId: data.result.owner_id,
          contents: data.result.contents.map(
            (content): PdfContent | TextContent | MovieContent => {
              switch (content.content_type) {
                case "PDF":
                case "MOVIE":
                  return {
                    index: content.index,
                    title: content.title,
                    contentType: content.content_type,
                    name: content.name,
                  };
                case "TEXT":
                default:
                  return {
                    index: content.index,
                    title: content.title,
                    contentType: content.content_type,
                    text: content.text,
                  };
              }
            }
          ),
        }
      : initialSalesContent;

  return [
    salesContents,
    blobs,
    {
      isLoading,
      isError,
    },
  ];
};

export default useSalesContent;
