import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";

function NavLinksToContent(): ReactElement {
  const navLinksToContent = [
    { id: 1, path: "/", text: "Home", className: "header__nav_link-home" },
    {
      id: 2,
      path: "/catalog",
      text: "Catalog",
      className: "header__nav_link-catalog",
    },
    {
      id: 3,
      path: "/about",
      text: "About",
      className: "header__nav_link-about",
    },
  ];

  return (
    <div className="header__nav">
      {navLinksToContent.map((link) => (
        <NavLink key={link.id} className={link.className} to={link.path}>
          {link.text}
        </NavLink>
      ))}
    </div>
  );
}

export default NavLinksToContent;
