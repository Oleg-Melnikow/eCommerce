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
} from "@mui/material";
import { ProductPrice } from "components/ProductCard/ProductPrice/ProductPrice";
import ProductDetailsCounter from "components/ProductDetailsCounter/ProductDetailsCounter";
import useCart from "hooks/use-cart";

type PropsType = {
  cartItems: LineItem[];
};

function CartTable({ cartItems }: PropsType): ReactElement {
  const { addProductToActiveCart } = useCart();
  const tableHeadCells = ["Products", "Price", "Quantity", "Total"].map(
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
            addItemToCart={() => addProductToActiveCart(item, 1)}
          />
        </TableCell>
        <TableCell sx={{ fontWeight: "bold" }}>
          <ProductPrice price={{ id: "", key: "", value: item.totalPrice }} />
        </TableCell>
      </TableRow>
    );
  });

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>{tableHeadCells}</TableRow>
        </TableHead>
        <TableBody>{tableItems}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default CartTable;
