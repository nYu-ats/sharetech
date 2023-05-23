import { AccessToken } from "../model";
import ShareTechApi from "../apiClient";
import { Path } from "../path";
import { AuthInfo } from "./auth.type";
import { AxiosResponse } from "axios";

export const getAccessToken = async (
  body: AuthInfo
): Promise<{ result: AccessToken }> => {
  const token: AccessToken = await ShareTechApi.client
    .postForm(ShareTechApi.ENDPOINT + Path.accessToken, {
      username: body.email,
      password: body.password,
    })
    .then((response) => {
      window.localStorage.setItem("ACCESSTOKEN", response.data.token);
      ShareTechApi.setAccessToken();
      return response.data;
    });

  return { result: token };
};
