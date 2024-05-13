import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

import LogIn from "../../assets/LogIn.svg";
import Register from "../../assets/Register.svg";
import LogOut from "../../assets/LogOut.svg";
import Basket from "../../assets/Basket.svg";

function NavLinksToAccount(): ReactElement {
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
    <div className="header__inner ">
      {navLinksToAccount.map((elem) => (
        <NavLink key={elem.id} className={elem.className} to={elem.path}>
          <Tooltip
            title={elem.title}
            arrow
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -6],
                    },
                  },
                ],
              },
            }}
          >
            <img src={elem.imgSrc} alt={elem.imgAlt} />
          </Tooltip>
        </NavLink>
      ))}
    </div>
  );
}

export default NavLinksToAccount;
