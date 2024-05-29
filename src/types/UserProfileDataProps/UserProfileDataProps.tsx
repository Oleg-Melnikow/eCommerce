export interface UserPersonalData {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
}

export interface UserAddressesData {
  billingAddress?: string;
  shippingAddress?: string;
  id?: string;
  country?: string;
  city?: string;
  streetName?: string;
  postalCode?: number | string;
}
