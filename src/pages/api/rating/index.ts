import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '@/lib/prisma';

/**
 * This is the main handler for the /api/rating endpoint.
 * It handles GET requests and returns a list of ratings.
 * The number of ratings returned can be limited by a 'take' query parameter.
 * Ratings for a specific book can be excluded using the 'exclude' query parameter.
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

    // Default the number of ratings to return to 20.
    let take = 20;

    // If a 'take' query parameter is provided, use it to limit the number of ratings returned.
    if (req.query.take) {
        take = parseInt(req.query.take as string);
    }

    // Extract the 'exclude' query parameter.
    const {exclude} = req.query;

    // Fetch the ratings from the database.
    // Exclude ratings for a specific book if the 'exclude' query parameter is provided.
    // Order the ratings by creation date in descending order.
    // Limit the number of ratings returned to the 'take' value.
    // Include the book and user associated with each rating.
    const books = await prisma.rating.findMany(
        {
            where: {
                ...(exclude !== "" && {
                    id: {
                        not: exclude as string
                    }
                })
            },
            orderBy: {
                created_at: 'desc'
            },
            take: take,
            include: {
                book: true,
                user: true
            }
        }
    );

    // Return the ratings as a JSON response with a 201 status code.
    return res.status(201).json(books);
}
