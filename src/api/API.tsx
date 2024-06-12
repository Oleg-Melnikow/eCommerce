import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import {
  Customer,
  CustomerSignInResult,
  MyCustomerDraft,
  MyCustomerSignin,
} from "types/API/Customer";
import { ProductData, Products, ProductsSearch } from "types/API/Product";
import { Categories, Category } from "types/API/Category";
import { AuthContextValue } from "reducers/authReducer";
import errorHandler from "helpers/errorHandler";
import {
  ActionAddressType,
  ChangePasswordType,
  DeleteParamsType,
  PersonalDataType,
} from "types/RegisterForm";
import { DiscountCode } from "types/API/Discount";
import { ActionTypes, Cart, LineItem, MyCartDraft } from "../types/API/Cart";

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

  protected authContext: AuthContextValue;

  private constructor(
    navigate: (to: string) => void,
    authContext: AuthContextValue
  ) {
    this.navigate = navigate;
    this.authContext = authContext;
    this.createAPI();
  }

  public static getInstance(
    navigate?: (to: string) => void,
    authContext?: AuthContextValue
  ): API | null {
    if (!this.instance && navigate && authContext)
      this.instance = new API(navigate, authContext);
    return this.instance;
  }

  public async createAPI(customerData?: MyCustomerDraft): Promise<void> {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token || customerData) {
      this.getToken(customerData).then(() => this.createAPI());
    } else {
      // const { tokenReceiving } = this.authContext;
      // tokenReceiving();
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
        throw new Error(`${response.status} ${response.statusText}`);
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

  public async createCustomer(
    customerData: MyCustomerDraft
  ): Promise<CustomerSignInResult | undefined> {
    const createAPIBinded = this.createAPI.bind(this);
    return this.apiInstance
      ?.post("/me/signup", customerData)
      .then((response) => {
        if (response?.status === 201) {
          createAPIBinded(customerData);
          return response?.data as CustomerSignInResult;
        }
        throw new Error(
          "Something went wrong during the registration process. Please, should try again later."
        );
      })
      .catch((error) => {
        throw new Error(`${errorHandler(error)}`);
      });
  }

  public async signInCustomer(
    data: MyCustomerSignin
  ): Promise<CustomerSignInResult> {
    const isCustomerExist = await this.checkCustomerByEmail(data.email);
    if (!isCustomerExist)
      throw new Error(
        `The user with the email address "${data.email}" is not registered. Please check your email address or register.`
      );
    return this.createAPI(data)
      .then(async () => {
        const response = await this.apiInstance?.post("/me/login/", data);
        return response?.data as CustomerSignInResult;
      })
      .catch((err) => {
        const message = errorHandler(err);
        throw new Error(message);
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
          (error as AxiosError).message
        );
        return false;
      }
    return false;
  }

  public async getProducts(): Promise<Products> {
    return this.createAPI()
      .then(async () => {
        const response = await this.apiInstance?.get("/products");
        return response?.data as Products;
      })
      .catch((err) => {
        const message = errorHandler(err);
        throw new Error(message);
      });
  }

  public async getcategories(): Promise<Categories> {
    return this.createAPI()
      .then(async () => {
        const response = await this.apiInstance?.get("/categories", {
          params: { limit: 40 },
        });
        return response?.data as Categories;
      })
      .catch((err) => {
        const message = errorHandler(err);
        throw new Error(message);
      });
  }

  public async getCategoriesById(id: string): Promise<Category> {
    try {
      const response = await this.apiInstance?.get(`/categories/${id}`);
      const category = response?.data as Category;
      return category;
    } catch (err) {
      const message = errorHandler(err);
      throw new Error(message);
    }
  }

  public async getProductsProjection(params: object): Promise<ProductsSearch> {
    return this.createAPI()
      .then(async () => {
        const response = await this.apiInstance?.get(
          "/product-projections/search",
          { params }
        );
        return response?.data as ProductsSearch;
      })
      .catch((err) => {
        const message = errorHandler(err);
        throw new Error(message);
      });
  }

  public async getProductById(id: string): Promise<ProductData> {
    try {
      const response = await this.apiInstance?.get(`/products/${id}`);
      if (response?.status === 200) return response.data as ProductData;
      throw new AxiosError(`Error fetching product by id: ${id}`);
    } catch (err) {
      const message = errorHandler(err);
      throw new Error(message);
    }
  }

  public async updateAddress(
    id: string,
    version: number,
    action: ActionAddressType
  ): Promise<Customer> {
    return this.createAPI()
      .then(async () => {
        const response = await this.apiInstance?.post(`/customers/${id}`, {
          version,
          actions: [{ ...action }],
        });
        return response?.data as Customer;
      })
      .catch((err) => {
        const message = errorHandler(err);
        throw new Error(message);
      });
  }

  public async changeAddress({
    action,
    addressId,
    id,
    version,
  }: DeleteParamsType): Promise<Customer> {
    return this.createAPI()
      .then(async () => {
        const response = await this.apiInstance?.post(`/customers/${id}`, {
          version,
          actions: [{ action, addressId }],
        });
        return response?.data as Customer;
      })
      .catch((err) => {
        const message = errorHandler(err);
        throw new Error(message);
      });
  }

  public async changePassword(
    passwordData: ChangePasswordType
  ): Promise<Customer> {
    return this.createAPI()
      .then(async () => {
        const response = await this.apiInstance?.post(`/customers/password`, {
          ...passwordData,
        });
        return response?.data as Customer;
      })
      .catch((err) => {
        const message = errorHandler(err);
        throw new Error(message);
      });
  }

  public async changePersonalData({
    dateOfBirth,
    email,
    firstName,
    id,
    lastName,
    version,
  }: PersonalDataType): Promise<Customer> {
    return this.createAPI()
      .then(async () => {
        const response = await this.apiInstance?.post(`/customers/${id}`, {
          version,
          actions: [
            {
              action: "changeEmail",
              email,
            },
            {
              action: "setFirstName",
              firstName,
            },
            {
              action: "setLastName",
              lastName,
            },
            {
              action: "setDateOfBirth",
              dateOfBirth,
            },
          ],
        });
        return response?.data as Customer;
      })
      .catch((err) => {
        const message = errorHandler(err);
        throw new Error(message);
      });
  }

  public async getCart(): Promise<Cart> {
    try {
      const response = await this.apiInstance?.get(`/me/active-cart`);
      if (response?.status === 200) return response.data as Cart;
      throw new AxiosError("Error fething cart");
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 404)
        return this.createCart();
      const message = errorHandler(err);
      throw new Error(message);
    }
  }

  private async createCart(): Promise<Cart> {
    try {
      const myCartDraft: MyCartDraft = { currency: "EUR" };
      const response = await this.apiInstance?.post(`/me/carts`, myCartDraft);
      if (response?.status === 201) return response.data as Cart;
      throw new AxiosError("Error creating cart");
    } catch (err) {
      const message = errorHandler(err);
      throw new Error(message);
    }
  }

  private async updateCart(cart: Cart, action: ActionTypes): Promise<Cart> {
    try {
      const response = await this.apiInstance?.post(`/me/carts/${cart.id}`, {
        version: cart.version,
        actions: [action],
      });
      if (response?.status === 200) return response.data as Cart;
      throw new AxiosError("Failed to update cart");
    } catch (err) {
      const message = errorHandler(err);
      throw new Error(message);
    }
  }

  public async addProductToCart(
    product: ProductData | LineItem,
    cart: Cart,
    quantity: number
  ): Promise<Cart> {
    const instanceOfProductData = (
      obj: ProductData | LineItem
    ): obj is ProductData => "masterData" in obj;

    const sku = instanceOfProductData(product)
      ? product.masterData.current.masterVariant.sku
      : product.variant?.sku;
    const action = {
      action: "addLineItem",
      sku,
      quantity,
    };
    return this.updateCart(cart, action);
  }

  public async removeProductFromCart(
    product: LineItem,
    cart: Cart,
    quantity: number
  ): Promise<Cart> {
    const action = {
      action: "removeLineItem",
      lineItemId: product.id,
      quantity,
    };
    return this.updateCart(cart, action);
  }

  public async addDiscountCodeToCart(cart: Cart, code: string): Promise<Cart> {
    const action = {
      action: "addDiscountCode",
      code,
    };
    return this.updateCart(cart, action);
  }

  public async getDiscountCodeById(id: string): Promise<DiscountCode> {
    try {
      const response = await this.apiInstance?.get(`/discount-codes/${id}`);
      if (response?.status === 200) return response.data as DiscountCode;
      throw new AxiosError("Error fething cart");
    } catch (err) {
      const message = errorHandler(err);
      throw new Error(message);
    }
  }
}
