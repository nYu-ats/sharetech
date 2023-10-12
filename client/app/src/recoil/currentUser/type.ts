export type AuthStatus = "unauthenticated" | "loading" | "authenticated";

export type CurrentUser = {
  id?: string;
  email?: string;
  role?: string;
  organization?: string;
};
