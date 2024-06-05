import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Typography } from "@mui/material";
import InputTag from "components/InputTag/InputTag";
import validateDateOfBirth from "helpers/validateDateOfBirth";
import { personalDataSchema } from "helpers/validatioinSchemes";
import useAuth from "hooks/use-auth";
import { ChangeEvent, ReactElement, useState } from "react";
import {
  Controller,
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import "./PersonalInformation.scss";

type FormValues = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
};

export function PersonalInformation(): ReactElement {
  const { isLoading, user, changePersonalData } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(personalDataSchema),
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

  const onClickEdit = (): void => {
    setIsEdit(!isEdit);
  };

  const onChangeBirth = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue("dateOfBirth", event.target.value);
    checkDate(event.target.value);
  };

  const onSubmit: SubmitHandler<FormValues> = async (dataForm: FormValues) => {
    checkDate(getValues("dateOfBirth"));
    if (!Object.keys(errors).length && user) {
      changePersonalData({ id: user.id, version: user.version, ...dataForm });
    }
  };

  const onInvalid: SubmitErrorHandler<FormValues> = (
    error: FieldErrors<FormValues>
  ): void => {
    console.log(error, "error");
    checkDate(getValues("dateOfBirth"));
  };

  return (
    <div>
      {!isEdit ? (
        <div className="user-personal">
          <div className="user-info">
            <Typography variant="h5">First Name: {user?.firstName}</Typography>
            <Typography variant="h5">Last Name: {user?.lastName}</Typography>
            <Typography variant="h5">Email: {user?.email}</Typography>
            <Typography variant="h5">
              Date of Birth: {user?.dateOfBirth}
            </Typography>
            <Button
              sx={{ mt: 1 }}
              color="success"
              variant="contained"
              fullWidth
              onClick={onClickEdit}
            >
              Edit
            </Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Grid container md={6} sm={8} xs={12} spacing={1} item>
            <Grid item xs={12}>
              <Controller
                defaultValue={user?.firstName}
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
            <Grid item xs={12}>
              <Controller
                defaultValue={user?.lastName}
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
            <Grid item xs={12}>
              <Controller
                defaultValue={user?.dateOfBirth}
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
            <Grid item xs={12}>
              <Controller
                defaultValue={user?.email}
                name="email"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <InputTag
                    value={value}
                    type="text"
                    label="Email"
                    name={name}
                    onChange={onChange}
                    isError={Boolean(errors?.email)}
                    message={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                sx={{ mt: 2, background: "rgb(70, 163, 88)" }}
                fullWidth
                type="submit"
                loading={isLoading}
                variant="contained"
                color="success"
              >
                Update
              </LoadingButton>
              <Button
                disabled={isLoading}
                sx={{ mt: 1 }}
                color="inherit"
                variant="contained"
                fullWidth
                onClick={onClickEdit}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  );
}
