import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { toast } from "react-toastify";
import API from "api/API";
import toastOptions from "helpers/toastOptions";
import {
  CurrentCategory,
  ProductContext,
  ProductInitialState,
  getCategories,
  getParentCategories,
  getProductPageData,
  getProducts,
  loading,
  productReducer,
  setCurrentCategory,
  setInitialize,
  setCurrentProduct,
  setQuerySearch,
  clearProducts,
  setSortType,
} from "reducers/productReducer";
import { Product } from "types/API/Product";
import { useLocation, useSearchParams } from "react-router-dom";
import { sortingData } from "helpers/static-data";
import { Category } from "types/API/Category";

interface ProviderProps {
  children: ReactNode;
}

export function ProductProvider(props: ProviderProps): ReactElement {
  const { children } = props;
  const [state, dispatch] = useReducer(productReducer, ProductInitialState);
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  const getAllProducts = useCallback(async () => {
    dispatch(loading(true));
    try {
      const clientAPI = API.getInstance();
      const response = await clientAPI?.getProducts();
      if (response) {
        const { count, limit, offset, results, total } = response;
        const resultsData = results.map((item): Product => {
          const { id, key, masterData } = item;
          return { id, key, ...masterData.current };
        });
        dispatch(getProducts(resultsData));
        dispatch(getProductPageData({ count, limit, offset, total }));
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error?.message, toastOptions);
      }
    } finally {
      dispatch(loading(false));
    }
  }, []);

  const getProductsCategory = useCallback(
    async (
      value: string,
      type: "id" | "search" | "sort",
      filter?: { [key: string]: string | boolean } | null
    ) => {
      dispatch(loading(true));
      try {
        let params = {};
        if (type === "id") {
          params = { filter: `categories.id: subtree("${value}")` };
        }
        if (type === "search") {
          // params = { filter: `searchKeywords.en.text:"${value}"` };
          params = { "text.en": value, fuzzy: true };
        }
        if (type === "sort") {
          params = { sort: value };
          if (filter) {
            params = { ...filter, ...params };
          }
        }
        const clientAPI = API.getInstance();
        const response = await clientAPI?.getProductsProjection(params);
        if (response) {
          const { count, limit, offset, results, total } = response;
          dispatch(getProducts(results));
          dispatch(getProductPageData({ count, limit, offset, total }));
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error?.message, toastOptions);
        }
      } finally {
        dispatch(loading(false));
      }
    },
    []
  );

  const sortProducts = useCallback(
    async (sort: string) => {
      if (sort !== "default") {
        let filter = null;
        if (state.currentCategory) {
          const { id } = state.currentCategory;
          filter = { filter: `categories.id: subtree("${id}")` };
        }
        if (state.querySearch) {
          filter = { "text.en": state.querySearch, fuzzy: true };
        }
        await getProductsCategory(sort, "sort", filter);
      } else if (state.currentCategory) {
        await getProductsCategory(state.currentCategory.id, "id");
      } else if (state.querySearch) {
        await getProductsCategory(state.querySearch, "search");
      } else {
        await getAllProducts();
      }
    },
    [
      state.currentCategory,
      state.querySearch,
      getProductsCategory,
      getAllProducts,
    ]
  );

  const getProductsCurrentData = useCallback(
    async (categories: Category[]): Promise<void> => {
      const category = pathname.split("/");
      const categoryName = category[category.length - 1];
      const current = categories.find((el) => el.key === categoryName);
      if (current) {
        await getProductsCategory(current.id, "id");
        dispatch(setCurrentCategory(current));
      } else if (searchParams.size) {
        const searchKeywords = searchParams.get("search");
        const sort = searchParams.get("sort");

        if (searchKeywords) {
          await getProductsCategory(searchKeywords, "search");
        }
        if (sort) {
          const sortValue = sortingData.find((item) => item.query === sort);
          if (sortValue) {
            dispatch(setSortType(sortValue.value));
            await sortProducts(sortValue.value);
          }
        }
      } else {
        await getAllProducts();
      }
    },
    [getProductsCategory, getAllProducts, pathname, searchParams, sortProducts]
  );

  const getCategoriesData = useCallback(async () => {
    dispatch(loading(true));
    try {
      const clientAPI = API.getInstance();
      const categories = await clientAPI?.getcategories();
      if (categories) {
        dispatch(getCategories(categories.results));

        const parentCategories = categories.results.filter(
          (item) => !item.ancestors.length
        );

        dispatch(getParentCategories(parentCategories));

        await getProductsCurrentData(categories.results);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error?.message, toastOptions);
      }
    } finally {
      dispatch(loading(false));
    }
  }, [getProductsCurrentData]);

  const setCategory = useCallback(
    async (category: CurrentCategory, isSearch?: boolean) => {
      dispatch(setCurrentCategory(category));
      dispatch(setQuerySearch(""));
      dispatch(setSortType("default"));
      if (category) {
        await getProductsCategory(category.id, "id");
      } else if (!isSearch) {
        await getAllProducts();
      }
    },
    [getProductsCategory, getAllProducts]
  );

  const initializeCatalog = useCallback(async (): Promise<void> => {
    dispatch(loading(false));
    try {
      await getCategoriesData();
      dispatch(setInitialize(true));
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error?.message, toastOptions);
      }
    } finally {
      dispatch(loading(false));
    }
  }, [getCategoriesData]);

  useEffect(() => {
    const isCatalog = pathname.includes("catalog");
    if (!state.parentCategories.length && isCatalog) {
      initializeCatalog();
    }
    if (!isCatalog) {
      dispatch(clearProducts());
    }
  }, [initializeCatalog, pathname, state.parentCategories.length]);

  const chooseProduct = useCallback(async (id: string) => {
    dispatch(loading(true));
    try {
      const product = await API.getInstance()?.getProductById(id);
      if (product) dispatch(setCurrentProduct(product));
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      dispatch(loading(false));
    }
  }, []);

  const querySearchUpdate = useCallback((querySearch: string): void => {
    dispatch(setQuerySearch(querySearch));
  }, []);

  const setSort = useCallback((sort: string): void => {
    dispatch(setSortType(sort));
  }, []);

  const getSearchProducts = useCallback(
    async (querySearch: string | null): Promise<void> => {
      setSort("default");
      if (state.currentCategory) {
        dispatch(setCurrentCategory(null));
      }
      if (querySearch) {
        await getProductsCategory(querySearch, "search");
      } else {
        await getAllProducts();
      }
    },
    [getAllProducts, getProductsCategory, setSort, state.currentCategory]
  );

  const contextValue = useMemo(
    () => ({
      ...state,
      getAllProducts,
      getCategoriesData,
      getProductsCategory,
      setCategory,
      chooseProduct,
      sortProducts,
      querySearchUpdate,
      setSort,
      getProductsCurrentData,
      getSearchProducts,
    }),
    [
      state,
      getAllProducts,
      getCategoriesData,
      getProductsCategory,
      setCategory,
      chooseProduct,
      sortProducts,
      querySearchUpdate,
      setSort,
      getProductsCurrentData,
      getSearchProducts,
    ]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}
