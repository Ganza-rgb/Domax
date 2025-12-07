import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

// TODO: Replace with actual database adapter
// import { PrismaAdapter } from '@next-auth/prisma-adapter'
// import prisma from '@/lib/prisma'

export const authOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // TODO: Implement actual authentication logic
        // This is a placeholder
        if (
          credentials?.email === 'demo@domax.com' &&
          credentials?.password === 'demo123'
        ) {
          return {
            id: '1',
            email: 'demo@domax.com',
            name: 'Demo User',
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

