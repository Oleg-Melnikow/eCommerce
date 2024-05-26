import { validatePostalCode } from "../helpers/validatePostalCode";
import validateDateOfBirth from "../helpers/validateDateOfBirth";
import {
  loginSchema,
  registrationFull,
  validateAdress,
} from "../helpers/validatioinSchemes";

describe("testing validation shcema login page", () => {
  const validData = {
    email: "example@info.com",
    password: "eX@mp1ePass",
  };

  const address = {
    country: "Tili mili tryamdia",
    city: "Peace",
    streetName: "First",
    postalCode: "122-22",
  };

  it("Should pass with valid data for login form", () => {
    const validationResult = loginSchema.safeParse(validData);
    expect(validationResult.success).toBe(true);
  });

  it("Should pass with valid address data", () => {
    const validationResult = validateAdress.safeParse(address);
    expect(validationResult.success).toBe(true);
  });

  it("Should pass with valid data registation form", () => {
    const registation = {
      ...validData,
      confirmPassword: validData.password,
      firstName: "Mike",
      lastName: "Dre",
      dateOfBirth: "2002-11-03",
      shippingAddress: address,
    };
    const validationResult = registrationFull.safeParse(registation);
    expect(validationResult.success).toBe(true);
  });

  it("Should pass with valid years", () => {
    const correctYears = "2002-11-03";
    expect(validateDateOfBirth(correctYears)).toBe(true);
  });

  it("Should pass with valid postal code", () => {
    expect(validatePostalCode("220214", "BY")).toBe(null);
    expect(validatePostalCode("A2T 211", "BY")).toBe(
      "Postal code not correct, please enter formar like this 224120"
    );
    expect(validatePostalCode("220214", "")).toBe(
      "Please first choose country"
    );
  });
});
