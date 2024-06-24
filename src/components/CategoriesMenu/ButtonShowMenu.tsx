import { ReactElement, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Box, Divider, Drawer, Typography } from "@mui/material";
import { Filter } from "components/Filter/Filter";
import { CategoriesMenu } from "./CategoriesMenu";

export function ButtonShowMenu(): ReactElement {
  const [openBar, setOpen] = useState(false);

  const toggleDrawer = (): void => {
    setOpen(!openBar);
  };

  const handleClick = (): void => {
    toggleDrawer();
  };

  return (
    <>
      <Drawer
        open={openBar}
        onClose={toggleDrawer}
        sx={{
          "&.MuiPaper-root.MuiDrawer-paper": {
            p: 1,
          },
        }}
      >
        <Box sx={{ padding: "10px", width: "100%" }}>
          <Typography gutterBottom variant="h6" component="div">
            Filter
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Box sx={{ maxWidth: "300px" }}>
            <Filter />
          </Box>
          <Typography sx={{ m: 1 }} variant="h6" component="div">
            Categories
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <CategoriesMenu />
        </Box>
      </Drawer>
      <Stack
        sx={{
          width: "100%",
          alignItems: "flex-start",
          zIndex: 20,
          mt: 1,
          display: "none",
          "@media (max-width: 800px)": {
            display: "flex",
          },
        }}
      >
        <Button
          variant="contained"
          color="success"
          sx={{ alignItems: "flex-start" }}
          onClick={handleClick}
        >
          Categories List
        </Button>
      </Stack>
    </>
  );
}
