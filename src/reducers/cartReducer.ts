import { createContext } from "react";
import { Cart, LineItem } from "types/API/Cart";
import { ProductData } from "types/API/Product";

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

export interface CartContextValue extends CartStateType {
  addProductToActiveCart: (
    product: ProductData | LineItem,
    count: number
  ) => Promise<void>;
  fetchActiveCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextValue>({
  ...CartInitialState,
  addProductToActiveCart: () => Promise.resolve(),
  fetchActiveCart: () => Promise.resolve(),
});
