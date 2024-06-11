import { createContext } from "react";
import { Cart, LineItem } from "types/API/Cart";
import { CartDiscount, DiscountCode } from "types/API/Discount";
import { ProductData } from "types/API/Product";

interface CartStateType {
  activeCart: Cart | null;
  activeDiscount: CartDiscount | null;
  activeDiscountCode: DiscountCode | null;
  isLoading: boolean;
}

export const CartInitialState: CartStateType = {
  activeCart: null,
  activeDiscount: null,
  activeDiscountCode: null,
  isLoading: false,
};

export const cartReducer = (
  state: CartStateType,
  action: ActionsType
): CartStateType => {
  switch (action.type) {
    case "cart/eCommerce/SET-ACTIVE-CART":
    case "cart/eCommerce/SET-IS-LOADING":
    case "cart/eCommerce/SET-ACTIVE-DISCOUNT":
    case "cart/eCommerce/SET-ACTIVE-DISCOUNT-CODE":
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

export const setActiveDiscount = (activeDiscount: CartDiscount) =>
  ({
    type: "cart/eCommerce/SET-ACTIVE-DISCOUNT",
    payload: { activeDiscount },
  }) as const;

export const setActiveDiscountCode = (activeDiscountCode: DiscountCode) =>
  ({
    type: "cart/eCommerce/SET-ACTIVE-DISCOUNT-CODE",
    payload: { activeDiscountCode },
  }) as const;

export const loading = (isLoading: boolean) =>
  ({
    type: "cart/eCommerce/SET-IS-LOADING",
    payload: { isLoading },
  }) as const;

type ActionsType =
  | ReturnType<typeof setActiveCart>
  | ReturnType<typeof loading>
  | ReturnType<typeof setActiveDiscount>
  | ReturnType<typeof setActiveDiscountCode>;

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
}

export const CartContext = createContext<CartContextValue>({
  ...CartInitialState,
  addProductToActiveCart: () => Promise.resolve(),
  fetchActiveCart: () => Promise.resolve(),
  removeProductFromActiveCart: () => Promise.resolve(),
});
