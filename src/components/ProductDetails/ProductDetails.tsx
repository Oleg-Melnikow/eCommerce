import { ReactElement } from "react";
import "./ProductDetails.scss";
import ProductDetailsRadio from "components/ProductDetailsRadio/ProductDetailsRadio";

function ProductDetails(): ReactElement {
  const line = (
    <div
      className="product-details__line"
      style={{
        width: "100%",
        height: "0",
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    />
  );
  const [title, price, sku, categories, tags] = [
    "Barberton Daisy",
    119,
    1995751877966,
    ["Potter Plants"],
    ["Home", "Garden", "Plants"],
  ];
  const shortDesc =
    "The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground.";
  return (
    <div className="product-details">
      <h3 className="product-details__title">{title}</h3>
      <p className="product-details__price">{price}$</p>
      {line}
      <h4 className="product-details__subtitle">Short Description:</h4>
      <p className="product-details__desc">{shortDesc}</p>
      <ProductDetailsRadio className="product-details" />
      <div className="product-details__info-wrap">
        <p className="product-details__info">
          <span className="product-details__info-title">SKU: </span>
          {sku}
        </p>
        <p className="product-details__info">
          <span className="product-details__info-title">Categories: </span>
          {categories.join(", ")}
        </p>
        <p className="product-details__info">
          <span className="product-details__info-title">Tags: </span>
          {tags.join(", ")}
        </p>
      </div>
    </div>
  );
}

export default ProductDetails;
