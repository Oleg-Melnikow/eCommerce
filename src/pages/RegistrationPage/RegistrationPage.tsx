import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Controller,
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid, Typography } from "@mui/material";
import FormWrapper from "components/FormWrapper/FormWrapper";
import FormTag from "components/Form/FormTag";
import InputTag from "components/InputTag/InputTag";
import ButtonTag from "components/ButtonTag/ButtonTag";
import { AddressFields } from "components/AddressFields/AddressFields";
import { registration, registrationFull } from "helpers/validatioinSchemes";
import validateDateOfBirth from "helpers/validateDateOfBirth";
import { MyCustomerDraft } from "types/API/Customer";
import { FormTypeRegister } from "types/RegisterForm";
import API from "api/API";
import "./RegistrationPage.scss";

function RegistrationPage(): ReactElement {
  const [validSchema, setValidSchema] = useState(registrationFull);
  const [defaultShipping, setDefaultShipping] = useState<boolean>(false);
  const [defaultBilling, setDefaultBilling] = useState<boolean>(false);
  const [isCheckedBilling, setIsCheckedBilling] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<FormTypeRegister>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(validSchema),
  });

  const checkDate = (date: string): void => {
    const isValid = validateDateOfBirth(date);
    if (!isValid) {
      setError("dateOfBirth", {
        message: "You should be at least 14 years old to register",
        type: "validate",
      });
    } else {
      clearErrors("dateOfBirth");
    }
  };

  const onChangeShipping = (event: ChangeEvent<HTMLInputElement>): void => {
    setDefaultShipping(event.target.checked);
  };

  const onChangeBilling = (event: ChangeEvent<HTMLInputElement>): void => {
    setDefaultBilling(event.target.checked);
  };

  const onCheckedBilling = (event: ChangeEvent<HTMLInputElement>): void => {
    setIsCheckedBilling(event.target.checked);
  };

  const onChangeBirth = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue("dateOfBirth", event.target.value);
    checkDate(event.target.value);
  };

  const onSubmit: SubmitHandler<FormTypeRegister> = (
    dataForm: FormTypeRegister
  ): void => {
    const {
      shippingAddress,
      billingAddress,
      confirmPassword,
      ...personalData
    } = dataForm;

    let addresses = [shippingAddress];
    if (!isCheckedBilling) {
      addresses = [...addresses, billingAddress];
    }

    const defaultShippingAddress = 0;
    const defaultBillingAddress = 1;

    let newUserData: MyCustomerDraft = {
      ...personalData,
      addresses,
    };

    if (defaultShipping) {
      newUserData = { ...newUserData, defaultShippingAddress };
    }
    if (isCheckedBilling) {
      newUserData = {
        ...newUserData,
        defaultBillingAddress: defaultShippingAddress,
      };
    }
    if (defaultBilling && !isCheckedBilling) {
      newUserData = {
        ...newUserData,
        defaultBillingAddress,
      };
    }

    console.log(newUserData);
    const clientAPI = API.getInstance();
    clientAPI?.createCustomer(newUserData);
  };

  const onInvalid: SubmitErrorHandler<FormTypeRegister> = (
    error: FieldErrors<FormTypeRegister>
  ): void => {
    console.log(error);
    checkDate(getValues("dateOfBirth"));
  };

  useEffect(() => {
    let schema = registrationFull;
    if (!isCheckedBilling) {
      schema = registration;
    }
    schema.refine((values) => values.password === values.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
    setValidSchema(schema);
  }, [isCheckedBilling]);

  return (
    <FormWrapper title="Register">
      <FormTag
        className="registration-page__form"
        id="reg-Form"
        url="ourURLinFuture"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        <Grid container>
          <Grid container xs={12} spacing={1} item>
            <Grid item md={4} xs={12}>
              <Controller
                name="firstName"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <InputTag
                    value={value}
                    type="text"
                    label="First name"
                    name={name}
                    onChange={onChange}
                    isError={Boolean(errors?.firstName)}
                    message={errors.firstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Controller
                name="lastName"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <InputTag
                    value={value}
                    type="text"
                    label="Last name"
                    name={name}
                    onChange={onChange}
                    isError={Boolean(errors?.lastName)}
                    message={errors.lastName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field: { value, name } }) => (
                  <InputTag
                    value={value}
                    type="date"
                    label="Date of Birth"
                    name={name}
                    onChange={onChangeBirth}
                    isError={Boolean(errors?.dateOfBirth)}
                    message={errors.dateOfBirth?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          <AddressFields
            typeAddress="shipping"
            control={control}
            errors={errors}
            isDefault={defaultShipping}
            isCheckedBilling={isCheckedBilling}
            onChangeIsDefault={onChangeShipping}
            onCheckedBilling={onCheckedBilling}
          />
          {!isCheckedBilling && (
            <AddressFields
              typeAddress="billing"
              control={control}
              errors={errors}
              isDefault={defaultBilling}
              isCheckedBilling={isCheckedBilling}
              onChangeIsDefault={onChangeBilling}
              onCheckedBilling={onCheckedBilling}
            />
          )}
          <Typography sx={{ mt: 2, alignSelf: "flex-start" }} variant="body1">
            Credentials
          </Typography>
          <Grid container xs={12} spacing={1} item>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <InputTag
                    value={value}
                    type="email"
                    label="Email"
                    name={name}
                    onChange={onChange}
                    isError={Boolean(errors?.email)}
                    message={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <InputTag
                    value={value}
                    type="password"
                    label="Password"
                    name={name}
                    onChange={onChange}
                    isError={Boolean(errors?.password)}
                    message={errors.password?.message}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <InputTag
                    value={value}
                    label="Confirm Password"
                    type="password"
                    name={name}
                    onChange={onChange}
                    isError={Boolean(errors?.confirmPassword)}
                    message={errors.confirmPassword?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        <ButtonTag type="submit" title="Register" />
      </FormTag>
      <NavLink className="registration-page__content_log-in" to="/login">
        Have an account? Log In
      </NavLink>
    </FormWrapper>
  );
}

export default RegistrationPage;
