import { ReactElement } from "react";
import "./ProductPage.scss";
import Slider from "components/Slider/slider";
import ProductDetails from "components/ProductDetails/ProductDetails";
import ProductDescription from "components/ProductDescription/ProductDescription";
import useProduct from "hooks/use-product";
import { ProductData } from "types/API/Product";

function ProductPage(): ReactElement {
  const { currentProduct } = useProduct();
  const product = currentProduct as ProductData;
  return (
    <div className="product-page">
      <Slider product={product} />
      <ProductDetails product={product} />
      <ProductDescription product={product} />
    </div>
  );
}

export default ProductPage;
