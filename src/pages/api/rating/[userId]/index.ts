import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '@/lib/prisma';

/**
 * This is the main handler for the /api/rating/[userId] endpoint.
 * It handles GET requests and returns a list of ratings for a specific user.
 * The ratings can be filtered by a search term and limited by a number.
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

    // If the request does not include a user ID, return a 400 status code with an error message.
    if (!req.query.userId) {
        return res.status(400).json({message: 'Missing userId'})
    }

    // Extract the search and limit parameters from the request query.
    const {search, limit} = req.query;

    // Define the where clause for the database query.
    // If a search term is provided, add a condition to filter ratings by book name.
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

    // Fetch the ratings from the database using the where clause.
    // Limit the number of ratings returned if a limit is provided.
    // Include the book and its categories for each rating.
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

    // Return the ratings as a JSON response with a 201 status code.
    return res.status(201).json(rating);
}
