import { ReactElement } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import FormWrapper from "components/FormWrapper/FormWrapper";
import FormTag from "components/Form/FormTag";
import InputTag from "components/InputTag/InputTag";
import ButtonTag from "components/ButtonTag/ButtonTag";
import API from "api/API";
import { loginSchema } from "helpers/validatioinSchemes";
import { FormValuesType } from "types/InputTagProps";
import "./LoginPage.scss";

function LoginPage(): ReactElement {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormValuesType> = (
    dataForm: FormValuesType
  ): void => {
    const clientAPI = API.getInstance();
    clientAPI?.signInCustomer(dataForm);
    console.log(dataForm);
  }

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
        <ButtonTag type="submit" title="Login" />
      </FormTag>
      <NavLink className="login-page__content_sing-up" to="/registration">
        Have an account? Sign Up
      </NavLink>
    </FormWrapper>
  );
}

export default LoginPage;
