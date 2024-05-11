export interface MyCustomerDraft {
  vatId?: string;
  title?: string;
  stores?: StoreResourceIdentifier[];
  password: string;
  middleName?: string;
  locale?: string;
  lastName?: string;
  firstName?: string;
  email: string;
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
  dateOfBirth?: Date;
  companyName?: string;
  addresses?: Address[];
}

interface StoreResourceIdentifier {
  key?: string;
  id?: string;
}

interface Address {
  title?: string;
  streetNumber?: string;
  streetName?: string;
  state?: string;
  salutation?: string;
  region?: string;
  postalCode?: string;
  phone?: string;
  pOBox?: string;
  mobile?: string;
  lastName?: string;
  key?: string;
  id?: string;
  firstName?: string;
  fax?: string;
  externalId?: string;
  email?: string;
  department?: string;
  country: string;
  company?: string;
  city?: string;
  building?: string;
  apartment?: string;
  additionalStreetInfo?: string;
  additionalAddressInfo?: string;
}
