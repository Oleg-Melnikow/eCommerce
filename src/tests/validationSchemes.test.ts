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
    street: "First",
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
});
