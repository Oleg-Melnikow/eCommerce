import { Box, Checkbox, FormControlLabel, Grid, Switch } from "@mui/material";
import useAuth from "hooks/use-auth";
import { ChangeEvent, ReactElement } from "react";
import { checkAddressType } from "helpers/checkAddressType";
import { AddressActionType } from "types/RegisterForm";

type PropsType = {
  id: string;
};

export function AddressTypeUpdate({ id }: PropsType): ReactElement {
  const { user, changeUserAdress } = useAuth();

  const onChangeIsDefault = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const { checked, name } = event.target;
    if (user && id && checked) {
      const action =
        name === "defaultShipping"
          ? "setDefaultShippingAddress"
          : "setDefaultBillingAddress";
      await changeUserAdress({
        action,
        addressId: id,
        id: user.id,
        version: user.version,
      });
    }

    console.log(event.target.checked, event.target.name);
  };

  const onChangeAddressType = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const { checked, name } = event.target;
    if (user && id) {
      let action: AddressActionType =
        name === "CheckboxBilling"
          ? "addBillingAddressId"
          : "addShippingAddressId";
      if (!checked) {
        action =
          name === "CheckboxBilling"
            ? "removeBillingAddressId"
            : "removeShippingAddressId";
      }
      await changeUserAdress({
        action,
        addressId: id,
        id: user.id,
        version: user.version,
      });
    }
  };

  return (
    <Box sx={{ px: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                name="CheckboxShipping"
                color="success"
                checked={checkAddressType(user?.shippingAddressIds, id)}
                onChange={onChangeAddressType}
              />
            }
            label="Shipping address"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                name="CheckboxBilling"
                color="success"
                checked={checkAddressType(user?.billingAddressIds, id)}
                onChange={onChangeAddressType}
              />
            }
            label="Billing address"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            value="end"
            control={
              <Switch
                name="defaultShipping"
                color="success"
                checked={user?.defaultShippingAddressId === id}
                onChange={onChangeIsDefault}
              />
            }
            label="Default shipping"
            labelPlacement="end"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            value="end"
            control={
              <Switch
                name="defaultBilling"
                color="success"
                checked={user?.defaultBillingAddressId === id}
                onChange={onChangeIsDefault}
              />
            }
            label="Default billing"
            labelPlacement="end"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
