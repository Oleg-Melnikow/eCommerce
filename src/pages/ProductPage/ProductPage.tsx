import { ReactElement } from "react";
import "./ProductPage.scss";
import Slider from "components/Slider/slider";
import ProductDetails from "components/ProductDetails/ProductDetails";

function ProductPage(): ReactElement {
  return (
    <div className="product-page">
      <Slider />
      <ProductDetails />
    </div>
  );
}

export default ProductPage;
