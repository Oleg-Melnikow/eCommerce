import axios, { AxiosInstance } from "axios";

export default class API {
  instance: AxiosInstance | undefined;

  constructor() {
    this.createAPI();
  }

  private createAPI(): void {
    const accessToken = localStorage.getItem("ACCES_TOKEN");
    const tokenType = localStorage.getItem("TOKEN_TYPE");
    if (!accessToken && !tokenType) {
      this.getToken().then(() => this.createAPI());
    } else {
      this.instance = axios.create({
        baseURL: process.env.CTP_API_URL,
        headers: { Authorization: `${tokenType} ${accessToken}` },
        responseType: "json",
      });
    }
  }

  private async getToken(): Promise<void> {
    try {
      const response = await axios.post(
        `${process.env.CTP_AUTH_URL}/oauth/token`,
        null,
        {
          params: {
            grant_type: "client_credentials",
            scope: process.env.CTP_SCOPES,
          },
          auth: {
            username: process.env.CTP_CLIENT_ID ?? "",
            password: process.env.CTP_CLIENT_SECRET ?? "",
          },
        }
      );
      if (response.status === 200) {
        const accessToken = response.data.access_token;
        const tokenType = response.data.token_type;
        localStorage.setItem("ACCES_TOKEN", accessToken);
        localStorage.setItem("TOKEN_TYPE", tokenType);
      } else {
        console.error(
          `Error fetching token: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      if (error instanceof Error)
        console.error(`Error fetching token: ${error.message}`);
    }
  }
}
