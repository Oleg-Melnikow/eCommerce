import { ReactElement, useEffect } from "react";
import "./ProductPage.scss";
import Slider from "components/Slider/slider";
import ProductDetails from "components/ProductDetails/ProductDetails";
import ProductDescription from "components/ProductDescription/ProductDescription";
import useProduct from "hooks/use-product";
import { useParams } from "react-router-dom";
import LoaderItem from "components/LoaderItem/LoaderItem";
import useCart from "hooks/use-cart";

function ProductPage(): ReactElement {
  const { currentProduct, chooseProduct, isLoading } = useProduct();
  const { isLoading: isLoadingCart } = useCart();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      chooseProduct(id);
    }
  }, [id, chooseProduct]);

  return (
    <div className="product-page">
      {(isLoading || isLoadingCart) && <LoaderItem />}
      {currentProduct && (
        <>
          <Slider product={currentProduct} />
          <ProductDetails product={currentProduct} />
          <ProductDescription product={currentProduct} />
        </>
      )}
    </div>
  );
}

export default ProductPage;
