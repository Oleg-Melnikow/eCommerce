import { AxiosError } from "axios";
import { ErrorResponse } from "../types/API/Errors";

export default function errorHandler(axiosError: unknown): string {
  const error =
    axiosError instanceof AxiosError
      ? (axiosError.response?.data as ErrorResponse)
      : new Error("Unknow error");

  let errorMessageInner: string;
  switch (error.message) {
    case "Account with the given credentials not found.":
      errorMessageInner =
        "The password is incorrect. Please enter the correct password.";
      break;
    case "There is already an existing customer with the provided email.":
      errorMessageInner =
        "Error registration user: re-registration of an already registered user.\nPlease, login or use another email address.";
      break;
    case "The given current password does not match.":
      errorMessageInner =
        "The given current password does not match. Please enter the correct password.";
      break;
    case "Failed to add item to cart":
      errorMessageInner = "Failed to add item to cart";
      break;
    default:
      errorMessageInner =
        "Something went wrong during the registration process. Please, should try again later.";
      break;
  }

  return errorMessageInner;
}
