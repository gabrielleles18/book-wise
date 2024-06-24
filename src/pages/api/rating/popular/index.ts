import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '@/lib/prisma';

/**
 * This is the main handler for the /api/rating/popular endpoint.
 * It handles GET requests and returns the top 4 books based on ratings.
 *
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @returns {Promise} - The result of the handler function.
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    // If the request method is not GET, return a 405 status code.
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    // Fetch the top 4 books from the database ordered by rating.
    // Include the book details for each rating.
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

    // Return the books as a JSON response with a 201 status code.
    return res.status(201).json(books);
}
