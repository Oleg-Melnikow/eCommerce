export function validatePostalCode(
  post: string,
  country: string
): string | null {
  const validData = [
    {
      regex:
        /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/,
      country: "UK",
      message:
        "Postal code not correct, please enter formar like this AA9A 9AA",
    },
    {
      regex: /^\d{5}(?:[-\s]\d{4})?$/,
      country: "USA",
      message: "Postal code not correct, please enter formar like this 33311",
    },
    {
      regex: /^\d{6}$/,
      country: "BY",
      message: "Postal code not correct, please enter formar like this 224120",
    },
  ];

  const validValue = validData.find((el) => el.country === country);
  const valid = validValue?.regex.test(post);
  if (!valid && validValue) {
    return validValue?.message;
  }
  if (!validValue) {
    return "Please first choose country";
  }

  return null;
}
