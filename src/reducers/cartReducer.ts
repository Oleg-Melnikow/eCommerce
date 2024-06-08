import { createContext } from "react";
import { Cart } from "types/API/Cart";

interface CartStateType {
  activeCart: Cart | null;
}

export const CartInitialState: CartStateType = {
  activeCart: null,
};

export const cartReducer = (
  state: CartStateType,
  action: ActionsType
): CartStateType => {
  switch (action.type) {
    case "cart/eCommerce/SET-ACTIVE-CART":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const setActiveCart = (activeCart: Cart) =>
  ({
    type: "cart/eCommerce/SET-ACTIVE-CART",
    payload: { activeCart },
  }) as const;

type ActionsType = ReturnType<typeof setActiveCart>;

export interface CartContextValue extends CartStateType {}

export const CartContext = createContext<CartContextValue>({
  ...CartInitialState,
});
