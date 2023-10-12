import useFiles from "hooks/common/useFiles";
import useGcsSignedUrls from "hooks/common/useGcsSignedUrls";
import { useCallback } from "react";
import { SalesContentTypes } from "shared/constants/enum";
import {
  HandlerStatus,
  SalesContentFilesHandlers,
  UseSalesContentFilesProps,
} from "./type";

const useSalesContentFiles = (
  props: UseSalesContentFilesProps
): [
  Array<HandlerStatus>,
  Array<HandlerStatus>,
  Array<Blob | null>,
  SalesContentFilesHandlers
] => {
  const [urls, signedUrlStatuses, signedUrlHandler] = useGcsSignedUrls({
    contentId: props.contentId,
    storageType: props.storageType,
    method: props.method,
    targetCount: props.targetCount,
    organization: props.organization,
  });

  const [fileStatuses, blobs, fileHandler] = useFiles({
    targetCount: props.targetCount,
  });

  const upload = useCallback(
    async (contentIndex: number, contentType: SalesContentTypes, file: File) => {
      const url = await signedUrlHandler.get(contentIndex, contentType, file.name);
      await fileHandler.upload(contentIndex, url[0].value, file);
    },
    []
  );

  const download = useCallback(
    async (contentIndex: number, contentType: SalesContentTypes, fileName: string) => {
      await signedUrlHandler.get(contentIndex, contentType, fileName).then((data) => {
        fileHandler.download(contentIndex, data[0].value);
      });
    },
    []
  );

  return [
    signedUrlStatuses,
    fileStatuses,
    blobs,
    {
      upload: (contentIndex: number, contentType: SalesContentTypes, file: File) =>
        upload(contentIndex, contentType, file),
      download: (
        contentIndex: number,
        contentType: SalesContentTypes,
        fileName: string
      ) => download(contentIndex, contentType, fileName),
    },
  ];
};

export default useSalesContentFiles;
