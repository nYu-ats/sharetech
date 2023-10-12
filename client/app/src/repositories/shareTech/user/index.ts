import { User } from "../model";
import ShareTechApi from "../apiClient";
import { Path } from "../path";
import { AxiosResponse } from "axios";

export const getCurrentUser = async (): Promise<{ result: User }> => {
  const response: AxiosResponse<User> = await ShareTechApi.client.get(
    ShareTechApi.endpoint + Path.user + "/me"
  );

  return { result: response.data };
};
