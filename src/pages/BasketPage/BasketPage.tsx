import "./BasketPage.scss";
import React, { ReactElement } from "react";
import useCart from "hooks/use-cart";
import { LineItem } from "types/API/Cart";
import CartTable from "components/CartTable/CartTable";

function BasketPage(): ReactElement {
  const { activeCart } = useCart();
  const cartItems = activeCart?.lineItems ?? [];

  return (
    <div className="basket-page" style={{ marginTop: "50px" }}>
      <CartTable cartItems={cartItems} />
    </div>
  );
}

export default BasketPage;
