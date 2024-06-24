import {
  FormControlLabel,
  Grid,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import InputTag from "components/InputTag/InputTag";
import SelectTag from "components/SelectTag/SelectTag";
import { FormTypeRegister } from "types/RegisterForm";
import { ChangeEvent, ReactElement } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";

type PropsType = {
  typeAddress: "shipping" | "billing";
  control: Control<FormTypeRegister>;
  errors: FieldErrors<FormTypeRegister>;
  isDefault: boolean;
  isCheckedBilling: boolean;
  onChangeIsDefault: (event: ChangeEvent<HTMLInputElement>) => void;
  onCheckedBilling: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeSelect: (event: SelectChangeEvent) => void;
  onChangePostalCode: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function AddressFields({
  typeAddress,
  control,
  errors,
  isDefault,
  onChangeIsDefault,
  isCheckedBilling,
  onCheckedBilling,
  onChangeSelect,
  onChangePostalCode,
}: PropsType): ReactElement {
  const errorsField =
    typeAddress === "shipping" ? errors.shippingAddress : errors.billingAddress;
  const nameField =
    typeAddress === "shipping" ? "shippingAddress" : "billingAddress";

  return (
    <>
      <Typography
        sx={{ mt: 2, alignSelf: "flex-start", textTransform: "capitalize" }}
        variant="body1"
      >
        {typeAddress} Address
      </Typography>
      <Grid container xs={12} spacing={1} item>
        <Grid item md={6} xs={12}>
          <Controller
            name={`${nameField}.country`}
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <SelectTag
                valueTag={value}
                id={name}
                onChange={(e) => {
                  onChangeSelect(e);
                  onChange(e);
                }}
                isError={Boolean(errorsField?.country)}
                message={errorsField?.country?.message}
              />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controller
            name={`${nameField}.postalCode`}
            control={control}
            render={({ field: { value, name } }) => (
              <InputTag
                value={value}
                type="text"
                label="Postal Code"
                name={name}
                onChange={onChangePostalCode}
                isError={Boolean(errorsField?.postalCode)}
                message={errorsField?.postalCode?.message}
              />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controller
            name={`${nameField}.city`}
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <InputTag
                value={value}
                type="text"
                label="City"
                name={name}
                onChange={onChange}
                isError={Boolean(errorsField?.city)}
                message={errorsField?.city?.message}
              />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controller
            name={`${nameField}.streetName`}
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <InputTag
                value={value}
                type="text"
                label="Street"
                name={name}
                onChange={onChange}
                isError={Boolean(errorsField?.streetName)}
                message={errorsField?.streetName?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            value="end"
            control={
              <Switch
                color="success"
                checked={isDefault}
                onChange={onChangeIsDefault}
              />
            }
            label="Set as default address"
            labelPlacement="end"
          />
        </Grid>
        {typeAddress === "shipping" && (
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="CheckboxBilling"
                  color="success"
                  checked={isCheckedBilling}
                  onChange={onCheckedBilling}
                />
              }
              label="Use address as billing address"
            />
          </Grid>
        )}
      </Grid>
    </>
  );
}
