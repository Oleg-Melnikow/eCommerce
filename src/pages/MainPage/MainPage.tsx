import {
  Box,
  Button,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import "./MainPage.scss";
import useCart from "hooks/use-cart";

function MainPage(): ReactElement {
  const links = [
    "about",
    "catalog",
    "basket",
    "login",
    "registration",
    "profile",
  ];

  const promoTableHeads = ["Code", "Description"];
  const { activeDiscountCode } = useCart();
  const { code, description } = activeDiscountCode || {};

  return (
    <div className="main-page" style={{ marginTop: "50px" }}>
      MainPage Comming Soon...
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px", mt: 2 }}>
        {links.map((link) => {
          return (
            <NavLink key={link} to={`/${link}`}>
              <Button variant="contained">{link}</Button>
            </NavLink>
          );
        })}
      </Box>
      <Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              {promoTableHeads.map((head) => (
                <TableCell key={head} sx={{ fontWeight: "bold" }}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableRow>
            <TableCell>{code}</TableCell>
            <TableCell>{description?.en}</TableCell>
          </TableRow>
        </Table>
      </Box>
    </div>
  );
}

export default MainPage;
