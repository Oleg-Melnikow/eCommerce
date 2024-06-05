import { ReactElement, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import useProduct from "hooks/use-product";
import ProductCard from "components/ProductCard/ProductCard";
import { CategoriesMenu } from "components/CategoriesMenu/CategoriesMenu";
import { BreadcrumbsBlock } from "components/BreadcrumbsBlock/BreadcrumbsBlock";
import LoaderItem from "components/LoaderItem/LoaderItem";
import { ButtonShowMenu } from "components/CategoriesMenu/ButtonShowMenu";
import { ProductSearch } from "components/ProductSearch/ProductSearch";
import { Sorting } from "components/Sorting/Sorting";
import { Filter } from "components/Filter/Filter";
import "./Catalog.scss";

function CatalogPage(): ReactElement {
  const {
    products,
    isLoading,
    isInitialize,
    getProductsCurrentData,
    categories,
  } = useProduct();

  useEffect(() => {
    if (isInitialize && !products.length) {
      getProductsCurrentData(categories);
    }
  }, []);

  return (
    <div className="catalog-page">
      {isLoading && <LoaderItem />}
      <Grid container sx={{ mb: 1, alignSelf: "center" }} item md={8} xs={12}>
        <ProductSearch />
      </Grid>
      <Grid container spacing={1}>
        <Grid item md={8} xs={12}>
          <BreadcrumbsBlock />
        </Grid>
        <Sorting />
      </Grid>
      <ButtonShowMenu />
      <Grid container sx={{ mt: 2 }} justifyContent="space-between">
        <Box className="category-list">
          <CategoriesMenu />
          <Filter />
        </Box>
        <Grid
          container
          sx={{
            height: "100%",
            display: "flex",
            gap: "10px",
            maxWidth: "calc(100% - 250px)",
            "@media (max-width: 800px)": {
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
