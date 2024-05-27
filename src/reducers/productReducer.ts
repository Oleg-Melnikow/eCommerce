import { createContext } from "react";
import { Category } from "types/API/Category";
import { Product, ProductData, ProductPage } from "types/API/Product";

export type CurrentCategory = { id: string; key: string } | null;

interface ProductStateType extends ProductPage {
  products: Product[];
  categories: Category[];
  currentCategory: CurrentCategory;
  parentCategories: Category[];
  currentProduct: ProductData | null;
  isLoading: boolean;
  isInitialize: boolean;
}

export const ProductInitialState: ProductStateType = {
  count: 0,
  limit: 20,
  offset: 0,
  total: 0,
  products: [],
  categories: [],
  currentCategory: null,
  parentCategories: [],
  currentProduct: null,
  isLoading: false,
  isInitialize: false,
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
    case "products/eCommerce/GET-PARENT-CATEGORIES":
    case "products/eCommerce/SET-CURRENT-CATEGORY":
    case "products/eCommerce/SET-IS-INITIALAZE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const getProducts = (products: Product[]) =>
  ({ type: "products/eCommerce/GET-PRODUCTS", payload: { products } }) as const;

export const getCategories = (categories: Category[]) =>
  ({
    type: "products/eCommerce/GET-CATEGORIES",
    payload: { categories },
  }) as const;

export const getParentCategories = (parentCategories: Category[]) =>
  ({
    type: "products/eCommerce/GET-PARENT-CATEGORIES",
    payload: { parentCategories },
  }) as const;

export const setCurrentCategory = (currentCategory: CurrentCategory) =>
  ({
    type: "products/eCommerce/SET-CURRENT-CATEGORY",
    payload: { currentCategory },
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

export const setInitialize = (isInitialize: boolean) =>
  ({
    type: "products/eCommerce/SET-IS-INITIALAZE",
    payload: { isInitialize },
  }) as const;

type ActionsType =
  | ReturnType<typeof getProducts>
  | ReturnType<typeof loading>
  | ReturnType<typeof getProductPageData>
  | ReturnType<typeof getCategories>
  | ReturnType<typeof getParentCategories>
  | ReturnType<typeof setCurrentCategory>
  | ReturnType<typeof setInitialize>;

export interface ProductContextValue extends ProductStateType {
  getProductsData: () => Promise<void>;
  getCategoriesData: () => Promise<void>;
  getProductsCategory: (id: string) => Promise<void>;
  setCategory: (category: CurrentCategory) => Promise<void>;
}

export const ProductContext = createContext<ProductContextValue>({
  ...ProductInitialState,
  getProductsData: () => Promise.resolve(),
  getCategoriesData: () => Promise.resolve(),
  getProductsCategory: () => Promise.resolve(),
  setCategory: () => Promise.resolve(),
});
