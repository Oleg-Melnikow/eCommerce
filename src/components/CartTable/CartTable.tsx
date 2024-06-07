import { LineItem } from "types/API/Cart";
import "./CartTable.scss";
import { ReactElement } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  TableBody,
  Typography,
} from "@mui/material";
import { ProductPrice } from "components/ProductCard/ProductPrice/ProductPrice";

type PropsType = {
  cartItems: LineItem[];
};

function CartTable({ cartItems }: PropsType): ReactElement {
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

  console.log(cartItems);

  const tableItems = cartItems.map((item) => (
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
      <TableCell>{item.price && <ProductPrice price={item.price} />}</TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell sx={{ fontWeight: "bold" }}>
        <ProductPrice price={{ id: "", key: "", value: item.totalPrice }} />
      </TableCell>
    </TableRow>
  ));

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
