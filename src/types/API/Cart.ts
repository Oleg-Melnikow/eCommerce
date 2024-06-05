import { Address, CreatedBy, Customer } from "./Customer";
import { Price } from "./Product";

interface MyCartDraft {
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
type CountryCode = "EU" | "US" | "BY";

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

interface Cart {
  version: number;
  totalPrice: TypedMoney;
  taxedPrice?: TaxedPrice;
  taxRoundingMode: RoundingMode;
  taxMode: TaxMode;
  taxCalculationMode: TaxCalculationMode;
  store?: StoreKeyReference;
  shippingRateInput?: ShippingRateInput;
  shippingInfo?: ShippingInfo;
  shippingAddress?: Address;
  refusedGifts: CartDiscountReference[];
  paymentInfo?: PaymentInfo;
  origin: CartOrigin;
  locale?: string;
  lineItems: LineItem[];
  lastModifiedBy?: LastModifiedBy;
  lastModifiedAt: Date;
  itemShippingAddresses?: Address[];
  inventoryMode?: InventoryMode;
  id: string;
  discountCodes?: DiscountCodeInfo[];
  deleteDaysAfterLastModification?: number;
  customerId?: string;
  customerGroup?: CustomerGroupReference;
  customerEmail?: string;
  customLineItems: CustomLineItem[];
  createdBy?: CreatedBy;
  createdAt: Date;
  country?: CountryCode;
  cartState: CartState;
  billingAddress?: Address;
  anonymousId?: string;
}

interface TypedMoney {}

interface TaxedPrice {
  totalNet: TypedMoney;
  totalGross: TypedMoney;
  taxPortions: TaxPortion[];
}

type RoundingMode = "HalfEven" | "HalfUp" | "HalfDown";

type TaxCalculationMode = "LineItemLevel" | "UnitPriceLevel";

interface StoreKeyReference {
  key: string;
}

interface ShippingRateInput {}

interface TaxPortion {
  rate?: number;
  name?: string;
  amount: TypedMoney;
}

interface LineItem {
  variant?: ProductVariant;
  totalPrice: TypedMoney;
  taxedPrice?: TaxedItemPrice;
  taxRate?: TaxRate;
  supplyChannel?: ChannelReference;
  state: ItemState[];
  shippingDetails?: ItemShippingDetails;
  quantity: number;
  productType?: ProductTypeReference;
  productSlug?: LocalizedString;
  productId: string;
  priceMode: LineItemPriceMode;
  price?: Price;
  name?: LocalizedString;
  lineItemMode: LineItemMode;
  id: string;
  distributionChannel?: ChannelReference;
  discountedPricePerQuantity?: DiscountedLineItemPriceForQuantity[];
  addedAt?: Date;
}

interface ShippingInfo {
  taxedPrice?: TaxedItemPrice;
  taxRate?: TaxRate;
  taxCategory?: TaxCategoryReference;
  shippingRate: ShippingRate;
  shippingMethodState: ShippingMethodState;
  shippingMethodName: string;
  shippingMethod?: ShippingMethodReference;
  price: TypedMoney;
  discountedPrice?: DiscountedLineItemPrice;
  deliveries?: Delivery[];
}

interface TaxedItemPrice {
  totalNet: TypedMoney;
  totalGross: TypedMoney;
}

interface TaxRate {
  subRates?: SubRate[];
  state?: string;
  name: string;
  includedInPrice: boolean;
  id?: string;
  country: CountryCode;
  amount?: number;
}

interface SubRate {
  name: string;
  amount?: number;
}

interface TaxCategoryReference {
  id: string;
  obj?: Record<string, string>;
}

interface CartDiscountReference {
  id: string;
  obj?: Record<string, string>;
}

type LocalizedString = Record<string, string>;

type ReferenceTypeID =
  | "cart"
  | "cart-discount"
  | "category"
  | "channel"
  | "customer"
  | "customer-group"
  | "discount-code"
  | "key-value-document"
  | "payment"
  | "product"
  | "product-type"
  | "product-discount"
  | "order"
  | "review"
  | "shopping-list"
  | "shipping-method"
  | "state"
  | "store"
  | "tax-category"
  | "type"
  | "zone"
  | "inventory-entry"
  | "order-edit";

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

type CartOrigin = string;

interface PaymentInfo {
  payments: PaymentReference[];
}

interface PaymentReference {
  id: string;
  obj?: Record<string, string>;
}

type InventoryMode = string;

interface DiscountCodeInfo {
  state: DiscountCodeState;
  discountCode?: DiscountCodeReference;
}

type DiscountCodeState = string;

interface DiscountCodeReference {
  id: string;
  obj?: Record<string, string>;
}

interface CustomerGroupReference {
  id: string;
  obj?: Record<string, string>;
}

interface CustomLineItem {
  totalPrice: TypedMoney;
  taxedPrice?: TaxedItemPrice;
  taxRate?: TaxRate;
  taxCategory?: TaxCategoryReference;
  state: ItemState[];
  slug: string;
  shippingDetails?: ItemShippingDetails;
  quantity: number;
  name?: LocalizedString;
  money: TypedMoney;
  id: string;
  discountedPricePerQuantity?: DiscountedLineItemPriceForQuantity[];
}

type CartState = string;

interface ProductVariant {
  SKU?: string;
  ScopedPriceDiscounted: boolean;
  ScopedPrice?: ScopedPrice;
  Prices?: Price[];
  Price?: Price;
  Key?: string;
  IsMatchingVariant: boolean;
  Images?: Image[];
  ID: number;
  Availability?: ProductVariantAvailability;
  Attributes?: Attribute[];
  Assets?: Asset[];
}

interface ScopedPrice {
  Value: TypedMoney;
  ValidUntil?: Date;
  ValidFrom?: Date;
  ID: string;
  Discounted?: DiscountedPrice;
  CustomerGroup?: CustomerGroupReference;
  CurrentValue: TypedMoney;
  Country?: CountryCode;
  Channel?: ChannelReference;
}

interface Image {
  URL: string;
  Label?: string;
  Dimensions: ImageDimensions;
}

interface ImageDimensions {
  W: number;
  H: number;
}

interface AssetDimensions {
  W: number;
  H: number;
}

interface ProductVariantAvailability {
  RestockableInDays?: number;
  IsOnStock: boolean;
  Channels?: ProductVariantChannelAvailabilityMap;
  AvailableQuantity?: number;
}

type ProductVariantChannelAvailabilityMap = Record<string, unknown>;

interface Attribute {
  Value: unknown;
  Name: string;
}

interface Asset {
  Tags?: string[];
  Sources: AssetSource[];
  Name?: LocalizedString;
  Key?: string;
  ID: string;
  Description?: LocalizedString;
}

interface AssetSource {
  URI: string;
  Key?: string;
  Dimensions?: AssetDimensions;
  ContentType?: string;
}

interface TaxedItemPrice {
  TotalNet: TypedMoney;
  TotalGross: TypedMoney;
}

interface TaxRate {
  SubRates?: SubRate[];
  State?: string;
  Name: string;
  IncludedInPrice: boolean;
  ID?: string;
  Country: CountryCode;
  Amount?: number;
}

interface SubRate {
  Name: string;
  Amount?: number;
}

interface ChannelReference {
  ID: string;
  obj?: Record<string, string>;
}

interface ItemState {
  State?: StateReference;
  Quantity: number;
}

interface StateReference {
  ID: string;
  obj?: Record<string, string>;
}

interface ItemShippingDetails {
  valid: boolean;
  targets: ItemShippingTarget[];
}

interface ItemShippingTarget {
  quantity: number;
  addressKey: string;
}

interface ProductTypeReference {
  id: string;
  obj?: Record<string, string>;
}

type LineItemPriceMode = "Platform" | "ExternalTotal" | "ExternalPrice";

type LineItemMode = "Standard" | "GiftLineItem";

interface ChannelReference {
  id: string;
  obj?: Record<string, string>;
}

interface DiscountedLineItemPriceForQuantity {
  quantity: number;
  discountedPrice?: DiscountedLineItemPrice;
}

interface DiscountedLineItemPrice {
  value: TypedMoney;
  includedDiscounts: DiscountedLineItemPortion[];
}

interface DiscountedLineItemPortion {
  discountedAmount: TypedMoney;
  discount?: CartDiscountReference;
}

interface CartDiscountReference {
  id: string;
  obj?: Record<string, string>;
}

interface ShippingRatePriceTier {}

interface ShippingRate {
  tiers: ShippingRatePriceTier[];
  price: TypedMoney;
  isMatching: boolean;
  freeAbove?: TypedMoney;
}

interface ShippingInfo {
  taxedPrice?: TaxedItemPrice;
  taxRate?: TaxRate;
  taxCategory?: TaxCategoryReference;
  shippingRate: ShippingRate;
  shippingMethodState: ShippingMethodState;
  shippingMethodName: string;
  shippingMethod?: ShippingMethodReference;
  price: TypedMoney;
  discountedPrice?: DiscountedLineItemPrice;
  deliveries?: Delivery[];
}

interface ShippingMethodReference {
  id: string;
  obj?: Record<string, string>;
}

interface Delivery {
  parcels: Parcel[];
  items: DeliveryItem[];
  id: string;
  createdAt: Date;
  address?: Address;
}

interface Parcel {
  trackingData?: TrackingData;
  measurements?: ParcelMeasurements;
  items?: DeliveryItem[];
  id: string;
  createdAt: Date;
}

interface TrackingData {
  trackingId?: string;
  providerTransaction?: string;
  provider?: string;
  isReturn: boolean;
  carrier?: string;
}

interface ParcelMeasurements {
  widthInMillimeter?: number;
  weightInGram?: number;
  lengthInMillimeter?: number;
  heightInMillimeter?: number;
}

interface DeliveryItem {
  quantity: number;
  id: string;
}

type ShippingMethodState = string;

interface DiscountedPrice {
  value: Money;
  discount?: ProductDiscountReference;
}

interface Money {
  currencyCode: CurrencyCode;
  centAmount: number;
}

interface ProductDiscountReference {
  id: string;
  obj?: Record<string, string>;
}

export { MyCartDraft, Cart };
