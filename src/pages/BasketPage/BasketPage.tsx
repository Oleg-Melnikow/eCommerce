import "./BasketPage.scss";
import { ReactElement, useEffect } from "react";
import useCart from "hooks/use-cart";
import CartTable from "components/CartTable/CartTable";
import LoaderItem from "components/LoaderItem/LoaderItem";
import InputPromo from "components/CartPromoInput/CartPromoInput";
import MessagePromo from "components/CartPromoMessage/CartPromoMessage";
import { Paper } from "@mui/material";
import { NavLink } from "react-router-dom";
import cartImg from "../../assets/empty-cart.png";

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

  const emptyCartMessage = (
    <Paper elevation={3} className="empty-cart">
      <p className="empty-cart__text">
        Your shopping cart is still empty. Add a few products from our{" "}
        <NavLink to="/catalog" className="empty-cart__link">
          catalog{" "}
        </NavLink>
        and they will be displayed here.
      </p>
      <img src={cartImg} alt="Empty Cart" className="empty-cart__image" />
      <NavLink to="/catalog" className="empty-cart__button">
        Go to the catalog
      </NavLink>
    </Paper>
  );

  return (
    <div className="basket-page" style={{ marginTop: "50px" }}>
      {isLoading && <LoaderItem />}
      {cartItems.length ? (
        <>
          {activeDiscountCode ? (
            <MessagePromo discountCode={activeDiscountCode} />
          ) : (
            <InputPromo />
          )}
          <CartTable
            cartItems={cartItems}
            totalCentAmout={activeCart?.totalPrice.centAmount ?? 0}
          />
        </>
      ) : (
        emptyCartMessage
      )}
    </div>
  );
}

export default BasketPage;
