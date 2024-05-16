import { ReactElement } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormWrapper from "components/FormWrapper/FormWrapper";
import FormTag from "components/Form/FormTag";
import InputTag from "components/InputTag/InputTag";
import ButtonTag from "components/ButtonTag/ButtonTag";
import API from "api/API";
import "./LoginPage.scss";

const loginSchema = z.object({
  email: z
    .string({ message: "Email is a required field" })
    .includes("@", { message: `Email must be include '@'` })
    .regex(/@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, "Domain not allowed")
    .email({ message: "Email is not valid" }),
  password: z
    .string({ message: "Password is a required field" })
    .regex(/^(?!\s)/, "Leading spaces are not allowed")
    .regex(/(?=.*[A-Z])/, "Must contain at least one uppercase letter")
    .regex(/(?=.*[a-z])/, "Must contain at least one lowercase letter")
    .regex(/(?=.*[0-9])/, "Must contain at least one digit")
    .regex(
      /(?=.*[!@#\\$%\\^&\\*])/,
      "Must contain at least one special character"
    )
    .min(8)
    .max(32),
});

type FormValues = {
  email: string;
  password: string;
};

function LoginPage(): ReactElement {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const handleChangeInpt = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value, name } = event.target;
    const updateValue = value.trim();
    if (name === "email") {
      setValue("email", updateValue);
    }
    if (name === "password") {
      setValue("password", updateValue);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (dataForm: FormValues): void => {
    const clientAPI = API.getInstance(useNavigate);
    clientAPI.signInCustomer(dataForm);
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
          render={({ field: { onChange, value } }) => (
            <InputTag
              value={value}
              type="email"
              onChange={(e) => {
                onChange(e);
                handleChangeInpt(e);
              }}
              isError={Boolean(errors?.email)}
              message={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputTag
              value={value}
              type="password"
              id="password"
              onChange={(e) => {
                onChange(e);
                handleChangeInpt(e);
              }}
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
