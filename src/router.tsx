import { RouteObject, Navigate } from "react-router-dom";

import MainPage from "pages/MainPage/MainPage";
import LoginPage from "pages/LoginPage/LoginPage";
import RegistrationPage from "pages/RegistrationPage/RegistrationPage";
import AboutPage from "pages/AboutPage/AboutPage";
import CatalogPage from "pages/CatalogPage/Catalog";
import BasketPage from "pages/BasketPage/BasketPage";
import NotFound from "pages/NotFound/NotFound";

import ProductPage from "pages/ProductPage/ProductPage";
import Layout from "./layouts/Layout/Layout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      { path: "/catalog", element: <CatalogPage /> },
      { path: "/catalog/:category", element: <CatalogPage /> },
      { path: "/catalog/:category/:child", element: <CatalogPage /> },
      {
        path: "/basket",
        element: <BasketPage />,
      },
      { path: "/login", element: <LoginPage /> },
      { path: "/registration", element: <RegistrationPage /> },
      { path: "/profile", element: <div>User Profile</div> },
      {
        path: "/product",
        element: <ProductPage />,
      },
    ],
  },

  { path: "/404", element: <NotFound /> },
  { path: "/*", element: <Navigate to="404" replace /> },
];

export default routes;
