import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '@/lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    // const category = req.query.categoryId;

    let where = {};
    // if (category !== undefined && category !== null) {
        where = {
            categories: {
                some: {
                    id: 'a1d0ee25-9c9a-49c8-84eb-7af1e0dd356d'
                }
            }
        }
    // }

    const books = await prisma.book.findMany({
        where,
        select: {
            name: true,
            author: true,
            cover_url: true,
            categories: {
                select: {
                    name: true,
                },
            },
        },
    });

    return res.status(200).json(books);
}
