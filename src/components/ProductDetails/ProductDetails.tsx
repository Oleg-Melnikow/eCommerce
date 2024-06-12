import { ReactElement, useEffect, useState } from "react";
import ProductDetailsRadio from "components/ProductDetailsRadio/ProductDetailsRadio";
import ProductDetailsCounter from "components/ProductDetailsCounter/ProductDetailsCounter";
import { ProductData } from "types/API/Product";
import { ProductPrice } from "components/ProductCard/ProductPrice/ProductPrice";
import useProduct from "hooks/use-product";
import useCart from "hooks/use-cart";
import { LoadingButton } from "@mui/lab";
import LoaderItem from "components/LoaderItem/LoaderItem";
import "./ProductDetails.scss";

type PropsType = {
  product: ProductData;
};

function ProductDetails({ product }: PropsType): ReactElement {
  const { id, key, masterData } = product;
  const { getCategoriesCurrentProduct, currentProductCategories } =
    useProduct();
  const { addProductToActiveCart, isLoading } = useCart();
  const [count, setCount] = useState(1);

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

  const onclickAddToCart = (): void => {
    addProductToActiveCart({ id, key, ...masterData.current }, count);
  };

  useEffect(() => {
    product?.masterData.current.categories.forEach(async (category) => {
      await getCategoriesCurrentProduct(category.id);
    });
  }, [getCategoriesCurrentProduct, product?.masterData]);

  const { name, masterVariant, searchKeywords } = masterData.current;
  const { sku, prices } = masterVariant;
  const [price] = prices;
  const [title, categories, tags] = [
    name.en,
    currentProductCategories.map((category) => category.name.en),
    searchKeywords.en?.map((keyword) => keyword.text) ?? [],
  ];

  return (
    <div className="product-details">
      {isLoading && <LoaderItem />}
      <h3 className="product-details__title">{title}</h3>
      <ProductPrice price={price} /> {line}
      <ProductDetailsRadio className="product-details" />
      <div className="product-details__btn-wrap">
        <ProductDetailsCounter
          className="product-details"
          count={count}
          setCount={setCount}
        />
        <button
          type="button"
          className="product-details__btn product-details__btn--buy"
        >
          Buy Now
        </button>
        <LoadingButton
          loading={isLoading}
          type="button"
          className="product-details__btn product-details__btn--add"
          onClick={onclickAddToCart}
        >
          Add to Cart
        </LoadingButton>
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
