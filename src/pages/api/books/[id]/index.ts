import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    if (!req.query.id) return res.status(400).json({message: 'Missing id'});

    const book = await prisma.book.findFirst({
        where: {
            id: req.query.id as string
        },
        include:{
            ratings: {
                include:{
                    user: true
                }
            },
            categories: {
                include:{
                    category: true
                }
            },
        }
    });

    return res.status(201).json(book);
}
