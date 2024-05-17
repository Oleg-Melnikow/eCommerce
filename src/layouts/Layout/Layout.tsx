import "./Layout.scss";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";

function Layout(): ReactElement {
  return (
    <div className="layout__container">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
