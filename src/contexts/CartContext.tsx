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
  setActiveDiscountCode,
  loading,
  setAllDiscountCodes,
  clearCart,
} from "reducers/cartReducer";
import { LineItem } from "types/API/Cart";
import { DiscountCode } from "types/API/Discount";
import { Product } from "types/API/Product";

interface ProviderProps {
  children: ReactNode;
}

export function CartProvider(props: ProviderProps): ReactElement {
  const { children } = props;
  const [state, dispatch] = useReducer(cartReducer, CartInitialState);

  const fetchActiveCart = useCallback(async (): Promise<void> => {
    try {
      dispatch(loading(true));
      const cart = await API.getInstance()?.getCart();
      if (cart) dispatch(setActiveCart(cart));
    } catch (err) {
      if (err instanceof Error) toast.error(err.message, toastOptions);
    } finally {
      dispatch(loading(false));
    }
  }, []);

  useEffect(() => {
    fetchActiveCart();
  }, [fetchActiveCart]);

  const addProductToActiveCart = useCallback(
    async (product: Product | LineItem, count: number): Promise<void> => {
      try {
        dispatch(loading(true));
        if (!state.activeCart) {
          await fetchActiveCart();
          toast.success(
            "Cart was created successfully! We can add Product to Cart",
            toastOptions
          );
        }
        if (state.activeCart) {
          const instanceOfProductData = (
            obj: Product | LineItem
          ): obj is Product => "masterVariant" in obj;

          const sku = instanceOfProductData(product)
            ? product.masterVariant.sku
            : product.variant?.sku || "";

          const cart = await API.getInstance()?.addProductToCart(
            sku,
            state.activeCart,
            count
          );
          if (cart) dispatch(setActiveCart(cart));
          toast.success(
            "The product has been successfully added to the shopping cart.",
            toastOptions
          );
        }
      } catch (err) {
        if (err instanceof Error) toast.error(err.message, toastOptions);
      } finally {
        dispatch(loading(false));
      }
    },
    [fetchActiveCart, state]
  );

  const removeProductFromActiveCart = useCallback(
    async (product: LineItem, quantity: number): Promise<void> => {
      try {
        const { activeCart } = state;
        dispatch(loading(true));
        if (activeCart) {
          const cart = await API.getInstance()?.removeProductFromCart(
            product,
            activeCart,
            quantity
          );
          if (cart) dispatch(setActiveCart(cart));
        }
      } catch (err) {
        if (err instanceof Error) toast.error(err.message, toastOptions);
      } finally {
        dispatch(loading(false));
      }
    },
    [state]
  );

  const addDiscountCode = useCallback(
    async (code: string): Promise<void> => {
      try {
        dispatch(loading(true));
        const { activeCart } = state;
        if (activeCart) {
          const cart = await API.getInstance()?.addDiscountCodeToCart(
            activeCart,
            code
          );
          if (cart) dispatch(setActiveCart(cart));
        }
      } catch (err) {
        if (err instanceof Error) toast.error(err.message, toastOptions);
      } finally {
        dispatch(loading(false));
      }
    },
    [state]
  );

  const fetchDiscountCodeFromCart = useCallback(async (): Promise<void> => {
    try {
      dispatch(loading(true));
      const { activeCart } = state;
      if (
        activeCart?.discountCodes?.length &&
        activeCart.discountCodes[0].discountCode
      ) {
        const { id } = activeCart.discountCodes[0].discountCode;
        const response = await API.getInstance()?.getDiscountCodeById(id);
        if (response) dispatch(setActiveDiscountCode(response));
      }
    } catch (err) {
      if (err instanceof Error) toast.error(err.message, toastOptions);
    } finally {
      dispatch(loading(false));
    }
  }, [state]);

  useEffect(() => {
    fetchDiscountCodeFromCart();
  }, [state.activeCart]);

  const removeDiscountCode = useCallback(async (): Promise<void> => {
    try {
      dispatch(loading(true));
      const { activeCart, activeDiscountCode } = state;
      if (activeCart && activeDiscountCode) {
        const response = await API.getInstance()?.removeDiscountCodeFromCart(
          activeDiscountCode.id,
          activeCart
        );
        if (response) {
          dispatch(setActiveCart(response));
          dispatch(setActiveDiscountCode(null));
        }
      }
    } catch (err) {
      if (err instanceof Error) toast.error(err.message, toastOptions);
    } finally {
      dispatch(loading(false));
    }
  }, [state]);

  const getAllDiscountCodes = useCallback(async (): Promise<void> => {
    try {
      dispatch(loading(true));
      const response = await API.getInstance()?.getAllDiscountCodes();
      if (response) dispatch(setAllDiscountCodes(response.results));
    } catch (err) {
      if (err instanceof Error) toast.error(err.message, toastOptions);
    } finally {
      dispatch(loading(false));
    }
  }, []);

  const resetActiveCart = useCallback(async (): Promise<void> => {
    dispatch(clearCart());
  }, []);

  useEffect(() => {
    getAllDiscountCodes();
  }, [getAllDiscountCodes]);

  const contextValue = useMemo(
    () => ({
      ...state,
      fetchActiveCart,
      addProductToActiveCart,
      removeProductFromActiveCart,
      addDiscountCode,
      fetchDiscountCodeFromCart,
      removeDiscountCode,
      getAllDiscountCodes,
      resetActiveCart,
    }),
    [
      state,
      fetchActiveCart,
      addProductToActiveCart,
      removeProductFromActiveCart,
      addDiscountCode,
      fetchDiscountCodeFromCart,
      removeDiscountCode,
      getAllDiscountCodes,
      resetActiveCart,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
