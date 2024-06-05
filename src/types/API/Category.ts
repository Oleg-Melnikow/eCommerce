import { ProductPage } from "./Product";

interface Categories extends ProductPage {
  results: Category[];
}

type ObjectType = {
  [key: string]: string;
};

interface Category {
  id: string;
  key: string;
  ancestors: {
    id: string;
    typeId: string;
  }[];
  assets: CategoryAssets[];
  slug: ObjectType;
  name: ObjectType;
  description: ObjectType;
}

interface CategoryAssets {
  id: string;
  key: string;
  tags: string[];
  sources: { uri: string }[];
  name: ObjectType;
  description: ObjectType;
}

export { Categories, Category };
