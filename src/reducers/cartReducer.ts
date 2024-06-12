import { createContext } from "react";
import { Cart, LineItem } from "types/API/Cart";
import { DiscountCode } from "types/API/Discount";
import { ProductData } from "types/API/Product";

interface CartStateType {
  activeCart: Cart | null;
  activeDiscountCodes: DiscountCode | null;
  isLoading: boolean;
}

export const CartInitialState: CartStateType = {
  activeCart: null,
  activeDiscountCodes: null,
  isLoading: false,
};

export const cartReducer = (
  state: CartStateType,
  action: ActionsType
): CartStateType => {
  switch (action.type) {
    case "cart/eCommerce/SET-ACTIVE-CART":
    case "cart/eCommerce/SET-ACTIVE-DISCOUNT-CODE":
    case "cart/eCommerce/SET-IS-LOADING":
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

export const loading = (isLoading: boolean) =>
  ({
    type: "cart/eCommerce/SET-IS-LOADING",
    payload: { isLoading },
  }) as const;

export const setActiveDiscountCode = (activeDiscountCode: DiscountCode) =>
  ({
    type: "cart/eCommerce/SET-ACTIVE-DISCOUNT-CODE",
    payload: { activeDiscountCode },
  }) as const;

type ActionsType =
  | ReturnType<typeof setActiveCart>
  | ReturnType<typeof setActiveDiscountCode>
  | ReturnType<typeof loading>;

export interface CartContextValue extends CartStateType {
  addProductToActiveCart: (
    product: ProductData | LineItem,
    count: number
  ) => Promise<void>;
  fetchActiveCart: () => Promise<void>;
  removeProductFromActiveCart: (
    product: LineItem,
    quantity: number
  ) => Promise<void>;
  addDiscountCode: (code: string) => Promise<void>;
  fetchDiscountCodeFromCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextValue>({
  ...CartInitialState,
  addProductToActiveCart: () => Promise.resolve(),
  fetchActiveCart: () => Promise.resolve(),
  removeProductFromActiveCart: () => Promise.resolve(),
  addDiscountCode: () => Promise.resolve(),
  fetchDiscountCodeFromCart: () => Promise.resolve(),
});
