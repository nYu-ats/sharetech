import React from "react";
import { SalesContentTypes } from "shared/constants/enum";

export type FileUploadProps = {
  onDropFile: (files: File[]) => void;
  onRemoveFile: (
    e: React.MouseEvent,
    targetFile: File | null,
    files: Array<File>
  ) => void;
  targetFile: File | null;
  fileType: Omit<SalesContentTypes, "TEXT" | "STEP">;
  isUploading?: boolean;
  error?: Array<string>;
};
