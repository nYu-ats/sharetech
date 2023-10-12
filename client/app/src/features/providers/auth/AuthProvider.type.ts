import { ReactNode } from "react";

export type AuthProviderProps = {
  children: ReactNode;
};

export type AuthContextProps = {
  status: AuthStatus;
  user: User;
  signIn: (credentials: Credentials) => Promise<User | null>;
  signOut: () => void;
};

export type AuthStatus = "unauthenticated" | "loading" | "authenticated";

export type User = {
  id?: string;
  email?: string;
  role?: string;
  organization?: string;
};

export type Credentials = {
  email: string;
  password: string;
};
