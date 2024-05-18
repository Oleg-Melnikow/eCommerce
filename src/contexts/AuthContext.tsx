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
import {
  AuthContext,
  AuthInitialState,
  authReducer,
  initialize,
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
    () => ({ ...state, logoutAccount }),
    [state, logoutAccount]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
