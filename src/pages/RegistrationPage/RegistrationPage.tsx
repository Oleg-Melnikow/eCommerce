import "./RegistrationPage.scss";
import React, { useState, ReactElement } from "react";

import FormTag from "../../components/Form/FormTag";
import InputTag from "../../components/InputTag/InputTag";
import ButtonTag from "../../components/ButtonTag/ButtonTag";

function RegistrationPage(): ReactElement {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "usename") {
      setFormData({ ...formData, name: event.target.value });
    } else if (event.target.name === "email")
      setFormData({ ...formData, email: event.target.value });
    else if (event.target.name === "password") {
      setFormData({ ...formData, password: event.target.value });
    } else if (event.target.name === "confirmPassword") {
      setFormData({ ...formData, confirmPassword: event.target.value });
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(
      `Submitted data: ${formData.name} ${formData.email} ${formData.password} ${formData.confirmPassword}`
    );
  };
  return (
    <div className="registration-page">
      <div className="registration-page__content">
        <h2 className="registration-page__content_title">Register</h2>
        <p className="registration-page__content_description">
          Enter your email and password to register.
        </p>
        <FormTag
          className="registration-page__form"
          id="reg-Form"
          URL="ourURLinFuture"
          onSubmit={handleSubmit}
        >
          <InputTag type="text" onChange={handleChange} />
          <InputTag type="email" onChange={handleChange} />
          <InputTag type="password" id="password" onChange={handleChange} />
          <InputTag
            type="password"
            id="confirmPassword"
            onChange={handleChange}
          />
          <ButtonTag type="submit" title="Register" />
        </FormTag>
      </div>
    </div>
  );
}

export default RegistrationPage;
