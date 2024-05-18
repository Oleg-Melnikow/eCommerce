import { createContext } from "react";
import { Customer } from "types/API/Customer";
import { LoginType } from "types/InputTagProps";

interface AuthStateType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: Customer | null;
}

export const AuthInitialState: AuthStateType = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export const authReducer = (
  state: AuthStateType,
  action: ActionsType
): AuthStateType => {
  switch (action.type) {
    case "auth/eCommerce/SET-IS-LOADING":
    case "auth/eCommerce/INITIALIZE":
    case "auth/eCommerce/SET-USER":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const loading = (isLoading: boolean) =>
  ({
    type: "auth/eCommerce/SET-IS-LOADING",
    payload: { isLoading },
  }) as const;

export const initialize = (isAuthenticated: boolean, user: Customer | null) =>
  ({
    type: "auth/eCommerce/INITIALIZE",
    payload: { isAuthenticated, user },
  }) as const;

export const setUser = (user: Customer) =>
  ({ type: "auth/eCommerce/SET-USER", payload: { user } }) as const;

type ActionsType =
  | ReturnType<typeof loading>
  | ReturnType<typeof initialize>
  | ReturnType<typeof setUser>;

export interface AuthContextValue extends AuthStateType {
  logoutAccount: () => void;
  login: (data: LoginType) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({
  ...AuthInitialState,
  logoutAccount: () => {},
  login: () => Promise.resolve(),
});
