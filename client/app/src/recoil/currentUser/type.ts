export type AuthStatus = "unauthenticated" | "loading" | "authenticated";

export type CurrentUser = {
  email?: string;
  role?: string;
  organization?: string;
};
