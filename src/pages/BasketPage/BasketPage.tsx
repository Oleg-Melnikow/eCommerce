import "./BasketPage.scss";
import { ReactElement, useEffect } from "react";
import useCart from "hooks/use-cart";
import CartTable from "components/CartTable/CartTable";

function BasketPage(): ReactElement {
  const { activeCart, fetchActiveCart } = useCart();
  const cartItems = activeCart?.lineItems ?? [];

  return (
    <div className="basket-page" style={{ marginTop: "50px" }}>
      <CartTable cartItems={cartItems} />
    </div>
  );
}

export default BasketPage;
