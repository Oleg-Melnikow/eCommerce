import { Box, Button } from "@mui/material";
import "./MainPage.scss";
import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";

function MainPage(): ReactElement {
  const links = ["about", "catalog", "basket", "login", "registration"];

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
