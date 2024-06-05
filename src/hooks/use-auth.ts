import { useContext } from "react";
import { AuthContext, AuthContextValue } from "reducers/authReducer";

const useAuth = (): AuthContextValue => useContext(AuthContext);

export default useAuth;
