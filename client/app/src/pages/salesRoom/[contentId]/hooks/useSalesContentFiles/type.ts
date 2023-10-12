import {
  AllowedStorageMethod,
  SalesContentTypes,
  StorageType,
} from "shared/constants/enum";

export type HandlerStatus = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

export type SalesContentFilesHandlers = {
  upload: (contentIndex: number, contentType: SalesContentTypes, file: File) => void;
  download: (
    contentIndex: number,
    contentType: SalesContentTypes,
    fileName: string
  ) => void;
};

export type UseSalesContentFilesProps = {
  contentId: string;
  storageType: StorageType;
  method: AllowedStorageMethod;
  targetCount: number;
  organization: string | null;
};
