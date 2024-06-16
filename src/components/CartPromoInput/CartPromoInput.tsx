import { Box, Button, OutlinedInput } from "@mui/material";
import useCart from "hooks/use-cart";
import { ReactElement } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import "./CartPromoInput.scss";

type DataFormType = {
  code: string;
};

function InputPromo(): ReactElement {
  const { addDiscountCode } = useCart();

  const { handleSubmit, control } = useForm<DataFormType>();

  const onSubmitHandler: SubmitHandler<DataFormType> = (
    dataForm: DataFormType
  ): void => {
    addDiscountCode(dataForm.code.toUpperCase());
  };

  return (
    <form className="cart-promo" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="label">Do you have a promo code? Enter it here!</div>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Controller
          name="code"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <OutlinedInput
              name={name}
              size="small"
              value={value?.toUpperCase() || ""}
              type="text"
              onChange={onChange}
              color="success"
            />
          )}
        />
        <Button variant="contained" color="success" type="submit">
          APPLY
        </Button>
      </Box>
    </form>
  );
}

export default InputPromo;
