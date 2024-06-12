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
  querySearch: string;
  sortValue: string;
  currentProductCategories: Category[];
  filters: string[];
}

export const ProductInitialState: ProductStateType = {
  count: 0,
  limit: 10,
  offset: 0,
  total: 0,
  products: [],
  categories: [],
  currentCategory: null,
  parentCategories: [],
  currentProduct: null,
  isLoading: false,
  isInitialize: false,
  querySearch: "",
  sortValue: "default",
  currentProductCategories: [],
  filters: [],
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
    case "products/eCommerce/SET-CURRENT-PRODUCT":
    case "products/eCommerce/SET-QUERY-SEARCH":
    case "products/eCommerce/SET-SORT-TYPE":
    case "products/eCommerce/SET-CURRENT-PRODUCT-CATEGORIES":
    case "products/eCommerce/SET-PRODUCTS-FILTERS":
    case "products/eCommerce/SET-OFFSET":
      return {
        ...state,
        ...action.payload,
      };
    case "products/eCommerce/CLEAR-PRODUCTS":
      return {
        ...state,
        currentCategory: null,
        products: [],
        querySearch: "",
        sortValue: "default",
      };
    default:
      return state;
  }
};

export const setOffset = (offset: number) =>
  ({
    type: "products/eCommerce/SET-OFFSET",
    payload: { offset },
  }) as const;

export const setProductsFilters = (filters: string[]) =>
  ({
    type: "products/eCommerce/SET-PRODUCTS-FILTERS",
    payload: { filters },
  }) as const;

export const getProducts = (products: Product[]) =>
  ({ type: "products/eCommerce/GET-PRODUCTS", payload: { products } }) as const;

export const clearProducts = () =>
  ({ type: "products/eCommerce/CLEAR-PRODUCTS" }) as const;

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

export const setInitialize = (isInitialize: boolean) =>
  ({
    type: "products/eCommerce/SET-IS-INITIALAZE",
    payload: { isInitialize },
  }) as const;

export const setQuerySearch = (querySearch: string) =>
  ({
    type: "products/eCommerce/SET-QUERY-SEARCH",
    payload: { querySearch },
  }) as const;

export const setSortType = (sortValue: string) =>
  ({
    type: "products/eCommerce/SET-SORT-TYPE",
    payload: { sortValue },
  }) as const;

export const setCurrentProductCategories = (
  currentProductCategories: Category[]
) =>
  ({
    type: "products/eCommerce/SET-CURRENT-PRODUCT-CATEGORIES",
    payload: { currentProductCategories },
  }) as const;

type ActionsType =
  | ReturnType<typeof getProducts>
  | ReturnType<typeof loading>
  | ReturnType<typeof getProductPageData>
  | ReturnType<typeof setCurrentProduct>
  | ReturnType<typeof getCategories>
  | ReturnType<typeof getParentCategories>
  | ReturnType<typeof setCurrentCategory>
  | ReturnType<typeof setInitialize>
  | ReturnType<typeof setQuerySearch>
  | ReturnType<typeof clearProducts>
  | ReturnType<typeof setSortType>
  | ReturnType<typeof setCurrentProductCategories>
  | ReturnType<typeof setProductsFilters>
  | ReturnType<typeof setOffset>;

export interface ProductContextValue extends ProductStateType {
  getAllProducts: (offsetProduct?: number) => Promise<void>;
  getCategoriesData: () => Promise<void>;
  getProductsCategory: (params: object) => Promise<void>;
  setCategory: (category: CurrentCategory, isSearch?: boolean) => Promise<void>;
  chooseProduct: (id: string) => Promise<void>;
  sortProducts: (sort: string, offset?: number) => Promise<void>;
  querySearchUpdate: (querySearch: string) => void;
  getProductsCurrentData: (
    categories: Category[],
    offset?: number
  ) => Promise<void>;
  setSort: (sort: string) => void;
  setOffsetProduct: (offset: number) => void;
  getCategoriesCurrentProduct: (id: string) => Promise<void>;
  setFilters: (filters: string[], offset?: number) => Promise<void>;
  getSearchProducts: (
    querySearch: string | null,
    offset?: number
  ) => Promise<void>;
}

export const ProductContext = createContext<ProductContextValue>({
  ...ProductInitialState,
  getAllProducts: () => Promise.resolve(),
  getCategoriesData: () => Promise.resolve(),
  getProductsCategory: () => Promise.resolve(),
  setCategory: () => Promise.resolve(),
  chooseProduct: () => Promise.resolve(),
  sortProducts: () => Promise.resolve(),
  getProductsCurrentData: () => Promise.resolve(),
  getSearchProducts: () => Promise.resolve(),
  setFilters: () => Promise.resolve(),
  querySearchUpdate: () => {},
  setSort: () => {},
  setOffsetProduct: () => {},
  getCategoriesCurrentProduct: () => Promise.resolve(),
});
