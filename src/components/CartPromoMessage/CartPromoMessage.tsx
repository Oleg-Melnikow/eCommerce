import { Box, Button, Typography } from "@mui/material";
import { ReactElement } from "react";
import { DiscountCode } from "types/API/Discount";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import useCart from "hooks/use-cart";
import "./CartPromoMessage.scss";

type PropsType = {
  discountCode: DiscountCode;
};
function MessagePromo({ discountCode }: PropsType): ReactElement {
  const { isActive, code, description } = discountCode;
  const { removeDiscountCode } = useCart();

  const onClick = (): void => {
    removeDiscountCode();
  };

  return (
    <Box className="promo-message">
      <Box className="message-block">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
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
        onClick={onClick}
      >
        Remove promo code
      </Button>
    </Box>
  );
}

export default MessagePromo;
