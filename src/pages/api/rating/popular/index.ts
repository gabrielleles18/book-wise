import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '@/lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    const books = await prisma.rating.findMany(
        {
            orderBy: {
                rate: 'desc'
            },
            take: 4,
            include: {
                book: true
            }
        }
    );

    return res.status(201).json(books);
}
