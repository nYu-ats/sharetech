import { useState } from "react";
import {
  ArrayFields,
  FormHandler,
  FormStatus,
  MovieContent,
  PdfContent,
  TextContent,
  UseSalesContentProps,
} from "./type";
import { checkFileExist, putSalesContent } from "repositories/shareTech/salesContent";
import { SalesContentTypes } from "shared/constants/enum";
import { useFieldArray, useForm } from "react-hook-form";
import { SalesContentProps } from "../../SalesContentEdit.type";
import { convertToSalesContentFormValues } from "../../functions";
import useSalesContent from "../useSalesContent";
import useSalesContentFiles from "../useSalesContentFiles";

const useSalesContentForm = (
  props: UseSalesContentProps
): [FormStatus, ArrayFields, FormHandler] => {
  const contentId = props.contentId;
  const [status, setStatus] = useState({
    isLoading: false,
    isSuccess: false,
    isValid: false,
  });
  const [currentSalesContent, currentBlobs, salesContentStatus] = useSalesContent({
    contentId: contentId,
    organization: props.organization,
  });
  const { register, handleSubmit, control, watch, setValue } =
    useForm<SalesContentProps>({
      values: convertToSalesContentFormValues(currentSalesContent, currentBlobs),
    });
  const {
    fields: tagFields,
    append: tagAppend,
    remove: tagRemove,
  } = useFieldArray({
    name: "tags",
    control,
  });
  const { fields: salesContentFields } = useFieldArray({
    name: "salesContents",
    control,
  });
  const [getSignedGcsUrlStatus, uploadFileStatus, , fileHandler] = useSalesContentFiles(
    {
      contentId: contentId,
      storageType: "UPLOAD",
      method: "PUT",
      targetCount: watch("salesContents").length,
      organization: props.organization,
    }
  );

  const menuChange = (e: React.MouseEvent<HTMLElement>) => {
    const key = e.currentTarget.getAttribute("data-key")?.split("-")[0];
    const index = Number(e.currentTarget.getAttribute("data-key")?.split("-")[1]);
    if (key !== undefined && index !== undefined) {
      setValue(`salesContents.${index}.contentType`, key as SalesContentTypes);
      setValue(`salesContents.${index}.content`, null);
    }
  };

  const addTagInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    tagAppend({ value: "" });
  };

  const removeTagInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    const index = Number(e.currentTarget.getAttribute("data-index"));
    tagRemove(index);
  };

  const dropFile = (files: Array<File>, index: number) => {
    if (files.length > 0) {
      setValue(`salesContents.${index}.content`, files[0]);
      const contentType = watch(`salesContents.${index}.contentType`);
      fileHandler.upload(index, contentType, files[0]);
    }
  };

  const removeFile = (
    e: React.MouseEvent,
    targetFile: File | null,
    files: Array<File>
  ) => {
    e.stopPropagation();
    if (targetFile !== null) {
      files.splice(files.indexOf(targetFile), 1);
    }
    setValue("salesContents.0.content", null);
  };

  const checkFilesUploaded = async () => {
    setStatus({ ...status, isLoading: true });
    let isValid = true;
    await Promise.all(
      watch("salesContents").map(async (salesContent, index) => {
        if (
          salesContent.contentType === "MOVIE" ||
          (salesContent.contentType === "PDF" && salesContent.content)
        ) {
          const _content = salesContent.content as File;
          const _currentContent = currentSalesContent.contents[index] as
            | PdfContent
            | MovieContent;
          const contentSize = _content.size;
          const currentContentSize = currentBlobs[index]
            ? currentBlobs[index]?.size
            : 0;
          if (
            _content.name !== _currentContent.name ||
            contentSize !== currentContentSize
          ) {
            await checkFileExist(
              contentId,
              salesContent.contentType,
              String(index),
              "UPLOAD",
              _content.name
            )
              .then((res) => {
                const result = res.result;
                isValid = isValid && result.exist;
              })
              .catch((e) => {
                isValid = false;
              });
          }
        }
      })
    ).finally(() => {
      setStatus({ ...status, isValid: isValid, isLoading: false });
    });
    console.log(watch("salesContents"));
    return isValid;
  };

  const updateSalesContent = async (
    contentId: string,
    title: string,
    userId: string,
    tags: Array<string>,
    contents: Array<PdfContent | TextContent | MovieContent>
  ) => {
    setStatus({ ...status, isLoading: true });
    const _contents = contents.map((content) => {
      switch (content.contentType) {
        case "PDF":
          return {
            index: content.index,
            title: content.title,
            content_type: content.contentType,
            name: content.name,
          };
        case "MOVIE":
          return {
            index: content.index,
            title: content.title,
            content_type: content.contentType,
            name: content.name,
          };
        case "TEXT":
          return {
            index: content.index,
            title: content.title,
            content_type: content.contentType,
            text: content.text,
          };
      }
    });
    await putSalesContent(contentId, title, userId, tags, _contents)
      .then((res) => {
        setStatus({ ...status, isSuccess: true, isLoading: false });
        return true;
      })
      .catch((e) => {
        setStatus({ ...status, isSuccess: false, isLoading: false });
        return false;
      });
  };

  return [
    {
      ...status,
    },
    {
      tagFields: tagFields,
      salesContentFields: salesContentFields,
    },
    {
      register: register,
      watch: watch,
      handleSubmit: handleSubmit,
      menuChange: menuChange,
      addTagInput: addTagInput,
      removeTagInput: removeTagInput,
      dropFile: dropFile,
      removeFile: removeFile,
      preCheck: () => checkFilesUploaded(),
      submit: (
        contentId: string,
        title: string,
        userId: string,
        tags: Array<string>,
        contents: Array<PdfContent | TextContent | MovieContent>
      ) => updateSalesContent(contentId, title, userId, tags, contents),
    },
  ];
};

export default useSalesContentForm;
