import "./LoginPage.scss";
import React, { useState, ReactElement } from "react";

import FormWrapper from "../../components/FormWrapper/FormWrapper";
import FormTag from "../../components/Form/FormTag";
import InputTag from "../../components/InputTag/InputTag";
import ButtonTag from "../../components/ButtonTag/ButtonTag";

function LoginPage(): ReactElement {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChangeInpt = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.name === "usename") {
      setFormData({ ...formData, name: event.target.value });
    } else if (event.target.name === "password") {
      setFormData({ ...formData, password: event.target.value });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(`Submitted data: ${formData.name} ${formData.password}`);
  };
  return (
    <FormWrapper title="Login">
      <FormTag
        className="login-page__form"
        id="log-Form"
        url="ourURLinFuture"
        onSubmit={handleSubmit}
      >
        <InputTag type="text" id="username" onChange={handleChangeInpt} />
        <InputTag type="password" id="password" onChange={handleChangeInpt} />

        <ButtonTag type="submit" title="Login" />
      </FormTag>
    </FormWrapper>
  );
}

export default LoginPage;
