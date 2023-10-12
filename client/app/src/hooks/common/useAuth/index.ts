import { AuthContext } from "features/providers/auth/AuthProvider";
import { useContext } from "react";

export const useAuth = () => {
  return useContext(AuthContext);
};
