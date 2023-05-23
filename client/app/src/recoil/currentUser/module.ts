import { setRecoil } from "recoil-nexus";
import { authState, currentUser } from "./atoms";
import { CurrentUser } from "./type";

export const CurrentUserStateModule = {
  signIn: (user: CurrentUser) => {
    setRecoil(currentUser, {
      email: user.email,
      role: user.role,
      organization: user.organization,
    });
    setRecoil(authState, "authenticated");
  },
  signOut: () => {
    setRecoil(currentUser, {});
    setRecoil(authState, "unauthenticated");
  },
  loading: () => {
    setRecoil(authState, "loading");
  },
};
