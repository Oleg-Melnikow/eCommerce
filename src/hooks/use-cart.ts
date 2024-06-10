import { useContext } from "react";
import { CartContext, CartContextValue } from "reducers/cartReducer";

const useCart = (): CartContextValue => useContext(CartContext);

export default useCart;
