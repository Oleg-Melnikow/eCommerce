import { ReactElement, useEffect } from "react";
import "./ProductPage.scss";
import Slider from "components/Slider/slider";
import ProductDetails from "components/ProductDetails/ProductDetails";
import ProductDescription from "components/ProductDescription/ProductDescription";
import useProduct from "hooks/use-product";
import { useParams } from "react-router-dom";

function ProductPage(): ReactElement {
  const { currentProduct, chooseProduct } = useProduct();
  const { id } = useParams();
  useEffect(() => {
    if (id) chooseProduct(id);
  }, [id, chooseProduct]);

  return (
    <div className="product-page">
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
