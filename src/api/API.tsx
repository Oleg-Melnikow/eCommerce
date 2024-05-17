import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import {
  CustomerSignInResult,
  MyCustomerDraft,
  MyCustomerSignin,
} from "types/API/Customer";
import errorHandler from "../helpers/errorHandler";

import toastOptions from "../helpers/toastOptions";

export default class API {
  protected static instance: API | null = null;

  protected apiInstance: AxiosInstance | undefined;

  protected authInstance = axios.create({
    baseURL: `${process.env.CTP_AUTH_URL}/oauth`,
    auth: {
      username: process.env.CTP_CLIENT_ID ?? "",
      password: process.env.CTP_CLIENT_SECRET ?? "",
    },
    params: {
      scope: process.env.CTP_SCOPES,
    },
  });

  protected navigate: (to: string) => void;

  private constructor(navigate: (to: string) => void) {
    this.navigate = navigate;
    this.createAPI();
  }

  public static getInstance(navigate?: (to: string) => void): API | null {
    if (!this.instance && navigate) this.instance = new API(navigate);
    return this.instance;
  }

  private async createAPI(customerData?: MyCustomerDraft): Promise<void> {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token || customerData) {
      this.getToken(customerData).then(() => this.createAPI());
    } else {
      const {
        access_token: accessToken,
        token_type: tokenType,
        scope,
      } = JSON.parse(token);
      this.checkToken().then((isActive) => {
        if (!isActive)
          if (scope.includes("anonymous_id")) {
            this.getToken().then(() => this.createAPI()); // If the anonymous user's token is not active, we get a new token.
          } else if (scope.includes("customer_id")) {
            this.getToken().then(() => this.navigate("/login"));
            toast.error("The token expired. Please login again"); // If the user's token is not active, we redirect the user to the `login` page
          }
      });
      this.apiInstance = axios.create({
        baseURL: `${process.env.CTP_API_URL}/${process.env.CTP_PROJECT_KEY}`,
        headers: { Authorization: `${tokenType} ${accessToken}` },
        responseType: "json",
      });
      this.apiInstance.interceptors.request.use((config) => {
        // this.refreshToken(); !!!An error occurs here. I'll fix it.
        return config;
      });
    }
  }

  private async getToken(customerData?: MyCustomerDraft): Promise<void> {
    try {
      const response = customerData
        ? await this.authInstance.post(
            `/${process.env.CTP_PROJECT_KEY}/customers/token`,
            null,
            {
              params: {
                grant_type: "password",
                username: customerData.email,
                password: customerData.password,
              },
            }
          )
        : await this.authInstance.post(
            `/${process.env.CTP_PROJECT_KEY}/anonymous/token`,
            null,
            {
              params: {
                grant_type: "client_credentials",
              },
            }
          );
      if (response.status === 200) {
        localStorage.setItem("ACCESS_TOKEN", JSON.stringify(response.data));
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

  private async checkToken(): Promise<boolean> {
    try {
      const accessToken = localStorage.getItem("ACCESS_TOKEN");
      if (accessToken) {
        const { access_token: token } = JSON.parse(accessToken);
        const response = await this.authInstance.post(`/introspect`, null, {
          params: {
            token,
          },
        });
        if (response.status === 200) {
          return response.data.active;
        }
        return false;
      }
    } catch (error) {
      return false;
    }
    return false;
  }

  private async refreshToken(): Promise<void> {
    try {
      const accessToken = localStorage.getItem("ACCESS_TOKEN");
      if (accessToken) {
        const { refresh_token: refreshToken } = JSON.parse(accessToken);
        const response = await this.authInstance.post(`/token`, null, {
          params: {
            grant_type: "refresh_token",
            refresh_token: refreshToken,
          },
        });
        if (response.status === 200) {
          localStorage.setItem("ACCESS_TOKEN", JSON.stringify(response.data));
        } else {
          console.error(
            `Error fetching token: ${response.status} ${response.statusText}`
          );
        }
      }
    } catch (error) {
      if (error instanceof Error)
        console.error(`Error fetching token: ${error.message}`);
    }
  }

  public async createCustomer(customerData: MyCustomerDraft): Promise<void> {
    const createAPIBinded = this.createAPI.bind(this);
    if (this.apiInstance)
      toast.promise(
        this.apiInstance?.post("/me/signup", customerData),
        {
          pending: "Please, wait.",
          success: {
            render(props) {
              const response = props.data as AxiosResponse;
              if (response.status === 201) {
                createAPIBinded(customerData);
                return "Registration was successfull";
              }
              throw new Error(
                "Something went wrong during the registration process. Please, should try again later."
              );
            },
          },
          error: {
            render(props) {
              const error = props.data as AxiosError;
              return `${errorHandler(props)}`;
            },
          },
        },
        toastOptions
      );
  }

  public async signInCustomer(customerData: MyCustomerSignin): Promise<void> {
    const isCustomerExist = await this.checkCustomerByEmail(customerData.email);
    this.createAPI(customerData).then(() => {
      if (this.apiInstance)
        toast
          .promise(
            this.apiInstance.post("/me/login/", customerData),
            {
              pending: "Please wait.",
              success: {
                render(props) {
                  const response = props.data as AxiosResponse;
                  if (response.status === 200) {
                    const { customer } = response.data as CustomerSignInResult;
                    return `Welcome ${customer.firstName ?? ""} ${customer.lastName ?? ""}!`;
                  }
                  throw new Error("Undefined error");
                },
              },
              error: {
                render(props) {
                  return isCustomerExist
                    ? errorHandler(props)
                    : `The user with the email address "${customerData.email}" is not registered. Please check your email address or register.`;
                },
              },
            },
            toastOptions
          )
          .then((response) => {
            console.log(response);
            if (
              response &&
              typeof response === "object" &&
              "status" in response &&
              response.status === 200
            )
              API.instance?.navigate("/");
          });
    });
  }

  private async checkCustomerByEmail(email: string): Promise<boolean> {
    const params = {
      where: `email="${email}"`,
    };
    if (this.apiInstance)
      try {
        const response: AxiosResponse = await this.apiInstance?.head(
          "/customers/",
          { params }
        );
        if (response.status === 200) {
          return true;
        }
        return false;
      } catch (error) {
        console.error(
          "An error occurred while verifying the existence of the client.",
          error
        );
        return false;
      }
    return false;
  }
}
