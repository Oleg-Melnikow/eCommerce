import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@mui/material";
import FormWrapper from "components/FormWrapper/FormWrapper";
import FormTag from "components/Form/FormTag";
import InputTag from "components/InputTag/InputTag";
import ButtonTag from "components/ButtonTag/ButtonTag";
import SelectTag from "components/SelectTag/SelectTag";
import { registration } from "helpers/validatioinSchemes";
import validateDateOfBirth from "helpers/validateDateOfBirth";
import clientAPI from "api/API";

import "./RegistrationPage.scss";

type FormType = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  city: string;
  street: string;
  postalCode: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function RegistrationPage(): ReactElement {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<FormType>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(registration),
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

  const onChangeBirth = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue("dateOfBirth", event.target.value);
    checkDate(event.target.value);
  };

  const onSubmit: SubmitHandler<FormType> = (dataForm: FormType): void => {
    const { firstName, lastName, email, password } = dataForm;

    const newUserData = {
      lastName,
      firstName,
      email,
      password,
    };

    clientAPI.createCustomer(newUserData);
  };

  const onInvalid: SubmitErrorHandler<FormType> = (): void => {
    checkDate(getValues("dateOfBirth"));
  };

  return (
    <FormWrapper title="Register">
      <FormTag
        className="registration-page__form"
        id="reg-Form"
        url="ourURLinFuture"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
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
        <Controller
          name="lastName"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <InputTag
              value={value}
              type="text"
              label="Last name"
              id={name}
              onChange={onChange}
              isError={Boolean(errors?.lastName)}
              message={errors.lastName?.message}
            />
          )}
        />
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field: { value, name } }) => (
            <InputTag
              value={value}
              type="date"
              id={name}
              onChange={onChangeBirth}
              isError={Boolean(errors?.dateOfBirth)}
              message={errors.dateOfBirth?.message}
            />
          )}
        />
        <Typography sx={{ mt: 2, alignSelf: "flex-start" }} variant="body1">
          Address
        </Typography>
        <Controller
          name="country"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectTag
              valueTag={value}
              id="country"
              onChange={onChange}
              isError={Boolean(errors?.country)}
              message={errors.country?.message}
            />
          )}
        />
        <Controller
          name="postalCode"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <InputTag
              value={value}
              type="text"
              label="Postal Code"
              id={name}
              onChange={onChange}
              isError={Boolean(errors?.postalCode)}
              message={errors.postalCode?.message}
            />
          )}
        />
        <Controller
          name="city"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <InputTag
              value={value}
              type="text"
              label="City"
              id={name}
              onChange={onChange}
              isError={Boolean(errors?.city)}
              message={errors.city?.message}
            />
          )}
        />
        <Controller
          name="street"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <InputTag
              value={value}
              type="text"
              label="Street"
              id={name}
              onChange={onChange}
              isError={Boolean(errors?.street)}
              message={errors.street?.message}
            />
          )}
        />
        <Typography sx={{ mt: 2, alignSelf: "flex-start" }} variant="body1">
          Credentials
        </Typography>
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
        <ButtonTag type="submit" title="Register" />
      </FormTag>
      <NavLink className="registration-page__content_log-in" to="/login">
        Have an account? Log In
      </NavLink>
    </FormWrapper>
  );
}

export default RegistrationPage;
