import { LineItem } from "types/API/Cart";
import "./CartTable.scss";
import { ReactElement, useState } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductPrice } from "components/ProductCard/ProductPrice/ProductPrice";
import ProductDetailsCounter from "components/ProductDetailsCounter/ProductDetailsCounter";
import useCart from "hooks/use-cart";
import { Price } from "types/API/Product";
import CartClearDialog from "components/CartClearDialog/CartClearDialog";

type PropsType = {
  cartItems: LineItem[];
  totalCentAmout: number;
};

function CartTable({ cartItems, totalCentAmout }: PropsType): ReactElement {
  const { addProductToActiveCart, removeProductFromActiveCart } = useCart();

  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  const tableHeadCells = ["Products", "Price", "Quantity", "Total", ""].map(
    (item) => (
      <TableCell
        key={`Cart-Table-Head-Coloumn-${item}`}
        sx={{ fontWeight: "bold" }}
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

    return (
      <TableRow
        key={`Cart-Item-${item.name?.en}`}
        sx={{ backgroundColor: "#FBFBFB" }}
      >
        <TableCell
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 15,
          }}
        >
          {item.variant?.images && (
            <img
              src={item.variant.images[0].url}
              alt={item.name?.en ?? ""}
              style={{ maxHeight: 100, objectFit: "contain" }}
            />
          )}
          <Typography
            variant="body2"
            component="p"
            noWrap
            sx={{ fontWeight: "bold" }}
          >
            {item.name && item.name.en}
          </Typography>
        </TableCell>
        <TableCell>
          {item.price && <ProductPrice price={item.price} />}
        </TableCell>
        <TableCell>
          <ProductDetailsCounter
            count={item.quantity}
            className="product-details"
            setCount={null}
            addItemToCart={() => addProductToActiveCart(item, 1, true)}
            removeItemFromCart={() => removeProductFromActiveCart(item.id, 1)}
          />
        </TableCell>
        <TableCell sx={{ fontWeight: "bold" }}>
          <ProductPrice price={totalPriceForCartItem} />
        </TableCell>
        <TableCell>
          <IconButton
            onClick={() => removeProductFromActiveCart(item.id, item.quantity)}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
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
