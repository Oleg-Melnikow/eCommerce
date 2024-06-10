import API from "api/API";
import toastOptions from "helpers/toastOptions";
import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { toast } from "react-toastify";
import {
  CartContext,
  CartInitialState,
  cartReducer,
  setActiveCart,
} from "reducers/cartReducer";
import { ProductData } from "types/API/Product";

interface ProviderProps {
  children: ReactNode;
}

export function CartProvider(props: ProviderProps): ReactElement {
  const { children } = props;
  const [state, dispatch] = useReducer(cartReducer, CartInitialState);

  const fetchActiveCart = useCallback(async (): Promise<void> => {
    try {
      const cart = await API.getInstance()?.getCart();
      if (cart) dispatch(setActiveCart(cart));
    } catch (err) {
      if (err instanceof Error) toast.error(err.message, toastOptions);
    }
  }, []);

  useEffect(() => {
    fetchActiveCart();
  }, [fetchActiveCart]);

  const addProductToActiveCart = useCallback(
    async (product: ProductData, count: number): Promise<void> => {
      try {
        const { activeCart } = state;
        if (activeCart) {
          API.getInstance()
            ?.addProductToCart(product, activeCart, count)
            .then((cart) => dispatch(setActiveCart(cart)))
            .catch((err) => toast.error(err.message, toastOptions));
        }
      } catch (err) {
        if (err instanceof Error) toast.error(err.message, toastOptions);
      }
    },
    [state]
  );

  const contextValue = useMemo(
    () => ({
      ...state,
      fetchActiveCart,
      addProductToActiveCart,
    }),
    [state, fetchActiveCart, addProductToActiveCart]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
