import { atom } from "recoil";
import { recoilKeySet } from "recoil/recoilKeys";
import { AuthStatus, CurrentUser } from "./type";

export const authState = atom<AuthStatus>({
  key: recoilKeySet.authState,
  default: "unauthenticated",
});

export const currentUser = atom<CurrentUser>({
  key: recoilKeySet.currentUser,
  default: {},
});
