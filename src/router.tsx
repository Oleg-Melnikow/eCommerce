import { RouteObject, Navigate } from "react-router-dom";

import MainPage from "pages/MainPage/MainPage";
import LoginPage from "pages/LoginPage/LoginPage";
import RegistrationPage from "pages/RegistrationPage/RegistrationPage";
import AboutPage from "pages/AboutPage/AboutPage";
import CatalogPage from "pages/CatalogPage/Catalog";
import NotFound from "pages/NotFound/NotFound";

import Layout from "./components/Layout/Layout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Layout>
        <MainPage />
      </Layout>
    ),
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/registration", element: <RegistrationPage /> },
  {
    path: "/about",
    element: (
      <Layout>
        <AboutPage />
      </Layout>
    ),
  },
  { path: "/profile", element: <div>User Profile</div> },
  {
    path: "/catalog",
    element: (
      <Layout>
        <CatalogPage />
      </Layout>
    ),
  },
  { path: "/product", element: <div>Product</div> },
  { path: "/basket", element: <div>Basket</div> },
  { path: "/404", element: <NotFound /> },
  { path: "/*", element: <Navigate to="404" replace /> },
];

export default routes;
