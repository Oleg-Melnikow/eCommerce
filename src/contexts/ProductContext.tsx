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
  setCurrentProductCategories,
  setProductsFilters,
  setOffset,
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

  const setRequestParams = useCallback(
    (
      value: string,
      type: "id" | "search" | "sort" | "filter",
      filter?: object | null,
      filterArray?: string[]
    ): object => {
      let params: object = {};

      if (type === "id") {
        params = {
          filter: [`categories.id: subtree("${value}")`],
        };
      }
      if (type === "filter" && filterArray) {
        params = { filter: [...filterArray] };
      }
      if (type === "search") {
        params = { "text.en": value, fuzzy: true };
      }
      if (type === "sort") {
        params = { sort: value };
        if (state.filters.length && type !== "sort") {
          params = { ...params, filter: [...state.filters] };
        }
      }
      if (filter) {
        params = { ...filter, ...params };
      }
      params = {
        facet: [
          "variants.attributes.crown-shape.key",
          "variants.attributes.foliage-color.key",
        ],
        ...params,
      };
      return params;
    },
    [state.filters]
  );

  const getAllProducts = useCallback(async (offsetProduct?: number) => {
    dispatch(loading(true));
    try {
      const params = `?limit=${8}&offset=${offsetProduct || 0}`;
      const clientAPI = API.getInstance();
      const response = await clientAPI?.getProducts(params);
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

  const getProductsCategory = useCallback(async (params: object) => {
    dispatch(loading(true));
    try {
      const clientAPI = API.getInstance();
      const response = await clientAPI?.getProductsProjection({
        ...params,
        limit: 8,
      });
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
  }, []);

  const sortProducts = useCallback(
    async (sort: string, offset?: number) => {
      if (sort !== "default") {
        let filter: Array<object | string> = [];
        if (state.currentCategory) {
          const { id } = state.currentCategory;
          filter = [`categories.id: subtree("${id}")`];
        }
        if (state.querySearch) {
          filter = [{ "text.en": state.querySearch, fuzzy: true }];
        }
        if (state.filters.length) {
          filter = [...state.filters, ...filter];
        }
        await getProductsCategory({
          ...setRequestParams(sort, "sort"),
          filter,
          offset,
        });
      } else if (state.currentCategory) {
        await getProductsCategory({
          ...setRequestParams(state.currentCategory.id, "id"),
        });
      } else if (state.querySearch) {
        await getProductsCategory({
          ...setRequestParams(state.querySearch, "search"),
        });
      } else {
        await getAllProducts(offset);
      }
    },
    [
      state.currentCategory,
      state.querySearch,
      state.filters,
      getProductsCategory,
      setRequestParams,
      getAllProducts,
    ]
  );

  const getProductsCurrentData = useCallback(
    async (categories: Category[], offset?: number): Promise<void> => {
      const category = pathname.split("/");
      const categoryName = category[category.length - 1];
      const current = categories.find((el) => el.key === categoryName);
      if (current) {
        await getProductsCategory({
          ...setRequestParams(current.id, "id"),
          offset,
        });
        dispatch(setCurrentCategory(current));
      } else if (searchParams.size) {
        const searchKeywords = searchParams.get("search");
        const sort = searchParams.get("sort");

        const paramsToSearch = setRequestParams(searchKeywords || "", "search");
        const sortValue = sortingData.find((item) => item.query === sort);
        const paramsToSort = setRequestParams(sortValue?.value || "", "sort");

        if (searchKeywords && sort) {
          const params = {
            ...paramsToSearch,
            ...paramsToSort,
            offset,
          };
          await getProductsCategory(params);
          dispatch(setSortType(sortValue?.value || "default"));
        } else {
          if (searchKeywords) {
            await getProductsCategory({ ...paramsToSearch, offset });
          }
          if (sort && sortValue) {
            dispatch(setSortType(sortValue.value));
            await sortProducts(sortValue.value, offset);
          }
        }
      } else {
        await getAllProducts(offset);
      }
    },
    [
      pathname,
      searchParams,
      getProductsCategory,
      setRequestParams,
      sortProducts,
      getAllProducts,
    ]
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
        await getProductsCategory({ ...setRequestParams(category.id, "id") });
      } else if (!isSearch) {
        await getAllProducts();
      }
    },
    [getProductsCategory, setRequestParams, getAllProducts]
  );

  const initializeCatalog = useCallback(async (): Promise<void> => {
    dispatch(loading(true));
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

  const getCategoriesCurrentProduct = useCallback(async (id: string) => {
    try {
      const categories: Category[] = [];
      const category = await API.getInstance()?.getCategoriesById(id);
      if (category) {
        categories.push(category);
        category.ancestors.forEach(async (ancestor) => {
          const ancestorCategory = await API.getInstance()?.getCategoriesById(
            ancestor.id
          );
          if (ancestorCategory) categories.push(ancestorCategory);
          dispatch(setCurrentProductCategories(categories));
        });
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  }, []);

  const setFilters = useCallback(
    async (filters: string[], offset?: number): Promise<void> => {
      dispatch(setProductsFilters(filters));
      dispatch(setSortType("default"));
      if (filters.length) {
        let filterArray = [...filters];
        if (state.currentCategory) {
          const { id } = state.currentCategory;
          filterArray = [...filterArray, `categories.id: subtree("${id}")`];
        }
        await getProductsCategory({ filter: [...filterArray], offset });
      } else if (state.currentCategory) {
        await getProductsCategory({
          ...setRequestParams(state.currentCategory.id, "id"),
        });
      } else if (!searchParams.size) {
        await getAllProducts();
      }
    },
    [
      getAllProducts,
      getProductsCategory,
      searchParams.size,
      setRequestParams,
      state.currentCategory,
    ]
  );

  const getSearchProducts = useCallback(
    async (querySearch: string | null, offset?: number): Promise<void> => {
      setSort("default");
      if (state.currentCategory) {
        dispatch(setCurrentCategory(null));
      }
      if (querySearch) {
        await getProductsCategory({
          ...setRequestParams(querySearch, "search"),
          offset,
        });
      } else {
        await getAllProducts(offset);
      }
    },
    [
      getAllProducts,
      getProductsCategory,
      setRequestParams,
      setSort,
      state.currentCategory,
    ]
  );

  const setOffsetProduct = useCallback((offset: number): void => {
    dispatch(setOffset(offset));
  }, []);

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
      getCategoriesCurrentProduct,
      setFilters,
      getSearchProducts,
      setOffsetProduct,
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
      getCategoriesCurrentProduct,
      setFilters,
      getSearchProducts,
      setOffsetProduct,
    ]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}
