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
  loading,
  setActiveDiscount,
  setActiveDiscountCode,
} from "reducers/cartReducer";
import { LineItem } from "types/API/Cart";
import { CartDiscountDraft, DiscountCodeDraft } from "types/API/Discount";
import { ProductData } from "types/API/Product";

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

  const createActiveCartDiscount = useCallback(
    async (discountDraft: CartDiscountDraft): Promise<void> => {
      try {
        const discount =
          await API.getInstance()?.createCartDiscount(discountDraft);
        if (discount) dispatch(setActiveDiscount(discount));
      } catch (err) {
        if (err instanceof Error) console.error(err.message);
      }
    },
    []
  );

  const createActiveDiscountCode = useCallback(
    async (discountCodeDraft: DiscountCodeDraft): Promise<void> => {
      try {
        const discountCode =
          await API.getInstance()?.createDiscountCode(discountCodeDraft);
        if (discountCode) dispatch(setActiveDiscountCode(discountCode));
      } catch (err) {
        if (err instanceof Error) console.error(err.message);
      }
    },
    []
  );

  useEffect(() => {
    fetchActiveCart();
    createActiveCartDiscount({
      value: { type: "relative", permyriad: 1000 },
      sortOrder: "0.5",
      isActive: true,
      cartPredicate: "1=1",
      name: { en: "mega-discount" },
      target: {
        type: "lineItems",
        predicate: "1=1",
      },
    });
  }, [createActiveCartDiscount, fetchActiveCart]);

  useEffect(() => {
    const { activeDiscount } = CartInitialState;
    if (activeDiscount)
      createActiveDiscountCode({
        isActive: true,
        code: "PROMO",
        name: { en: "promo" },
        cartPredicate: "1=1",
        cartDiscounts: [{ typeId: "cart-discount", id: activeDiscount.id }],
      });
  }, [CartInitialState.activeDiscount, createActiveDiscountCode]);

  const addProductToActiveCart = useCallback(
    async (product: ProductData | LineItem, count: number): Promise<void> => {
      try {
        const { activeCart } = state;
        dispatch(loading(true));
        if (activeCart) {
          const cart = await API.getInstance()?.addProductToCart(
            product,
            activeCart,
            count
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

  const contextValue = useMemo(
    () => ({
      ...state,
      fetchActiveCart,
      addProductToActiveCart,
      removeProductFromActiveCart,
    }),
    [
      state,
      fetchActiveCart,
      addProductToActiveCart,
      removeProductFromActiveCart,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
