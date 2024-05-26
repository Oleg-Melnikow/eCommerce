import { createContext } from "react";
import { Category } from "types/API/Category";
import { ProductData, ProductPage } from "types/API/Product";

interface ProductStateType extends ProductPage {
  products: ProductData[];
  categories: Category[];
  parentCategories: Category[];
  currentProduct: ProductData | null;
  isLoading: boolean;
}

export const ProductInitialState: ProductStateType = {
  count: 0,
  limit: 20,
  offset: 0,
  total: 0,
  products: [],
  categories: [],
  parentCategories: [],
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
    case "products/eCommerce/GET-CATEGORIES":
    case "products/eCommerce/GET-PAREBT-CATEGORIES":
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

export const getCategories = (categories: Category[]) =>
  ({
    type: "products/eCommerce/GET-CATEGORIES",
    payload: { categories },
  }) as const;

export const getParentCategories = (parentCategories: Category[]) =>
  ({
    type: "products/eCommerce/GET-PAREBT-CATEGORIES",
    payload: { parentCategories },
  }) as const;

export const getProductPageData = (pageData: ProductPage) =>
  ({
    type: "products/eCommerce/GET-PRODUCT-PAGE",
    payload: { ...pageData },
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
  | ReturnType<typeof getCategories>
  | ReturnType<typeof getParentCategories>;

export interface ProductContextValue extends ProductStateType {
  getProductsData: () => Promise<void>;
  getCategoriesData: () => Promise<void>;
}

export const ProductContext = createContext<ProductContextValue>({
  ...ProductInitialState,
  getProductsData: () => Promise.resolve(),
  getCategoriesData: () => Promise.resolve(),
});
