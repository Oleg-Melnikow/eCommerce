import { createContext } from "react";
import { ProductData, ProductPage } from "types/API/Product";

interface ProductStateType extends ProductPage {
  products: ProductData[];
  currentProduct: ProductData | null;
  isLoading: boolean;
}

export const ProductInitialState: ProductStateType = {
  count: 0,
  limit: 20,
  offset: 0,
  total: 0,
  products: [],
  currentProduct: null,
  isLoading: false,
};

export const productReducer = (
  state: ProductStateType,
  action: ActionsType
): ProductStateType => {
  switch (action.type) {
    case "products/eCommerce/GET-PRODUCTS":
    case "products/eCommerce/SET-IS-LOADING":
    case "products/eCommerce/GET-PRODUCT-PAGE":
    case "products/eCommerce/SET-CURRENT-PRODUCT":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const getProducts = (products: ProductData[]) =>
  ({ type: "products/eCommerce/GET-PRODUCTS", payload: { products } }) as const;

export const getProductPageData = (pageData: ProductPage) =>
  ({
    type: "products/eCommerce/GET-PRODUCT-PAGE",
    payload: { ...pageData },
  }) as const;

export const setCurrentProduct = (currentProduct: ProductData | null) =>
  ({
    type: "products/eCommerce/SET-CURRENT-PRODUCT",
    payload: { currentProduct },
  }) as const;

export const loading = (isLoading: boolean) =>
  ({
    type: "products/eCommerce/SET-IS-LOADING",
    payload: { isLoading },
  }) as const;

type ActionsType =
  | ReturnType<typeof getProducts>
  | ReturnType<typeof loading>
  | ReturnType<typeof getProductPageData>
  | ReturnType<typeof setCurrentProduct>;

export interface ProductContextValue extends ProductStateType {
  getProductsData: () => Promise<void>;
  chooseProduct: (product: ProductData) => Promise<void>;
}

export const ProductContext = createContext<ProductContextValue>({
  ...ProductInitialState,
  getProductsData: () => Promise.resolve(),
  chooseProduct: (poduct: ProductData) => Promise.resolve(),
});
