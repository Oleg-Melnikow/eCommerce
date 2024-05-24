interface Products {
  count: number;
  limit: number;
  offset: number;
  results: ProductData[];
  total: number;
}

interface ProductImage {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

type Languages = {
  ru: string;
  en: string;
};

interface ProductData {
  id: string;
  key: string;
  masterData: {
    current: {
      name: Languages;
      description: Languages;
      masterVariant: {
        images: ProductImage[];
      };
    };
  };
}

export { Products, ProductData, ProductImage };
