import {
  AllowedStorageMethod,
  SalesContentTypes,
  StorageType,
} from "shared/constants/enum";

export type UseGcsSignedUrlProps = {
  contentId: string;
  storageType: StorageType;
  method: AllowedStorageMethod;
  targetCount: number;
  organization: string | null;
};

export type SignedUrl = {
  key: string;
  value: string;
  expiration: Date;
};

export type GcsSignedUrl = {
  allowdMethod: AllowedStorageMethod;
  urls: Array<SignedUrl>;
};

export type UrlStatus = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

export type GcsSignedUrlHandler = {
  get: (
    contentIndex: number,
    contentType: SalesContentTypes,
    name: string
  ) => Promise<Array<SignedUrl>>;
};
