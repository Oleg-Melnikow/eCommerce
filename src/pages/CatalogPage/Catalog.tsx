import { ReactElement, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import useProduct from "hooks/use-product";
import ProductCard from "components/ProductCard/ProductCard";
import "./Catalog.scss";

function CatalogPage(): ReactElement {
  const { getProductsData, products } = useProduct();

  useEffect(() => {
    getProductsData();
  }, [getProductsData]);

  return (
    <div className="catalog-page" style={{ marginTop: "30px" }}>
      <Typography gutterBottom variant="h5" component="div">
        All Products
      </Typography>
      <Grid container sx={{ mt: 2 }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </div>
  );
}

export default CatalogPage;
