import "./MainPage.scss";
import React, { useState, ReactElement } from "react";
import { NavLink } from "react-router-dom";

import HeaderLogo from "../../assets/HeaderLogo.png";
import LogIn from "../../assets/LogIn.svg";
import Register from "../../assets/Register.svg";
import LogOut from "../../assets/LogOut.svg";

function MainPage(): ReactElement {
  return (
    <div className="main-page">
      <div className="main-page__container">
        <header className="header">
          <img src={HeaderLogo} className="header_logo" alt="HeaderLogo" />
          <div className="header__nav">
            <NavLink className="header__nav_link-home" to="/">
              Home
            </NavLink>
            <NavLink className="header__nav_link-catalog" to="/catalog">
              Catalog
            </NavLink>
            <NavLink className="header__nav_link-about" to="/about">
              About
            </NavLink>
          </div>

          <div className="header__inner ">
            <NavLink to="/login" title="Log In">
              <img
                src={LogIn}
                alt="LogInLogo"
                className="header__inner_link-login"
              />
            </NavLink>
            <NavLink to="/registration" title="Register">
              <img
                src={Register}
                alt="RegisterLogo"
                className="header__inner_link-register"
              />
            </NavLink>
            <NavLink to="/" title="Log Out">
              <img
                src={LogOut}
                alt="LogOutLogo"
                className="header__inner_link-logout"
              />
            </NavLink>
          </div>
        </header>
      </div>
    </div>
  );
}

export default MainPage;
