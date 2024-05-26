import {
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
  useReducer,
} from "react";
import { toast } from "react-toastify";
import API from "api/API";
import toastOptions from "helpers/toastOptions";
import {
  ProductContext,
  ProductInitialState,
  getCategories,
  getParentCategories,
  getProductPageData,
  getProducts,
  loading,
  productReducer,
} from "reducers/productReducer";
import { Product } from "types/API/Product";

interface ProviderProps {
  children: ReactNode;
}

export function ProductProvider(props: ProviderProps): ReactElement {
  const { children } = props;
  const [state, dispatch] = useReducer(productReducer, ProductInitialState);

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
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error?.message, toastOptions);
      }
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
    }),
    [state, getProductsData, getCategoriesData, getProductsCategory]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}
