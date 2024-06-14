import { createContext } from "react";
import { Cart, LineItem } from "types/API/Cart";
import { DiscountCode } from "types/API/Discount";
import { Product } from "types/API/Product";

interface CartStateType {
  activeCart: Cart | null;
  activeDiscountCode: DiscountCode | null;
  allDiscountCodes: DiscountCode[];
  isLoading: boolean;
}

export const CartInitialState: CartStateType = {
  activeCart: null,
  activeDiscountCode: null,
  allDiscountCodes: [],
  isLoading: false,
};

export const cartReducer = (
  state: CartStateType,
  action: ActionsType
): CartStateType => {
  switch (action.type) {
    case "cart/eCommerce/SET-ACTIVE-CART":
    case "cart/eCommerce/SET-ACTIVE-DISCOUNT-CODE":
    case "cart/eCommerce/SET-ALL-DISCOUNT-CODES":
    case "cart/eCommerce/SET-IS-LOADING":
      return {
        ...state,
        ...action.payload,
      };

    case "cart/eCommerce/CLEAR-CART":
      return {
        ...CartInitialState,
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

export const setActiveDiscountCode = (
  activeDiscountCode: DiscountCode | null
) =>
  ({
    type: "cart/eCommerce/SET-ACTIVE-DISCOUNT-CODE",
    payload: { activeDiscountCode },
  }) as const;

export const setAllDiscountCodes = (allDiscountCodes: DiscountCode[]) =>
  ({
    type: "cart/eCommerce/SET-ALL-DISCOUNT-CODES",
    payload: { allDiscountCodes },
  }) as const;

export const clearCart = () =>
  ({
    type: "cart/eCommerce/CLEAR-CART",
  }) as const;

type ActionsType =
  | ReturnType<typeof setActiveCart>
  | ReturnType<typeof setActiveDiscountCode>
  | ReturnType<typeof loading>
  | ReturnType<typeof setAllDiscountCodes>
  | ReturnType<typeof clearCart>;

export interface CartContextValue extends CartStateType {
  addProductToActiveCart: (
    product: Product | LineItem,
    count: number
  ) => Promise<void>;
  fetchActiveCart: () => Promise<void>;
  removeProductFromActiveCart: (
    product: LineItem,
    quantity: number
  ) => Promise<void>;
  addDiscountCode: (code: string) => Promise<void>;
  fetchDiscountCodeFromCart: () => Promise<void>;
  removeDiscountCode: () => Promise<void>;
  getAllDiscountCodes: () => Promise<void>;
  resetActiveCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextValue>({
  ...CartInitialState,
  addProductToActiveCart: () => Promise.resolve(),
  fetchActiveCart: () => Promise.resolve(),
  removeProductFromActiveCart: () => Promise.resolve(),
  addDiscountCode: () => Promise.resolve(),
  fetchDiscountCodeFromCart: () => Promise.resolve(),
  removeDiscountCode: () => Promise.resolve(),
  getAllDiscountCodes: () => Promise.resolve(),
  resetActiveCart: () => Promise.resolve(),
});
