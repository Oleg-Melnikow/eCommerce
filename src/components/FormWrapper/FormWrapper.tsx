import React, { ReactNode } from "react";

function FormWrapper({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): JSX.Element {
  let className;
  let description;

  switch (title) {
    case "Register":
      className = "registration-page";
      description = "Enter your personal information to register.";
      break;
    case "Login":
      className = "login-page";
      description = "Enter your email and password to login.";
      break;
    default:
      className = "";
      description = "";
  }

  return (
    <div className={className}>
      <div className={`${className}__content`}>
        <h2 className={`${className}__content_title`}>{title}</h2>
        <p className={`${className}__content_description`}>{description}</p>
        {children}
      </div>
    </div>
  );
}

export default FormWrapper;
