import { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useProduct from "hooks/use-product";

export function BreadcrumbsBlock(): ReactElement {
  const { pathname } = useLocation();
  const { categories, setCategory } = useProduct();
  const breadcrumbs = pathname.split("/").filter((path) => path);

  return (
    <Stack spacing={2} sx={{ alignSelf: "flex-start" }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ textTransform: "capitalize" }}
      >
        {breadcrumbs.map((item, index, array) => {
          const isLastLink = index === array.length - 1;
          const path = array.slice(0, index + 1).join("/");

          const getProduct = (): void => {
            const category = categories.find((el) => el.key === item);
            if (category) {
              const { id, key } = category;
              setCategory({ id, key });
            } else {
              setCategory(null);
            }
          };

          return !isLastLink ? (
            <Link
              key={item}
              to={`/${path}`}
              style={{ textDecoration: "none" }}
              onClick={getProduct}
            >
              <Typography color="text.secondary">{item}</Typography>
            </Link>
          ) : (
            <Typography key={item} color="text.primary">
              {item}
            </Typography>
          );
        })}
      </Breadcrumbs>
    </Stack>
  );
}
