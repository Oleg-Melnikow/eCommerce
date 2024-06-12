import "./BasketPage.scss";
import { ReactElement, useEffect } from "react";
import useCart from "hooks/use-cart";
import CartTable from "components/CartTable/CartTable";
import LoaderItem from "components/LoaderItem/LoaderItem";
import InputPromo from "components/CartPromoInput/CartPromoInput";

function BasketPage(): ReactElement {
  const {
    activeCart,
    fetchActiveCart,
    isLoading,
    fetchDiscountCodeFromCart,
    activeDiscountCodes,
  } = useCart();
  const cartItems = activeCart?.lineItems ?? [];

  useEffect(() => {
    fetchActiveCart();
  }, [fetchActiveCart]);

  useEffect(() => {
    fetchDiscountCodeFromCart();
  }, [activeCart]);

  return (
    <div className="basket-page" style={{ marginTop: "50px" }}>
      {isLoading && <LoaderItem />}
      <InputPromo />
      <CartTable cartItems={cartItems} />
    </div>
  );
}

export default BasketPage;
