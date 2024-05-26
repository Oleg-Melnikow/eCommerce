import { ReactElement, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import useProduct from "hooks/use-product";
import ProductCard from "components/ProductCard/ProductCard";
import { CategoriesMenu } from "components/CategoriesMenu/CategoriesMenu";
import "./Catalog.scss";

function CatalogPage(): ReactElement {
  const { getProductsData, products } = useProduct();

  useEffect(() => {
    getProductsData();
  }, [getProductsData]);

  return (
    <div className="catalog-page">
      <Typography gutterBottom variant="h5" component="div">
        All Products
      </Typography>
      <Grid container sx={{ mt: 2 }}>
        <CategoriesMenu />
        <Grid
          container
          sx={{ gap: "10px" }}
          item
          md={9}
          sm={8}
          xs={7}
          display="flex"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default CatalogPage;
