import "./LoginPage.scss";
import React, { useState, ReactElement } from "react";

import clientAPI from "../../api/API";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import FormTag from "../../components/Form/FormTag";
import InputTag from "../../components/InputTag/InputTag";
import ButtonTag from "../../components/ButtonTag/ButtonTag";

function LoginPage(): ReactElement {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChangeInpt = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.name === "email") {
      setFormData({ ...formData, email: event.target.value });
    } else if (event.target.name === "password") {
      setFormData({ ...formData, password: event.target.value });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { email, password } = formData;
    clientAPI.authCustomer({ email, password });
    console.log(`Submitted data: ${formData.email} ${formData.password}`);
  };
  return (
    <FormWrapper title="Login">
      <FormTag
        className="login-page__form"
        id="log-Form"
        url="ourURLinFuture"
        onSubmit={handleSubmit}
      >
        <InputTag type="email" onChange={handleChangeInpt} />
        <InputTag type="password" id="password" onChange={handleChangeInpt} />

        <ButtonTag type="submit" title="Login" />
      </FormTag>
    </FormWrapper>
  );
}

export default LoginPage;
