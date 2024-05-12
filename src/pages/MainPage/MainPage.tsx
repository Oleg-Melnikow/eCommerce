import "./MainPage.scss";
import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";

import HeaderLogo from "../../assets/HeaderLogo.png";
import LogIn from "../../assets/LogIn.svg";
import Register from "../../assets/Register.svg";
import LogOut from "../../assets/LogOut.svg";
import Basket from "../../assets/Basket.svg";

import NavLinkAccount from "../../components/_Header/NavLinkAccount";

function MainPage(): ReactElement {
  const navLinks = [
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
  const navLinksToAccount = [
    {
      id: 1,
      path: "/login",
      title: "Log In",
      className: "header__inner_link-login",
      imgSrc: LogIn,
      imgAlt: "LogInLogo",
    },
    {
      id: 2,
      path: "/registration",
      title: "Register",
      className: "header__inner_link-register",
      imgSrc: Register,
      imgAlt: "RegisterLogo",
    },
    {
      id: 3,
      path: "/",
      title: "Log Out",
      className: "header__inner_link-logout",
      imgSrc: LogOut,
      imgAlt: "LogOutLogo",
    },

    {
      id: 4,
      path: "/basket",
      title: "Basket",
      className: "header__inner_link-basket",
      imgSrc: Basket,
      imgAlt: "BasketLogo",
    },
  ];

  return (
    <div className="main-page">
      <div className="main-page__container">
        <header className="header">
          <img src={HeaderLogo} className="header_logo" alt="HeaderLogo" />

          <div className="header__nav">
            {navLinks.map((link) => (
              <NavLink key={link.id} className={link.className} to={link.path}>
                {link.text}
              </NavLink>
            ))}
          </div>

          <div className="header__inner ">
            {navLinksToAccount.map((elem) => (
              <NavLinkAccount
                key={elem.id}
                path={elem.path}
                title={elem.title}
                className={elem.className}
                imgSrc={elem.imgSrc}
                imgAlt={elem.imgAlt}
              />
            ))}
          </div>
        </header>
      </div>
    </div>
  );
}

export default MainPage;
