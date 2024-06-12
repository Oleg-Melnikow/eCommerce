import "./BasketPage.scss";
import { ReactElement, useEffect } from "react";
import useCart from "hooks/use-cart";
import CartTable from "components/CartTable/CartTable";
import LoaderItem from "components/LoaderItem/LoaderItem";
import InputPromo from "components/CartPromoInput/CartPromoInput";
import MessagePromo from "components/CartPromoMessage/CartPromoMessage";

function BasketPage(): ReactElement {
  const {
    activeCart,
    fetchActiveCart,
    isLoading,
    fetchDiscountCodeFromCart,
    activeDiscountCode,
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
      {activeDiscountCode ? (
        <MessagePromo discountCode={activeDiscountCode} />
      ) : (
        <InputPromo />
      )}
      <CartTable cartItems={cartItems} />
    </div>
  );
}

export default BasketPage;
