import {
  FileExist,
  MovieContent,
  PdfContent,
  SalesContent,
  SalesContentDb,
  SalesContentSharedUsers,
  SalesContentSharingPassword,
  StepContent,
  StorageSignedUrl,
  TextContent,
} from "../model";
import ShareTechApi from "../apiClient";
import { Path } from "../path";
import { AxiosResponse } from "axios";
import {
  AllowedStorageMethod,
  SalesContentTypes,
  StorageType,
} from "shared/constants/enum";

export const retrieveSalesContent = async (
  contentId: string,
  organization: string | null
): Promise<{ result: SalesContentDb }> => {
  const response: AxiosResponse<SalesContentDb> = await ShareTechApi.client.get(
    ShareTechApi.endpoint + Path.salesContents.retrieve(contentId),
    { params: { organization: organization } }
  );

  return { result: response.data };
};

export const listSalesContents = async (
  userId: string,
  orderBy: string,
  cursor?: number,
  limit?: number
): Promise<{ result: Array<SalesContentDb>; nextCursor: number | undefined }> => {
  const response: { data: Array<SalesContentDb>; nextCursor: number | null } =
    await ShareTechApi.client
      .get(ShareTechApi.endpoint + Path.salesContents.list, {
        params: {
          owner_id: userId,
          _order_by: orderBy,
          _cursor: cursor,
          _limit: limit,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          return { data: [], nextCursor: null };
        } else {
          return { data: res.data.data, nextCursor: res.data.pagnation.next_cursor };
        }
      });
  return {
    result: response.data,
    nextCursor: response.nextCursor !== null ? response.nextCursor : undefined,
  };
};

export const createSalesContent = async (
  organizationId: string,
  userId: string,
  title: string,
  tags: Array<string> = [],
  contents: Array<PdfContent | TextContent | MovieContent> = [
    { index: 0, title: "", content_type: "PDF", name: "" },
    { index: 1, title: "", content_type: "PDF", name: "" },
    { index: 2, title: "", content_type: "PDF", name: "" },
  ]
): Promise<{ result: SalesContentDb }> => {
  const response: AxiosResponse<SalesContentDb> = await ShareTechApi.client.post(
    ShareTechApi.endpoint + Path.salesContents.post,
    {
      owner_id: userId,
      title: title,
      tags: tags,
      contents: contents,
    }
  );

  return { result: response.data };
};

export const getSignedGcsUrl = async (
  contentId: string,
  contentType: SalesContentTypes,
  contentIndex: string,
  storageType: StorageType,
  method: AllowedStorageMethod,
  resources: Array<string>,
  organization: string | null
): Promise<{ result: StorageSignedUrl }> => {
  const response: AxiosResponse<StorageSignedUrl> = await ShareTechApi.client.get(
    ShareTechApi.endpoint +
      Path.storage.signedUrl(contentId, contentType, contentIndex),
    {
      params: {
        storage_type: storageType,
        method: method,
        resources,
        organization: organization,
      },
    }
  );

  return { result: response.data };
};

export const checkFileExist = async (
  contentId: string,
  contentType: SalesContentTypes,
  contentIndex: string,
  storageType: StorageType,
  fileName: string
): Promise<{ result: FileExist }> => {
  const response: AxiosResponse<FileExist> = await ShareTechApi.client.get(
    ShareTechApi.endpoint +
      Path.storage.checkFileExist(contentId, contentType, contentIndex, fileName),
    {
      params: {
        storage_type: storageType,
      },
    }
  );

  return { result: response.data };
};

export const putSalesContent = async (
  contentId: string,
  title: string,
  ownerId: string,
  tags: Array<string>,
  contents: Array<PdfContent | TextContent | MovieContent>
) => {
  const response: AxiosResponse<SalesContentDb> = await ShareTechApi.client.put(
    ShareTechApi.endpoint + Path.salesContents.put(contentId),
    {
      title: title,
      owner_id: ownerId,
      tags: tags,
      contents: contents,
    }
  );

  return { result: response.data };
};

export const getSharedUsers = async (contentId: string) => {
  const response: AxiosResponse<SalesContentSharedUsers> =
    await ShareTechApi.client.get(
      ShareTechApi.endpoint + Path.salesContents.share.users(contentId)
    );
  return { result: response.data };
};

export const getSharedPassword = async (contentId: string) => {
  const response: AxiosResponse<SalesContentSharingPassword> =
    await ShareTechApi.client.get(
      ShareTechApi.endpoint + Path.salesContents.share.password(contentId)
    );
  return { result: response.data };
};

export const updateSharedUsers = async (
  contentId: string,
  users: Array<string>,
  isActive: boolean = false
) => {
  const response: AxiosResponse<SalesContentSharedUsers> =
    await ShareTechApi.client.put(
      ShareTechApi.endpoint + Path.salesContents.share.users(contentId),
      {
        users: users.map((user) => {
          return {
            user_id: user,
            is_active: isActive,
          };
        }),
      }
    );
  return { result: response.data };
};

export const updatePassword = async (contentId: string, password: string) => {
  const response: AxiosResponse<SalesContentSharedUsers> =
    await ShareTechApi.client.put(
      ShareTechApi.endpoint + Path.salesContents.share.password(contentId),
      { password: password }
    );
  return { result: response.data };
};
