import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '@/lib/prisma';
import {z} from 'zod';

/**
 * This is the main handler for the /api/rating/create endpoint.
 * It handles POST requests and creates or updates a rating for a book by a user.
 *
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @returns {Promise} - The result of the handler function.
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    // If the request method is not POST, return a 405 status code.
    if (req.method !== 'POST') {
        return res.status(405).end()
    }

    // Define the schema for the request body using zod.
    const createRatingBody = z.object({
        rate: z.number(),
        description: z.string(),
        book_id: z.string(),
        user_id: z.string(),
    })

    // Parse the request body using the defined schema.
    const {rate, description, book_id, user_id} = createRatingBody.parse(
        req.body,
    )

    // Check if a rating already exists for the book by the user.
    const hasRating = await prisma.rating.findFirst({
        where: {
            book_id,
            user_id,
        },
    })

    // If a rating already exists, update it.
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

        // If the rating was not updated, return a 400 status code with an error message.
        if (!rating) {
            return res.status(400).json({message: 'Rating not updated'})
        }
    } else {
        // If a rating does not exist, create a new one.
        const rating = await prisma.rating.create({
            data: {
                rate,
                description,
                book_id,
                user_id,
            },
        })

        // If the rating was not created, return a 400 status code with an error message.
        if (!rating) {
            return res.status(400).json({message: 'Rating not created'})
        }
    }

    // Return a success message as a JSON response with a 201 status code.
    return res.status(201).json({message: 'Rating created successfully'});
}
