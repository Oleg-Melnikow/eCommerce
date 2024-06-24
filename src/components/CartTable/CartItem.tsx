import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { ProductPrice } from "components/ProductCard/ProductPrice/ProductPrice";
import { LineItem } from "types/API/Cart";
import { Price } from "types/API/Product";
import DeleteIcon from "@mui/icons-material/Delete";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import ProductDetailsCounter from "components/ProductDetailsCounter/ProductDetailsCounter";
import useCart from "hooks/use-cart";

type PropsType = {
  cartItem: LineItem;
  windowWidth: number;
};

export function CartItem({ cartItem, windowWidth }: PropsType): ReactElement {
  const navigate = useNavigate();
  const { addProductToActiveCart, removeProductFromActiveCart } = useCart();

  const totalPriceForCartItem: Price = {
    id: "",
    key: "",
    value: {
      centAmount: (cartItem.price?.value.centAmount ?? 0) * cartItem.quantity,
      currencyCode: "EUR",
      type: "",
    },
  };
  if (
    (cartItem.price?.value.centAmount ?? 0) * cartItem.quantity !==
    cartItem.totalPrice.centAmount
  )
    totalPriceForCartItem.discounted = {
      discount: { id: "", typeId: "" },
      value: cartItem.totalPrice,
    };

  const priceItem = !!cartItem.price && (
    <ProductPrice price={cartItem.price} classNamePredicate="cart-table" />
  );

  const totalPriceItem = (
    <ProductPrice
      price={totalPriceForCartItem}
      classNamePredicate="cart-table"
    />
  );

  const deleteBtn = (
    <IconButton
      onClick={() =>
        removeProductFromActiveCart(cartItem.id, cartItem.quantity)
      }
    >
      <DeleteIcon />
    </IconButton>
  );

  return (
    <TableRow className="cart-table__row-body">
      <TableCell
        sx={{
          "@media (max-width: 600px)": {
            width: "60px",
          },
        }}
        className="cart-table__cell cart-table__thumb-wrap"
        onClick={() => navigate(`/product/${cartItem.productId}`)}
      >
        <Box>
          {cartItem.variant?.images && (
            <img
              className="cart-table__thumb"
              src={cartItem.variant.images[0].url}
              alt={cartItem.name?.en ?? ""}
            />
          )}
        </Box>
      </TableCell>
      <TableCell className="cart-table__cell">
        <Box className="cart-table__cell-inner">
          <Typography variant="body2" component="p" sx={{ fontWeight: "bold" }}>
            {cartItem.name && cartItem.name.en}
          </Typography>
          {windowWidth <= 600 && priceItem}
        </Box>
      </TableCell>
      {windowWidth > 600 && (
        <TableCell className="cart-table__cell">{priceItem} </TableCell>
      )}
      <TableCell className="cart-table__cell">
        <Box className="cart-table__cell-inner">
          <ProductDetailsCounter
            count={cartItem.quantity}
            className="cart-table"
            setCount={null}
            addItemToCart={() => addProductToActiveCart(cartItem, 1, true)}
            removeItemFromCart={() =>
              removeProductFromActiveCart(cartItem.id, 1, true)
            }
          />
          {windowWidth <= 600 && totalPriceItem}
        </Box>
      </TableCell>
      {windowWidth > 600 && (
        <TableCell className="cart-table__price">{totalPriceItem}</TableCell>
      )}
      <TableCell className="cart-table__cell">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {deleteBtn}
        </Box>
      </TableCell>
    </TableRow>
  );
}
