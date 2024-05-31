import { createContext } from "react";
import { Customer, MyCustomerDraft } from "types/API/Customer";
import { LoginType } from "types/InputTagProps";
import { AddressForm, DeleteParamsType } from "types/RegisterForm";

interface AuthStateType {
  isAuthenticated: boolean;
  isLoading: boolean;
  isTokenReceived: boolean;
  user: Customer | null;
}

export const AuthInitialState: AuthStateType = {
  isAuthenticated: false,
  isLoading: false,
  isTokenReceived: false,
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
    case "auth/eCommerce/SET-IS-TOKEN":
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

export const receivingToken = (isTokenReceived: boolean) =>
  ({
    type: "auth/eCommerce/SET-IS-TOKEN",
    payload: { isTokenReceived },
  }) as const;

type ActionsType =
  | ReturnType<typeof loading>
  | ReturnType<typeof initialize>
  | ReturnType<typeof setUser>
  | ReturnType<typeof receivingToken>;

export interface AuthContextValue extends AuthStateType {
  logoutAccount: () => void;
  login: (data: LoginType) => Promise<void>;
  signup: (customer: MyCustomerDraft) => Promise<void>;
  updateUserAdress: (
    id: string,
    version: number,
    address: AddressForm,
    addressId?: string
  ) => Promise<void>;
  changeUserAdress: (params: DeleteParamsType) => Promise<void>;
  tokenReceiving: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  ...AuthInitialState,
  logoutAccount: () => {},
  login: () => Promise.resolve(),
  signup: () => Promise.resolve(),
  updateUserAdress: () => Promise.resolve(),
  changeUserAdress: () => Promise.resolve(),
  tokenReceiving: () => {},
});
