import NextAuth from 'next-auth'

declare module 'next-auth' {
    export interface User {
        id: string
        name: string
        email: string
        created_at: string
        avatar_url: string
    }

    interface Session {
        user: User
    }
}
