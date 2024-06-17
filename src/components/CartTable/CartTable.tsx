import { LineItem } from "types/API/Cart";
import "./CartTable.scss";
import { ReactElement, useEffect, useState, useState } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductPrice } from "components/ProductCard/ProductPrice/ProductPrice";
import ProductDetailsCounter from "components/ProductDetailsCounter/ProductDetailsCounter";
import useCart from "hooks/use-cart";
import { Price } from "types/API/Product";
import { useNavigate, useNavigation } from "react-router-dom";
import CartClearDialog from "components/CartClearDialog/CartClearDialog";

type PropsType = {
  cartItems: LineItem[];
  totalCentAmout: number;
};

function CartTable({ cartItems, totalCentAmout }: PropsType): ReactElement {
  const { addProductToActiveCart, removeProductFromActiveCart } = useCart();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = (): void => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  const tableHeadCells = ["", "Products", "Price", "Quantity", "Total"].map(
    (item) => (
      <TableCell
        key={`Cart-Table-Head-Coloumn-${item}`}
        className="cart-table__head-item"
      >
        {item}
      </TableCell>
    )
  );

  const tableItems = cartItems.map((item) => {
    const totalPriceForCartItem: Price = {
      id: "",
      key: "",
      value: {
        centAmount: (item.price?.value.centAmount ?? 0) * item.quantity,
        currencyCode: "EUR",
        type: "",
      },
    };
    if (
      (item.price?.value.centAmount ?? 0) * item.quantity !==
      item.totalPrice.centAmount
    )
      totalPriceForCartItem.discounted = {
        discount: { id: "", typeId: "" },
        value: item.totalPrice,
      };

    const priceItem = (
      <>
        {" "}
        {item.price && (
          <ProductPrice price={item.price} classNamePredicate="cart-table" />
        )}
      </>
    );
    const totalPriceItem = (
      <ProductPrice
        price={totalPriceForCartItem}
        classNamePredicate="cart-table"
      />
    );
    const deleteBtn = (
      <IconButton
        onClick={() => removeProductFromActiveCart(item.id, item.quantity)}
      >
        <DeleteIcon />
      </IconButton>
    );

    return (
      <TableRow
        key={`Cart-Item-${item.name?.en}`}
        className="cart-table__row-body"
      >
        <TableCell
          className="cart-table__cell cart-table__thumb-wrap"
          onClick={() => navigate(`/product/${item.productId}`)}
        >
          {item.variant?.images && (
            <img
              className="cart-table__thumb"
              src={item.variant.images[0].url}
              alt={item.name?.en ?? ""}
            />
          )}
        </TableCell>
        <TableCell className="cart-table__cell">
          <Box className="cart-table__cell-inner">
            <Typography
              variant="body2"
              component="p"
              sx={{ fontWeight: "bold" }}
            >
              {item.name && item.name.en}
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
              count={item.quantity}
              className="cart-table"
              setCount={null}
              addItemToCart={() => addProductToActiveCart(item, 1, true)}
              removeItemFromCart={() =>
                removeProductFromActiveCart(item.id, 1, true)
              }
            />
            {windowWidth <= 600 && totalPriceItem}
          </Box>
        </TableCell>
        {windowWidth > 600 && (
          <TableCell className="cart-table__price">{totalPriceItem}</TableCell>
        )}
        <TableCell className="cart-table__cell">{deleteBtn}</TableCell>
      </TableRow>
    );
  });

  const totalPriceWithoutDiscount = cartItems
    .map((item) => (item.price?.value.centAmount ?? 0) * item.quantity)
    .reduce((sum, item) => sum + item, 0);

  const totalPrice: Price = {
    id: "",
    key: "",
    value: {
      type: "",
      currencyCode: "EUR",
      centAmount: totalPriceWithoutDiscount,
    },
  };

  if (totalCentAmout !== totalPriceWithoutDiscount)
    totalPrice.discounted = {
      discount: { id: "", typeId: "" },
      value: { type: "", currencyCode: "EUR", centAmount: totalCentAmout },
    };

  const { resetActiveCart } = useCart();
  const clearCart = (): void => {
    resetActiveCart();
  };

  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>{tableHeadCells}</TableRow>
          </TableHead>
          <TableBody>
            {tableItems}
            <TableRow>
              <TableCell rowSpan={2}>
                <Button
                  variant="contained"
                  color="warning"
                  endIcon={<DeleteIcon />}
                  onClick={() => setClearDialogOpen(true)}
                >
                  Clear Shopping Cart
                </Button>
              </TableCell>
              <TableCell
                colSpan={2}
                align="right"
                sx={{ fontWeight: "bold", fontSize: "1.25rem" }}
              >
                Total:
              </TableCell>
              <TableCell>
                <ProductPrice price={totalPrice} />
              </TableCell>
            </TableRow>
            {totalPrice.discounted && (
              <TableRow>
                <TableCell colSpan={2} align="right">
                  Discount:
                </TableCell>
                <TableCell>
                  <ProductPrice
                    price={{
                      id: "",
                      key: "",
                      value: {
                        type: "",
                        currencyCode: "EUR",
                        centAmount: totalPriceWithoutDiscount - totalCentAmout,
                      },
                    }}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <CartClearDialog
        open={clearDialogOpen}
        setOpen={setClearDialogOpen}
        action={clearCart}
      />
    </>
  );
}

export default CartTable;
