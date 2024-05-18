import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import API from "api/API";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginType } from "types/InputTagProps";
import API from "api/API";
import toastOptions from "helpers/toastOptions";
import {
  AuthContext,
  AuthInitialState,
  authReducer,
  initialize,
  loading,
} from "../reducers/authReducer";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider(props: AuthProviderProps): ReactElement {
  const { children } = props;
  const [state, dispatch] = useReducer(authReducer, AuthInitialState);
  const navigate = useNavigate();

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
        console.log(error);
      } finally {
        dispatch(loading(false));
      }
    },
    [navigate]
  );

  const logoutAccount = useCallback(async () => {
    localStorage.clear();
    API.getInstance()
      ?.getToken()
      .then(() => {
        dispatch(initialize(false, null));
        navigate("/login");
      });
  }, [navigate]);

  useEffect(() => {
    initializeAccount();
  }, []);

  const contextValue = useMemo(
    () => ({ ...state, logoutAccount, login }),
    [state, logoutAccount, login]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
