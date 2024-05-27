import { ReactElement, useEffect } from "react";
import { List } from "@mui/material";
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
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        p: 0,
        background: "#eaeaea",
      }}
    >
      {parentCategories.map((category) => {
        return <CategoryItem key={category.id} category={category} />;
      })}
    </List>
  );
}
