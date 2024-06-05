import API from "api/API";
import toastOptions from "helpers/toastOptions";
import { ReactElement, ReactNode, useEffect, useMemo, useReducer } from "react";
import { toast } from "react-toastify";
import {
  CartContext,
  CartInitialState,
  cartReducer,
  setActiveCart,
} from "reducers/cartReducer";

interface ProviderProps {
  children: ReactNode;
}

export function CartProvider(props: ProviderProps): ReactElement {
  const { children } = props;
  const [state, dispatch] = useReducer(cartReducer, CartInitialState);
  const clientAPI = API.getInstance();
  useEffect(() => {
    API.getInstance()
      ?.getCart()
      .then((cart) => {
        dispatch(setActiveCart(cart));
      })
      .catch((err) => {
        if (err instanceof Error) toast.error(err.message, toastOptions);
      });
  }, [API.getInstance()]);

  const contextValue = useMemo(
    () => ({
      ...state,
    }),
    [state]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
