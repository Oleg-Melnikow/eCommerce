import { ReactElement } from "react";
import "./ProductDescription.scss";
import { ProductData } from "types/API/Product";

type PropsType = {
  product: ProductData;
};

function ProductDescription({ product }: PropsType): ReactElement {
  const text = product.masterData.current.description.en;
  return (
    <div className="product-description">
      <h4 className="product-description__title">product description</h4>
      <p className="product-description__text">{text}</p>
    </div>
  );
}

export default ProductDescription;
