import { TechNoteSummary } from "../Models";
import ShareTechApi from "../ShareTechApiClient";
import { ShareTechApi as Path } from "shared/constants/ApiPath";
import { GetTechNoteList, Page } from "../ShareTechApiClient.type";
import { AxiosResponse } from "axios";

export const getTechNoteList = async (
  params: GetTechNoteList
): Promise<{ result: Array<TechNoteSummary>; nextCursor: number | undefined }> => {
  const response: AxiosResponse<{ data: Array<TechNoteSummary>; page: Page }> =
    await ShareTechApi.client.get(ShareTechApi.ENDPOINT + Path.techNote, {
      params: {
        ...params,
      },
    });

  return { result: response.data.data, nextCursor: response.data.page.nextCursor };
};
