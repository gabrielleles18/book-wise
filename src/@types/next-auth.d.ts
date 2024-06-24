import NextAuth from 'next-auth'

declare module 'next-auth' {
    export interface User {
        id: string
        name: string
        email: string
        created_at: Date
        avatar_url: string
        emailVerified: Date
    }

    interface Session {
        user: User
    }
}
