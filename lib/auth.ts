import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthOptions } from 'next-auth'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Hardcoded credentials check
        if (credentials.email === 'rahulgarnepalli@gmail.com' && credentials.password === '1234') {
          return {
            id: '1',
            email: 'rahulgarnepalli@gmail.com',
            name: 'Rahul Garnepalli',
            role: 'Admin',
          }
        }

        if (credentials.email === 'user@user.com' && credentials.password === 'user') {
          return {
            id: '2',
            email: 'user@user.com',
            name: 'Regular User',
            role: 'Member',
          }
        }

        return null
      }
    })
  ],
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}