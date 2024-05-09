import axios, { AxiosInstance } from "axios";
import { CustomerDraft } from "types/API/Customer";

class API {
  protected instance: AxiosInstance | undefined;

  constructor() {
    this.createAPI();
  }

  private createAPI(): void {
    const token = localStorage.getItem("ACCES_TOKEN");
    if (!token) {
      this.getToken().then(() => this.createAPI());
    } else {
      const { accessToken, tokenType } = JSON.parse(token);
      this.instance = axios.create({
        baseURL: `${process.env.CTP_API_URL}/${process.env.CTP_PROJECT_KEY}`,
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
        const { token_type: tokenType, access_token: accessToken } =
          response.data;
        localStorage.setItem(
          "ACCES_TOKEN",
          JSON.stringify({ accessToken, tokenType })
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

  public async createCustomer(customerData: CustomerDraft): Promise<void> {
    this.instance
      ?.post("/customers/", customerData)
      .then((response) => {
        if (response.status === 201) console.log(response);
        else console.error(`Error registration user: ${response.statusText}`);
      })
      .catch((error) =>
        console.log(
          error.response.status === 400 // Error when re-registering an already registered user
            ? error.response.data.message
            : error.message
        )
      );
  }
}
const clientAPI = new API();
export default clientAPI;
