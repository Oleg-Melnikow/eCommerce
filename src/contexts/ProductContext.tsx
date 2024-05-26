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
} from "reducers/productReducer";

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

  const contextValue = useMemo(
    () => ({ ...state, getProductsData }),
    [state, getProductsData]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}
