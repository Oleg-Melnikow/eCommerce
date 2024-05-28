interface ProductPage {
  count: number;
  limit: number;
  offset: number;
  total: number;
}

interface Products extends ProductPage {
  results: ProductData[];
}

interface ProductsSearch extends ProductPage {
  results: Product[];
}

interface ProductImage {
  url: string;
  label: string;
  dimensions: {
    w: number;
    h: number;
  };
}

type Languages = {
  ru: string;
  en: string;
};

interface PriceValue {
  centAmount: number;
  currencyCode: string;
  type: string;
}

interface Price {
  id: string;
  key: string;
  value: PriceValue;
  discounted?: {
    discount: {
      id: string;
      typeId: string;
    };
    value: PriceValue;
  };
}

interface ProductData {
  id: string;
  key: string;
  masterData: {
    current: ProductCurrent;
  };
}

interface ProductCurrent {
  name: Languages;
  description: Languages;
  categories: {
    typeId: string;
    id: string;
  }[];
  slug: Languages;
  masterVariant: {
    images: ProductImage[];
    key: string;
    sku: string;
    prices: Price[];
  };
}

interface Product extends ProductCurrent {
  id: string;
  key: string;
}

export {
  Products,
  ProductData,
  ProductImage,
  ProductPage,
  Price,
  Product,
  ProductsSearch,
};
