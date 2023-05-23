import { TechNoteSummary } from "../model";
import ShareTechApi from "../apiClient";
import { Path } from "../path";
import { GetTechNoteList, Page } from "./technote.type";
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
