import { z } from "zod";

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

const registrationSchema = z.object({
  firstName: z
    .string({ message: "First name is a required field" })
    .regex(/^[a-zA-Z\s]+$/, "First name only letter")
    .min(1),
  lastName: z
    .string({ message: "Last name is a required field" })
    .regex(/^[a-zA-Z\s]+$/, "Last name only letter")
    .min(1),
  city: z
    .string({ message: "City is a required field" })
    .regex(/^[a-zA-Z\s]+$/, "City only letter")
    .min(1),
  street: z.string().min(1),
  postalCode: z.string().min(1),
  confirmPassword: z.string({ message: "Passwords do not match" }),
  country: z.string({ message: "Country is a required field" }),
  dateOfBirth: z.string({ message: "Date is a required field" }).date(),
});

const registration = registrationSchema
  .merge(loginSchema)
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export { registration, loginSchema };
