import axios, { Axios, AxiosHeaders } from "axios";

class ShareTechApiClient {
  endpoint: string;
  client: Axios;

  private static instance: ShareTechApiClient;

  constructor() {
    this.endpoint =
      process.env.NEXT_PUBLIC_SHARETECH_API_ENDPOINT || "http://127.0.0.1:8080/api/v1";
    this.client = axios.create({
      timeout: Number(process.env.NEXT_PUBLIC_SHARETECH_API_TIMEOUT) || 3000,
    });
    this.client.defaults.headers.common["Access-Control-Allow-Origin"] =
      process.env.NEXT_PUBLIC_SHARETECH_API_ORIGIN || "http://127.0.0.1:8080";
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
