import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { ReactElement, useEffect } from "react";
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
  const { allDiscountCodes, getAllDiscountCodes } = useCart();

  useEffect(() => {
    getAllDiscountCodes();
  }, [getAllDiscountCodes]);

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
          <TableBody>
            {allDiscountCodes.map((discountcode) => (
              <TableRow key={discountcode.code}>
                <TableCell>{discountcode.code}</TableCell>
                <TableCell>{discountcode.description?.en}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </div>
  );
}

export default MainPage;
