import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import {AclService} from "@mitosis/library-react";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        await new Promise((resolve) => setTimeout(resolve, 5000))

        const token = 'a'

        return credentials.token === token
          ? { id: '123' }
          : null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      if (!isLoggedIn) {
        return false;
      }

      const args = new Map<string, unknown>();
      args.set('path', nextUrl.pathname);

      if (!await new AclService().processAction(AclService.CHECK_ACL, args)) {
        return Response.redirect(new URL('/401', nextUrl))
      } 
      
      return true
    },
  },

}
