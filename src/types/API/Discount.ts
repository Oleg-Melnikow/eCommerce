import { Customer } from "./Customer";

interface LocalizedString extends Record<"ru" | "en", string> {}

type StackingMode = string;

interface CartDiscountTarget {}

interface CustomerReference {
  id: string;
  obj?: Customer;
}

interface LastModifiedBy {
  externalUserId?: string;
  customer?: CustomerReference;
  clientId?: string;
  anonymousId?: string;
}

interface CreatedBy {
  externalUserId?: string;
  customer?: CustomerReference;
  clientId?: string;
  anonymousId?: string;
}

interface CartDiscount {
  version: number;
  value: CartDiscountValue;
  validUntil?: Date;
  validFrom?: Date;
  target?: CartDiscountTarget;
  stackingMode: StackingMode;
  sortOrder: string;
  requiresDiscountCode: boolean;
  name?: LocalizedString;
  lastModifiedBy?: LastModifiedBy;
  lastModifiedAt: Date;
  key?: string;
  isActive: boolean;
  id: string;
  description?: LocalizedString;
  createdBy?: CreatedBy;
  createdAt: Date;
  cartPredicate: string;
}

type CentPrecisionMoney = {
  currencyCode: string;
  centAmount: number;
};

type TypedMoney = {
  type: string;
  money: CentPrecisionMoney[];
};

type ProductReference = {
  id?: string;
  key?: string;
};

type ChannelReference = {
  id?: string;
  key?: string;
};

interface CartDiscountValueRelative {
  type: "relative";
  permyriad: number;
}

interface CartDiscountValueAbsolute {
  type: "absolute";
  money: CentPrecisionMoney[];
}

interface CartDiscountValueFixed {
  type: "fixed";
  money: TypedMoney[];
}

interface CartDiscountValueGiftLineItem {
  type: "giftLineItem";
  product: ProductReference;
  variantId: number;
  supplyChannel: ChannelReference;
  distributionChannel: ChannelReference;
}

type CartDiscountValue =
  | CartDiscountValueRelative
  | CartDiscountValueAbsolute
  | CartDiscountValueFixed
  | CartDiscountValueGiftLineItem;

interface DiscountCode {
  version: number;
  validUntil?: Date;
  validFrom?: Date;
  name?: LocalizedString;
  maxApplicationsPerCustomer?: number;
  maxApplications?: number;
  lastModifiedBy?: LastModifiedBy;
  lastModifiedAt: Date;
  isActive: boolean;
  id: string;
  groups: string[];
  description?: LocalizedString;
  createdBy?: CreatedBy;
  createdAt: Date;
  code: string;
  cartPredicate?: string;
  cartDiscounts: CartDiscountReference[];
}

interface CartDiscountReference {
  id: string;
  typeId: "cart-discount";
  obj?: CartDiscount;
}

interface DiscountCodePagedQueryResponse {
  total?: number;
  results: DiscountCode[];
  offset: number;
  limit: number;
  count: number;
}

export { CartDiscount, DiscountCode, DiscountCodePagedQueryResponse };
