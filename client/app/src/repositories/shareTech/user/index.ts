import { User } from "../model";
import ShareTechApi from "../apiClient";
import { Path } from "../path";
import { AxiosResponse } from "axios";

export const getCurrentUser = async (token?: string): Promise<{ result: User }> => {
  const authHeader =
    token !== undefined ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response: AxiosResponse<User> = await ShareTechApi.client.get(
    ShareTechApi.ENDPOINT + Path.user + "/me",
    authHeader
  );

  return { result: response.data };
};
