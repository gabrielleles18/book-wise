import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '@/lib/prisma';
import {z} from 'zod';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'POST') {
        return res.status(405).end()
    }

    const createRatingBody = z.object({
        rate: z.number(),
        description: z.string(),
        book_id: z.string(),
        user_id: z.string(),
    })

    const {rate, description, book_id, user_id} = createRatingBody.parse(
        req.body,
    )

    const hasRating = await prisma.rating.findFirst({
        where: {
            book_id,
            user_id,
        },
    })

    if (hasRating) {
        const rating = await prisma.rating.update({
            where: {
                id: hasRating.id,
            },
            data: {
                rate,
                description,
                created_at: new Date(),
            },
        })

        if (!rating) {
            return res.status(400).json({message: 'Rating not updated'})
        }
    } else {

        const rating = await prisma.rating.create({
            data: {
                rate,
                description,
                book_id,
                user_id,
            },
        })

        if (!rating) {
            return res.status(400).json({message: 'Rating not created'})
        }
    }

    return res.status(201).json({message: 'Rating created successfully'});
}
