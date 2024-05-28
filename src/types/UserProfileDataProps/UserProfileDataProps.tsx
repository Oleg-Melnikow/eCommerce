export interface UserPersonalData {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
}

export interface UserAddressesData {
  shippingAddress?: string;
  country?: string;
  city?: string;
  postalCode?: number | string;
  billingAddress?: string;
}
