import { MouseEvent, ReactElement, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Menu } from "@mui/material";
import { CategoriesMenu } from "./CategoriesMenu";

export function ButtonShowMenu(): ReactElement {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <Stack
      sx={{
        width: "100%",
        alignItems: "flex-start",
        zIndex: 20,
        mt: 2,
        display: "none",
        "@media (max-width: 510px)": {
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
      <Menu
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorEl={anchorEl}
        MenuListProps={{
          style: { maxHeight: "500px", padding: 0 },
        }}
      >
        <CategoriesMenu />
      </Menu>
    </Stack>
  );
}
