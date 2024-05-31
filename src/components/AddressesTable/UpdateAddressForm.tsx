import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CardContent,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import InputTag from "components/InputTag/InputTag";
import SelectTag from "components/SelectTag/SelectTag";
import { validatePostalCode } from "helpers/validatePostalCode";
import { validateAdress } from "helpers/validatioinSchemes";
import useAuth from "hooks/use-auth";
import { ChangeEvent, ReactElement } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Address } from "types/API/Customer";

type FormValues = {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
};

type PropsType = {
  address: Address;
};

export function UpdateAddressForm({ address }: PropsType): ReactElement {
  const { country, city, streetName, postalCode, id } = address;
  const { user, updateUserAdress, deleteUserAdress } = useAuth();
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "all",
    resolver: zodResolver(validateAdress),
  });

  const checkPostCode = (code: string, countryValue: string): void => {
    const error = validatePostalCode(code, countryValue);
    if (error) {
      setError(`postalCode`, {
        message: error,
        type: "validate",
      });
    } else {
      clearErrors(`postalCode`);
    }
  };

  const onChangeSelect = (event: SelectChangeEvent): void => {
    const { value } = event.target;
    const post = getValues("postalCode");
    checkPostCode(post, value);
  };

  const onChangePostalCode = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    const countryValue = getValues("country");

    setValue("postalCode", event.target.value);
    checkPostCode(value, countryValue);
  };

  const removeAddress = async (): Promise<void> => {
    if (user && id) {
      await deleteUserAdress(user.version, user.id, id);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (dataForm: FormValues) => {
    const result = { ...dataForm, id };

    if (user && id) {
      await updateUserAdress(user.id, user.version, id, dataForm);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <Grid container xs={12} spacing={1} item>
          <Grid item md={6} xs={12}>
            <Controller
              name="country"
              defaultValue={country}
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <SelectTag
                  valueTag={value}
                  id={name}
                  onChange={(e) => {
                    onChangeSelect(e);
                    onChange(e);
                  }}
                  isError={Boolean(errors?.country)}
                  message={errors?.country?.message}
                />
              )}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Controller
              name="postalCode"
              defaultValue={postalCode}
              control={control}
              render={({ field: { value, name } }) => (
                <InputTag
                  value={value}
                  type="text"
                  label="Postal Code"
                  name={name}
                  onChange={onChangePostalCode}
                  isError={Boolean(errors?.postalCode)}
                  message={errors?.postalCode?.message}
                />
              )}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Controller
              name="city"
              defaultValue={city}
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <InputTag
                  value={value}
                  type="text"
                  label="City"
                  name={name}
                  onChange={onChange}
                  isError={Boolean(errors?.city)}
                  message={errors?.city?.message}
                />
              )}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Controller
              name="streetName"
              defaultValue={streetName}
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <InputTag
                  value={value}
                  type="text"
                  label="Street"
                  name={name}
                  onChange={onChange}
                  isError={Boolean(errors?.streetName)}
                  message={errors?.streetName?.message}
                />
              )}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", py: 1, gap: "10px" }}>
          <Button type="submit" variant="contained" color="success">
            Update
          </Button>
          <Button variant="contained" color="error" onClick={removeAddress}>
            Delete
          </Button>
        </Box>
      </CardContent>
    </form>
  );
}
