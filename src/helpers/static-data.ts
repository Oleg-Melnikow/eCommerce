import LogIn from "assets/LogIn.svg";
import Register from "assets/Register.svg";
import LogOut from "assets/LogOut.svg";
import Basket from "assets/Basket.svg";
import UserProfile from "assets/UserProfile.svg";

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
    id: "userProfile",
    path: "/profile",
    title: "UserProfile",
    className: "header__inner_link-profile",
    imgSrc: UserProfile,
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

const countriesData: CountryData[] = [
  { value: "BY", label: "Belarus" },
  { value: "UK", label: "The United Kingdom" },
  { value: "US", label: "USA" },
];

interface CountryData {
  value: string;
  label: string;
}

interface SortingType extends CountryData {
  query?: string;
}

const sortingData: SortingType[] = [
  { value: "price asc", label: "By price (cheaper first)", query: "cheaper" },
  {
    value: "price desc",
    label: "By price (more expensive first)",
    query: "expensive",
  },
  { value: "name.en asc", label: "By name (ascending)", query: "nameASC" },
  { value: "name.en desc", label: "By name (descending)", query: "nameDESC" },
  { value: "default", label: "By default" },
];

export { LinkAccount, navLinksToAccount, countriesData, sortingData };
