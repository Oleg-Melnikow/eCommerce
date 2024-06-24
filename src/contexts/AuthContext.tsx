import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginType } from "types/InputTagProps";
import API from "api/API";
import toastOptions from "helpers/toastOptions";
import { Customer, MyCustomerDraft } from "types/API/Customer";
import {
  ActionAddressType,
  AddressForm,
  ChangePasswordType,
  DeleteParamsType,
  PersonalDataType,
} from "types/RegisterForm";
import {
  AuthContext,
  AuthInitialState,
  authReducer,
  initialize,
  loading,
  receivingToken,
} from "../reducers/authReducer";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider(props: AuthProviderProps): ReactElement {
  const { children } = props;
  const [state, dispatch] = useReducer(authReducer, AuthInitialState);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const saveUserData = (response: Customer): void => {
    localStorage.setItem("userProfile", JSON.stringify(response));
    dispatch(initialize(true, response));
  };

  const changePersonalData = useCallback(
    async (personalData: PersonalDataType) => {
      dispatch(loading(true));
      try {
        const clientAPI = API.getInstance();
        const response = await clientAPI?.changePersonalData(personalData);
        if (response) {
          saveUserData(response);
        }
        toast.success(
          "Personal information was changed successfully!",
          toastOptions
        );
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error?.message, toastOptions);
        }
      } finally {
        dispatch(loading(false));
      }
    },
    []
  );

  const changePassword = useCallback(
    async (passwordData: ChangePasswordType) => {
      dispatch(loading(true));
      try {
        const clientAPI = API.getInstance();
        const response = await clientAPI?.changePassword(passwordData);
        if (response) {
          saveUserData(response);
        }
        toast.success("Password was changed successfully!", toastOptions);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error?.message, toastOptions);
        }
      } finally {
        dispatch(loading(false));
      }
    },
    []
  );

  const updateUserAdress = useCallback(
    async (
      id: string,
      version: number,
      address: AddressForm,
      addressId?: string
    ): Promise<void> => {
      dispatch(loading(true));
      try {
        let action: ActionAddressType = {
          action: addressId ? "changeAddress" : "addAddress",
          address,
        };
        if (addressId) {
          action = { ...action, addressId };
        }
        const clientAPI = API.getInstance();
        const response = await clientAPI?.updateAddress(id, version, action);
        if (response) {
          saveUserData(response);
        }
        toast.success(
          `Address was ${addressId ? "changed" : "added"} successfully!`,
          toastOptions
        );
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error?.message, toastOptions);
        }
      } finally {
        dispatch(loading(false));
      }
    },
    []
  );

  const changeUserAdress = useCallback(async (params: DeleteParamsType) => {
    dispatch(loading(true));
    try {
      const clientAPI = API.getInstance();
      const response = await clientAPI?.changeAddress(params);
      if (response) {
        saveUserData(response);
      }
      const message =
        params.action === "removeAddress" ? "removed" : "changed type";
      toast.success(`Address was ${message} successfully!`, toastOptions);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error?.message, toastOptions);
      }
    } finally {
      dispatch(loading(false));
    }
  }, []);

  const initializeAccount = async (): Promise<void> => {
    try {
      const accessToken = await localStorage.getItem("ACCESS_TOKEN");
      const user = await localStorage.getItem("userProfile");
      if (accessToken && user) {
        dispatch(initialize(true, JSON.parse(user)));
      } else {
        await dispatch(initialize(false, null));
      }
    } catch (err) {
      console.log(err);
      dispatch(initialize(false, null));
    }
  };

  const login = useCallback(
    async (data: LoginType) => {
      dispatch(loading(true));
      try {
        const clientAPI = API.getInstance();
        const response = await clientAPI?.signInCustomer(data);
        if (response?.customer) {
          const { customer } = response;
          toast.success(
            `Welcome ${customer.firstName ?? ""} ${customer.lastName ?? ""}!`,
            toastOptions
          );
          localStorage.setItem("userProfile", JSON.stringify(customer));
          dispatch(initialize(true, customer));
          navigate("/");
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error?.message, toastOptions);
        }
      } finally {
        dispatch(loading(false));
      }
    },
    [navigate]
  );

  const signup = useCallback(
    async (customerData: MyCustomerDraft) => {
      dispatch(loading(true));
      try {
        const clientAPI = API.getInstance();
        const response = await clientAPI?.createCustomer(customerData);
        if (response?.customer) {
          localStorage.setItem(
            "userProfile",
            JSON.stringify(response?.customer)
          );
          dispatch(initialize(true, response?.customer));
          navigate("/");
          toast.success("Registration was successfull!", toastOptions);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error?.message, toastOptions);
        }
      } finally {
        dispatch(loading(false));
      }
    },
    [navigate]
  );

  const logoutAccount = useCallback(async () => {
    ["ACCESS_TOKEN", "userProfile"].forEach((item) => {
      localStorage.removeItem(item);
    });
    API.getInstance()
      ?.createAPI()
      .then(() => {
        dispatch(initialize(false, null));
        navigate("/login");
      });
  }, [navigate]);

  const tokenReceiving = useCallback(() => {
    dispatch(receivingToken(true));
  }, []);

  useEffect(() => {
    initializeAccount();
  }, []);

  useEffect(() => {
    const userLogined = localStorage.getItem("userProfile");
    if (userLogined) {
      const pathArray = ["/login", "/registration"];
      if (pathArray.includes(pathname)) {
        navigate("/");
      }
    }
    if (pathname.includes("profile") && !userLogined) {
      navigate("/login");
    }
  }, [pathname, navigate]);

  const contextValue = useMemo(
    () => ({
      ...state,
      logoutAccount,
      login,
      signup,
      tokenReceiving,
      updateUserAdress,
      changeUserAdress,
      changePassword,
      changePersonalData,
    }),
    [
      state,
      logoutAccount,
      login,
      signup,
      tokenReceiving,
      updateUserAdress,
      changeUserAdress,
      changePassword,
      changePersonalData,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
