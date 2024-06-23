import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '@/lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    if (!req.query.userId) {
        return res.status(400).json({message: 'Missing userId'})
    }
    const {search, limit} = req.query;

    const whereClause = {
        user_id: req.query.userId as string,
        ...(search && {
            book: {
                name: {
                    contains: search as string
                }
            }
        })
    };

    const rating = await prisma.rating.findMany({
        take: limit ? +limit : 20,
        orderBy: {
            created_at: 'desc'
        },
        where: {
            ...whereClause,
        },
        include: {
            book: {
                include: {
                    categories: true,
                }
            },
        }
    });

    return res.status(201).json(rating);
}
