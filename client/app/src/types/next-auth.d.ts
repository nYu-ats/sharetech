import type { DefaultSession, JWT, AdapterUser } from "next-auth";

declare module "next-auth" {
  interface AdapterUser {
    email: string;
    role?: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      email?: string;
      role?: string;
      accessToken?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
