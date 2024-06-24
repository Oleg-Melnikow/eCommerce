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
  shippingAddresses?: number[];
  billingAddresses?: number[];
  dateOfBirth?: string;
  companyName?: string;
  addresses?: Address[];
}

interface StoreResourceIdentifier {
  key?: string;
  id?: string;
}

export interface Address {
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

enum AnonymousCartSignInMode {
  MergeWithExistingCustomerCart = "MergeWithExistingCustomerCart",
  UseAsNewActiveCustomerCart = "UseAsNewActiveCustomerCart",
}

export interface MyCustomerSignin {
  email: string;
  password: string;
  activeCartSignInMode?: AnonymousCartSignInMode;
  updateProductData?: boolean;
}

export interface CustomerSignInResult {
  customer: Customer;
  cart?: Cart;
}

export interface Customer {
  version: number;
  vatId?: string;
  title?: string;
  stores?: StoreKeyReference[];
  shippingAddressIds?: string[];
  salutation?: string;
  password: string;
  middleName?: string;
  locale?: string;
  lastName?: string;
  lastModifiedBy?: LastModifiedBy;
  lastModifiedAt: Date;
  key?: string;
  isEmailVerified: boolean;
  id: string;
  firstName?: string;
  externalId?: string;
  email: string;
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
  dateOfBirth?: string;
  customerNumber?: string;
  createdBy?: CreatedBy;
  createdAt: Date;
  companyName?: string;
  billingAddressIds?: string[];
  addresses: Address[];
}

interface StoreKeyReference {
  key: string;
}

interface LastModifiedBy {
  externalUserId?: string;
  customer?: CustomerReference;
  clientId?: string;
  anonymousId?: string;
}

interface CustomerReference {
  id: string;
  obj?: Customer;
}

export interface CreatedBy {
  externalUserId?: string;
  customer?: CustomerReference;
  clientId?: string;
  anonymousId?: string;
}

interface Cart {
  version: number;
  store?: StoreKeyReference;
  shippingAddress?: Address;
  locale?: string;
  lastModifiedBy?: LastModifiedBy;
  lastModifiedAt: Date;
  itemShippingAddresses?: Address[];
  id: string;
  deleteDaysAfterLastModification?: number;
  customerId?: string;
  customerEmail?: string;
  createdBy?: CreatedBy;
  createdAt: Date;
  billingAddress?: Address;
  anonymousId?: string;
}
