export type AddressForm = {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
};

export type FormTypeRegister = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  password: string;
  confirmPassword: string;
  shippingAddress: AddressForm;
  billingAddress: AddressForm;
};

export type ActionAddressType = {
  action: string;
  address: AddressForm;
  addressId?: string;
};
