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
  getProductPageData,
  getProducts,
  loading,
  productReducer,
  setCurrentProduct,
} from "reducers/productReducer";
import { ProductData } from "types/API/Product";

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
    () => ({ ...state, getProductsData, chooseProduct }),
    [state, getProductsData, chooseProduct]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}
