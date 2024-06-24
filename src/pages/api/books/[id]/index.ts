import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "@/lib/prisma";

/**
 * This is the main handler for the /api/books/[id] endpoint.
 * It handles GET requests and returns a specific book by its ID.
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

    // If the request does not include an ID, return a 400 status code with an error message.
    if (!req.query.id) return res.status(400).json({message: 'Missing id'});

    // Fetch the book from the database using the provided ID.
    // Include the ratings and categories associated with the book.
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

    // Return the book as a JSON response with a 201 status code.
    return res.status(201).json(book);
}
