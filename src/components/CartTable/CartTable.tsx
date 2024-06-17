import { LineItem } from "types/API/Cart";
import "./CartTable.scss";
import { ReactElement, useEffect, useState } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductPrice } from "components/ProductCard/ProductPrice/ProductPrice";
import useCart from "hooks/use-cart";
import { Price } from "types/API/Product";
import CartClearDialog from "components/CartClearDialog/CartClearDialog";
import { CartItem } from "./CartItem";

type PropsType = {
  cartItems: LineItem[];
  totalCentAmout: number;
};

const tableHeadCells = ["", "Products", "Price", "Quantity", "Total", "Action"];

function CartTable({ cartItems, totalCentAmout }: PropsType): ReactElement {
  const { resetActiveCart } = useCart();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  useEffect(() => {
    const handleResize = (): void => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const clearCart = (): void => {
    resetActiveCart();
  };

  return (
    <>
      <TableContainer className="cart-table__container">
        <Table size="small" className="cart-table">
          {windowWidth > 600 && (
            <TableHead className="cart-table__head">
              <TableRow>
                {tableHeadCells.map((item) => (
                  <TableCell
                    key={`Cart-Table-Head-Coloumn-${item}`}
                    className="cart-table__head-item"
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                cartItem={item}
                windowWidth={windowWidth}
              />
            ))}
            <TableRow>
              <TableCell className="cart-table__total-price-title" colSpan={2}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <Button
                    variant="contained"
                    color="warning"
                    endIcon={<DeleteIcon />}
                    onClick={() => setClearDialogOpen(true)}
                  >
                    Clear Cart
                  </Button>
                </Box>
              </TableCell>
              <TableCell
                className="cart-table__total-price-title"
                colSpan={windowWidth <= 600 ? 1 : 2}
              >
                Total:
              </TableCell>
              <TableCell>
                <ProductPrice
                  price={totalPrice}
                  classNamePredicate="cart-table"
                />
              </TableCell>
              {windowWidth > 600 && <TableCell />}
            </TableRow>
            {totalPrice.discounted && (
              <TableRow>
                <TableCell
                  colSpan={windowWidth <= 600 ? 3 : 4}
                  className="cart-table__discount-title"
                >
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
                    classNamePredicate="cart-table"
                  />
                </TableCell>
                {windowWidth > 600 && <TableCell />}
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
