import axios, { AxiosInstance } from "axios";

export default class CustomerAPI {
  instance: AxiosInstance | undefined;

  constructor(email: string, password: string) {
    this.getToken(email, password);
  }

  private createAPI(email: string, password: string): void {
    const token = localStorage.getItem("ACCES_TOKEN_CUSTOMER");
    if (!token) {
      this.getToken(email, password).then(() =>
        this.createAPI(email, password)
      );
    } else {
      console.log(token);
      const { accessToken, tokenType } = JSON.parse(token);
      this.instance = axios.create({
        baseURL: `${process.env.CTP_API_URL}/${process.env.CTP_PROJECT_KEY}`,
        headers: { Authorization: `${tokenType} ${accessToken}` },
        responseType: "json",
      });
    }
  }

  private async getToken(email: string, password: string): Promise<void> {
    try {
      const response = await axios.post(
        `${process.env.CTP_AUTH_URL}/oauth/${process.env.CTP_PROJECT_KEY}/customers/token`,
        null,
        {
          params: {
            grant_type: "password",
            scope: process.env.CTP_SCOPES_CUSTOMER,
            username: email,
            password,
          },
          auth: {
            username: process.env.CTP_CLIENT_ID_CUSTOMER ?? "",
            password: process.env.CTP_CLIENT_SECRET_CUSTOMER ?? "",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem(
          "ACCES_TOKEN_CUSTOMER",
          JSON.stringify(response.data)
        );
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
