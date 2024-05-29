import { ReactElement, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import useProduct from "hooks/use-product";
import ProductCard from "components/ProductCard/ProductCard";
import { CategoriesMenu } from "components/CategoriesMenu/CategoriesMenu";
import { BreadcrumbsBlock } from "components/BreadcrumbsBlock/BreadcrumbsBlock";
import LoaderItem from "components/LoaderItem/LoaderItem";
import { ButtonShowMenu } from "components/CategoriesMenu/ButtonShowMenu";
import { ProductSearch } from "components/ProductSearch/ProductSearch";
import { useLocation } from "react-router-dom";
import "./Catalog.scss";

function CatalogPage(): ReactElement {
  const { products, isLoading, isInitialize, getProductsData } = useProduct();
  const { search } = useLocation();

  useEffect(() => {
    if (isInitialize && !products.length && !search) {
      getProductsData();
    }
  }, [getProductsData, isInitialize, products.length, search]);

  return (
    <div className="catalog-page">
      {isLoading && <LoaderItem />}
      <Grid container sx={{ mb: 1, alignSelf: "center" }} item md={8} xs={12}>
        <ProductSearch />
      </Grid>
      <BreadcrumbsBlock />
      <ButtonShowMenu />
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
          {!products.length && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="h4">Products not found</Typography>
            </Box>
          )}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default CatalogPage;
