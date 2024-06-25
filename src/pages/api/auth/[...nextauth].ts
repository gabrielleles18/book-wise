import {NextApiRequest, NextApiResponse, NextPageContext} from 'next'
import NextAuth, {NextAuthOptions} from 'next-auth'
import {PrismaAdapter} from '@/lib/auth/prisma-adapter'
import GoogleProvider from "next-auth/providers/google";

/**
 * This function builds the options for NextAuth.
 * @param {NextApiRequest | NextPageContext['req']} req - The request object.
 * @param {NextApiResponse | NextPageContext['res']} res - The response object.
 * @returns {NextAuthOptions} - The options for NextAuth.
 */
export function buildNextAuthOptions(
    req: NextApiRequest | NextPageContext['req'],
    res: NextApiResponse | NextPageContext['res'],
): NextAuthOptions {
    return {
        adapter: PrismaAdapter(req, res),
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID ?? '',
                clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
            }),
        ],
        callbacks: {
            // async signIn({account}) {
            //     // Verificar se o id_token existe
            //     if (account?.id_token) {
            //         // Verificar se outros campos estão presentes
            //         if (account.provider && account.type) {
            //             // Se todas as verificações passarem, redirecionar para a página inicial
            //             return '/home';
            //         }
            //     }
            //     // Se alguma das verificações falhar, retornar verdadeiro
            //     return true;
            // },

            /**
             * This callback is triggered when a session is accessed.
             * @param {Object} param0 - An object containing the session and user.
             * @param {Object} param0.session - The session object.
             * @param {Object} param0.user - The user object.
             * @returns {Object} - The updated session object.
             */
            session: async function ({session, user}) {
                return {
                    ...session,
                    user,
                }
            },
        },
        secret: process.env.NEXTAUTH_SECRET,
    }
}

/**
 * This is the main authentication function.
 * It uses NextAuth with the options built by buildNextAuthOptions.
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @returns {Promise} - The result of the NextAuth function.
 */
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    return NextAuth(req, res, buildNextAuthOptions(req, res))
}
