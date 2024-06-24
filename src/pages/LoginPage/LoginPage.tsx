import { ReactElement } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import useAuth from "hooks/use-auth";
import FormWrapper from "components/FormWrapper/FormWrapper";
import FormTag from "components/Form/FormTag";
import InputTag from "components/InputTag/InputTag";
import { loginSchema } from "helpers/validatioinSchemes";
import { LoginType } from "types/InputTagProps";
import "./LoginPage.scss";

function LoginPage(): ReactElement {
  const { login, isLoading } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginType> = (dataForm: LoginType): void => {
    login(dataForm);
  };

  return (
    <FormWrapper title="Login">
      <FormTag
        className="login-page__form"
        id="log-Form"
        url="ourURLinFuture"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
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
        <LoadingButton
          sx={{ m: 2, background: "rgb(70, 163, 88)" }}
          fullWidth
          type="submit"
          loading={isLoading}
          variant="contained"
          color="success"
        >
          Login
        </LoadingButton>
      </FormTag>
      <NavLink className="login-page__content_sing-up" to="/registration">
        Have an account? Sign Up
      </NavLink>
    </FormWrapper>
  );
}

export default LoginPage;
