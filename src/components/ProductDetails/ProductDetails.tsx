import { ReactElement } from "react";
import "./ProductDetails.scss";
import ProductDetailsRadio from "components/ProductDetailsRadio/ProductDetailsRadio";
import ProductDetailsCounter from "components/ProductDetailsCounter/ProductDetailsCounter";
import { ProductData } from "types/API/Product";
import { ProductPrice } from "components/ProductCard/ProductPrice/ProductPrice";

type PropsType = {
  product: ProductData;
};

function ProductDetails({ product }: PropsType): ReactElement {
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

  const { name, masterVariant, searchKeywords } = product.masterData.current;
  const { sku, prices } = masterVariant;
  const [price] = prices;
  const [title, categories, tags] = [
    name.en,
    ["Potter Plants"],
    searchKeywords.en.map((keyword) => keyword.text),
  ];
  return (
    <div className="product-details">
      <h3 className="product-details__title">{title}</h3>
      <ProductPrice price={price} /> {line}
      <ProductDetailsRadio className="product-details" />
      <div className="product-details__btn-wrap">
        <ProductDetailsCounter className="product-details" />
        <button
          type="button"
          className="product-details__btn product-details__btn--buy"
        >
          Buy Now
        </button>
        <button
          type="button"
          className="product-details__btn product-details__btn--add"
        >
          Add to Cart
        </button>
      </div>
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
