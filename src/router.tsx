import NotFound from "pages/NotFound/NotFound";
import { RouteObject, Navigate } from "react-router-dom";

import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

const routes: RouteObject[] = [
  { path: "/", element: <div>Main</div> },
  { path: "/login", element: <div>Login</div> },
  { path: "/registration", element: <RegistrationPage /> },
  { path: "/about", element: <div>About</div> },
  { path: "/profile", element: <div>User Profile</div> },
  { path: "/catalog", element: <div>Catalog</div> },
  { path: "/product", element: <div>Product</div> },
  { path: "/basket", element: <div>Basket</div> },
  { path: "/404", element: <NotFound /> },
  { path: "/*", element: <Navigate to="404" replace /> },
];

export default routes;
