export type UseFilesProps = {
  targetCount: number;
};

export type UploadStatus = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

export type FileStatus = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

export type UploadHandler = {
  download: (contentIndex: number, url: string) => Promise<void>;
  upload: (contentIndex: number, url: string, file: File) => Promise<void>;
};
