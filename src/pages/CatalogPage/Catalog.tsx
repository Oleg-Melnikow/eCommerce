import { ChangeEvent, ReactElement, useEffect } from "react";
import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
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
    limit,
    total,
    offset,
    setOffsetProduct,
    filters,
    setFilters,
  } = useProduct();

  const onPageChange = async (
    event: ChangeEvent<unknown>,
    page: number
  ): Promise<void> => {
    const currentProducts = (page - 1) * 8;
    await setOffsetProduct(currentProducts);
    if (!filters.length) {
      getProductsCurrentData(categories, currentProducts);
    } else {
      setFilters(filters, currentProducts);
    }
  };

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
            gap: 2,
            maxWidth: "calc(100% - 260px)",
            "@media (max-width: 800px)": {
              maxWidth: "100%",
              justifyContent: "center",
            },
          }}
          item
        >
          <Grid
            container
            item
            sx={{
              width: "100%",
              display: "flex",
              gap: "15px",
              "@media (max-width: 800px)": {
                justifyContent: "center",
                maxWidth: "100%",
              },
            }}
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
          {total > limit && (
            <Stack spacing={2} sx={{ width: "100%" }}>
              <Pagination
                sx={{ display: "flex", justifyContent: "center" }}
                page={offset / limit + 1}
                count={Math.ceil(total / limit)}
                showFirstButton
                showLastButton
                onChange={onPageChange}
              />
            </Stack>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default CatalogPage;
