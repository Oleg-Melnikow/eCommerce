import { Customer } from "./Customer";

interface LocalizedString {
  [key: string]: string;
}

interface CartDiscountResourceIdentifier {
  typeId: "cart-discount";
  key?: string;
  id?: string;
}

interface DiscountCodeDraft {
  validUntil?: Date;
  validFrom?: Date;
  name?: LocalizedString;
  maxApplicationsPerCustomer?: number;
  maxApplications?: number;
  isActive: boolean;
  groups?: string[];
  description?: LocalizedString;
  code: string;
  cartPredicate?: string;
  cartDiscounts: CartDiscountResourceIdentifier[];
}

type StackingMode = string;

interface CartDiscountTarget {}

interface CartDiscountDraft {
  value: CartDiscountValueDraft;
  validUntil?: Date;
  validFrom?: Date;
  target?: CartDiscountTarget;
  stackingMode?: StackingMode;
  sortOrder: string;
  requiresDiscountCode?: boolean;
  name: LocalizedString;
  key?: string;
  isActive: boolean;
  description?: LocalizedString;
  cartPredicate: string;
}

type Money = {
  currencyCode: string;
  centAmount: number;
};

type TypedMoneyDraft = {
  type: string;
  money: Money[];
};

type ProductResourceIdentifier = {
  id?: string;
  key?: string;
};

type ChannelResourceIdentifier = {
  id?: string;
  key?: string;
};

interface CartDiscountValueRelativeDraft {
  type: "relative";
  permyriad: number;
}

interface CartDiscountValueAbsoluteDraft {
  type: "absolute";
  money: Money[];
}

interface CartDiscountValueFixedDraft {
  type: "fixed";
  money: TypedMoneyDraft[];
}

interface CartDiscountValueGiftLineItemDraft {
  type: "giftLineItem";
  product: ProductResourceIdentifier;
  variantId: number;
  supplyChannel: ChannelResourceIdentifier;
  distributionChannel: ChannelResourceIdentifier;
}

type CartDiscountValueDraft =
  | CartDiscountValueRelativeDraft
  | CartDiscountValueAbsoluteDraft
  | CartDiscountValueFixedDraft
  | CartDiscountValueGiftLineItemDraft;

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

export { DiscountCodeDraft, CartDiscountDraft, CartDiscount, DiscountCode };
