import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '@/lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    const {categoryId, search} = req.query;
    let where = {};

    if (search) {
        where = {
            ...where,
            OR: [{
                name: {
                    contains: search
                }
            }]
        }
    }

    if (categoryId) {
        where = {
            ...where,
            categories: {
                some: {
                    categoryId: categoryId
                }
            }
        }
    }

    const books = await prisma.book.findMany({
        where,
        include: {
            ratings: true,
        }
    });

    return res.status(200).json(books);
}
