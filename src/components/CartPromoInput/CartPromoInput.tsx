import { Button, OutlinedInput } from "@mui/material";
import useCart from "hooks/use-cart";
import { ReactElement } from "react";

function InputPromo(): ReactElement {
  return (
    <form
      style={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        width: "100%",
      }}
    >
      <span style={{ fontSize: "1rem" }}>
        Do you have a promo code? Enter it here{" "}
      </span>
      <OutlinedInput
        color="success"
        sx={{
          m: "5px 10px",
          p: "2px 5px",
          boxSizing: "border-box",
          maxHeight: "40px",
        }}
      />
      <Button variant="contained" color="success" type="submit">
        APPLY
      </Button>
    </form>
  );
}

export default InputPromo;
