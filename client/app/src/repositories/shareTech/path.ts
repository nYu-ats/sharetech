import { SalesContentTypes } from "shared/constants/enum";

export const Path = {
  techNote: "/techNote",
  accessToken: "/auth/token",
  user: "/users",
  salesContents: {
    retrieve: (contentId: string) => {
      return `/sales-contents/${contentId}`;
    },
    list: "/sales-contents/",
    post: "/sales-contents",
    put: (contentId: string) => {
      return `/sales-contents/${contentId}`;
    },
    share: {
      users: (contentId: string) => {
        return `/sales-contents/${contentId}/share/users`;
      },
      password: (contentId: string) => {
        return `/sales-contents/${contentId}/share/password`;
      },
    },
  },
  storage: {
    signedUrl: (
      contentId: string,
      contentType: SalesContentTypes,
      contentIndex: string
    ) => {
      return `/sales-contents/${contentId}/contents/${contentIndex}/${contentType}/storage/signed-url`;
    },
    checkFileExist: (
      contentId: string,
      contentType: SalesContentTypes,
      contentIndex: string,
      fileName: string
    ) => {
      return `/sales-contents/${contentId}/contents/${contentIndex}/${contentType}/storage/${fileName}/exist`;
    },
  },
};
