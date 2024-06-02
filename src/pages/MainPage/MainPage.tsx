import { Box, Button } from "@mui/material";
import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import "./MainPage.scss";

function MainPage(): ReactElement {
  const links = [
    "about",
    "catalog",
    "basket",
    "login",
    "registration",
    "profile",
  ];

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
    </div>
  );
}

export default MainPage;
