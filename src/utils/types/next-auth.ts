import type { DefaultUser } from "next-auth";

export type OAuthProvider = 'google' | 'github'

declare module "next-auth" {
  interface Session {
    user?: DefaultUser;
  }
}
