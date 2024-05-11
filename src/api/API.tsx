import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";
import { MyCustomerDraft } from "types/API/Customer";

class API {
  protected instance: AxiosInstance | undefined;

  constructor() {
    this.createAPI();
  }

  private createAPI(customerData?: MyCustomerDraft): void {
    const token = localStorage.getItem("ACCES_TOKEN");
    if (!token || customerData) {
      this.getToken(customerData).then(() => this.createAPI());
    } else {
      const { access_token: accessToken, token_type: tokenType } =
        JSON.parse(token);
      this.instance = axios.create({
        baseURL: `${process.env.CTP_API_URL}/${process.env.CTP_PROJECT_KEY}`,
        headers: { Authorization: `${tokenType} ${accessToken}` },
        responseType: "json",
      });
    }
  }

  private async getToken(customerData?: MyCustomerDraft): Promise<void> {
    try {
      const auth = {
        username: process.env.CTP_CLIENT_ID ?? "",
        password: process.env.CTP_CLIENT_SECRET ?? "",
      };
      const response = customerData
        ? await axios.post(
            `${process.env.CTP_AUTH_URL}/oauth/${process.env.CTP_PROJECT_KEY}/customers/token`,
            null,
            {
              params: {
                grant_type: "password",
                scope: process.env.CTP_SCOPES,
                username: customerData.email,
                password: customerData.password,
              },
              auth,
            }
          )
        : await axios.post(
            `${process.env.CTP_AUTH_URL}/oauth/${process.env.CTP_PROJECT_KEY}/anonymous/token`,
            null,
            {
              params: {
                grant_type: "client_credentials",
                scope: process.env.CTP_SCOPES,
              },
              auth,
            }
          );
      if (response.status === 200) {
        localStorage.setItem("ACCES_TOKEN", JSON.stringify(response.data));
      } else {
        toast.error(
          `Error fetching token: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      if (error instanceof Error)
        toast.error(`Error fetching token: ${error.message}`);
    }
  }

  public async createCustomer(customerData: MyCustomerDraft): Promise<void> {
    this.instance
      ?.post("/me/signup", customerData)
      .then((response) => {
        if (response.status === 201) {
          this.createAPI(customerData);
          toast.success("Registration was successful");
        } else
          toast.error(
            `Something went wrong during the registration process. Please, should try again later.`
          );
      })
      .catch((error) =>
        toast.error(
          error.response.status === 400
            ? `Error registration user: re-registration of an already registered user.\n
               Please, login or use another email address.`
            : `Something went wrong during the registration process. Please, should try again later.`
        )
      );
  }
}
const clientAPI = new API();
export default clientAPI;
