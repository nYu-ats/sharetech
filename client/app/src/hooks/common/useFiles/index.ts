import axios from "axios";
import { useCallback, useState } from "react";
import { UseFilesProps, UploadHandler, FileStatus } from "./type";

const initialFileStatus = {
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const useFiles = (
  props: UseFilesProps
): [Array<FileStatus>, Array<Blob | null>, UploadHandler] => {
  const [statuses, setStatus] = useState<Array<FileStatus>>(
    [...Array(props.targetCount)].map((_) => {
      return initialFileStatus;
    })
  );

  const [blobs, setBlob] = useState<Array<Blob | null>>(Array(props.targetCount));

  const updateStatus = (targetIndex: number, nextStatus: FileStatus) => {
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

  const download = useCallback(async (contentIndex: number, url: string) => {
    updateStatus(contentIndex, { isLoading: true, isSuccess: false, isError: false });
    await fetch(url, {
      headers: { "Content-Type": "application/octet-stream" },
    })
      .then((res) => res.blob())
      .then((blob) => {
        updateStatus(contentIndex, {
          isError: false,
          isLoading: false,
          isSuccess: true,
        });
        const newBlobs = blobs;
        newBlobs[contentIndex] = blob;
        setBlob(newBlobs);
      })
      .catch((e) => {
        updateStatus(contentIndex, {
          isError: true,
          isLoading: false,
          isSuccess: false,
        });
      });
  }, []);

  const upload = useCallback(async (contentIndex: number, url: string, file: File) => {
    updateStatus(contentIndex, { isLoading: true, isSuccess: false, isError: false });
    if (file) {
      await axios
        .put(url, file, {
          headers: { "Content-Type": "application/octet-stream" },
        })
        .then((res) => {
          const result = res.data;
          updateStatus(contentIndex, {
            isError: false,
            isLoading: false,
            isSuccess: true,
          });
        })
        .catch((e) => {
          updateStatus(contentIndex, {
            isError: true,
            isLoading: false,
            isSuccess: false,
          });
        });
    }
  }, []);

  return [
    statuses,
    blobs,
    {
      download: (contentIndex: number, url: string) => download(contentIndex, url),
      upload: (contentIndex: number, url: string, file: File) =>
        upload(contentIndex, url, file),
    },
  ];
};

export default useFiles;
