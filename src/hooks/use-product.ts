import { useContext } from "react";
import { ProductContext, ProductContextValue } from "reducers/productReducer";

const useProduct = (): ProductContextValue => useContext(ProductContext);

export default useProduct;
