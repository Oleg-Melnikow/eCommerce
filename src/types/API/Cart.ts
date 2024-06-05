import { Address } from "./Customer";

export interface MyCartDraft {
  taxMode?: TaxMode;
  shippingMethod?: ShippingMethodResourceIdentifier;
  shippingAddress?: Address;
  locale?: string;
  lineItems?: MyLineItemDraft[];
  itemShippingAddresses?: Address[];
  deleteDaysAfterLastModification?: number;
  customerEmail?: string;
  currency: CurrencyCode;
  country?: string;
  billingAddress?: Address;
}

type TaxMode = "Platform" | "External" | "ExternalAmount" | "Disabled";
type CurrencyCode = "EUR" | "USD" | "BYN";

interface ShippingMethodResourceIdentifier {
  key?: string;
  id?: string;
}

interface MyLineItemDraft {
  variantId: number;
  supplyChannel?: ChannelResourceIdentifier;
  sku?: string;
  shippingDetails?: ItemShippingDetailsDraft;
  quantity: number;
  productId: string;
  distributionChannel?: ChannelResourceIdentifier;
  addedAt?: Date;
}

interface ChannelResourceIdentifier {
  key?: string;
  id?: string;
}

interface ItemShippingDetailsDraft {
  targets: ItemShippingTarget[];
}

interface ItemShippingTarget {
  quantity: number;
  addressKey: string;
}
