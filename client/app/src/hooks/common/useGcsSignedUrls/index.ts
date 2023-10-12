import { useCallback, useState } from "react";
import { getSignedGcsUrl } from "repositories/shareTech/salesContent";
import { AllowedStorageMethod, SalesContentTypes } from "shared/constants/enum";
import {
  UseGcsSignedUrlProps,
  GcsSignedUrl,
  UrlStatus,
  GcsSignedUrlHandler,
  SignedUrl,
} from "./type";

const initialUrlStatus = {
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const useGcsSignedUrls = (
  props: UseGcsSignedUrlProps
): [GcsSignedUrl, Array<UrlStatus>, GcsSignedUrlHandler] => {
  const contentId = props.contentId;
  const allowdMethod = props.method;
  const storageType = props.storageType;

  const [statuses, setStatus] = useState<Array<UrlStatus>>(
    [...Array(props.targetCount)].map((_) => initialUrlStatus)
  );
  const [urlData, setUrlData] = useState<GcsSignedUrl>({
    allowdMethod: allowdMethod,
    urls: [],
  });

  const updateStatus = (targetIndex: number, nextStatus: UrlStatus) => {
    setStatus(
      statuses.map((status, index) => {
        if (index === targetIndex) {
          return { ...nextStatus };
        } else {
          return status;
        }
      })
    );
  };

  const getSignedUrl = useCallback(
    async (contentIndex: number, contentType: SalesContentTypes, name: string) => {
      // TODO expirationによる制御追加
      updateStatus(contentIndex, { isLoading: true, isSuccess: false, isError: false });
      const signedUrls = await getSignedGcsUrl(
        contentId,
        contentType,
        String(contentIndex),
        storageType,
        allowdMethod,
        [name],
        props.organization
      )
        .then((res) => {
          const result = res.result;
          const urls = result.urls.map((url) => {
            return {
              key: url.key,
              value: url.value,
              expiration: new Date(result.expiration),
            };
          });
          setUrlData({
            allowdMethod: result.allowd_method as AllowedStorageMethod,
            urls: [...urlData.urls, ...urls],
          });
          updateStatus(contentIndex, {
            isError: false,
            isLoading: false,
            isSuccess: true,
          });
          return urls;
        })
        .catch((e) => {
          updateStatus(contentIndex, {
            isError: true,
            isLoading: false,
            isSuccess: false,
          });
          return [];
        });
      return signedUrls;
    },
    []
  );

  return [
    urlData,
    statuses,
    {
      get: (contentIndex: number, contentType: SalesContentTypes, name: string) =>
        getSignedUrl(contentIndex, contentType, name),
    },
  ];
};

export default useGcsSignedUrls;
