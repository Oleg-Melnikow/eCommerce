import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({ message: "Email is a required field" })
    .regex(/^(?!\s)/, "Leading spaces are not allowed")
    .includes("@", { message: `Email must be include '@'` })
    .regex(/@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, "Domain not allowed")
    .email({ message: "Email is not valid" }),
  password: z
    .string({ message: "Password is a required field" })
    .regex(/^\S*$/, "Leading spaces are not allowed")
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

const validateAdress = z.object({
  street: z.string({ message: "Street is a required field" }).min(1),
  postalCode: z.string({ message: "Postal code is a required field" }).min(1),
  country: z.string({ message: "Country is a required field" }),
  city: z
    .string({ message: "City is a required field" })
    .regex(/^[a-zA-Z\s]+$/, "City only letter")
    .min(1),
});

const validateNames = (name: string): z.ZodString => {
  return z
    .string({ message: `${name} name is a required field` })
    .regex(/^[a-zA-Z\s]+$/, `${name} name only letter`)
    .min(1);
};

const registrationSchema = z.object({
  firstName: validateNames("First"),
  lastName: validateNames("Last"),
  confirmPassword: z.string({ message: "Passwords do not match" }),
  dateOfBirth: z.string({ message: "Date is a required field" }).date(),
  shippingAddress: validateAdress,
  billingAddress: validateAdress,
});

const registration = registrationSchema.merge(loginSchema);

const registrationFull = registration.omit({ billingAddress: true });

export { registration, loginSchema, registrationFull, validateAdress };
