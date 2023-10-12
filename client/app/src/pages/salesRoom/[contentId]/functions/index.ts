import { SalesContent } from "hooks/salesContent/useSalesContent/type";

export const convertToSalesContentFormValues = (
  salesContent: SalesContent,
  blobs: Array<Blob | null>
) => {
  const title = salesContent.title;
  const tags = salesContent.tags.map((tag) => {
    return { value: tag };
  });
  const contents = salesContent.contents.map((content) => {
    switch (content.contentType) {
      case "PDF":
      case "MOVIE":
        let targetFile = null;
        const fileType = generateFileTypeFromName(content.name);
        if (blobs[content.index] !== null && fileType) {
          const fileType = generateFileTypeFromName(content.name);
          const targetBlob = blobs[content.index] as Blob;
          targetFile = new File([targetBlob], content.name, {
            type: fileType,
          });
        }
        return {
          title: content.title,
          contentType: content.contentType,
          content: targetFile,
        };
      case "TEXT":
        return {
          title: content.title,
          contentType: content.contentType,
          content: content.text,
        };
    }
  });

  return {
    title: title,
    tags: tags,
    salesContents: contents,
  };
};

const generateFileTypeFromName = (name: string) => {
  const extension = name.split(".").slice(-1)[0];
  if (extension === "pdf") {
    return "application/pdf";
  } else if (extension === "mp4") {
    return "video/mp4";
  } else if (extension === "mpeg") {
    return "application/mpeg";
  } else {
    return "";
  }
};
