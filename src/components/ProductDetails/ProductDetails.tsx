import { ReactElement, useEffect, useState } from "react";
import "./ProductDetails.scss";
import ProductDetailsRadio from "components/ProductDetailsRadio/ProductDetailsRadio";
import ProductDetailsCounter from "components/ProductDetailsCounter/ProductDetailsCounter";
import { ProductData } from "types/API/Product";
import { ProductPrice } from "components/ProductCard/ProductPrice/ProductPrice";
import useProduct from "hooks/use-product";
import useCart from "hooks/use-cart";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import toastOptions from "helpers/toastOptions";

type PropsType = {
  product: ProductData;
};

function ProductDetails({ product }: PropsType): ReactElement {
  const { getCategoriesCurrentProduct, currentProductCategories } =
    useProduct();
  const { addProductToActiveCart } = useCart();
  const [count, setCount] = useState(1);
  const [isLoadingAddBtn, setIsLoadingAddBtn] = useState(false);

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
    setIsLoadingAddBtn(true);
    toast.promise(
      addProductToActiveCart(product, count),
      {
        success: {
          render() {
            setIsLoadingAddBtn(false);
            return "The product has been successfully added to the shopping cart.";
          },
        },
        error: {
          render() {
            setIsLoadingAddBtn(false);
            return "The product could not be added to the shopping cart.";
          },
        },
      },
      toastOptions
    );
  };

  useEffect(() => {
    product?.masterData.current.categories.forEach(async (category) => {
      await getCategoriesCurrentProduct(category.id);
    });
  }, [getCategoriesCurrentProduct, product?.masterData]);

  const { name, masterVariant, searchKeywords } = product.masterData.current;
  const { sku, prices } = masterVariant;
  const [price] = prices;
  const [title, categories, tags] = [
    name.en,
    currentProductCategories.map((category) => category.name.en),
    searchKeywords.en?.map((keyword) => keyword.text) ?? [],
  ];

  return (
    <div className="product-details">
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
          loading={isLoadingAddBtn}
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
