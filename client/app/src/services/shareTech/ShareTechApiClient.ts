import axios, { Axios } from "axios";

class ShareTechApiClient {
  ENDPOINT: string;
  client: Axios;
  private static instance: ShareTechApiClient;

  constructor() {
    if (process.env.SHARETECH_API_ENDPOINT) {
      this.ENDPOINT = process.env.SHARETECH_API_ENDPOINT;
    } else {
      this.ENDPOINT = "http://localhost:3333";
    }
    if (process.env.SHARETECH_API_TIMEOUT) {
      this.client = axios.create({
        timeout: Number(process.env.SHARETECH_API_TIMEOUT),
      });
    } else {
      this.client = axios.create({
        timeout: 3000,
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
