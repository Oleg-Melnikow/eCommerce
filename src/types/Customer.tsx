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
  dateOfBirth?: Date;
  customerNumber?: string;
  customerGroup?: CustomerGroupReference;
  custom?: CustomFields;
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

interface CustomerGroupReference {
  id: string;
  obj?: CustomerGroup;
}

interface CustomerGroup {
  version: number;
  name: string;
  lastModifiedBy?: LastModifiedBy;
  lastModifiedAt: Date;
  key?: string;
  id: string;
  custom?: CustomFields;
  createdBy?: CreatedBy;
  createdAt: Date;
}

interface CustomFields {
  type?: TypeReference;
  fields?: FieldContainer;
}

interface TypeReference {
  id: string;
}

interface CreatedBy {
  externalUserId?: string;
  customer?: CustomerReference;
  clientId?: string;
  anonymousId?: string;
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
  custom?: CustomFields;
}

type FieldContainer = Record<string, string>;
