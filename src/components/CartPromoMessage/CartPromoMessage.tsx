import { Box, Button, Typography } from "@mui/material";
import { ReactElement } from "react";
import { DiscountCode } from "types/API/Discount";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

type PropsType = {
  discountCode: DiscountCode;
};
function MessagePromo({ discountCode }: PropsType): ReactElement {
  const { isActive, code, description } = discountCode;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {isActive ? (
            <CheckCircleIcon color="success" />
          ) : (
            <ErrorIcon color="error" />
          )}
          <Typography variant="h6">
            {isActive
              ? `The promo code "${code}" has been successfully applied to your shopping cart.`
              : `The promo code "${code}" is invalid.`}
          </Typography>
        </Box>
        <Typography variant="body1" textAlign="center">
          {isActive
            ? description?.en
            : "Please use another promo code to get discounts in our store."}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="warning"
        type="submit"
        sx={{ justifySelf: "end" }}
      >
        Remove promo code
      </Button>
    </Box>
  );
}

export default MessagePromo;
