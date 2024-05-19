import {
  AuthInitialState,
  authReducer,
  loading,
  initialize,
  setUser,
} from "../reducers/authReducer";

describe("authReducer reducer", () => {
  const initialState = AuthInitialState;

  it("should return the state with correct data when loading action is called", () => {
    const loadingAction = loading(true);
    const result = authReducer(initialState, loadingAction);
    expect(result).toEqual({ ...initialState, isLoading: true });
  });

  it("should update data in the state when initialize action is called", () => {
    const initializeAction = initialize(true, null);
    const result = authReducer(initialState, initializeAction);
    expect(result).toEqual({ ...initialState, isAuthenticated: true });
  });

  it("should update data in the state when set user data", () => {
    const userData = {
      addresses: [],
      createdAt: new Date("2024-05-05"),
      email: "asdas",
      id: "asdasd",
      isEmailVerified: true,
      lastModifiedAt: new Date("2024-05-05"),
      password: "asdasds",
      version: 12,
    };
    const setUserAction = setUser(userData);
    const result = authReducer(initialState, setUserAction);
    expect(result).toEqual({ ...initialState, user: userData });
  });
});
