import "./Header.scss";
import React, { ReactElement } from "react";

import HeaderLogo from "../../assets/HeaderLogo.png";
import NavLinksToContent from "./NavLinksContent";
import NavLinksToAccount from "./NavLinksAccount";

function Header(): ReactElement {
  return (
    <header className="header">
      <img src={HeaderLogo} className="header_logo" alt="HeaderLogo" />
      <NavLinksToContent />
      <NavLinksToAccount />
    </header>
  );
}

export default Header;
