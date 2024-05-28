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
} from "reducers/productReducer";
import { Product } from "types/API/Product";
import { useLocation } from "react-router-dom";

interface ProviderProps {
  children: ReactNode;
}

export function ProductProvider(props: ProviderProps): ReactElement {
  const { children } = props;
  const [state, dispatch] = useReducer(productReducer, ProductInitialState);
  const { pathname } = useLocation();

  const getProductsData = useCallback(async () => {
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

  const getProductsCategory = useCallback(async (id: string) => {
    dispatch(loading(true));
    try {
      const clientAPI = API.getInstance();
      const response = await clientAPI?.getProductsProjection(id);
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

        const category = pathname.split("/");
        const categoryName = category[category.length - 1];
        const current = categories.results.find(
          (el) => el.key === categoryName
        );

        if (current) {
          await getProductsCategory(current.id);
        } else {
          await getProductsData();
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error?.message, toastOptions);
      }
    } finally {
      dispatch(loading(false));
    }
  }, [getProductsCategory, getProductsData, pathname]);

  const setCategory = useCallback(
    async (category: CurrentCategory) => {
      dispatch(setCurrentCategory(category));
      if (category) {
        await await getProductsCategory(category.id);
      }
    },
    [getProductsCategory]
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
      dispatch(setCurrentCategory(null));
    }
    if (!state.currentCategory && isCatalog) {
      getProductsData();
    }
  }, [
    getProductsData,
    initializeCatalog,
    pathname,
    state.currentCategory,
    state.parentCategories.length,
  ]);

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

  const contextValue = useMemo(
    () => ({
      ...state,
      getProductsData,
      getCategoriesData,
      getProductsCategory,
      setCategory,
      chooseProduct,
    }),
    [
      state,
      getProductsData,
      getCategoriesData,
      getProductsCategory,
      setCategory,
      chooseProduct,
    ]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}
