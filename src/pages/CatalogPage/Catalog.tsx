import { ReactElement, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import useProduct from "hooks/use-product";
import ProductCard from "components/ProductCard/ProductCard";
import { CategoriesMenu } from "components/CategoriesMenu/CategoriesMenu";
import { BreadcrumbsBlock } from "components/BreadcrumbsBlock/BreadcrumbsBlock";
import LoaderItem from "components/LoaderItem/LoaderItem";
import { ButtonShowMenu } from "components/CategoriesMenu/ButtonShowMenu";
import "./Catalog.scss";

function CatalogPage(): ReactElement {
  const { getProductsData, products, isLoading, isInitialize } = useProduct();

  useEffect(() => {
    if (isInitialize) {
      getProductsData();
    }
  }, []);

  return (
    <div className="catalog-page">
      {isLoading && <LoaderItem />}
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
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default CatalogPage;
