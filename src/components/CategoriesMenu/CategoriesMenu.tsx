import { ReactElement, useEffect } from "react";
import { Grid, List } from "@mui/material";
import useProduct from "hooks/use-product";
import { CategoryItem } from "./CategoryItem/CategoryItem";

export function CategoriesMenu(): ReactElement {
  const { getCategoriesData, parentCategories } = useProduct();

  useEffect(() => {
    if (!parentCategories.length) {
      getCategoriesData();
    }
  }, [getCategoriesData, parentCategories.length]);

  return (
    <Grid item xs={5} sm={4} md={3}>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: "5px",
        }}
      >
        {parentCategories.map((category) => {
          return <CategoryItem key={category.id} category={category} />;
        })}
      </List>
    </Grid>
  );
}
