import "./Header.scss";
import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";

import HeaderLogo from "../../assets/HeaderLogo.png";
import NavLinksToContent from "./NavLinksContent";
import NavLinksToAccount from "./NavLinksAccount";

function Header(): ReactElement {
  return (
    <header className="header">
      <NavLink to="/">
        <img src={HeaderLogo} className="header_logo" alt="HeaderLogo" />
      </NavLink>
      <NavLinksToContent />
      <NavLinksToAccount />
    </header>
  );
}

export default Header;
