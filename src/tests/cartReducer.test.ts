import { Cart } from "types/API/Cart";
import {
  CartInitialState,
  cartReducer,
  loading,
  setActiveDiscountCode,
  setAllDiscountCodes,
} from "../reducers/cartReducer";
import { DiscountCode } from "../types/API/Discount";

describe("cartReducer testing", () => {
  const initialState = CartInitialState;
  const date = new Date();
  const discountCode: DiscountCode = {
    version: 1,
    lastModifiedAt: date,
    isActive: true,
    id: "12yaqsHn",
    groups: ["first", "second"],
    createdAt: date,
    code: "code_1",
    cartDiscounts: [{ id: "1", typeId: "cart-discount" }],
  };

  it("should return the state with correct data when loading action is called", () => {
    const loadingAction = loading(true);
    const result = cartReducer(initialState, loadingAction);
    expect(result).toEqual({ ...initialState, isLoading: true });
  });

  it("should return the state with correct data when get all discountes", () => {
    const action = setAllDiscountCodes([discountCode]);
    const result = cartReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      allDiscountCodes: [discountCode],
    });
    expect(result.allDiscountCodes.length).toBe(1);
  });

  it("should return the state with correct data when set discounte code", () => {
    const actionSetCode = setActiveDiscountCode(discountCode);
    const actionRemoveCode = setActiveDiscountCode(null);
    const result = cartReducer(initialState, actionSetCode);
    const resultSecond = cartReducer(result, actionRemoveCode);
    expect(result).toEqual({
      ...initialState,
      activeDiscountCode: discountCode,
    });
    expect(result.activeDiscountCode).toBeTruthy();

    expect(resultSecond).toEqual({
      ...result,
      activeDiscountCode: null,
    });
    expect(resultSecond.activeDiscountCode).toBeFalsy();
  });
});
