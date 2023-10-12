import { setRecoil } from "recoil-nexus";
import { authState, currentUser } from "./atoms";
import { CurrentUser } from "./type";

// 意図しないstateの変更を防ぐため、牽連するstateへの書き込み関数をここで一括管理
export const CurrentUserStateModule = {
  signIn: (user: CurrentUser) => {
    setRecoil(currentUser, {
      id: user.id,
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
