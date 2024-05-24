import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import App from "./App";
import "./style.scss";

document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById("app") as HTMLElement);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </AuthProvider>
  </BrowserRouter>
);
