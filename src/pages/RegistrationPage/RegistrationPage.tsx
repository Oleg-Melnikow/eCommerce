import "./RegistrationPage.scss";
import React, { useState, ReactElement } from "react";

import FormTag from "../../components/Form/FormTag";
import InputTag from "../../components/InputTag/InputTag";
import ButtonTag from "../../components/ButtonTag/ButtonTag";
import SelectTag from "../../components/SelectTag/SelectTag";

function RegistrationPage(): ReactElement {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    date: "",
    country: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChangeInpt = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.name === "usename") {
      setFormData({ ...formData, name: event.target.value });
    } else if (event.target.name === "surname") {
      setFormData({ ...formData, surname: event.target.value });
    } else if (event.target.name === "date") {
      setFormData({ ...formData, date: event.target.value });
    } else if (event.target.name === "email")
      setFormData({ ...formData, email: event.target.value });
    else if (event.target.name === "password") {
      setFormData({ ...formData, password: event.target.value });
    } else if (event.target.name === "confirmPassword") {
      setFormData({ ...formData, confirmPassword: event.target.value });
    }
  };

  const handleChangeSlct = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (event.target.name === "country") {
      setFormData({ ...formData, country: event.target.value });
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
          Enter your personal information to register.
        </p>
        <FormTag
          className="registration-page__form"
          id="reg-Form"
          url="ourURLinFuture"
          onSubmit={handleSubmit}
        >
          <InputTag type="text" id="username" onChange={handleChangeInpt} />
          <InputTag type="text" id="surname" onChange={handleChangeInpt} />
          <InputTag type="date" id="date" onChange={handleChangeInpt} />

          <SelectTag id="country" onChange={handleChangeSlct} />

          <InputTag type="email" onChange={handleChangeInpt} />
          <InputTag type="password" id="password" onChange={handleChangeInpt} />
          <InputTag
            type="password"
            id="confirmPassword"
            onChange={handleChangeInpt}
          />

          <ButtonTag type="submit" title="Register" />
        </FormTag>
      </div>
    </div>
  );
}

export default RegistrationPage;
