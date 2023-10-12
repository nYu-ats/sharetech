import { createContext, FC, useEffect } from "react";
import { useRecoilValue } from "recoil";
import {
  CurrentUserStateModule,
  authState,
  currentUser as currentUserState,
} from "recoil/currentUser";
import { getAccessToken } from "repositories/shareTech/auth";
import { getCurrentUser } from "repositories/shareTech/user";
import { AuthProviderProps, AuthContextProps, Credentials } from "./AuthProvider.type";

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const status = useRecoilValue(authState);
  const currentUser = useRecoilValue(currentUserState);

  useEffect(() => {
    loadUserFromLocalAccessToken();
  }, []);

  const loadUserFromLocalAccessToken = async () => {
    if (window.localStorage.getItem("ACCESSTOKEN")) {
      CurrentUserStateModule.loading();
      await getCurrentUser()
        .then((response) => {
          CurrentUserStateModule.signIn({
            id: response.result.id,
            email: response.result.email,
            role: response.result.role,
            organization: response.result.organization,
          });
          return response.result;
        })
        .catch((e) => {
          CurrentUserStateModule.signOut();
          return null;
        });

      return true;
    }

    return false;
  };

  const signIn = async (credentials: Credentials) => {
    const signInSucceded = await getAccessToken(credentials)
      .then((response) => {
        if (response.result.token.length > 0) {
          return true;
        }
      })
      .catch((e) => {
        return false;
      });

    if (!signInSucceded) {
      return null;
    }

    const user = await getCurrentUser()
      .then((response) => {
        CurrentUserStateModule.signIn({
          id: response.result.id,
          email: response.result.email,
          role: response.result.role,
          organization: response.result.organization,
        });
        return response.result;
      })
      .catch((e) => {
        return null;
      });

    return user
      ? {
          id: user.id,
          email: user.email,
          role: user.role,
          organization: user.organization,
        }
      : null;
  };

  const signOut = async () => {};

  const authModules = {
    status: status,
    user: currentUser,
    signIn: signIn,
    signOut: signOut,
  };

  return <AuthContext.Provider value={authModules}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
