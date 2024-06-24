import { ReactElement } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import useAuth from "hooks/use-auth";
import Header from "../Header/Header";
import "./Layout.scss";

function Layout(): ReactElement {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const pathArray = ["/login", "/registration"];
  const isLoader = isAuthenticated && pathArray.includes(pathname);

  return (
    <div className="layout__container">
      <Header />
      {isLoader ? <Box sx={{ color: "white" }}>Loader</Box> : <Outlet />}
    </div>
  );
}

export default Layout;
