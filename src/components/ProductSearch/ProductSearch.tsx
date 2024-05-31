import { Box, Divider, IconButton, Input, Paper } from "@mui/material";
import { ChangeEvent, KeyboardEvent, ReactElement } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import useProduct from "hooks/use-product";
import { useLocation, useNavigate } from "react-router-dom";

export function ProductSearch(): ReactElement {
  const {
    getProductsCategory,
    currentCategory,
    setCategory,
    getAllProducts,
    querySearch,
    querySearchUpdate,
    setSort,
  } = useProduct();
  const { search } = useLocation();
  const navigate = useNavigate();

  const onSearchProducts = async (): Promise<void> => {
    if (querySearch.length >= 1) {
      setSort("default");
      await getProductsCategory(querySearch, "search");
      navigate(`/catalog?search=${querySearch}`);
      if (currentCategory) {
        setCategory(null, true);
      }
    }
  };

  const handleQueryKeyup = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.code === "Enter" && querySearch) {
      onSearchProducts();
    }
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    querySearchUpdate(event.target.value);
  };

  const resetSearch = async (): Promise<void> => {
    querySearchUpdate("");
    if (search && querySearch) {
      navigate(`/catalog`);
      setSort("default");
      await getAllProducts();
    }
  };

  return (
    <Paper
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        mb: 1,
        p: "5px 10px",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          width: "100%",
          p: 0,
        }}
      >
        <Box
          sx={{
            width: "100%",
            ml: 2,
          }}
        >
          <Input
            disableUnderline
            fullWidth
            onChange={handleQueryChange}
            onKeyUp={handleQueryKeyup}
            placeholder="Search product"
            value={querySearch}
          />
        </Box>
        <IconButton onClick={onSearchProducts}>
          <SearchIcon color="action" />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton onClick={resetSearch}>
          <CloseIcon color="action" />
        </IconButton>
      </Box>
    </Paper>
  );
}
