import LogIn from "assets/LogIn.svg";
import Register from "assets/Register.svg";
import LogOut from "assets/LogOut.svg";
import Basket from "assets/Basket.svg";

interface LinkAccount {
  id: string;
  path: string;
  title: string;
  className: string;
  imgSrc: string;
  permission: "all" | "unlogined" | "logined";
}

const navLinksToAccount: LinkAccount[] = [
  {
    id: "login",
    path: "/login",
    title: "Log In",
    className: "header__inner_link-login",
    imgSrc: LogIn,
    permission: "unlogined",
  },
  {
    id: "registration",
    path: "/registration",
    title: "Register",
    className: "header__inner_link-register",
    imgSrc: Register,
    permission: "unlogined",
  },
  {
    id: "logout",
    path: "/",
    title: "Log Out",
    className: "header__inner_link-logout",
    imgSrc: LogOut,
    permission: "logined",
  },
  {
    id: "basket",
    path: "/basket",
    title: "Basket",
    className: "header__inner_link-basket",
    imgSrc: Basket,
    permission: "all",
  },
];

export { LinkAccount, navLinksToAccount };
