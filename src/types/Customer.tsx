export interface CustomerDraft extends Partial<CustomerDraftRequired> {
  email: string;
}
interface CustomerDraftRequired {
  vatid: string;
  title: string;
  stores: StoreResourceIdentifier[];
  shippingaddresses: number[];
  salutation: string;
  password: string;
  middlename: string;
  locale: string;
  lastname: string;
  key: string;
  isemailverified: boolean;
  firstname: string;
  externalid: string;
  email: string;
  defaultshippingaddress: number;
  defaultbillingaddress: number;
  dateofbirth: Date;
  customernumber: string;
  customergroup: CustomerGroupResourceIdentifier;
  custom: CustomFieldsDraft;
  companyname: string;
  billingaddresses: number[];
  anonymousid: string;
  anonymouscartid: string;
  addresses: Address[];
}

interface StoreResourceIdentifier {
  key?: string;
  id?: string;
}

interface CustomerGroupResourceIdentifier {
  key?: string;
  id?: string;
}

interface CustomFieldsDraft {
  type: TypeResourceIdentifier;
  fields?: { [key: string]: unknown };
}

interface TypeResourceIdentifier {
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
