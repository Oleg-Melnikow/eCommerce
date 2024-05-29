import { Box, Divider, IconButton, Input, Paper } from "@mui/material";
import { ChangeEvent, KeyboardEvent, ReactElement, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import useProduct from "hooks/use-product";
import { useLocation, useNavigate } from "react-router-dom";

export function ProductSearch(): ReactElement {
  const { getProductsCategory, currentCategory, setCategory, getProductsData } =
    useProduct();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const onSearchProducts = async (): Promise<void> => {
    if (searchValue.length >= 1) {
      await getProductsCategory(undefined, searchValue);
      if (currentCategory) {
        setCategory(null);
      }
      navigate(`/catalog?search=${searchValue}`);
    }
  };

  const handleQueryKeyup = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.code === "Enter" && searchValue) {
      onSearchProducts();
    }
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const resetSearch = async (): Promise<void> => {
    setSearchValue("");
    if (search) {
      navigate(`/catalog`);
      await getProductsData();
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
            value={searchValue}
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
