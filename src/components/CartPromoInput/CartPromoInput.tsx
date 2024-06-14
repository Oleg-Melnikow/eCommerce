import { Button, OutlinedInput } from "@mui/material";
import useCart from "hooks/use-cart";
import { ReactElement } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

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
    <form
      style={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        width: "100%",
      }}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <span style={{ fontSize: "1rem" }}>
        Do you have a promo code? Enter it here!{" "}
      </span>
      <Controller
        name="code"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <OutlinedInput
            name={name}
            value={value?.toUpperCase() || ""}
            type="text"
            onChange={onChange}
            color="success"
            sx={{
              m: "5px 10px",
              p: "2px 5px",
              boxSizing: "border-box",
              maxHeight: "40px",
            }}
          />
        )}
      />
      <Button variant="contained" color="success" type="submit">
        APPLY
      </Button>
    </form>
  );
}

export default InputPromo;
