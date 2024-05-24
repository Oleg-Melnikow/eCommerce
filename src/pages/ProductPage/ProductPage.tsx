import { ReactElement } from "react";
import "./ProductPage.scss";
import Slider from "components/Slider/slider";
import ProductDetails from "components/ProductDetails/ProductDetails";
import ProductDescription from "components/ProductDescription/ProductDescription";

function ProductPage(): ReactElement {
  return (
    <div className="product-page">
      <Slider />
      <ProductDetails />
      <ProductDescription />
    </div>
  );
}

export default ProductPage;
