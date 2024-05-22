import { ReactElement } from "react";
import "./ProductPage.scss";
import Slider from "components/Slider/slider";

function ProductPage(): ReactElement {
  return (
    <div className="product-page">
      <Slider />
    </div>
  );
}

export default ProductPage;
