import { ReactElement } from "react";
import { Box, CircularProgress } from "@mui/material";

function LoaderItem(): ReactElement {
  return (
    <Box
      sx={{
        background: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(2px)",
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 30,
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress
        color="success"
        sx={{ zIndex: 15 }}
        size={64}
        disableShrink
        thickness={3}
      />
    </Box>
  );
}

export default LoaderItem;
