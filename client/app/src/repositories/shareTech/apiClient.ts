import axios, { Axios, AxiosHeaders } from "axios";

class ShareTechApiClient {
  ENDPOINT: string;
  client: Axios;

  private static instance: ShareTechApiClient;

  constructor() {
    if (!process.env.NEXT_PUBLIC_SHARETECH_API_ENDPOINT) {
      throw Error(
        "You should set 'NEXT_PUBLIC_SHARETECH_API_ENDPOINT' as environment variable."
      );
    } else {
      this.ENDPOINT = process.env.NEXT_PUBLIC_SHARETECH_API_ENDPOINT;
    }
    this.client = axios.create({
      timeout: Number(process.env.NEXT_PUBLIC_SHARETECH_API_TIMEOUT) || 3000,
    });
    if (!process.env.NEXT_PUBLIC_SHARETECH_API_ORIGIN) {
      throw Error(
        "You should set 'NEXT_PUBLIC_SHARETECH_API_ORIGIN' as environment variable."
      );
    } else {
      this.client.defaults.headers.common["Access-Control-Allow-Origin"] =
        process.env.NEXT_PUBLIC_SHARETECH_API_ORIGIN;
    }
    this.client.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    this.setAccessToken();
  }

  public setAccessToken() {
    if (typeof window !== "undefined") {
      this.client.interceptors.request.clear();
      this.client.interceptors.request.use((config) => {
        (config.headers as AxiosHeaders).set(
          "Authorization",
          `Bearer ${window.localStorage.getItem("ACCESSTOKEN")}`
        );
        config.withCredentials = !!window.localStorage.getItem("ACCESSTOKEN");
        return config;
      });
    }
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ShareTechApiClient();
    }

    return this.instance;
  }
}

export default ShareTechApiClient.getInstance();
