import { ReactElement, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import useProduct from "hooks/use-product";
import ProductCard from "components/ProductCard/ProductCard";
import { CategoriesMenu } from "components/CategoriesMenu/CategoriesMenu";
import { BreadcrumbsBlock } from "components/BreadcrumbsBlock/BreadcrumbsBlock";
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
      <BreadcrumbsBlock />
      <Grid container sx={{ mt: 2 }} justifyContent="space-between">
        <Box className="category-list">
          <CategoriesMenu />
        </Box>
        <Grid
          container
          sx={{
            display: "flex",
            gap: "10px",
            maxWidth: "calc(100% - 250px)",
            "@media (max-width: 510px)": {
              maxWidth: "100%",
              justifyContent: "center",
            },
          }}
          item
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
